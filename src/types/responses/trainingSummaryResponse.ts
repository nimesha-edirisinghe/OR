import {
  AlgorithmsT,
  ExemptedPeriodsInfoI,
  ModelKpiI,
  ModelTypesT,
  OutlierGraphDataI,
  OutputLayerInfoI,
  TimeBreakdownT,
  VariableImportanceT
} from 'types/view/trainingSummary';
import { ScheduleType } from './jobScheduleResponses';

export interface TrainingSummaryDataResponseI {
  modelName: string;
  modelType: ModelTypesT;
  updatedBy: string;
  frequency: ScheduleType;
  updatedOn: number | null;
  forecastingVariable: string;
  influencingFactor: number | null;
  modelKpi: ModelKpiI;
  outlierGraph: OutlierGraphDataI[];
  algorithms: AlgorithmsT[];
  timeBreakdown: TimeBreakdownT;
  variableImportance: VariableImportanceT[];
  exemptionPeriods: ExemptedPeriodsInfoI[] | null | [];
  outputLayerInfo: OutputLayerInfoI;
}
