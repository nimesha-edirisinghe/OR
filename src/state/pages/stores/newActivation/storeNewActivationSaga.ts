import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  getFilterDataFailure,
  getFilterDataSuccess,
  getStoreNewActivationRequestSuccess
} from './storeNewActivationState';
import {
  FilterDataReqPayloadI,
  FilterDataReqQueryParamI,
  GroupFilterI
} from 'types/requests/groupConfigRequests';
import { IUser, userSliceSelector } from 'state/user/userState';
import { GeneralResponse } from 'state/rootSaga';
import { groupConfigApi } from 'api';
import { ApiResponse } from 'types/api';
import { FilterDataApiResponseI } from 'types/groupConfig';

interface FilterDataActionI {
  payload: {
    code: number;
    type: string;
    filters?: GroupFilterI[];
    search?: string;
    pageNumber: number;
    pageSize: number;
  };
  type: string;
}

interface DataRequestI {
  payload: {
    pageNumber: number;
    pageSize: number;
    filters: GroupFilterI[];
    searchKey?: string;
  };
  type: string;
}

function* getStoreNewActivationRequest(action: DataRequestI) {
  let list: any[] = [];

  list.push({
    anchorProdKey: 4001,
    groupCode: '65 - Houston',
    store: '83 - River Oaks Hypermarket',
    storeCode: 1,
    city: 'Houston',
    skuCount: 2793,
    wrench: 'A'
  });

  list.push({
    anchorProdKey: 4003,
    groupCode: '48 - Texas',
    store: '29 - Clear Lake Hypermarket',
    storeCode: 2,
    city: 'Texas',
    skuCount: 1687,
    wrench: 'A'
  });

  list.push({
    anchorProdKey: 4004,
    groupCode: '65 - Houston',
    store: '22 - Montrose Whole Sale Store',
    storeCode: 3,
    city: 'Houston',
    skuCount: 1808,
    wrench: 'A'
  });

  list.push({
    anchorProdKey: 4005,
    groupCode: '57 - Woodlands',
    store: '194 - The Woodlands Whole Sale Store',
    storeCode: 4,
    city: 'The Woodlands',
    skuCount: 2793,
    wrench: 'A'
  });

  let pageNumber = action.payload.pageNumber || 1;
  let pageSize = action.payload.pageSize || 1;
  if ((action.payload.searchKey || '') != '') {
    list = list.filter((x) => (x.groupCode || '').toLowerCase().includes((action.payload.searchKey || '').toLowerCase()));
  }
  let data = list.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);

  yield put(
    getStoreNewActivationRequestSuccess({ list: data, headers: [], totalCount: list.length })
  );
}

function* getFilterDataRequest(action: FilterDataActionI) {
  try {
    let userState: IUser = yield select(userSliceSelector);
    const filterType = action.payload.type;
    const filterCode = action.payload.code;
    const searchKey = action.payload.search;
    const orgKey = userState.selectedOrg.orgKey;
    // const whFlag = action.payload.whFlag!;

    const filters = action.payload.filters || [];

    const obj: FilterDataReqPayloadI = {
      type: filterType,
      code: filterCode,
      filters: filters,
      orgKey,
      pageNumber: 1,
      pageSize: 100,
      whFlag: 0
    };

    const queryParams: FilterDataReqQueryParamI = {};

    if (userState && userState.keyCloakInfo && orgKey) {
      const response: GeneralResponse = yield call(() =>
        groupConfigApi.getFilterDataRequest(obj, queryParams)
      );
      if (response && response.data) {
        const formattedResponse: ApiResponse<FilterDataApiResponseI> = yield response;
        yield put(getFilterDataSuccess(formattedResponse.data));
      } else {
        yield put(getFilterDataFailure());
      }
    } else {
      yield put(getFilterDataFailure());
    }
  } catch (error) {
    console.error('Filter Data Fetch Error', error);
  }
}

function* newStoreActivationSaga() {
  yield takeLatest('storeNewActivation/getStoreNewActivationRequest', getStoreNewActivationRequest);
  yield takeLatest('storeNewActivation/getFilterDataRequest', getFilterDataRequest);
}

export default newStoreActivationSaga;
