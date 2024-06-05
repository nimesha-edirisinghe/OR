import {
  FormattedLabelsI,
  GroupLabelI,
  LabelTypes,
  PredictorLabelI,
  RightFilterItemContentI
} from 'types/groupConfig';
import { GroupLabelsResponseI } from 'types/responses/groupConfigResponses';
import { IGroupConfigurationSlice } from '../groupConfigurationState';
import {
  FilterCountReqPayloadI,
  FilterDataReqPayloadI,
  GroupFilterI
} from 'types/requests/groupConfigRequests';
import { produce } from 'immer';
import { KeyValueI } from 'types/responses/insightResponses';

const initializeFormattedData = (): FormattedLabelsI => {
  return {
    product: [],
    location: [],
    predictor: [],
    store: [],
    anchor: [],
    all: []
  };
};

// export const formatGroupLabels = (inputData: GroupLabelsResponseI[]): FormattedLabelsI => {
//   try {
//     const formattedData: FormattedLabelsI = initializeFormattedData();

//     inputData &&
//       inputData.forEach((item) => {
//         const type = item.type.toLowerCase() as LabelTypes;

//         if (!formattedData[type]) {
//           formattedData[type] = [];
//         }

//         const formattedItem: FormattedLabelsI[LabelTypes][0] = {
//           code: item.code,
//           name: item.label
//         };

//         if (type === 'predictor') {
//           formattedItem.sku = false;
//           formattedItem.anchor = false;
//         }

//         formattedData[type].push(formattedItem);
//       });

//     const anchor = formattedData['anchor'].find((anc) => anc.code === 1)!;
//     if (anchor) {
//       anchor.code = 6;
//       formattedData['product'].push(anchor);
//     }

//     formattedData['anchor'] = formattedData['anchor'].filter((anc) => anc.code != 6);
//     const store = formattedData.store.find((store) => store.code === 1)!;
//     if (store) {
//       store.code = 6;
//       formattedData['location'].push(store);
//     }
//     formattedData['all'] = inputData.map((x) => { return { code: x.code, label: x.label, name: x.type } as GroupLabelI })
//     return formattedData;
//   } catch (error) {
//     console.error('formatGroupLabels ', error);
//     return initializeFormattedData();
//   }
// };

export const formatGroupLabels = (inputData: GroupLabelsResponseI[]): GroupLabelI[] => {
  try {
    const formattedData: GroupLabelI[] = inputData?.map((x) => {
      return {
        code: x.code,
        label: x.label,
        name: x.type,
        anchor: false,
        sku: false
      } as GroupLabelI;
    });
    return formattedData;
  } catch (error) {
    console.error('formatGroupLabels ', error);
    return [];
  }
};

export const rightSidePanelFormatForRequest = (rightPanelList: RightFilterItemContentI[]) => {
  return produce(rightPanelList, (draft) => {
    draft.map((item) => {
      item.selectedItems = (item.selectedItems as KeyValueI[]).map((i) => i.key) as string[];
      item.search = '';
    });
  }) as GroupFilterI[];
};

export const filterRequestFormatterForData = (
  filterType: string,
  filterCode: number,
  orgKey: number,
  groupFilter: IGroupConfigurationSlice['groupFilter'],
  viewFilter: boolean,
  searchKey?: string,
  whFlag?: 0 | 1 | 2,
  initialRequest?: boolean
) => {
  let filters;

  if (viewFilter) {
    filters = groupFilter.filterLocalScope.rightPanelRetainDataList as GroupFilterI[];
  } else {
    const _filters = rightSidePanelFormatForRequest(
      groupFilter.filterLocalScope.rightPanelRetainDataList
    );

    filters = produce(_filters, (draft) => {
      draft.map((o) => {
        if (o.code === filterCode && o.type === filterType) {
          o.selectedItems = [] as string[];
          o.search = initialRequest ? '' : searchKey!;
          return o;
        } else {
          return o;
        }
      });
    });
  }

  const obj: FilterDataReqPayloadI = {
    type: filterType,
    code: filterCode,
    filters,
    orgKey,
    pageNumber: 1,
    pageSize: 100,
    whFlag: whFlag
  };

  return obj;
};

export const filterRequestFormatterForCount = (
  orgKey: number,
  groupFilter: IGroupConfigurationSlice['groupFilter'],
  whFlag: 0 | 1 | 2
) => {
  const obj: FilterCountReqPayloadI = {
    filters: rightSidePanelFormatForRequest(groupFilter.filterLocalScope.rightPanelRetainDataList),
    orgKey,
    whFlag
  };

  return obj;
};

export const formatPredictorConfiguration = (data: GroupLabelI[] | []): PredictorLabelI[] => {
  return data?.map((item) => ({
    predictorCode: item.code,
    predictorName: item.name,
    sku: item.sku,
    anchor: item.anchor
  }));
};
