import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { IRootState } from 'state/rootState';
import { RightFilterItemContentI } from 'types/groupConfig';
import { GroupFilterI } from 'types/requests/groupConfigRequests';
import { FilterDataApiResponseI, KeyValueI } from 'types/responses/insightResponses';
import { TableHeader } from 'types/responses/viewResponses';
import { STORE_ACTIVATION_PAGE_SIZE } from 'utils/constants';

export type configMode = 'view' | 'single' | 'multiple';
export type configDetailsInputType =
  | 'phaseIn'
  | 'phaseOut'
  | 'isSuccessor'
  | 'selectedMethod'
  | 'selectedSKU'
  | 'percentage'
  | 'baseValue';

export type IStoreConfigInputs = {
  [key in configDetailsInputType]: any;
};

export interface ISelectProductView {
  selection: {
    selected: { [key: string]: any };
    activeSelection: any;
    selectedAll: boolean;
    selectedCount: number;
  };
  searchKey: string;
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
    filterItem: RightFilterItemContentI;
  };
  data: {
    skuData: string[];
    loading: boolean;
    totalCount: number;
    pageSize: number;
    pageNumber: number;
  };
}

export interface ILocationSelectionView {
  selection: {
    selectedLocation: RightFilterItemContentI;
    selectedLocationCodes: { [key: string]: KeyValueI };
    filterItem: RightFilterItemContentI;
  };
  data: {
    locationData: KeyValueI[];
    loading: boolean;
    totalCount: number;
    pageSize: number;
    pageNumber: number;
  };
}

const SkuFilterType = {
  code: 2,
  isSelectAll: false,
  search: '',
  selectedItems: [],
  outOfCount: 0,
  type: 'sku'
};
const LocationFilterType = {
  code: 1,
  isSelectAll: false,
  search: '',
  selectedItems: [],
  outOfCount: 0,
  type: 'store'
};

export interface IConfigDetailView {
  configDetailsInput: IStoreConfigInputs;
}

export interface IProductNewActivationView {
  productActivationView: ISelectProductView;
  mode: configMode;
  skuSelectionView: ISkuSelectionView;
  locationSelectionView: ILocationSelectionView;
  configDetailView: IConfigDetailView;
}

export const StoreNewActivationSlice = createSlice({
  name: 'productNewActivation',
  initialState: {
    productActivationView: {
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
        selectedSkus: { selectedItems: [] },
        selectedSkuCodes: {},
        filterItem: SkuFilterType
      },
      data: {
        skuData: [],
        loading: false,
        pageNumber: 1,
        pageSize: 100,
        totalCount: 0
      }
    },
    locationSelectionView: {
      selection: {
        selectedLocation: { selectedItems: [] },
        selectedLocationCodes: {},
        filterItem: LocationFilterType
      },
      data: {
        locationData: [],
        loading: false,
        pageNumber: 1,
        pageSize: 100,
        totalCount: 0
      }
    },
    configDetailView: {
      configDetailsInput: {
        phaseIn: '',
        phaseOut: '',
        isSuccessor: false,
        selectedSKU: '',
        selectedMethod: '',
        percentage: '',
        baseValue: ''
      }
    }
  } as unknown as IProductNewActivationView,
  reducers: {
    resetSelectionData: (state) => {
      state.productActivationView.selection.selected = {};
      state.productActivationView.searchKey = '';
      state.productActivationView.selection.activeSelection = undefined;
      state.productActivationView.selection.selectedCount = 0;
      state.locationSelectionView.selection.selectedLocationCodes = {};

      state.locationSelectionView.selection.selectedLocation = {
        selectedItems: []
      } as RightFilterItemContentI;

      state.productActivationView.data.pageNumber = 1;
      state.mode = 'view';
      state.locationSelectionView.selection.filterItem = LocationFilterType;
      state.locationSelectionView.data.locationData = [];
      state.configDetailView.configDetailsInput['phaseIn'] = '';
      state.configDetailView.configDetailsInput['phaseOut'] = '';
      state.configDetailView.configDetailsInput['isSuccessor'] = '';
      state.configDetailView.configDetailsInput['selectedSKU'] = '';
      state.configDetailView.configDetailsInput['selectedMethod'] = '';
      state.configDetailView.configDetailsInput['percentage'] = '';
      state.configDetailView.configDetailsInput['baseValue'] = '';
    },
    setProductActivationPageNumber: (state, action: PayloadAction<{ pageNumber: number }>) => {
      state.productActivationView.data.pageNumber = action.payload.pageNumber;
    },
    resetLocationSelectionData: (state) => {
      state.locationSelectionView.selection.selectedLocationCodes = {};
      state.locationSelectionView.selection.selectedLocation = {
        selectedItems: []
      } as RightFilterItemContentI;
      // state.skuSelectionView.selection.filterItem.isSelectAll = false;
      state.locationSelectionView.selection.filterItem = LocationFilterType;
      state.locationSelectionView.data.locationData.forEach((it) => {
        it.isSelected = false;
      });
    },
    setProductNewActivationSearchKey: (state, action: PayloadAction<string>) => {
      state.productActivationView.searchKey = action.payload;
    },

    setLocationSearchKey: (state, action: PayloadAction<string>) => {
      state.locationSelectionView.selection.filterItem.search = action.payload;
    },
    getProductNewActivationRequest: (
      state,
      action: PayloadAction<{
        pageNumber: number;
        pageSize: number;
        searchKey?: string;
        filter: GroupFilterI[];
      }>
    ) => {
      state.productActivationView.data.loading = true;
      state.productActivationView.data.lastUpdated = format(new Date(), 'yyyy-MM-dd hh:mm a');
      // state.productActivationView.selection.selectedAll = false;
      state.productActivationView.data.pageNumber = action.payload.pageNumber;
    },
    getProductNewActivationRequestSuccess: (
      state,
      action: PayloadAction<{ list: any[]; headers: TableHeader[]; totalCount: number }>
    ) => {
      state.productActivationView.data.activationData = action.payload.list.map((x) => ({
        ...x,
        isSelected: false
      }));
      state.productActivationView.data.totalCount = action.payload.totalCount;
      // state.productActivationView.headers = action.payload.headers;
      state.productActivationView.data.loading = false;
      // state.selected = [];
      state.productActivationView.data.activationData.forEach((it) => {
        it.isSelected =
          state.productActivationView.selection.selectedAll ||
          state.productActivationView.selection.selected[it.anchorProdKey + '']
            ? true
            : false;
      });
    },
    getProductNewActivationRequestFailure: (state) => {
      state.productActivationView.data.loading = false;
    },
    updateSelectedItem: (state, action: PayloadAction<{ data: any }>) => {
      let selectedItem = state.productActivationView.data.activationData.find(
        (item) => item.anchorProdKey === action.payload.data.id
      );
      state.productActivationView.data.activationData =
        state.productActivationView.data.activationData.map((item) =>
          item.anchorProdKey === action.payload.data.id
            ? { ...item, isSelected: !item.isSelected }
            : item
        );

      if (state.productActivationView.selection.selected[selectedItem.anchorProdKey + '']) {
        delete state.productActivationView.selection.selected[selectedItem.anchorProdKey + ''];
      } else {
        state.productActivationView.selection.selected[selectedItem.anchorProdKey + ''] =
          selectedItem;
      }

      state.productActivationView.selection.selectedCount = Object.keys(
        state.productActivationView.selection.selected
      ).length;
      // state.productActivationView.selection.selectedAll =
      //   Object.keys(state.productActivationView.selection.selected).length ===
      //   state.productActivationView.data.totalCount;
      state.productActivationView.selection.activeSelection = selectedItem;
    },
    setSelectedAll: (state, action: PayloadAction<{ selectAll: boolean }>) => {
      state.productActivationView.data.activationData =
        state.productActivationView.data.activationData.map((item) => ({
          ...item,
          isSelected: action.payload.selectAll
        }));
      if (action.payload.selectAll) {
        state.productActivationView.data.activationData.forEach((x) => {
          state.productActivationView.selection.selected[x.anchorProdKey + ''] = x;
        });
        state.productActivationView.selection.selectedCount =
          state.productActivationView.data.totalCount;
      } else {
        state.productActivationView.selection.selected = {};
        state.productActivationView.selection.selectedCount = 0;
      }
      // state.list.filter((x) => x.isSelected).forEach( x => { state.selected[x.anchorProdKey] = x; });
      state.productActivationView.selection.selectedAll = action.payload.selectAll;
    },
    setLocationSelectedAll: (state, action: PayloadAction<{ selectAll: boolean }>) => {
      state.locationSelectionView.data.locationData.forEach((it) => {
        it.isSelected = action.payload.selectAll;
      });
      state.locationSelectionView.selection.selectedLocation.isSelectAll = action.payload.selectAll;
    },

    setConfigMode: (state, action: PayloadAction<{ mode: configMode; id: string }>) => {
      state.mode = action.payload.mode;
      if (action.payload.mode == 'single') {
        state.productActivationView.selection.activeSelection =
          state.productActivationView.data.activationData.find(
            (item) => item.anchorProdKey === action.payload.id
          );
      }
    },

    addOrRemoveLocationSelection: (
      state,
      action: PayloadAction<{ status: boolean; item: KeyValueI }>
    ) => {
      if (action.payload.status) {
        state.locationSelectionView.selection.selectedLocationCodes[action.payload.item.key] =
          action.payload.item;
      } else {
        delete state.locationSelectionView.selection.selectedLocationCodes[action.payload.item.key];
      }
      state.locationSelectionView.selection.selectedLocation.selectedItems = Object.keys(
        state.locationSelectionView.selection.selectedLocationCodes
      ).map((x) => state.locationSelectionView.selection.selectedLocationCodes[x] as KeyValueI);
      state.locationSelectionView.data.locationData.forEach((it) => {
        it.isSelected = it.key == action.payload.item.key ? action.payload.status : it.isSelected;
      });
      state.locationSelectionView.selection.filterItem.isSelectAll =
        Object.keys(state.locationSelectionView.selection.selectedLocationCodes).length ===
        state.locationSelectionView.data.locationData.length;
    },
    getFilterDataRequest: (
      state,
      action: {
        payload: {
          filterItem: RightFilterItemContentI;
          filters?: GroupFilterI[];
          pageNumber: number;
          pageSize: number;
        };
      }
    ) => {
      state.locationSelectionView.data.locationData = [];
      state.locationSelectionView.data.loading = true;
    },
    getFilterDataSuccess: (
      state,
      action: {
        payload: FilterDataApiResponseI;
      }
    ) => {
      let mutableTotalCount = action.payload.totalCount;
      state.locationSelectionView.data.locationData = action.payload.list;

      state.locationSelectionView.data.locationData = action.payload.list.map((obj) => {
        obj.value = `${obj.key} - ${obj.value}`;
        return obj;
      });

      state.locationSelectionView.selection.filterItem.outOfCount = mutableTotalCount;
      state.locationSelectionView.selection.selectedLocation.outOfCount = mutableTotalCount;
      state.locationSelectionView.data.loading = false;
      state.locationSelectionView.selection.selectedLocationCodes;

      if (Object.keys(state.locationSelectionView.selection.selectedLocationCodes).length === 0) {
        state.locationSelectionView.data.locationData.forEach((it) => {
          it.isSelected = true;
        });
        state.locationSelectionView.selection.selectedLocation.isSelectAll = true;
      } else {
        state.locationSelectionView.data.locationData.forEach((it) => {
          it.isSelected = state.locationSelectionView.selection.selectedLocationCodes[it.key]
            ? true
            : false;
        });
      }
    },
    getFilterDataFailure: (state) => {
      state.locationSelectionView.data.loading = false;
    },
    resetConfigDetailsData: (state) => {
      state.configDetailView.configDetailsInput['phaseIn'] = '';
      state.configDetailView.configDetailsInput['phaseOut'] = '';
      state.configDetailView.configDetailsInput['isSuccessor'] = '';
      state.configDetailView.configDetailsInput['selectedSKU'] = '';
      state.configDetailView.configDetailsInput['selectedMethod'] = '';
      state.configDetailView.configDetailsInput['percentage'] = '';
      state.configDetailView.configDetailsInput['baseValue'] = '';
    },
    updateConfigUpdateInput: (
      state,
      action: PayloadAction<{ key: configDetailsInputType; value: any }>
    ) => {
      state.configDetailView.configDetailsInput[action.payload.key] = action.payload.value;
    },
    getSKUFilterDataRequest: (
      state,
      action: {
        payload: {
          filterItem: RightFilterItemContentI;
          filters?: GroupFilterI[];
          pageNumber: number;
          pageSize: number;
        };
      }
    ) => {
      state.locationSelectionView.data.locationData = [];
      state.locationSelectionView.data.loading = true;
    },
    getSKUFilterDataSuccess: (
      state,
      action: {
        payload: FilterDataApiResponseI;
      }
    ) => {
      state.skuSelectionView.data.skuData = action.payload.list.map((obj) => {
        obj.value = `${obj.key} - ${obj.value}`;
        return obj.value;
      });
      state.skuSelectionView.data.loading = false;
    },
    getSKUFilterDataFailure: (state) => {
      state.skuSelectionView.data.loading = false;
    }
  }
});

export const newProductActivationSliceSelector = (state: IRootState) => state.productNewActivation;

export const {
  resetSelectionData,
  resetLocationSelectionData,
  resetConfigDetailsData,
  setProductNewActivationSearchKey,
  getProductNewActivationRequest,
  getProductNewActivationRequestSuccess,
  getProductNewActivationRequestFailure,
  setProductActivationPageNumber,
  updateSelectedItem,
  setSelectedAll,
  setConfigMode,
  addOrRemoveLocationSelection,
  setLocationSelectedAll,
  getFilterDataRequest,
  getFilterDataSuccess,
  getFilterDataFailure,
  updateConfigUpdateInput,
  getSKUFilterDataRequest,
  getSKUFilterDataSuccess,
  getSKUFilterDataFailure,
  setLocationSearchKey
} = StoreNewActivationSlice.actions;

export default StoreNewActivationSlice.reducer;
