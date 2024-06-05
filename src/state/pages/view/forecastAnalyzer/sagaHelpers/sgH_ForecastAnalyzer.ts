import { rightSidePanelFormatForRequest } from 'state/pages/advancedConfiguration/groupConfiguration/sagaHelpers/sgH_groupConfigurations';
import { IDFView } from '../../demandForecastView/dfViewPageState';
import { IGroupConfigurationSlice } from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { ForecastAnalyzerReqBodyI } from 'types/requests/view/forecastAnalyzer';
import { PlannedActualResponseI } from 'types/responses/view/forecastAnalyzer';
import { TableHeader } from 'types/responses/viewResponses';

export const prepareAggregatedFcAnalyzerRequestBody = (
  dfState: IDFView,
  groupConfigurationState: IGroupConfigurationSlice
) => {
  const groupFilter = groupConfigurationState.groupFilter;
  const filters = rightSidePanelFormatForRequest(
    groupFilter.filterLocalScope.rightPanelRetainDataList
  );
  const selectedSkuList = dfState.selectedSkuList;
  const globalSkuSelected = dfState.dfViewLocalScope.globalSkuSelected;

  const obj = {
    anchorKeyList: [] as number[],
    anchorProdKeyList: [] as number[],
    anchorProdModelKeyList: [] as number[],
    forecastKeyList: [] as number[]
  };

  selectedSkuList.forEach((sku) => {
    obj.anchorKeyList.push(sku.anchorKey);
    obj.anchorProdKeyList.push(sku.anchorProdKey);
    obj.anchorProdModelKeyList.push(sku.anchorProdModelKey);
    obj.forecastKeyList.push(sku.forecastKey!);
  });

  return {
    anchorKey: globalSkuSelected ? null : obj.anchorKeyList,
    anchorProdKey: globalSkuSelected ? null : obj.anchorProdKeyList,
    anchorProdModelKey: globalSkuSelected ? null : obj.anchorProdModelKeyList,
    forecastKey: globalSkuSelected ? null : obj.forecastKeyList,
    filters: filters,
    whFlag: 0
  };
};

export const prepareIndividualFcAnalyzerRequestBody = (
  dfState: IDFView,
  groupConfigurationState: IGroupConfigurationSlice
): ForecastAnalyzerReqBodyI => {
  const groupFilter = groupConfigurationState.groupFilter;
  const filters = rightSidePanelFormatForRequest(
    groupFilter.filterLocalScope.rightPanelRetainDataList
  );
  const selectedSkuObj = dfState.selectedSku;

  return {
    anchorKey: [selectedSkuObj?.anchorKey!],
    anchorProdKey: [selectedSkuObj?.anchorProdKey!],
    anchorProdModelKey: [selectedSkuObj?.anchorProdModelKey!],
    forecastKey: [selectedSkuObj?.forecastKey!],
    filters: filters,
    whFlag: 0
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
      row: ['Planned Discounts', ...data.map((i) => `${i.plannedDiscount}%`)]
    });
    list.push({
      id: 1,
      row: ['Actual Discounts', ...data.map((i) => `${i.actualDiscount}%`)]
    });
    list.push({
      id: 2,
      row: ['Out of Stock Days', ...data.map((i) => `${i.outOfStockDays}`)]
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
