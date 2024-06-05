import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRootState } from 'state/rootState';
import {
  AlertTypesI,
  AlertLoadingI,
  AlertTypesT,
  alertForecastChartType,
  AlertPredictorI,
  AlertForecastChartResponseDataI,
  AlertForecastChartTable,
  AlertTypeI
} from 'types/alertConfig';
import { AlertReplenishmentI, CreateAlertPayloadI } from 'types/requests/alertConfigRequest';
import {
  AlertDetailsI,
  AlertListI,
  GetAlertList,
  GetAlertSummaryI,
  GetAlertsData
} from 'types/responses/alertConfigResponse';
import { defaultAlertTypeList } from './stateHelpers/stH_alert';
import { TrainingSummaryDataResponseI } from 'types/responses/trainingSummaryResponse';
import { InfluencingFactorTypes } from 'types/groupConfig';
import { getSelectedChartName } from 'state/pages/view/demandForecastView/stateHelpers/stH_DfView';
import { DateRange } from 'types/view';
import { AlertGraphRequestBodyI } from 'types/requests/viewRequests';
import { ReplenishmentPlanDetailsStateI } from 'types/responses/viewResponses';
import { AlertReplenishmentActionTypeEnum } from 'utils/enum';

export interface IAlert {
  loading: AlertLoadingI;
  alertSummaryList: GetAlertSummaryI;
  alertDataList: GetAlertsData;
  defaultAlertTypes: AlertTypesI[];
  alertName: string;
  alertDefinition: Partial<CreateAlertPayloadI> | null;
  alertLocalScope: {
    selectedViewAlertObj: AlertListI | null;
    selectedAlertTypeObj: AlertDetailsI;
    selectedEditAlertType: number;
    enableEditAlertScroll: boolean;
    isInitialAlertSummaryRequest: boolean;
    skuSearchKey: string;
    pageNumber: number;
    globalSkuSelected: boolean;
  };
  selectedSkuList: GetAlertList[] | [];
  selectedSku: GetAlertList | null;
  selectedChartType: alertForecastChartType;
  predictorList: AlertPredictorI | null;
  graphData: AlertForecastChartResponseDataI[] | [];
  trainingSummaryData: TrainingSummaryDataResponseI | null;
  dfTable: AlertForecastChartTable | null;
  aggregateOption: {
    selectedAggregateOption: alertForecastChartType;
    compareSelection: string | null;
    predictorType: InfluencingFactorTypes | null;
  };
  isGraphModalOpen: boolean;
  isGraphModalEditable: boolean;
  isTrainingModalOpen: boolean;
  graphPayloadData: AlertGraphRequestBodyI;
  graphDateRange: DateRange | null | undefined;
  isReplenishmentModalOpen: boolean;
  rplPlanDetails: ReplenishmentPlanDetailsStateI | null;
  AlertType: AlertTypeI;
  errors: {
    alertName: string | null;
    isFormDirty: boolean;
  };
  isReplenishmentEditable: boolean;
  isReplenishmentValidated: boolean;
  editReplenishmentPayload: AlertReplenishmentI | null;
}

interface UpdateCellDataI {
  id: number | string;
  index: number;
  value: string | number;
}

export const AlertSlice = createSlice({
  name: 'alert',
  initialState: {
    loading: {
      data: false,
      download: false,
      delete: false,
      graphDataLoading: false,
      skuDataLoading: false,
      planDetails: false
    },
    alertSummaryList: {
      totalCount: 0,
      list: null,
      lastUpdatedOn: null
    },
    alertName: '',
    alertDefinition: null,
    alertDataList: {
      headers: {},
      list: null,
      totalCount: 0
    },
    defaultAlertTypes: defaultAlertTypeList,
    alertLocalScope: {
      selectedViewAlertObj: null,
      selectedAlertTypeObj: {},
      selectedEditAlertType: 0,
      enableEditAlertScroll: true,
      isInitialAlertSummaryRequest: false,
      skuSearchKey: '',
      pageNumber: 1,
      globalSkuSelected: false
    },
    selectedSkuList: [],
    selectedSku: null,
    selectedChartType: 'sku',
    predictorList: null,
    graphData: [],
    trainingSummaryData: null,
    dfTable: null,
    aggregateOption: {
      selectedAggregateOption: 'sku',
      compareSelection: null,
      predictorType: null
    },
    graphDateRange: null,
    isGraphModalOpen: false,
    isGraphModalEditable: false,
    isTrainingModalOpen: false,
    isReplenishmentModalOpen: false,
    rplPlanDetails: null,
    AlertType: {
      alertType: null,
      alertTypeDisplayName: null,
      anchorProdKey: null,
      groupKey: null
    },
    errors: {
      alertName: null,
      isFormDirty: false
    },
    isReplenishmentEditable: false,
    isReplenishmentValidated: false,
    editReplenishmentPayload: null
  } as IAlert,
  reducers: {
    setAlertDefinitionSearchKey: (state, action: PayloadAction<string>) => {
      state.alertLocalScope.skuSearchKey = action.payload;
    },
    setAlertDefinitionPaginationPageNo: (state, action: PayloadAction<number>) => {
      state.alertLocalScope.pageNumber = action.payload;
    },
    getAlertConfigsRequest: (
      state,
      action: PayloadAction<{
        searchKey?: string;
        initRequest?: boolean;
      }>
    ) => {
      state.loading.data = true;
    },
    getAlertConfigsSuccess: (state, action) => {
      state.loading.data = false;
      state.alertSummaryList = action.payload.data;
      state.alertLocalScope.isInitialAlertSummaryRequest = action.payload.initRequest;
      const selectedAlertObj = state.alertLocalScope.selectedViewAlertObj;
      if (selectedAlertObj) {
        const foundAlertObj = action.payload.data.list?.find(
          (currentAlert: AlertListI) => currentAlert.alertName === selectedAlertObj.alertName
        );
        state.alertLocalScope.selectedViewAlertObj = foundAlertObj;
        const foundAlertDetails = foundAlertObj?.alertDetails?.find(
          (alertDetails: AlertDetailsI) =>
            alertDetails.alertType === state.alertLocalScope.selectedAlertTypeObj.alertType
        );
        if (foundAlertDetails) state.alertLocalScope.selectedAlertTypeObj = foundAlertDetails;
      }
    },
    getAlertConfigsFailure: (state) => {
      state.loading.data = false;
    },
    getAlertsRequest: (
      state,
      action: PayloadAction<{
        alertOnly: number;
        selectedAlertType?: AlertTypesT;
      }>
    ) => {
      state.loading.data = true;
    },
    getAlertsSuccess: (state, action: PayloadAction<GetAlertsData>) => {
      state.loading.data = false;
      const isGlobalSkuSelected = state.alertLocalScope.globalSkuSelected;
      state.alertDataList = {
        ...action.payload,
        list:
          action.payload.list?.map((item) => ({
            ...item,
            isSelected: isGlobalSkuSelected || false
          })) || []
      };
      if (isGlobalSkuSelected) {
        state.selectedSkuList = [...state.selectedSkuList, ...state.alertDataList.list!];
      }
    },
    getAlertsFailure: (state) => {
      state.loading.data = true;
    },
    updateAlertType: (state, action: PayloadAction<AlertTypesI[]>) => {
      state.defaultAlertTypes = action.payload;
      state.errors.isFormDirty = true;
    },
    updateAlertName: (state, action: PayloadAction<string>) => {
      state.errors.alertName = null;
      state.alertName = action.payload;
      state.errors.isFormDirty = true;
    },
    createAlertRequest: (state, action: PayloadAction<{ cb: () => void }>) => {},
    createAlertSuccess: (state) => {
      state.alertName = '';
      state.defaultAlertTypes = defaultAlertTypeList;
    },
    createAlertFailure: (state) => {},
    setSelectedViewAlert: (state, action: PayloadAction<AlertListI>) => {
      state.alertLocalScope.selectedViewAlertObj = action.payload;
    },
    setSelectedAlertTypeObject: (state, action: PayloadAction<AlertDetailsI>) => {
      state.alertLocalScope.selectedAlertTypeObj = action.payload;
    },
    downloadAlertRequest: (
      state,
      action: PayloadAction<{
        alertOnly: number;
        selectedAlertType?: string;
      }>
    ) => {
      state.loading.download = true;
    },
    downloadAlertSuccess: (state, action) => {
      state.loading.download = false;
    },
    downloadAlertFailure: (state) => {
      state.loading.download = false;
    },
    deleteAlertRequest: (state) => {
      state.loading.delete = true;
    },
    deleteAlertSuccess: (state) => {
      state.loading.delete = false;
    },
    deleteAlertFailure: (state) => {
      state.loading.delete = false;
    },
    getAlertDefinitionRequest: (state) => {},
    getAlertDefinitionRequestSuccess: (
      state,
      action: PayloadAction<Partial<CreateAlertPayloadI>>
    ) => {
      state.alertName = action.payload.alertName!;
      state.alertDefinition = action.payload;

      const _alertTypes = state.defaultAlertTypes.map((defaultAlertType) => {
        const obj = action.payload?.alertDetails?.find(
          (selectedAlert) => selectedAlert.type === defaultAlertType.type
        );
        return { ...defaultAlertType, ...obj };
      });

      state.defaultAlertTypes = _alertTypes;
      state.errors.isFormDirty = false;
    },
    getAlertTypeRequest: (state) => {},
    getAlertTypeSuccess: (state, action: PayloadAction<AlertTypeI>) => {
      state.AlertType = action.payload;
    },
    getAlertTypeFailure: (state) => {},
    getRplPlanDetailsRequest: (state) => {
      state.loading.planDetails = false;
    },
    getRplPlanDetailsSuccess: (
      state,
      action: PayloadAction<ReplenishmentPlanDetailsStateI | null>
    ) => {
      state.loading.planDetails = true;
      state.rplPlanDetails = action.payload;
    },
    getRplPlanDetailsFailure: (state) => {
      state.loading.planDetails = false;
    },
    toggleReplenishmentPanel: (state) => {
      state.isReplenishmentModalOpen = !state.isReplenishmentModalOpen;
    },
    getAlertDefinitionSelectedSkuData: (state) => {},
    updateAlertRequest: (state, action: PayloadAction<{ cb: () => void }>) => {},
    updateAlertSuccess: (state) => {
      state.alertName = '';
      state.defaultAlertTypes = defaultAlertTypeList;
    },
    setSelectedEditAlertType: (state, action: PayloadAction<number>) => {
      state.alertLocalScope.selectedEditAlertType = action.payload;
    },
    setEnableEditAlertScrolling: (state, action: PayloadAction<boolean>) => {
      state.alertLocalScope.enableEditAlertScroll = action.payload;
    },
    clearAlertName: (state) => {
      state.alertName = '';
    },
    alertFormValidator: (state) => {
      if (state.alertName === '' || state.alertName === null) {
        state.errors.alertName = 'This field is required';
      }

      const enabledAlerts = state.defaultAlertTypes.filter((alert) => alert.enable);

      enabledAlerts.map((alert) => {
        if (alert.isPrimaryAlert) {
          if (alert.compareValue === '' || alert.compareValue === undefined) {
            alert.error = 'This Field is required';
          }
        } else {
          if (alert.threshold === '' || alert.compareValue === '') {
            alert.error = 'This Field is required';
          }
        }
      });
    },
    toggleGraphPanel: (state) => {
      state.isGraphModalOpen = !state.isGraphModalOpen;
    },
    setGraphPanelEditable: (state, action: PayloadAction<boolean>) => {
      state.isGraphModalEditable = action.payload;
    },
    editAlertDataRequest: (state, action: PayloadAction<AlertGraphRequestBodyI>) => {
      state.loading.data = true;
      state.graphPayloadData = action.payload;
    },
    editAlertDataRequestSuccess: (state) => {
      state.loading.data = false;
    },
    editAlertDataRequestFailure: (state) => {
      state.loading.data = false;
    },
    updateGraphPayloadData: (state, action: PayloadAction<AlertGraphRequestBodyI>) => {
      state.graphPayloadData = action.payload;
    },
    toggleTrainingPanel: (state) => {
      state.isTrainingModalOpen = !state.isTrainingModalOpen;
    },
    setSelectedSkuAction: (state, action: PayloadAction<number>) => {
      const currentIndex = action.payload;
      state.selectedSku = state.alertDataList.list
        ? state.alertDataList.list.find((item) => item.anchorProdKey === currentIndex)!
        : null;
    },
    setReplenishmentEditable: (state, action: PayloadAction<boolean>) => {
      state.isReplenishmentEditable = action.payload;
    },
    AlertForecastChartRequest: (
      state,
      action: PayloadAction<{ chartType: alertForecastChartType }>
    ) => {
      state.loading.graphDataLoading = false;
      state.selectedChartType = action.payload.chartType;
    },
    updateSkuListSelectedStatus: (state, action: PayloadAction<{ id: number; type?: string }>) => {
      const { id, type } = action.payload;
      if (type === 'all') {
        if (state.alertDataList?.list) {
          state.alertLocalScope.globalSkuSelected = !state.alertLocalScope.globalSkuSelected;
          state.alertDataList.list.forEach((item) => {
            item.isSelected = state.alertLocalScope.globalSkuSelected ? true : false;
          });
        }
      } else {
        if (state.alertDataList?.list) {
          state.alertDataList.list = state.alertDataList.list.map((item) =>
            item.anchorProdModelKey === id ? { ...item, isSelected: !item.isSelected } : item
          );
        }
      }
    },
    addOrRemoveFromSelectedSkuList: (
      state,
      action: PayloadAction<{
        data?: GetAlertList;
        selectedType: 'all' | '';
        isSelectedAll?: boolean;
      }>
    ) => {
      const { data, selectedType } = action.payload;
      if (selectedType !== 'all' && data) {
        const existingIndex = state.selectedSkuList?.findIndex(
          (item) => item.anchorProdModelKey === data.anchorProdModelKey
        );

        if (existingIndex !== -1) {
          state.selectedSkuList?.splice(existingIndex!, 1);
        } else {
          state.selectedSkuList = [...state.selectedSkuList, { ...data, isSelected: true }];
        }
        state.alertLocalScope.globalSkuSelected =
          state.selectedSkuList?.length === state.alertDataList.totalCount || false;
      } else {
        if (state.alertLocalScope.globalSkuSelected) {
          const listData = state.alertDataList?.list;
          state.selectedSkuList = listData!;
        } else {
          state.selectedSkuList = [];
        }
      }
    },
    getTrainingSummaryDataRequest: (state) => {},
    getTrainingSummaryDataFailure: (state) => {},
    getTrainingSummaryDataSuccess: (state, action: PayloadAction<TrainingSummaryDataResponseI>) => {
      state.trainingSummaryData = action.payload;
    },
    getPredictorsRequest: (state) => {},
    getPredictorsSuccess: (state, action: PayloadAction<AlertPredictorI>) => {
      state.predictorList = action.payload;
    },
    getPredictorsFailure: (state) => {},
    setAggregateOption: (
      state,
      action: PayloadAction<{
        type: string;
        item: string;
        predictorType?: InfluencingFactorTypes;
      }>
    ) => {
      const { type, item, predictorType } = action.payload;
      if (type === 'history') {
        state.aggregateOption.compareSelection = item;
        state.aggregateOption.selectedAggregateOption = 'history';
        state.aggregateOption.predictorType = null;
      } else if (type === 'influencingFactor') {
        state.aggregateOption.selectedAggregateOption = 'influencingFactor';
        state.aggregateOption.compareSelection = item;
        state.aggregateOption.predictorType = predictorType || null;
      } else {
        state.aggregateOption.selectedAggregateOption = item as alertForecastChartType;
        state.aggregateOption.compareSelection = null;
        state.aggregateOption.predictorType = null;
      }
    },
    AlertForecastChartRequestSuccess: (
      state,
      action: PayloadAction<AlertForecastChartResponseDataI[]>
    ) => {
      state.graphData = action.payload;
      const _selectedCName = getSelectedChartName(
        state.selectedChartType,
        state.aggregateOption,
        state.predictorList
      )!;

      let dfTable: AlertForecastChartTable = {
        headers: [{ displayValue: '', key: 'Label', w: 150 }],
        skuForecast: ['SKU Forecast'],
        compareForecast: [_selectedCName]
      };
      action.payload.forEach((graphData) => {
        dfTable.headers.push({ displayValue: graphData.date, key: graphData.date, w: 150 });

        const skuForecast = graphData.skuActual ? graphData.skuActual : graphData.skuProjected || 0;
        const compareForecast = graphData.compareActual
          ? graphData.compareActual
          : graphData.compareProjected || 0;
        dfTable.skuForecast.push(skuForecast!);
        dfTable.compareForecast.push(compareForecast!);
      });
      state.dfTable = dfTable;
      state.loading.graphDataLoading = true;
    },
    AlertForecastChartRequestFailure: (state) => {
      state.loading.graphDataLoading = true;
    },
    resetViewForecast: (state) => {
      state.selectedSku = null;
      state.graphData = [];
      state.graphDateRange = null;
      state.aggregateOption = {
        selectedAggregateOption: 'sku',
        compareSelection: null,
        predictorType: null
      };
    },
    resetSelectedSkuList: (state) => {
      state.selectedSkuList = [];
      state.alertLocalScope.globalSkuSelected = false;
    },
    updateGraphDateRange: (state, action: PayloadAction<DateRange>) => {
      state.graphDateRange = action.payload;
    },
    clearAlertErrorsMessages: (state, action: PayloadAction<string | null>) => {
      state.errors.alertName = null;
      state.errors.isFormDirty = false;
      state.defaultAlertTypes.map((alert) => {
        alert.error = null;
      });
    },
    expandSelectedAlertEdit: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.defaultAlertTypes[index].enable = true;
    },
    addNewCellData: (state) => {
      if (state?.rplPlanDetails?.orderQtyDetails?.list) {
        const rowLists = state.rplPlanDetails.orderQtyDetails.list;
        const lastRow = rowLists[rowLists.length - 1];
        state.rplPlanDetails.orderQtyDetails.list.push({
          id: lastRow.id + 1,
          row: ['', 0, 0, ''],
          isSelected: false,
          fresh: true,
          action: AlertReplenishmentActionTypeEnum.CREATE
        });
        state.isReplenishmentValidated = false;
      }
    },
    deleteCellData: (state, action: PayloadAction<string>) => {
      const id: number = +action.payload;
      if (state?.rplPlanDetails?.orderQtyDetails?.list) {
        state.rplPlanDetails.orderQtyDetails.list = state.rplPlanDetails.orderQtyDetails.list.map(
          (row) => {
            if (row.id === id) {
              row.action = AlertReplenishmentActionTypeEnum.DELETE;
            }
            return row;
          }
        );
      }
    },
    updateCellData: (state, action: PayloadAction<UpdateCellDataI>) => {
      const { id, index, value } = action.payload;
      const rowList = state.rplPlanDetails?.orderQtyDetails?.list;
      if (rowList?.length) {
        const selectedRow = rowList[+id].row;
        let calculatedValue = value;
        if (index === 1) {
          calculatedValue = +value;
          selectedRow[index + 1] =
            calculatedValue * (state.rplPlanDetails?.orderPlan.unitPrice || 0);
        }
        selectedRow[index] = calculatedValue;
        if (!rowList[+id].fresh) rowList[+id].action = AlertReplenishmentActionTypeEnum.EDIT;
      }

      let validationFlag: boolean = true;

      for (const element of rowList as any) {
        if (!validationFlag) break;
        const row = element.row;
        const firstDate: number = new Date(row[0]).getTime();
        const secondDate: number = new Date(row[3]).getTime();
        validationFlag = secondDate > firstDate && row[1] > 0;
      }
      state.isReplenishmentValidated = validationFlag;
    },
    alertReplenishmentRequest: (state, action: PayloadAction<AlertReplenishmentI>) => {
      state.loading.data = true;
      state.editReplenishmentPayload = action.payload;
    },
    alertReplenishmentSuccess: (state) => {
      state.loading.data = false;
    },
    alertReplenishmentFailure: (state) => {
      state.loading.data = false;
    }
  }
});

export const alertSliceSelector = (state: IRootState) => state.alert;

export const {
  setAlertDefinitionSearchKey,
  setAlertDefinitionPaginationPageNo,
  getAlertConfigsRequest,
  getAlertConfigsSuccess,
  getAlertConfigsFailure,
  getAlertsRequest,
  getAlertsSuccess,
  getAlertsFailure,
  updateAlertType,
  updateAlertName,
  createAlertRequest,
  createAlertSuccess,
  createAlertFailure,
  setSelectedViewAlert,
  setSelectedAlertTypeObject,
  downloadAlertRequest,
  downloadAlertSuccess,
  downloadAlertFailure,
  deleteAlertRequest,
  deleteAlertSuccess,
  deleteAlertFailure,
  getAlertDefinitionRequest,
  getAlertDefinitionRequestSuccess,
  updateAlertRequest,
  updateAlertSuccess,
  setSelectedEditAlertType,
  editAlertDataRequest,
  editAlertDataRequestSuccess,
  editAlertDataRequestFailure,
  setEnableEditAlertScrolling,
  clearAlertName,
  alertFormValidator,
  setSelectedSkuAction,
  AlertForecastChartRequest,
  updateSkuListSelectedStatus,
  addOrRemoveFromSelectedSkuList,
  getPredictorsRequest,
  getTrainingSummaryDataRequest,
  getTrainingSummaryDataFailure,
  getTrainingSummaryDataSuccess,
  updateGraphDateRange,
  setAggregateOption,
  getPredictorsSuccess,
  getPredictorsFailure,
  AlertForecastChartRequestSuccess,
  AlertForecastChartRequestFailure,
  resetViewForecast,
  resetSelectedSkuList,
  toggleTrainingPanel,
  toggleGraphPanel,
  toggleReplenishmentPanel,
  getRplPlanDetailsRequest,
  getRplPlanDetailsSuccess,
  getRplPlanDetailsFailure,
  getAlertTypeRequest,
  getAlertTypeSuccess,
  getAlertTypeFailure,
  setGraphPanelEditable,
  expandSelectedAlertEdit,
  clearAlertErrorsMessages,
  updateGraphPayloadData,
  setReplenishmentEditable,
  addNewCellData,
  updateCellData,
  deleteCellData,
  alertReplenishmentRequest,
  alertReplenishmentSuccess,
  alertReplenishmentFailure
} = AlertSlice.actions;

export default AlertSlice.reducer;
