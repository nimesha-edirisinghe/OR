import { ScheduleType } from 'types/responses/jobScheduleResponses';
import { TrainingSummaryDataResponseI } from 'types/responses/trainingSummaryResponse';
import {
  BenchmarkModelInfoI,
  BenchmarkModelsT,
  DataLengthInfoI,
  DataLengthModelFrequencyT,
  ModelDetailsDataI,
  ModelDisplayTypeT,
  ModelFrequencyT,
  ModelKpiI,
  ModelKpiInfoI,
  ModelTypesT,
  OutputLayerInfoI
} from 'types/view/trainingSummary';

export const modelFrequencyFormatter = (key: ScheduleType): ModelFrequencyT => {
  switch (key) {
    case 'DAILY':
      return 'Daily';
    case 'WEEKLY':
      return 'Weekly';
    case 'MONTHLY':
      return 'Monthly';
    default:
      return '';
  }
};

export const modelTypeFormatter = (key: ModelTypesT): ModelDisplayTypeT => {
  switch (key) {
    case 'MULTI-VARIATE':
      return 'Multivariate';
    case 'UNIVARIATE':
      return 'Univariate';
    default:
      return '';
  }
};

export const dataLengthModelFrequencyFormatter = (key: ScheduleType): DataLengthModelFrequencyT => {
  switch (key) {
    case 'DAILY':
      return 'days';
    case 'WEEKLY':
      return 'weeks';
    case 'MONTHLY':
      return 'months';
    default:
      return '';
  }
};

export const modelInfoSectionDataFormatter = (
  trnSummaryObj: TrainingSummaryDataResponseI | null
): ModelDetailsDataI => {
  if (!trnSummaryObj) {
    return {
      modelName: '',
      modelType: '',
      frequency: '',
      forecastingVariable: '',
      influencingFactor: ''
    };
  }

  const { modelName, modelType, frequency, forecastingVariable, influencingFactor } = trnSummaryObj;
  const modelFrequency: ModelFrequencyT = modelFrequencyFormatter(frequency);
  const formattedInfluencingFactor = influencingFactor !== null ? influencingFactor.toString() : '';
  const formattedModelType = modelTypeFormatter(modelType);

  return {
    modelName,
    modelType: formattedModelType,
    frequency: modelFrequency,
    forecastingVariable,
    influencingFactor: formattedInfluencingFactor
  };
};
export const modelDataLengthFormatter = (
  outputLayerInfo: OutputLayerInfoI | undefined,
  frequency: ScheduleType | undefined
): DataLengthInfoI => {
  return {
    frequency: frequency!,
    test_set: outputLayerInfo?.test_set!,
    train_set: outputLayerInfo?.train_set!,
    rows: outputLayerInfo?.rows!
  };
};

export const addSpacesBeforeUppercase = (str: string): string => {
  return str?.replace(/([A-Z])/g, ' $1') || '';
};

export const kpiDataFormatter = (bestPerformAlgo: string, kpiData: ModelKpiI): ModelKpiInfoI => {
  return {
    bestPerformAlgo,
    modelKpi: kpiData
  };
};

export const benchmarkDataFormatter = (outputLayerInfo: OutputLayerInfoI): BenchmarkModelInfoI => {
  return {
    benchmark_model: outputLayerInfo?.benchmark_model!,
    ensemble_method: outputLayerInfo?.ensemble_method!,
    residual_model: outputLayerInfo?.residual_model!
  };
};

export const algorithmMapping: { [key: string]: string } = {
  ml_dl_algorithms: 'ML & DL Algorithms',
  prophet: 'Optimized Prophet',
  DL: 'Deep Learning Algorithms',
  ML: 'Machine Learning Algorithms',
  sarima: 'SARIMA',
  stacking_ensemble: 'Stacking Ensemble',
  blending_ensemble: 'Blending Ensemble',
  weighted_ensemble: 'Weighted Ensemble',
  moving_average: 'Moving Average',
  simple_average: 'Simple Average',
  holt_winters: 'Holt Winters',
  loess: 'Loess',
  naive: 'Naive',
  stochastic_smoothing: 'Stochastic Smoothing'
};

const benchmarkMethodLabels: Record<BenchmarkModelsT, string> = {
  AutoArimaMethod: 'Auto Arima',
  MovingAverageMethod: 'Moving Average',
  NaiveMethod: 'Naive'
};

export const getBenchmarkMethodLabel = (method: BenchmarkModelsT): string => {
  return benchmarkMethodLabels[method];
};
