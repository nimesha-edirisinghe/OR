import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ApiResponse } from 'types/api';
import { dataIngestionSummaryViewApi } from 'api';
import { responseValidator } from 'state/helpers/validateHelper';
import { IUser, userSliceSelector } from 'state/user/userState';
import { DataIngestionSummaryViewDataReqPayloadI } from 'types/requests/dataIngestionSummaryViewRequest';
import { GetDataIngestionSummaryI } from 'types/responses/dataIngestionSummaryResponses';
import { DATA_INGESTION_SUMMARY_TABLE_PAGE_SIZE } from 'utils/constants';
import {
    getDataIngestionSummaryViewDataSuccess,
    getDataIngestionSummaryViewDataFailure,
    IDataIngestionSummaryView,
    summaryViewSliceSelector
} from './dataIngestionSummaryViewState';

function* getDataIngestionSummaryViewDataRequestSaga() {
    try {
        const userState: IUser = yield select(userSliceSelector);
        const dataIngestionSummaryViewState: IDataIngestionSummaryView = yield select(
            summaryViewSliceSelector
        );
        const { pageNumber, searchKey } = dataIngestionSummaryViewState.dataIngestionSummaryViewLocalScope

        const requestBody: DataIngestionSummaryViewDataReqPayloadI = {
            page: pageNumber,
            limit: DATA_INGESTION_SUMMARY_TABLE_PAGE_SIZE,
            search: searchKey
        }
        
        if (userState && userState.keyCloakInfo) {
            const response: ApiResponse<GetDataIngestionSummaryI> = yield call(() =>
                dataIngestionSummaryViewApi.getDataIngestionSummaryViewDataListRequest(requestBody)
            );

            if (!responseValidator(response, true)) {
                return;
            }

            if (response) {
                yield put(getDataIngestionSummaryViewDataSuccess(response.data));
            } else {
                yield put(getDataIngestionSummaryViewDataFailure());
            }
        }
    } catch (error) {
        console.error('error in request ', error);
    }
}

function* dataIngestionSummaryViewSaga() {
    yield takeLatest('dataIngestionSummaryView/getDataIngestionSummaryViewDataRequest', getDataIngestionSummaryViewDataRequestSaga);
}

export default dataIngestionSummaryViewSaga;
