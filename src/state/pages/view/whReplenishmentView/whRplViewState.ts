import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRootState } from 'state/rootState';
import {
  GetUploadHistoryResponseI,
  ReplenishmentPlanDetailsStateI,
  ReplenishmentSkuListItem,
  ReplenishmentSkuListResI,
  TableHeader
} from 'types/responses/viewResponses';
import { getTableColumnWidth } from '../demandForecastView/stateHelpers/stH_DfView';
import {
  RPLWHViewLoadingI,
  ReplenishmentWHSkuListItem,
  ReplenishmentWHSkuListResI,
  rplWHViewLocalScopeI
} from 'types/view/whReplenishmentView';
import { ReplenishmentWHPlanDetailsStateI } from 'types/responses/whViewRplResponses';
import { format } from 'date-fns';
import { validateWhReplenishmentEditData } from 'state/pages/monitoringAndResolution/Alert/stateHelpers/stH_alert';
import { AlertReplenishmentActionTypeEnum } from 'utils/enum';
import { UpdateCellDataI } from 'state/pages/monitoringAndResolution/Alert/alertState';
import { AlertTypeI } from 'types/alertConfig';
import { ReplenishmentI } from 'types/requests/alertConfigRequest';

export interface IRPLWhView {
  loading: RPLWHViewLoadingI;
  rplWhSkuDataList: ReplenishmentWHSkuListResI | null;
  rplWhSkuExpandedDataList: ReplenishmentWHSkuListResI | null;
  rplWhSelectedSkuList: ReplenishmentWHSkuListItem[];
  rplWhSelectedSku: ReplenishmentWHSkuListItem | null;
  rplWhViewLocalScope: rplWHViewLocalScopeI;
  rplWhPlanDetails: ReplenishmentWHPlanDetailsStateI | null;
  rplWhFileUploadError: string;
  rplWhLastUpdatedDateTime: string;
  rplWhUploadedHistory: GetUploadHistoryResponseI | null;
  rplWhPlanTotalCount: { key: string; value: string }[] | null;
  isLoadWhData: boolean;
  isReplEditable: boolean;
  isReplValidated: boolean;
  AlertType: AlertTypeI;
}

export const RPLWhViewSlice = createSlice({
  name: 'rplWhView',
  initialState: {
    loading: {
      data: false,
      download: false,
      planDetails: false,
      planDetailTotalCount: false,
      rplWhBulkEditDownload: false,
      rplWhHistoryTableLoading: false,
      editDetail: false
    },
    rplWhSkuDataList: null,
    rplWhSkuExpandedDataList: null,
    rplWhSelectedSkuList: [],
    rplWhSelectedSku: null,
    rplWhViewLocalScope: {
      globalRplWhSkuSelected: false,
      rplWhSkuSearchKey: '',
      rplWhUploadPercentage: null,
      rplWhUploadHistorySearchKey: '',
      startDate: null,
      endDate: null
    },
    rplWhPlanDetails: null,
    rplWhFileUploadError: '',
    rplWhLastUpdatedDateTime: new Date().toISOString(),
    rplWhUploadedHistory: null,
    rplWhPlanTotalCount: null,
    isLoadWhData: true,
    isReplEditable: false,
    isReplValidated: false,
    AlertType: {
      alertType: null,
      alertTypeDisplayName: null,
      anchorProdKey: null,
      groupKey: null
    }
  } as IRPLWhView,
  reducers: {
    setIsLoadWhData: (state, action: PayloadAction<boolean>) => {
      state.isLoadWhData = action.payload;
    },
    getReplenishmentWHSkuDataRequest: (state, action: PayloadAction<{ searchKey?: string }>) => {
      state.loading.data = true;
      state.rplWhViewLocalScope.globalRplWhSkuSelected = false;
    },
    getReplenishmentWHSkuDataSuccess: (state, action: PayloadAction<ReplenishmentSkuListResI>) => {
      state.loading.data = false;
      state.rplWhSkuDataList = {
        ...action.payload,
        headers: Object.entries(action.payload.headers).map((header, index) => {
          return {
            displayValue: header[1],
            key: header[0],
            w: getTableColumnWidth(index)
          };
        }),
        list: action.payload.list.map((item) => ({
          ...item,
          isSelected: false
        }))
      };
    },
    getReplenishmentWHSkuDataFailure: (state) => {
      state.loading.data = false;
    },
    getReplenishmentWHExpandedSkuDataRequest: (
      state,
      action: PayloadAction<{ searchKey?: string }>
    ) => {
      state.loading.data = true;
    },
    getReplenishmentWHExpandedSkuDataSuccess: (
      state,
      action: PayloadAction<ReplenishmentSkuListResI>
    ) => {
      state.loading.data = false;
      state.rplWhSkuExpandedDataList = {
        ...action.payload,
        headers: Object.entries(action.payload.headers)?.map((header, index) => {
          return {
            displayValue: header[1],
            key: header[0],
            w: getTableColumnWidth(index)
          };
        }),
        list: action.payload.list.map((item) => ({
          ...item,
          isSelected: false
        }))
      };
    },
    getReplenishmentWHExpandedSkuDataFailure: (state) => {
      state.loading.data = false;
    },
    updateRplWHSkuListSelectedStatus: (
      state,
      action: PayloadAction<{ id: number; type?: string }>
    ) => {
      const { id, type } = action.payload;
      if (type === 'all') {
        if (state.rplWhSkuDataList) {
          state.rplWhViewLocalScope.globalRplWhSkuSelected =
            !state.rplWhViewLocalScope.globalRplWhSkuSelected;
          state.rplWhSkuDataList.list.forEach((item) => {
            item.isSelected = state.rplWhViewLocalScope.globalRplWhSkuSelected ? true : false;
          });
          state.rplWhSelectedSkuList = state.rplWhSkuDataList.list.filter((x) => x.isSelected);
        }
      } else {
        if (state.rplWhSkuDataList) {
          state.rplWhSkuDataList.list = state.rplWhSkuDataList.list.map((item) =>
            item.anchorProdKey === id ? { ...item, isSelected: !item.isSelected } : item
          );
        }
      }
    },
    addOrRemoveFromSelectedRplWHSkuList: (
      state,
      action: PayloadAction<{
        data?: ReplenishmentSkuListItem;
        selectedType: 'all' | '';
        isSelectedAll?: boolean;
      }>
    ) => {
      const { data, selectedType } = action.payload;
      if (selectedType !== 'all' && data) {
        const existingIndex = state.rplWhSelectedSkuList?.findIndex(
          (item) => item.anchorProdKey === data.anchorProdKey
        );

        if (existingIndex !== -1) {
          state.rplWhSelectedSkuList?.splice(existingIndex!, 1);
        } else {
          state.rplWhSelectedSkuList?.push(data);
        }
        state.rplWhViewLocalScope.globalRplWhSkuSelected =
          state.rplWhSelectedSkuList?.length == state.rplWhSkuDataList?.list.length;
      } else {
        if (state.rplWhViewLocalScope.globalRplWhSkuSelected) {
          const listData = state.rplWhSkuDataList?.list;
          state.rplWhSelectedSkuList = listData!;
        } else {
          state.rplWhSelectedSkuList = [];
        }
      }
    },
    downloadRplWHReportRequest: (
      state,
      action: PayloadAction<{
        fileName: string;
      }>
    ) => {
      state.loading.download = true;
    },
    downloadRplWHReportSuccess: (state) => {
      state.loading.download = false;
    },
    downloadRplWHReportFailure: (state) => {
      state.loading.download = false;
    },
    setSelectedRplWHSkuAction: (state, action: PayloadAction<ReplenishmentWHSkuListItem>) => {
      state.rplWhSelectedSku = action.payload;
    },
    getRplWHPlanDetailsRequest: (state) => {
      state.loading.planDetails = true;
    },
    getRplWHPlanDetailsSuccess: (
      state,
      action: PayloadAction<ReplenishmentPlanDetailsStateI | null>
    ) => {
      state.loading.planDetails = false;
      state.rplWhPlanDetails = action.payload;
    },
    getRplWHPlanDetailsFailure: (state) => {
      state.loading.planDetails = false;
    },
    resetViewWhRplPlanRightPanel: (state) => {
      state.rplWhSelectedSku = null;
      state.rplWhSelectedSkuList = [];
    },
    whRplSkuSearchAction: (state, action: PayloadAction<string>) => {
      state.rplWhSkuExpandedDataList = null;
      state.rplWhViewLocalScope.rplWhSkuSearchKey = action.payload;
    },
    rplWHBulkEditFileUploadRequest: (
      state,
      action: PayloadAction<{
        file: File;
        uploadPercentageCallback: (percentage: number) => void;
      }>
    ) => {
      state.rplWhFileUploadError = '';
    },
    rplWHBulkEditFileUploadSuccess: (state) => {},
    rplWHBulkEditFileUploadFailure: (state) => {},
    rplWHUpdateUploadProgress: (state, action: PayloadAction<number>) => {
      state.rplWhViewLocalScope.rplWhUploadPercentage = action.payload;
    },
    rplWHDownloadBulkEditForecastRequest: (
      state,
      action: PayloadAction<{
        fileName: string;
        groupKey: string;
        searchKey?: string;
      }>
    ) => {
      state.loading.rplWhBulkEditDownload = true;
    },
    rplWHDownloadBulkEditForecastSuccess: (state) => {
      state.loading.rplWhBulkEditDownload = false;
    },
    rplWHDownloadBulkEditForecastFailure: (state) => {
      state.loading.rplWhBulkEditDownload = false;
    },
    rplWHUpdateBulkUploadError: (state, action: PayloadAction<string>) => {
      state.rplWhFileUploadError = action.payload;
    },
    rplWHGetUploadHistoryDataRequest: (
      state,
      action: PayloadAction<{
        searchKey?: string;
        pageNumber?: number;
      }>
    ) => {
      state.loading.rplWhHistoryTableLoading = true;
      state.rplWhLastUpdatedDateTime = format(new Date(), 'yyyy-MM-dd hh:mm a');
    },
    rplWHGetUploadHistoryDataSuccess: (state, action: PayloadAction<GetUploadHistoryResponseI>) => {
      state.loading.rplWhHistoryTableLoading = false;
      state.rplWhUploadedHistory = action.payload;
    },
    rplWHGetUploadHistoryDataFailure: (state) => {
      state.loading.rplWhHistoryTableLoading = false;
    },
    rplWHDownloadBulkForecastEditResultRequest: (
      state,
      action: PayloadAction<{
        fileName: string;
        uploadId: string;
      }>
    ) => {
      state.loading.download = true;
    },
    rplWHDownloadBulkForecastEditResultSuccess: (state) => {
      state.loading.download = false;
    },
    rplWHDownloadBulkForecastEditResultFailure: (state) => {
      state.loading.download = false;
    },
    rplWHSetUploadHistorySearchKey: (state, action: PayloadAction<string>) => {
      state.rplWhViewLocalScope.rplWhUploadHistorySearchKey = action.payload;
    },
    getReplenishmentTotalCount: (state) => {
      state.loading.planDetailTotalCount = true;
    },
    getReplenishmentTotalCountSuccess: (
      state,
      action: PayloadAction<{ key: string; value: string }[]>
    ) => {
      const headers =
        (state.rplWhSkuExpandedDataList?.headers as TableHeader[]).map((h) => h.key) || [];
      state.rplWhPlanTotalCount = action.payload.filter((obj) => headers.includes(obj.key));
    },
    getReplenishmentTotalCountFailure: (state) => {},
    setDateRange: (
      state,
      action: PayloadAction<{ startDate: string | null; endDate: string | null }>
    ) => {
      state.rplWhViewLocalScope.startDate = action.payload.startDate;
      state.rplWhViewLocalScope.endDate = action.payload.endDate;
    },
    whRplResetSkuListData: (state) => {
      state.rplWhSkuDataList = null;
    },
    whRplResetUploadHistoryData: (state) => {
      state.rplWhUploadedHistory = null;
    },
    whRplResetSkuExpandedListData: (state) => {
      state.rplWhSkuExpandedDataList = null;
    },
    setReplEditable: (state, action: PayloadAction<boolean>) => {
      state.isReplEditable = action.payload;
    },
    addNewReplCellData: (state) => {
      const orderList = state?.rplWhPlanDetails?.orderQtyDetails?.list;
      if (orderList) {
        let id: number = 0;
        if (orderList.length > 0) {
          const lastRow = orderList[orderList.length - 1];
          id = lastRow.id + 1;
        }
        orderList.push({
          id,
          row: ['', 0, '', 0, ''],
          isSelected: false,
          fresh: true,
          action: AlertReplenishmentActionTypeEnum.CREATE
        });
        state.isReplValidated = false;
      }
    },
    deleteReplCellData: (state, action: PayloadAction<string>) => {
      const id: number = parseInt(action.payload);
      if (state?.rplWhPlanDetails?.orderQtyDetails?.list) {
        state.rplWhPlanDetails.orderQtyDetails.list =
          state.rplWhPlanDetails.orderQtyDetails.list.map((row) => {
            if (row.id === id) {
              row.action = AlertReplenishmentActionTypeEnum.DELETE;
            }
            return row;
          });
        state.isReplValidated = validateWhReplenishmentEditData(state);
      }
    },
    updateReplCellData: (state, action: PayloadAction<UpdateCellDataI>) => {
      const { id, index, value } = action.payload;
      const orderList = state.rplWhPlanDetails?.orderQtyDetails?.list;
      if (orderList?.length) {
        const selectedRow = orderList[id as number].row;
        let calculatedValue = value;
        const supplyPackSize = state.rplWhPlanDetails?.orderPlan.unitOrderQty;
        if (index === 1) {
          calculatedValue = +value;
          selectedRow[index + 2] =
            calculatedValue * (state.rplWhPlanDetails?.orderPlan.unitPrice || 0);
          selectedRow[index + 1] =
            supplyPackSize !== undefined && value !== ''
              ? Math.round(calculatedValue / supplyPackSize)
              : '';
        }
        selectedRow[index] = calculatedValue;
        if (!orderList[id as number].fresh)
          orderList[id as number].action = AlertReplenishmentActionTypeEnum.EDIT;
        state.isReplValidated = validateWhReplenishmentEditData(state);
      }
    },
    rplWHEditRequest: (state, action: PayloadAction<ReplenishmentI>) => {
      state.loading.editDetail = true;
    },
    rplWHEditSuccess: (state) => {
      state.loading.editDetail = false;
    },
    rplWHEditFailure: (state) => {
      state.loading.editDetail = false;
    },
    rplWHAlertTypeRequest: (state) => {
      state.loading.planDetails = true;
    },
    rplWHAlertTypeSuccess: (state, action: PayloadAction<AlertTypeI>) => {
      state.loading.planDetails = false;
      state.AlertType = action.payload;
    },
    rplWHAlertTypeFailure: (state) => {
      state.loading.planDetails = false;
    },
    setRplValidation: (state, action: PayloadAction<boolean>) => {
      state.isReplValidated = action.payload;
    }
  }
});

export const rplWHViewSliceSelector = (state: IRootState) => state.rplWhView;

export const {
  setIsLoadWhData,
  getReplenishmentWHSkuDataRequest,
  getReplenishmentWHSkuDataSuccess,
  getReplenishmentWHSkuDataFailure,
  getReplenishmentWHExpandedSkuDataRequest,
  getReplenishmentWHExpandedSkuDataSuccess,
  getReplenishmentWHExpandedSkuDataFailure,
  updateRplWHSkuListSelectedStatus,
  addOrRemoveFromSelectedRplWHSkuList,
  downloadRplWHReportRequest,
  downloadRplWHReportSuccess,
  downloadRplWHReportFailure,
  setSelectedRplWHSkuAction,
  getRplWHPlanDetailsRequest,
  getRplWHPlanDetailsSuccess,
  getRplWHPlanDetailsFailure,
  resetViewWhRplPlanRightPanel,
  whRplSkuSearchAction,
  rplWHBulkEditFileUploadRequest,
  rplWHBulkEditFileUploadSuccess,
  rplWHBulkEditFileUploadFailure,
  rplWHUpdateUploadProgress,
  rplWHDownloadBulkEditForecastRequest,
  rplWHDownloadBulkEditForecastSuccess,
  rplWHDownloadBulkEditForecastFailure,
  rplWHUpdateBulkUploadError,
  rplWHGetUploadHistoryDataRequest,
  rplWHGetUploadHistoryDataSuccess,
  rplWHGetUploadHistoryDataFailure,
  rplWHDownloadBulkForecastEditResultRequest,
  rplWHDownloadBulkForecastEditResultSuccess,
  rplWHDownloadBulkForecastEditResultFailure,
  rplWHSetUploadHistorySearchKey,
  getReplenishmentTotalCount,
  getReplenishmentTotalCountSuccess,
  getReplenishmentTotalCountFailure,
  setDateRange,
  whRplResetSkuListData,
  whRplResetUploadHistoryData,
  whRplResetSkuExpandedListData,
  setReplEditable,
  addNewReplCellData,
  deleteReplCellData,
  updateReplCellData,
  rplWHEditRequest,
  rplWHEditSuccess,
  rplWHEditFailure,
  rplWHAlertTypeRequest,
  rplWHAlertTypeSuccess,
  rplWHAlertTypeFailure,
  setRplValidation
} = RPLWhViewSlice.actions;

export default RPLWhViewSlice.reducer;
