import { RightFilterItemContentI } from 'types/groupConfig';

export interface ForecastAnalyzerReqBodyI {
  anchorKey: number[] | null;
  anchorProdKey: number[] | null;
  anchorProdModelKey: number[] | null;
  forecastKey: number[] | null;
  filters: RightFilterItemContentI[];
  whFlag: number;
}
