import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { IRootState } from 'state/rootState';
import { RightFilterItemContentI } from 'types/groupConfig';
import { GroupFilterI } from 'types/requests/groupConfigRequests';
import { FilterDataApiResponseI, KeyValueI } from 'types/responses/insightResponses';
import { TableHeader } from 'types/responses/viewResponses';
import { STORE_ACTIVATION_PAGE_SIZE } from 'utils/constants';

export type configMode = 'view' | 'single' | 'multiple';
export type configDetailsInputType = 'phaseIn' | 'similarStore' | 'dataPointMethod';

export type IStoreConfigInputs = {
  [key in configDetailsInputType]: any;
};

export interface ISelectStoreView {
  selection: {
    selected: { [key: string]: any };
    activeSelection: any;
    selectedAll: boolean;
    selectedCount: number;
    searchKey: string;
  };
  data: {
    totalCount: number;
    pageSize: number;
    pageNumber: number;
    loading: boolean;
    lastUpdated: string;
    activationData: any[];
  };
}

export interface ISkuSelectionView {
  selection: {
    selectedSkus: RightFilterItemContentI;
    selectedSkuCodes: { [key: string]: KeyValueI };
    selectedCount: number;
  };
  data: {
    skuData: KeyValueI[];
    loading: boolean;
    totalCount: number;
    pageSize: number;
    pageNumber: number;
  };
}

export interface IConfigDetailView {
  configDetailsInput: IStoreConfigInputs;
}

export interface IStoreNewActivationView {
  storeActivationView: ISelectStoreView;
  mode: configMode;
  skuSelectionView: ISkuSelectionView;
  configDetailView: IConfigDetailView;
}

export const StoreNewActivationSlice = createSlice({
  name: 'storeNewActivation',
  initialState: {
    storeActivationView: {
      selection: {
        selected: {},
        activeSelection: undefined,
        selectedAll: false,
        searchKey: ''
      },
      data: {
        totalCount: 0,
        pageSize: STORE_ACTIVATION_PAGE_SIZE,
        pageNumber: 1,
        loading: false,
        lastUpdated: '',
        activationData: []
      }
    },
    mode: 'view',
    skuSelectionView: {
      selection: {
        selectedSkus: { selectedItems: [], isSelectAll: true },
        selectedSkuCodes: {}
      },
      data: {
        skuData: [],
        loading: false,
        pageNumber: 1,
        pageSize: 100,
        totalCount: 0
      }
    },
    configDetailView: {
      configDetailsInput: {}
    }
  } as unknown as IStoreNewActivationView,
  reducers: {
    resetSelectionData: (state) => {
      state.storeActivationView.selection.selected = {};
      state.storeActivationView.selection.searchKey = '';
      state.storeActivationView.selection.activeSelection = undefined;
      state.storeActivationView.selection.selectedCount = 0;
      state.storeActivationView.selection.selectedAll = false;
      state.storeActivationView.data.activationData.forEach((it) => {
        it.isSelected = false;
      });

      state.skuSelectionView.selection.selectedSkuCodes = {};
      state.skuSelectionView.selection.selectedCount = 0;
      state.skuSelectionView.selection.selectedSkus = {
        selectedItems: [],
        isSelectAll: true,
        search: ''
      } as RightFilterItemContentI;
      state.storeActivationView.data.pageNumber = 1;
      state.mode = 'view';
      state.skuSelectionView.data.skuData = [];
      state.configDetailView.configDetailsInput['phaseIn'] = '';
      state.configDetailView.configDetailsInput['similarStore'] = '';
      state.configDetailView.configDetailsInput['dataPointMethod'] = '';
    },
    setStoreActivationPageNumber: (state, action: PayloadAction<{ pageNumber: number }>) => {
      state.storeActivationView.data.pageNumber = action.payload.pageNumber;
    },
    resetSkuSelectionData: (state) => {
      state.skuSelectionView.selection.selectedSkuCodes = {};
      state.skuSelectionView.selection.selectedCount = 0;
      state.skuSelectionView.selection.selectedSkus = {
        selectedItems: [],
        isSelectAll: true,
        search: ''
      } as RightFilterItemContentI;
      state.skuSelectionView.data.skuData.forEach((it) => {
        it.isSelected = true;
      });
    },
    setStoreNewActivationSearchKey: (state, action: PayloadAction<string>) => {
      state.storeActivationView.selection.searchKey = action.payload;
      state.storeActivationView.selection.selectedAll = false;
      state.storeActivationView.data.activationData.forEach((it) => {
        it.isSelected = false;
      });
      state.storeActivationView.selection.selected = {};
      state.storeActivationView.selection.selectedCount = 0;
    },
    setSkuSearchKey: (state, action: PayloadAction<string>) => {
      state.skuSelectionView.selection.selectedSkus.search = action.payload;
      state.skuSelectionView.selection.selectedCount = 0;
      state.skuSelectionView.selection.selectedSkus.isSelectAll = false;
      state.skuSelectionView.data.skuData.forEach((it) => {
        it.isSelected = false;
      });
    },
    getStoreNewActivationRequest: (
      state,
      action: PayloadAction<{
        pageNumber: number;
        pageSize: number;
        searchKey?: string;
        filter: GroupFilterI[];
      }>
    ) => {
      state.storeActivationView.data.loading = true;
      state.storeActivationView.data.lastUpdated = format(new Date(), 'yyyy-MM-dd hh:mm a');
      state.storeActivationView.data.pageNumber = action.payload.pageNumber;
    },
    getStoreNewActivationRequestSuccess: (
      state,
      action: PayloadAction<{ list: any[]; headers: TableHeader[]; totalCount: number }>
    ) => {
      state.storeActivationView.data.activationData = action.payload.list.map((x) => ({
        ...x,
        isSelected: false
      }));
      state.storeActivationView.data.totalCount = action.payload.totalCount;
      state.storeActivationView.data.loading = false;
      state.storeActivationView.data.activationData.forEach((it) => {
        it.isSelected =
          state.storeActivationView.selection.selectedAll ||
          state.storeActivationView.selection.selected[it.anchorProdKey + '']
            ? true
            : false;
      });
    },
    getStoreNewActivationRequestFailure: (state) => {
      state.storeActivationView.data.loading = false;
    },
    updateSelectedItem: (state, action: PayloadAction<{ data: any }>) => {
      let selectedItem = state.storeActivationView.data.activationData.find(
        (item) => item.anchorProdKey === action.payload.data.id
      );
      state.storeActivationView.data.activationData =
        state.storeActivationView.data.activationData.map((item) =>
          item.anchorProdKey === action.payload.data.id
            ? { ...item, isSelected: !item.isSelected }
            : item
        );

      if (state.storeActivationView.selection.selected[selectedItem.anchorProdKey + '']) {
        delete state.storeActivationView.selection.selected[selectedItem.anchorProdKey + ''];
      } else {
        state.storeActivationView.selection.selected[selectedItem.anchorProdKey + ''] =
          selectedItem;
      }

      state.storeActivationView.selection.selectedCount = Object.keys(
        state.storeActivationView.selection.selected
      ).length;
      state.storeActivationView.selection.selectedAll =
        state.storeActivationView.selection.selectedCount ==
        state.storeActivationView.data.totalCount;
      state.storeActivationView.selection.activeSelection = selectedItem.isSelected
        ? undefined
        : selectedItem;
      if (state.storeActivationView.selection.selectedCount == 1) {
        //Make first one selected
        state.storeActivationView.selection.activeSelection =
          state.storeActivationView.selection.selected[
            Object.keys(state.storeActivationView.selection.selected)[0]
          ];
      }
    },
    setSelectedAll: (state, action: PayloadAction<{ selectAll: boolean }>) => {
      state.storeActivationView.data.activationData =
        state.storeActivationView.data.activationData.map((item) => ({
          ...item,
          isSelected: action.payload.selectAll
        }));
      if (action.payload.selectAll) {
        state.storeActivationView.data.activationData.forEach((x) => {
          state.storeActivationView.selection.selected[x.anchorProdKey + ''] = x;
        });
        state.storeActivationView.selection.selectedCount =
          state.storeActivationView.data.totalCount;
      } else {
        state.storeActivationView.selection.selected = {};
        state.storeActivationView.selection.selectedCount = 0;
      }
      state.storeActivationView.selection.selectedAll = action.payload.selectAll;
    },
    setSkuSelectedAll: (state, action: PayloadAction<{ selectAll: boolean }>) => {
      state.skuSelectionView.data.skuData.forEach((it) => {
        it.isSelected = action.payload.selectAll;
      });
      state.skuSelectionView.selection.selectedSkus.isSelectAll = action.payload.selectAll;
      state.skuSelectionView.selection.selectedCount = state.skuSelectionView.data.totalCount;      
    },
    setConfigMode: (state, action: PayloadAction<{ mode: configMode; id: string }>) => {
      state.mode = action.payload.mode;
      if (action.payload.mode == 'single') {
        state.storeActivationView.selection.activeSelection =
          state.storeActivationView.data.activationData.find(
            (item) => item.anchorProdKey === action.payload.id
          );
      }
    },
    addOrRemoveSkuSelection: (
      state,
      action: PayloadAction<{ status: boolean; item: KeyValueI }>
    ) => {
      if (action.payload.status) {
        state.skuSelectionView.selection.selectedSkuCodes[action.payload.item.key] =
          action.payload.item;
      } else {
        delete state.skuSelectionView.selection.selectedSkuCodes[action.payload.item.key];
      }
      state.skuSelectionView.selection.selectedSkus.selectedItems = Object.keys(
        state.skuSelectionView.selection.selectedSkuCodes
      ).map((x) => state.skuSelectionView.selection.selectedSkuCodes[x] as KeyValueI);
      state.skuSelectionView.data.skuData.forEach((it) => {
        it.isSelected = it.key == action.payload.item.key ? action.payload.status : it.isSelected;
      });
      state.skuSelectionView.selection.selectedSkus.isSelectAll =
        Object.keys(state.skuSelectionView.selection.selectedSkuCodes).length ===
        state.skuSelectionView.data.skuData.length;
      state.skuSelectionView.selection.selectedCount = state.skuSelectionView.selection.selectedSkus.isSelectAll ? state.skuSelectionView.data.totalCount : Object.keys(state.skuSelectionView.selection.selectedSkuCodes).length;
    },
    getFilterDataRequest: (
      state,
      action: {
        payload: {
          code: number;
          type: string;
          filters?: GroupFilterI[];
          search?: string;
          pageNumber: number;
          pageSize: number;
        };
      }
    ) => {
      state.skuSelectionView.data.skuData = [];
      state.skuSelectionView.data.loading = true;
    },
    getFilterDataSuccess: (
      state,
      action: {
        payload: FilterDataApiResponseI;
      }
    ) => {
      state.skuSelectionView.data.skuData = action.payload.list;

      state.skuSelectionView.data.skuData = action.payload.list.map((obj) => {
        obj.value = `${obj.key} - ${obj.value}`;
        return obj;
      });

      state.skuSelectionView.selection.selectedSkus.outOfCount = action.payload.totalCount;
      state.skuSelectionView.selection.selectedCount = action.payload.totalCount;
      state.skuSelectionView.data.totalCount = action.payload.totalCount;
      state.skuSelectionView.data.loading = false;
      state.skuSelectionView.data.skuData.forEach((it) => {
        it.isSelected = state.skuSelectionView.selection.selectedSkus.isSelectAll || state.skuSelectionView.selection.selectedSkuCodes[it.key] ? true : false;
      });
    },
    getFilterDataFailure: (state) => {
      state.skuSelectionView.data.loading = false;
    },
    resetConfigDetailsData: (state) => {
      state.configDetailView.configDetailsInput['phaseIn'] = '';
      state.configDetailView.configDetailsInput['similarStore'] = '';
      state.configDetailView.configDetailsInput['dataPointMethod'] = '';
    },
    updateConfigUpdateInput: (
      state,
      action: PayloadAction<{ key: configDetailsInputType; value: any }>
    ) => {
      state.configDetailView.configDetailsInput[action.payload.key] = action.payload.value;
    }
  }
});

export const newStoreActivationSliceSelector = (state: IRootState) => state.storeNewActivation;

export const {
  resetSelectionData,
  resetSkuSelectionData,
  resetConfigDetailsData,
  setStoreNewActivationSearchKey,
  setSkuSearchKey,
  getStoreNewActivationRequest,
  getStoreNewActivationRequestSuccess,
  getStoreNewActivationRequestFailure,
  setStoreActivationPageNumber,
  updateSelectedItem,
  setSelectedAll,
  setConfigMode,
  addOrRemoveSkuSelection,
  setSkuSelectedAll,
  getFilterDataRequest,
  getFilterDataSuccess,
  getFilterDataFailure,
  updateConfigUpdateInput
} = StoreNewActivationSlice.actions;

export default StoreNewActivationSlice.reducer;
