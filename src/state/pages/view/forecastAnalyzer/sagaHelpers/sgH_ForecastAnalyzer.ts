import { IDFView } from '../../demandForecastView/dfViewPageState';
import { ForecastAnalyzerReqBodyI } from 'types/requests/view/forecastAnalyzer';
import { PlannedActualResponseI } from 'types/responses/view/forecastAnalyzer';
import { DemandForecastSkuListItem, TableHeader } from 'types/responses/viewResponses';
import { RightFilterItemContentI } from 'types/groupConfig';
import { FCAnalyzerTypeEnum } from 'utils/enum';

export const generateFilterForAggregateFC = (
  selectedSkuList: DemandForecastSkuListItem[],
  globalSkuSelected: boolean,
  searchKey: string
): RightFilterItemContentI[] => {
  const filteredData = [
    {
      code: 1,
      isSelectAll: globalSkuSelected || false,
      search: '',
      selectedItems: globalSkuSelected
        ? []
        : (selectedSkuList.map((i) => i.anchorProdKey.toString()) as string[]),
      type: 'sku'
    }
  ];
  return filteredData;
};

export const generateFilterForSingleFC = (
  selectedSkuObj: DemandForecastSkuListItem | null,
  searchKey: string
): RightFilterItemContentI[] => {
  const filteredData = [
    {
      code: 1,
      isSelectAll: false,
      search: '',
      selectedItems: [selectedSkuObj?.anchorProdKey.toString()] as string[],
      type: 'sku'
    }
  ];
  return filteredData;
};

export const prepareFcAnalyzerCommonRequestBody = (
  searchKey: string,
  selectedSkuList: DemandForecastSkuListItem[],
  selectedSkuObj: DemandForecastSkuListItem | null,
  selectedGroupKey: string,
  globalSkuSelected: boolean,
  selectedAnalyzerType: FCAnalyzerTypeEnum
) => {
  const aggregateFilters = generateFilterForAggregateFC(
    selectedSkuList,
    globalSkuSelected,
    searchKey
  );
  const singleFilters = generateFilterForSingleFC(selectedSkuObj, searchKey);
  const formattedFilter =
    selectedAnalyzerType === FCAnalyzerTypeEnum.AGGREGATED ? aggregateFilters : singleFilters;

  return {
    filters: formattedFilter,
    groupKey: Number(selectedGroupKey!),
    search: searchKey
  };
};

export const prepareFcAnalyzerRequestBody = (
  dfState: IDFView,
  selectedGroupKey: string
): ForecastAnalyzerReqBodyI => {
  const selectedSkuObj = dfState.selectedSku;

  return {
    anchorProdKey: selectedSkuObj?.anchorProdKey!,
    groupKey: Number(selectedGroupKey!)
  };
};

export const plannedActualHeaderFormatter = (data: PlannedActualResponseI[]): TableHeader[] => {
  const stockMovementTblHeader: TableHeader[] = [
    { displayValue: '', key: 'order_date', w: 143 },
    ...(data || []).map((item) => ({
      displayValue: item.date,
      key: item.date,
      w: 81
    }))
  ];

  return stockMovementTblHeader;
};

export const plannedActualListFormatter = (data: PlannedActualResponseI[]) => {
  const list: { id?: any; row: any[] }[] = [];

  if (data) {
    list.push({
      id: 0,
      row: ['Planned Discounts', ...data.map((i) => `${i.plannedDiscount}`)]
    });
    list.push({
      id: 1,
      row: ['Actual Discounts', ...data.map((i) => `${i.actualDiscount}`)]
    });
    list.push({
      id: 2,
      row: ['Days with insufficient stock', ...data.map((i) => `${i.outOfStockDays}`)]
    });
  }

  return list;
};

export const fcAnalyzerPlannedActualFormatter = (data: PlannedActualResponseI[]) => {
  const plannedActualFormattedData = {
    headers: plannedActualHeaderFormatter(data),
    list: plannedActualListFormatter(data)
  };
  return plannedActualFormattedData;
};
