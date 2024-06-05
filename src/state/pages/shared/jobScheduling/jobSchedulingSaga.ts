import { call, put, select, takeEvery } from 'redux-saga/effects';
import { GeneralResponse } from 'state/rootSaga';
import { jobScheduleApi } from 'api';
import {
  IJobSchedule,
  createScheduleFailure,
  createScheduleSuccess,
  getJobSchedulesFailure,
  getJobSchedulesSuccess,
  jobScheduleSliceSelector,
  removeScheduleJobFailure,
  removeScheduleJobSuccess
} from './jobSchedulingState';
import { ApiResponse } from 'types/api';
import {
  JobScheduleConfigurationI,
  JobScheduleResponseI
} from 'types/responses/jobScheduleResponses';
import {
  GetJobSchedulesQueryParamI,
  JobScheduleActionsQueryParamI,
  JobScheduleRequestI
} from 'types/requests/jobScheduleRequest';
import { createJobSchedulingRequestFormatter } from './sagaHelpers/sgH_jobScheduling';
import { IUser, userSliceSelector } from 'state/user/userState';
import {
  IPage,
  fcConfigPageSliceSelector,
  getTableDataRequest
} from 'state/pages/advancedConfiguration/forecastConfigurationPage/pageState';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  IReplenishmentConfigPage,
  getReplenishmentConfigDataRequest,
  rplConfigPageSliceSelector
} from 'state/pages/advancedConfiguration/replenishmentConfigurationPage/rplConfigPageState';
import { responseValidator } from 'state/helpers/validateHelper';
import { showSuccessToast } from 'state/toast/toastState';

function* getJobSchedulesRequest(action: PayloadAction<'fc' | 'repl'>) {
  try {
    const pageState: IPage = yield select(fcConfigPageSliceSelector);
    const jobScheduleState: IJobSchedule = yield select(jobScheduleSliceSelector);
    const userState: IUser = yield select(userSliceSelector);
    const rplPlanningPageState: IReplenishmentConfigPage = yield select(rplConfigPageSliceSelector);

    const orgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
    const selectedJobScheduleType = jobScheduleState.jobScheduleLocalScope.selectedJobScheduleType;
    const module = action.payload;

    let selectedGroupKey = null;
    if (module === 'fc') {
      selectedGroupKey =
        pageState.trainingConfigLocalScope.selectedFcConfigObj?.groupDetails.groupKey;
    } else {
      selectedGroupKey =
        rplPlanningPageState.rplPlanningConfigLocalScope.selectedPlaningObj.groupKey;
    }

    const queryParams: GetJobSchedulesQueryParamI = {
      orgKey: orgKey,
      groupKey: selectedGroupKey,
      type: selectedJobScheduleType
    };

    const response: GeneralResponse = yield call(() =>
      jobScheduleApi.getJobSchedulesRequest(queryParams)
    );

    if (response) {
      const formattedForecastConfig: ApiResponse<JobScheduleConfigurationI> = yield response;
      yield put(getJobSchedulesSuccess(formattedForecastConfig));
    } else {
      yield put(getJobSchedulesFailure());
    }
  } catch (error) {
    console.error(error);
  }
}

function* createScheduleRequest(action: PayloadAction<'fc' | 'repl'>) {
  try {
    const jobScheduleState: IJobSchedule = yield select(jobScheduleSliceSelector);
    const rplPlanningPageState: IReplenishmentConfigPage = yield select(rplConfigPageSliceSelector);
    const pageState: IPage = yield select(fcConfigPageSliceSelector);
    const userState: IUser = yield select(userSliceSelector);

    const currentModule = action.payload;
    const selectedFcConfigObj = pageState.trainingConfigLocalScope.selectedFcConfigObj;
    const jobSchedulingConfig = jobScheduleState.jobSchedulingData;
    const orgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
    const selectedReplConfigRowObj =
      rplPlanningPageState.rplPlanningConfigLocalScope.selectedPlaningObj;
    const selectedJobScheduleType = jobScheduleState.jobScheduleLocalScope.selectedJobScheduleType;
    const scheduleBatchId = jobScheduleState.jobSchedulingData.scheduleBatchId;
    const currentEnableStatus = jobScheduleState.jobScheduleLocalScope.currentEnableStatus;

    const requestBody: JobScheduleRequestI = createJobSchedulingRequestFormatter(
      currentModule,
      jobSchedulingConfig,
      orgKey,
      selectedJobScheduleType,
      currentEnableStatus,
      selectedFcConfigObj,
      selectedReplConfigRowObj
    );
    let response: GeneralResponse;
    if (scheduleBatchId === null) {
      response = yield call(() => jobScheduleApi.createScheduleRequest(requestBody));
    } else {
      response = yield call(() => jobScheduleApi.updateScheduleRequest(requestBody));
    }

    if (response) {
      const formattedForecastConfig: ApiResponse<JobScheduleResponseI> = yield response;
      if (!responseValidator(formattedForecastConfig, true)) {
        return;
      }
      yield put(createScheduleSuccess(formattedForecastConfig));
      if (selectedJobScheduleType === 'replenishmentPlan') {
        yield put(getReplenishmentConfigDataRequest({ pageNo: 1 }));
      } else {
        yield put(
          getTableDataRequest({
            pageNo: 1
          })
        );
      }
      showSuccessToast(formattedForecastConfig.message);
    } else {
      yield put(createScheduleFailure());
    }
  } catch (error) {
    console.error(error);
  }
}

function* removeScheduleJobRequest() {
  try {
    const userState: IUser = yield select(userSliceSelector);
    const jobScheduleState: IJobSchedule = yield select(jobScheduleSliceSelector);

    const selectedJobScheduleData = jobScheduleState.jobSchedulingData;
    const selectedJobScheduleType = jobScheduleState.jobScheduleLocalScope.selectedJobScheduleType;
    const orgKey = userState.selectedOrg && userState.selectedOrg.orgKey;

    const queryParams: JobScheduleActionsQueryParamI = {
      orgKey: orgKey,
      scheduleId: selectedJobScheduleData.scheduleBatchId,
      scheduleType: 'DAILY'
    };

    const response: ApiResponse<any> = yield call(() =>
      jobScheduleApi.removeScheduleJobRequest(queryParams)
    );

    if (!responseValidator(response, true)) {
      return;
    }

    if (response) {
      yield put(removeScheduleJobSuccess());
      if (selectedJobScheduleType === 'replenishmentPlan') {
        yield put(getReplenishmentConfigDataRequest({ pageNo: 1 }));
      } else {
        yield put(
          getTableDataRequest({
            pageNo: 1
          })
        );
      }
      showSuccessToast(response.message);
    } else {
      yield put(removeScheduleJobFailure());
    }
  } catch (error) {
    console.error(error);
  }
}

function* pageSaga() {
  yield takeEvery('jobSchedule/createScheduleRequest', createScheduleRequest);
  yield takeEvery('jobSchedule/getJobSchedulesRequest', getJobSchedulesRequest);
  yield takeEvery('jobSchedule/removeScheduleJobRequest', removeScheduleJobRequest);
}

export default pageSaga;
