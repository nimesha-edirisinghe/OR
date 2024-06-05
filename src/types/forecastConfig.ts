import { InfluencingFactorConfigType } from 'pages/AdvancedConfiguration/ForecastConfiguration/InfluencingFactorDrawer/ConfigTypeSelection';

export interface GroupDetailsI {
  groupName: string;
  groupKey: number;
  anchorCount: number;
  skuCount: number;
  forecastKey: number;
  groupDisplayName: string;
}
export interface TableDataI {
  traininConfiguration: string;
  influencingFactor: string;
  scheduled: string;
  trainedUpto: Date;
  forecastedFrom: Date;
  uuid: string;
  groupDetails: GroupDetailsI;
}

export interface CandidateAlgoTreeDataI {
  id: string;
  label: string;
  key: any;
  isSelected: boolean;
  isParent: boolean;
  children: CandidateAlgoTreeDataI[];
  isDisabled?: boolean;
}

export interface TrainingConfigPredictorsI {
  predictorCode: number;
  predictorName: string;
  predictorRank: number;
  direction: 'None' | 'N' | 'P';
  booleanFlag: 1 | 0;
  isActive: 1 | 0;
}

export interface ExemptionPeriodI {
  start_date: string;
  end_date: string;
}

export type MlDlAlgoT = 'ML' | 'prophet' | 'DL';
export type ParametricAlgoT = 'sarima';
export type EnsembleAlgoT = 'stacking_ensemble' | 'blending_ensemble' | 'weighted_ensemble';

export type ModelSelectionCriteria = 'RMSE' | 'MAD' | 'MAPE' | 'WMAD' | 'PENALIZED_ERROR';

export type SmoothingAlgoT =
  | 'moving_average'
  | 'simple_average'
  | 'holt_winters'
  | 'loess'
  | 'naive'
  | 'stochastic_smoothing';

export type LowerLimitT = '-inf' | string;
export type UpperLimitT = 'inf' | string;

export interface WeightMatrixI {
  lower_limit: LowerLimitT;
  upper_limit: UpperLimitT;
  penalty: string;
}

export interface ConfigurationI {
  [key: string]: any;
  ml_dl_algorithms: MlDlAlgoT[];
  smoothing_algorithms: SmoothingAlgoT[];
  parametric_algorithms: ParametricAlgoT[];
  ensemble_algorithms: EnsembleAlgoT[];
}

export interface TrainingConfigI {
  predictors: TrainingConfigPredictorsI[];
  algorithmSettings: {
    algorithm_selection: {
      default: boolean;
      configuration: ConfigurationI;
    };
    advanced_configurations: {
      cross_validation: boolean;
      outlier_detection: boolean;
      model_selection_criteria: ModelSelectionCriteria;
      exemption_periods: ExemptionPeriodI[];
    };
    holidays_country: string;
    start_date: string | null;
    penalized_error: {
      application: boolean;
      weight_matrix: WeightMatrixI[];
    };
  };
}

export interface TrainingConfigLocalI {
  trainingConfigurationDrawer: boolean;
  influencingFactorDrawer: boolean;
  runNowDrawer: boolean;
  jobScheduleDrawer: boolean;
  exemptionPeriodsCheckboxChecked: boolean;
  checkAllPredictionsCheckBoxChecked: boolean;
  trainModelFromCheckBoxChecked?: boolean;
  selectedFcConfigObj?: TableDataI;
  currentPageNo: number;
}

export interface AnchorPredictorConfigI {
  predictor_name: string;
  anchor_key: number;
  predictor_code: number;
  predictor_value: number;
  config_type: InfluencingFactorConfigType;
  is_common: number;
}
export interface FCSKUPredictorI {
  predictorName: string;
  predictorCode: number;
  configType: InfluencingFactorConfigType;
  predictorValue: number;
}

export interface FCEstimatedTimeI {
  estimated_time_sec: number;
  estimated_time_min: number;
  estimated_time_hour: number;
}
