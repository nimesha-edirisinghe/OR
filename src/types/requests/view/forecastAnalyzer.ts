import { RightFilterItemContentI } from 'types/groupConfig';
import { FCAnalyzerType } from 'types/view/forecastAnalyzer';

export interface ForecastAnalyzerCommonReqBodyI {
  filters: RightFilterItemContentI[];
  groupKey: number;
  search: string;
}
export interface ForecastAnalyzerReqBodyI {
  anchorProdKey: number;
  groupKey: number;
}
export interface ForecastAnalyzerSKUDetailsQueryParamI {
  type: FCAnalyzerType;
}
