import { DataIngestionSummaryDataListT } from 'types/responses/dataIngestionSummaryResponses';
import { GetUploadHistoryDataItemT } from 'types/responses/viewResponses';
import { timeStampToDateString, findObject, etlStatusTypes } from 'utils/utility';
import { formatTimeDuration } from 'utils/dateTimeUtils';
import { RplParameterSummaryListI } from 'types/responses/replenishmentRecommendation/orderParameter';

export const formatRowData = (uploadHistoryData: GetUploadHistoryDataItemT[]) => {
  if (!uploadHistoryData) return null;

  return uploadHistoryData.map(
    ([id, filename, system, timestamp, product, size, status, success]) => ({
      id,
      row: [
        filename,
        system,
        timeStampToDateString(Number(timestamp), 'yyyy-MM-dd hh:mm a'),
        product,
        size,
        status,
        success
      ]
    })
  );
};

export const formatDataIngestionSummaryViewRowData = (
  dataIngestionSummaryViewData: DataIngestionSummaryDataListT[]
) => {
  if (!dataIngestionSummaryViewData) return [];

  return dataIngestionSummaryViewData.map(([id, activity, status, startDate, endDate]) => ({
    id,
    row: [
      id,
      activity,
      findObject(status as string, etlStatusTypes)?.[1],
      timeStampToDateString(Number(startDate), 'yyyy-MM-dd hh:mm a'),
      timeStampToDateString(Number(endDate), 'yyyy-MM-dd hh:mm a'),
      formatTimeDuration(Number(startDate), Number(endDate))
    ]
  }));
};

export const formatOrderParameterRowData = (orderParameterData: RplParameterSummaryListI[]) => {
  if (!orderParameterData) return null;

  return orderParameterData?.map((item, index) => ({
    id: index,
    row: [
      item.sku,
      item.location,
      item.department,
      item.vendor !== null ? item.vendor : '',
      item.wayOfSupply,
      item.warehouse,
      item.unitBuyingPrice,
      item.leadTime,
      item.maxLeadTime,
      item.orderingFrequency,
      item.daysOfCover,
      item.MOQ,
      item.supplyPackSize
    ]
  }));
};
