import { ScheduleType } from 'types/responses/jobScheduleResponses';

export type ModelTypesT = 'MULTI-VARIATE' | 'UNIVARIATE' | '';

export type ModelFrequencyT = 'Weekly' | 'Monthly' | 'Daily' | '';
export type DataLengthModelFrequencyT = 'weeks' | 'months' | 'days' | '';
export type ModelDisplayTypeT = 'Multivariate' | 'Univariate' | '';

export interface PointWiseAccuracyI {
  value: string;
  timeReference: string;
}

export interface OutlierGraphDataI {
  date: string;
  actual: number | null;
  adjusted: number | null;
}

export type TimeBreakdownT = {
  'Total Time': number;
  'Data Pre-Processing': number;
  'Feature Engineering': number;
  'Model Training': number;
  'Output Generation': number;
};

export type AlgorithmsT =
  | 'ml_dl_algorithms'
  | 'prophet'
  | 'DL'
  | 'sarima'
  | 'stacking_ensemble'
  | 'blending_ensemble'
  | 'weighted_ensemble'
  | 'moving_average'
  | 'simple_average'
  | 'holt_winters'
  | 'loess'
  | 'naive'
  | 'stochastic_smoothing';

export type VariableImportanceT = {
  predictor_name: string;
  feature_value: number;
};

export type BenchmarkModelsT = 'AutoArimaMethod' | 'MovingAverageMethod' | 'NaiveMethod';

export interface CandidateModelInfoI {
  model_built_time: number;
  number_of_models: number;
}

export interface TrainTestSetI {
  value: string;
  date_period: {
    end: string;
    start: string;
  };
}

export interface OutputLayerInfoI {
  rows: number;
  columns: number;
  test_set: TrainTestSetI;
  train_set: TrainTestSetI;
  ensemble_model: null;
  residual_model: boolean | null;
  benchmark_model: BenchmarkModelsT;
  ensemble_method: boolean;
  best_performance: string;
  candidate_models: CandidateModelInfoI;
  cross_validation: boolean;
  ensemble_weights: number | null;
  meta_model_method: number | null;
  outlier_detection: boolean;
  pointwise_accuracy: PointWiseAccuracyI[];
  seasonal_component: number;
  fourier_seasonality: number[];
  no_of_fourier_series: number[];
  ensemble_model_predictors: number | null;
  ensemble_method_with_ensemble_algo: number | null;
}

export interface ModelKpiI {
  best_model_kpis: {
    overall_accuracy: string;
    average_pointwise_accuracy: string;
  };
  benchmark_model_kpis: {
    overall_accuracy: number | null;
    average_pointwise_accuracy: number | null;
  };
}

export interface ModelDetailsDataI {
  modelName: string;
  modelType: ModelDisplayTypeT;
  frequency: ModelFrequencyT;
  forecastingVariable: string;
  influencingFactor: string;
}

export interface DataLengthInfoI {
  frequency: ScheduleType;
  test_set: TrainTestSetI;
  train_set: TrainTestSetI;
  rows: number;
}

export interface ExemptedPeriodsInfoI {
  start_date: string;
  end_date: string;
}

export interface ModelKpiInfoI {
  bestPerformAlgo: string;
  modelKpi: ModelKpiI;
}

export interface BenchmarkModelInfoI {
  residual_model: boolean | null;
  benchmark_model: BenchmarkModelsT;
  ensemble_method: boolean;
}
