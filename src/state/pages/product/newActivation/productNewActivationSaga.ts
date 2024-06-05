import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  getFilterDataFailure,
  getFilterDataSuccess,
  getProductNewActivationRequestFailure,
  getProductNewActivationRequestSuccess,
  getSKUFilterDataFailure,
  getSKUFilterDataSuccess
} from './productNewActivationState';
import { TableHeader } from 'types/responses/viewResponses';
import {
  FilterDataReqPayloadI,
  FilterDataReqQueryParamI,
  GroupFilterI
} from 'types/requests/groupConfigRequests';
import { IUser, userSliceSelector } from 'state/user/userState';
import { GeneralResponse } from 'state/rootSaga';
import { groupConfigApi } from 'api';
import { ApiResponse } from 'types/api';
import { FilterDataApiResponseI, RightFilterItemContentI } from 'types/groupConfig';

interface FilterDataActionI {
  // payload: {
  //   filterType: string;
  //   filterCode: number;
  //   pageNumber: number;
  //   filters: GroupFilterI[];
  //   searchKey?: string;
  //   whFlag?: 0 | 1 | 2;

  // };
  payload: {
    filterItem: RightFilterItemContentI;
    pageNumber: number;
    pageSize: number;
    filters?: GroupFilterI[];
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

function* getProductNewActivationRequest(action: DataRequestI) {
  let list: any[] = [
    {
      anchorProdKey: 1000,
      group: '48 - Biscuits',
      anchor: '260 - Cakes',
      newSku: '590441 - Lotte Choco Cake 336g',
      location: 25,
      department: 'Confectionery',
      wrench: 'A'
    },
    {
      anchorProdKey: 1001,
      group: '65 - Hair Care Products',
      anchor: '210 - Conditioners',
      newSku: '1381075 - Dove Cond Daily Care New 350ml',
      location: 25,
      department: 'Personal Care',
      wrench: 'A'
    },
    {
      anchorProdKey: 1002,
      group: '52 - Pastas',
      anchor: '210 - Spaghetti',
      newSku: '1384455 - Haley Spaghetti 400g',
      location: 25,
      department: 'Grocery Salt',
      wrench: 'A'
    },
    {
      anchorProdKey: 1003,
      group: '57 - Biscuits',
      anchor: '230 - Cookies',
      newSku: '1443105 - Tifany Chunkos Choco-Chips 40g',
      location: 25,
      department: 'Confectionery',
      wrench: 'A'
    },
    {
      anchorProdKey: 1004,
      group: '42 - Hair Care Products',
      anchor: '210 - Conditioners',
      newSku: '1452935 - Vatika Hairfall Control 400ml',
      location: 25,
      department: 'Personal Care',
      wrench: 'A'
    },
    {
      anchorProdKey: 1005,
      group: '61 - Hair Care Products',
      anchor: '210 - Conditioners',
      newSku: '1512335 - Herbal Conditioner Aloe Bamboo 400ml',
      location: 25,
      department: 'Personal Care',
      wrench: 'A'
    },
    {
      anchorProdKey: 1006,
      group: '67 - Biscuits',
      anchor: '230 - Cookies',
      newSku: '1520635 - M&M Double Choco Cookies 180g',
      location: 25,
      department: 'Confectionery',
      wrench: 'A'
    },
    {
      anchorProdKey: 1007,
      group: '41 - Biscuits',
      anchor: '230 - Cookies',
      newSku: '1521715 - Loacker Cookies Chip Choc 96g',
      location: 25,
      department: 'Confectionery',
      wrench: 'A'
    },
    {
      anchorProdKey: 1008,
      group: '53 - Deodrants',
      anchor: '205 - Deo Spray',
      newSku: '1554975 - Nivea Milk White Must & Rose 150ml',
      location: 25,
      department: 'Personal Care',
      wrench: 'A'
    },
    {
      anchorProdKey: 1009,
      group: '44 - Confectionery',
      anchor: '205 - Chocolate Bars',
      newSku: '1562925 - Hersheys Salted Caramel 40g',
      location: 25,
      department: 'Confectionery',
      wrench: 'A'
    },
    {
      anchorProdKey: 1010,
      group: '43 - Confectionery',
      anchor: '245 - Chewing Bubble Gum',
      newSku: '841345 - Wrigleys Extra Strwbery Bottle 84g',
      location: 25,
      department: 'Confectionery',
      wrench: 'A'
    },
    {
      anchorProdKey: 1011,
      group: '64 - Chips Nuts',
      anchor: '250 - Popcorn',
      newSku: '873885 - Goody Pop Corn 850g',
      location: 25,
      department: 'Confectionery',
      wrench: 'A'
    },
    {
      anchorProdKey: 1012,
      group: '60 - Pastas',
      anchor: '220 - Lasagne',
      newSku: '931995 - Goody Lasagne 500g',
      location: 25,
      department: 'Grocery Salt',
      wrench: 'A'
    },
    {
      anchorProdKey: 1013,
      group: '51 - Oil',
      anchor: '215 - Vegetable Oil',
      newSku: '937245 - Haley Vegetable Oil Can 16l',
      location: 25,
      department: 'Grocery Salt',
      wrench: 'A'
    },
    {
      anchorProdKey: 1014,
      group: '46 - Hair Care Products',
      anchor: '210 - Conditioners',
      newSku: '1580235 - Dove Protein Conditioner Amino Acid 180ml',
      location: 25,
      department: 'Personal Care',
      wrench: 'A'
    }
  ];

  let pageNumber = action.payload.pageNumber || 1;
  let pageSize = action.payload.pageSize || 1;

  let data = list.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);

  yield put(
    getProductNewActivationRequestSuccess({ list: data, headers: [], totalCount: list.length })
  );
}

function* getFilterDataRequest(action: FilterDataActionI) {
  try {
    let userState: IUser = yield select(userSliceSelector);
    const filterType = action.payload.filterItem.type;
    const filterCode = action.payload.filterItem.code;
    const searchKey = action.payload.filterItem.search;
    const orgKey = userState.selectedOrg.orgKey;
    // const whFlag = action.payload.whFlag!;

    const filters = action.payload.filters || [
      {
        type: filterType,
        code: filterCode,
        search: searchKey,
        isSelectAll: false,
        selectedItems: []
      } as GroupFilterI
    ];

    const obj: FilterDataReqPayloadI = {
      type: filterType,
      code: filterCode,
      filters: filters,
      orgKey,
      pageNumber: 1,
      pageSize: 100,
      whFlag: 0
    };

    const queryParams: FilterDataReqQueryParamI = {
      pageNumber: action.payload.pageNumber,
      pageSize: 100,
      orgKey
      // searchKey: searchKey,
      // sort: 'ASC',
      // code: filterCode,
      // type: filterType
    };

    if (userState && userState.keyCloakInfo) {
      const response: GeneralResponse = yield call(() =>
        groupConfigApi.getFilterDataRequest(obj, queryParams)
      );
      if (response && response.data) {
        const formattedResponse: ApiResponse<FilterDataApiResponseI> = yield response;
        yield put(getFilterDataSuccess(formattedResponse.data));
      } else {
        yield put(getFilterDataFailure());
      }
    }
  } catch (error) {
    console.error('Filter Data Fetch Error', error);
  }
}

function* getSKUFilterDataRequest(action: FilterDataActionI) {
  try {
    let userState: IUser = yield select(userSliceSelector);
    const filterType = action.payload.filterItem.type;
    const filterCode = action.payload.filterItem.code;
    const searchKey = action.payload.filterItem.search;
    const orgKey = userState.selectedOrg.orgKey;
    // const whFlag = action.payload.whFlag!;

    const filters = action.payload.filters || [
      {
        type: filterType,
        code: filterCode,
        search: searchKey,
        isSelectAll: false,
        selectedItems: []
      } as GroupFilterI
    ];

    const obj: FilterDataReqPayloadI = {
      type: filterType,
      code: filterCode,
      filters: filters,
      orgKey,
      pageNumber: 1,
      pageSize: 100,
      whFlag: 0
    };

    const queryParams: FilterDataReqQueryParamI = {
      pageNumber: action.payload.pageNumber,
      pageSize: 100,
      orgKey
      // searchKey: searchKey,
      // sort: 'ASC',
      // code: filterCode,
      // type: filterType
    };

    if (userState && userState.keyCloakInfo) {
      const response: GeneralResponse = yield call(() =>
        groupConfigApi.getFilterDataRequest(obj, queryParams)
      );
      if (response && response.data) {
        const formattedResponse: ApiResponse<FilterDataApiResponseI> = yield response;
        yield put(getSKUFilterDataSuccess(formattedResponse.data));
      } else {
        yield put(getSKUFilterDataFailure());
      }
    }
  } catch (error) {
    console.error('Filter Data Fetch Error', error);
  }

}

function* newProductActivationSaga() {
  yield takeLatest(
    'productNewActivation/getProductNewActivationRequest',
    getProductNewActivationRequest
  );
  yield takeLatest('productNewActivation/getFilterDataRequest', getFilterDataRequest);
  yield takeLatest('productNewActivation/getSKUFilterDataRequest', getSKUFilterDataRequest);
}

export default newProductActivationSaga;
