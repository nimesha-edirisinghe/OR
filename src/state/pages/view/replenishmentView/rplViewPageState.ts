import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRootState } from 'state/rootState';
import {
  GetUploadHistoryResponseI,
  ReplenishmentPlanDetailsStateI,
  ReplenishmentSkuListItem,
  ReplenishmentSkuListResI,
  TableHeader
} from 'types/responses/viewResponses';
import { RPLViewLoadingI } from 'types/view';
import { getTableColumnWidth } from '../demandForecastView/stateHelpers/stH_DfView';
import { rplViewLocalScopeI } from 'types/view/replenishmentView';
import { format } from 'date-fns';
import { AlertReplenishmentActionTypeEnum } from 'utils/enum';
import { validateReplenishmentEditData } from 'state/pages/monitoringAndResolution/Alert/stateHelpers/stH_alert';
import { UpdateCellDataI } from 'state/pages/monitoringAndResolution/Alert/alertState';
import { ReplenishmentI } from 'types/requests/alertConfigRequest';
import { AlertTypeI } from 'types/alertConfig';

export interface IRPLView {
  loading: RPLViewLoadingI;
  rplSkuDataList: ReplenishmentSkuListResI | null;
  rplSkuExpandedDataList: ReplenishmentSkuListResI | null;
  rplSelectedSkuList: ReplenishmentSkuListItem[];
  rplSelectedSku: ReplenishmentSkuListItem | null;
  rplViewLocalScope: rplViewLocalScopeI;
  rplPlanDetails: ReplenishmentPlanDetailsStateI | null;
  rplPlanTotalCount: { key: string; value: string }[] | null;
  rplFileUploadError: string;
  rplLastUpdatedDateTime: string;
  rplUploadedHistory: GetUploadHistoryResponseI | null;
  isLoadData: boolean;
  isReplEditable: boolean;
  isReplValidated: boolean;
  rplPayload: ReplenishmentI | null;
  AlertType: AlertTypeI;
}

export const RPLViewSlice = createSlice({
  name: 'rplView',
  initialState: {
    loading: {
      data: false,
      download: false,
      planDetails: false,
      planDetailTotalCount: false,
      rplBulkEditDownload: false,
      rplHistoryTableLoading: false
    },
    rplSkuDataList: null,
    rplSkuExpandedDataList: null,
    rplSelectedSkuList: [],
    rplSelectedSku: null,
    rplViewLocalScope: {
      globalRplSkuSelected: false,
      rplSkuSearchKey: '',
      startDate: null,
      endDate: null,
      rplUploadPercentage: null,
      rplUploadHistorySearchKey: ''
    },
    rplPlanDetails: null,
    rplPlanTotalCount: null,
    rplFileUploadError: '',
    rplLastUpdatedDateTime: new Date().toISOString(),
    rplUploadedHistory: null,
    isLoadData: true,
    isReplEditable: false,
    isReplValidated: false,
    rplPayload: null,
    AlertType: {
      alertType: null,
      alertTypeDisplayName: null,
      anchorProdKey: null,
      groupKey: null
    }
  } as IRPLView,
  reducers: {
    setIsLoadData: (state, action: PayloadAction<boolean>) => {
      state.isLoadData = action.payload;
    },
    getReplenishmentSkuDataRequest: (state, action: PayloadAction<{ searchKey?: string }>) => {
      state.loading.data = true;
      state.rplViewLocalScope.globalRplSkuSelected = false;
    },
    getReplenishmentSkuDataSuccess: (state, action: PayloadAction<ReplenishmentSkuListResI>) => {
      state.loading.data = false;
      state.rplSkuDataList = {
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
    getReplenishmentSkuDataFailure: (state) => {
      state.loading.data = false;
    },
    getReplenishmentExpandedSkuDataRequest: (
      state,
      action: PayloadAction<{ searchKey?: string }>
    ) => {
      state.loading.data = true;
    },
    getReplenishmentExpandedSkuDataSuccess: (
      state,
      action: PayloadAction<ReplenishmentSkuListResI>
    ) => {
      state.loading.data = false;
      state.rplSkuExpandedDataList = {
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
    getReplenishmentExpandedSkuDataFailure: (state) => {
      state.loading.data = false;
    },
    updateRplSkuListSelectedStatus: (
      state,
      action: PayloadAction<{ id: number; type?: string }>
    ) => {
      const { id, type } = action.payload;
      if (type === 'all') {
        if (state.rplSkuDataList) {
          state.rplViewLocalScope.globalRplSkuSelected =
            !state.rplViewLocalScope.globalRplSkuSelected;
          state.rplSkuDataList.list.forEach((item) => {
            item.isSelected = state.rplViewLocalScope.globalRplSkuSelected ? true : false;
          });
        }
      } else {
        if (state.rplSkuDataList) {
          state.rplSkuDataList.list = state.rplSkuDataList.list.map((item) =>
            item.anchorProdKey === id ? { ...item, isSelected: !item.isSelected } : item
          );
        }
      }
    },
    addOrRemoveFromSelectedRplSkuList: (
      state,
      action: PayloadAction<{
        data?: ReplenishmentSkuListItem;
        selectedType: 'all' | '';
        isSelectedAll?: boolean;
      }>
    ) => {
      const { data, selectedType } = action.payload;
      if (selectedType !== 'all' && data) {
        const existingIndex = state.rplSelectedSkuList?.findIndex(
          (item) => item.anchorProdKey === data.anchorProdKey
        );

        if (existingIndex !== -1) {
          state.rplSelectedSkuList?.splice(existingIndex!, 1);
        } else {
          state.rplSelectedSkuList?.push(data);
        }
        state.rplViewLocalScope.globalRplSkuSelected =
          state.rplSelectedSkuList?.length == state.rplSkuDataList?.list.length;
      } else {
        if (state.rplViewLocalScope.globalRplSkuSelected) {
          const listData = state.rplSkuDataList?.list;
          state.rplSelectedSkuList = listData!;
        } else {
          state.rplSelectedSkuList = [];
        }
      }
    },
    downloadRplReportRequest: (
      state,
      action: PayloadAction<{
        fileName: string;
      }>
    ) => {
      state.loading.download = true;
    },
    downloadRplReportSuccess: (state) => {
      state.loading.download = false;
    },
    downloadRplReportFailure: (state) => {
      state.loading.download = false;
    },
    setSelectedRplSkuAction: (state, action: PayloadAction<ReplenishmentSkuListItem>) => {
      state.rplSelectedSku = action.payload;
    },
    getRplPlanDetailsRequest: (state) => {
      state.loading.planDetails = true;
    },
    getRplPlanDetailsSuccess: (
      state,
      action: PayloadAction<ReplenishmentPlanDetailsStateI | null>
    ) => {
      state.loading.planDetails = false;
      state.rplPlanDetails = action.payload;
    },
    getRplPlanDetailsFailure: (state) => {
      state.loading.planDetails = false;
    },
    getReplenishmentTotalCount: (state) => {
      state.loading.planDetailTotalCount = true;
    },
    getReplenishmentTotalCountSuccess: (
      state,
      action: PayloadAction<{ key: string; value: string }[]>
    ) => {
      state.loading.planDetailTotalCount = false;
      const headers =
        (state.rplSkuExpandedDataList?.headers as TableHeader[]).map((h) => h.key) || [];
      state.rplPlanTotalCount = action.payload.filter((obj) => headers.includes(obj.key));
    },
    getReplenishmentTotalCountFailure: (state) => {
      state.loading.planDetailTotalCount = false;
    },
    resetViewRplPlanRightPanel: (state) => {
      state.rplSelectedSku = null;
      state.rplSelectedSkuList = [];
    },
    rplSkuSearchAction: (state, action: PayloadAction<string>) => {
      state.rplSkuExpandedDataList = null;
      state.rplViewLocalScope.rplSkuSearchKey = action.payload;
    },
    rplBulkEditFileUploadRequest: (
      state,
      action: PayloadAction<{
        file: File;
        uploadPercentageCallback: (percentage: number) => void;
      }>
    ) => {
      state.rplFileUploadError = '';
    },
    rplBulkEditFileUploadSuccess: (state) => {},
    rplBulkEditFileUploadFailure: (state) => {},
    rplUpdateUploadProgress: (state, action: PayloadAction<number>) => {
      state.rplViewLocalScope.rplUploadPercentage = action.payload;
    },
    rplDownloadBulkEditForecastRequest: (
      state,
      action: PayloadAction<{
        fileName: string;
        groupKey: string;
        searchKey?: string;
      }>
    ) => {
      state.loading.rplBulkEditDownload = true;
    },
    rplDownloadBulkEditForecastSuccess: (state) => {
      state.loading.rplBulkEditDownload = false;
    },
    rplDownloadBulkEditForecastFailure: (state) => {
      state.loading.rplBulkEditDownload = false;
    },
    rplUpdateBulkUploadError: (state, action: PayloadAction<string>) => {
      state.rplFileUploadError = action.payload;
    },
    rplGetUploadHistoryDataRequest: (
      state,
      action: PayloadAction<{
        searchKey?: string;
        pageNumber?: number;
      }>
    ) => {
      state.loading.rplHistoryTableLoading = true;
      state.rplLastUpdatedDateTime = format(new Date(), 'yyyy-MM-dd hh:mm a');
    },
    rplGetUploadHistoryDataSuccess: (state, action: PayloadAction<GetUploadHistoryResponseI>) => {
      state.loading.rplHistoryTableLoading = false;
      state.rplUploadedHistory = action.payload;
    },
    rplGetUploadHistoryDataFailure: (state) => {
      state.loading.rplHistoryTableLoading = false;
    },
    rplDownloadBulkForecastEditResultRequest: (
      state,
      action: PayloadAction<{
        fileName: string;
        uploadId: string;
      }>
    ) => {
      state.loading.download = true;
    },
    rplDownloadBulkForecastEditResultSuccess: (state) => {
      state.loading.download = false;
    },
    rplDownloadBulkForecastEditResultFailure: (state) => {
      state.loading.download = false;
    },
    rplSetUploadHistorySearchKey: (state, action: PayloadAction<string>) => {
      state.rplViewLocalScope.rplUploadHistorySearchKey = action.payload;
    },
    setDateRange: (
      state,
      action: PayloadAction<{ startDate: string | null; endDate: string | null }>
    ) => {
      state.rplViewLocalScope.startDate = action.payload.startDate;
      state.rplViewLocalScope.endDate = action.payload.endDate;
    },
    rplResetSkuListData: (state) => {
      state.rplSkuDataList = null;
    },
    rplResetUploadHistoryData: (state) => {
      state.rplUploadedHistory = null;
    },
    rplResetSkuExpandedListData: (state) => {
      state.rplSkuExpandedDataList = null;
    },
    rplDownloadBulkEditZipFileRequest: (
      state,
      action: PayloadAction<{
        fileName: string;
      }>
    ) => {
      state.loading.rplBulkEditDownload = true;
    },
    rplDownloadBulkEditZipFileRequestSuccess: (state) => {
      state.loading.rplBulkEditDownload = false;
    },
    rplDownloadBulkEditZipFileRequestFailure: (state) => {
      state.loading.rplBulkEditDownload = false;
    },
    setReplEditable: (state, action: PayloadAction<boolean>) => {
      state.isReplEditable = action.payload;
      if (action.payload) {
        state.isReplValidated = false;
      }
    },
    addNewReplCellData: (state) => {
      if (state?.rplPlanDetails?.orderQtyDetails?.list) {
        const rowLists = state.rplPlanDetails.orderQtyDetails.list;
        let id: number = 0;
        if (rowLists.length > 0) {
          const lastRow = rowLists[rowLists.length - 1];
          id = lastRow.id + 1;
        }

        state.rplPlanDetails.orderQtyDetails.list.push({
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
        state.isReplValidated = validateReplenishmentEditData(state);
      }
    },
    updateReplCellData: (state, action: PayloadAction<UpdateCellDataI>) => {
      const { id, index, value } = action.payload;
      const rowList = state.rplPlanDetails?.orderQtyDetails?.list;
      if (rowList?.length) {
        const selectedRow = rowList[+id].row;
        let calculatedValue = value;
        const supplyPackSize = state.rplPlanDetails?.orderPlan.unitOrderQty;
        if (index === 1) {
          calculatedValue = +value;
          selectedRow[index + 2] =
            calculatedValue * (state.rplPlanDetails?.orderPlan.unitPrice || 0);
          selectedRow[index + 1] =
            supplyPackSize !== undefined && value !== ''
              ? Math.round(calculatedValue / supplyPackSize)
              : '';
        }
        selectedRow[index] = calculatedValue;
        if (!rowList[+id].fresh) rowList[+id].action = AlertReplenishmentActionTypeEnum.EDIT;
        state.isReplValidated = validateReplenishmentEditData(state);
      }
    },
    rplEditRequest: (state, action: PayloadAction<ReplenishmentI>) => {
      state.loading.planDetails = true;
      state.rplPayload = action.payload;
    },
    rplEditSuccess: (state) => {
      state.loading.planDetails = false;
    },
    rplEditFailure: (state) => {
      state.loading.planDetails = false;
    },
    rplAlertTypeRequest: (state) => {
      state.loading.planDetails = true;
    },
    rplAlertTypeSuccess: (state, action: PayloadAction<AlertTypeI>) => {
      state.loading.planDetails = false;
      state.AlertType = action.payload;
    },
    rplAlertTypeFailure: (state) => {
      state.loading.planDetails = false;
    }
  }
});

export const rplViewSliceSelector = (state: IRootState) => state.rplView;

export const {
  setIsLoadData,
  getReplenishmentSkuDataRequest,
  getReplenishmentSkuDataSuccess,
  getReplenishmentSkuDataFailure,
  getReplenishmentExpandedSkuDataRequest,
  getReplenishmentExpandedSkuDataSuccess,
  getReplenishmentExpandedSkuDataFailure,
  updateRplSkuListSelectedStatus,
  addOrRemoveFromSelectedRplSkuList,
  downloadRplReportRequest,
  downloadRplReportSuccess,
  downloadRplReportFailure,
  setSelectedRplSkuAction,
  getRplPlanDetailsRequest,
  getRplPlanDetailsSuccess,
  getRplPlanDetailsFailure,
  resetViewRplPlanRightPanel,
  getReplenishmentTotalCountSuccess,
  getReplenishmentTotalCountFailure,
  getReplenishmentTotalCount,
  rplSkuSearchAction,
  rplBulkEditFileUploadRequest,
  rplBulkEditFileUploadSuccess,
  rplBulkEditFileUploadFailure,
  rplUpdateUploadProgress,
  rplDownloadBulkEditForecastRequest,
  rplDownloadBulkEditForecastSuccess,
  rplDownloadBulkEditForecastFailure,
  rplUpdateBulkUploadError,
  rplGetUploadHistoryDataRequest,
  rplGetUploadHistoryDataSuccess,
  rplGetUploadHistoryDataFailure,
  rplDownloadBulkForecastEditResultRequest,
  rplDownloadBulkForecastEditResultSuccess,
  rplDownloadBulkForecastEditResultFailure,
  rplSetUploadHistorySearchKey,
  setDateRange,
  rplResetSkuListData,
  rplResetUploadHistoryData,
  rplResetSkuExpandedListData,
  rplDownloadBulkEditZipFileRequest,
  rplDownloadBulkEditZipFileRequestFailure,
  rplDownloadBulkEditZipFileRequestSuccess,
  setReplEditable,
  addNewReplCellData,
  deleteReplCellData,
  updateReplCellData,
  rplEditRequest,
  rplEditSuccess,
  rplEditFailure,
  rplAlertTypeRequest,
  rplAlertTypeSuccess,
  rplAlertTypeFailure
} = RPLViewSlice.actions;

export default RPLViewSlice.reducer;
