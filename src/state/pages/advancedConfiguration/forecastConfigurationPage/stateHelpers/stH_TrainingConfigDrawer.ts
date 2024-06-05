import { TrainingConfigI } from 'types/forecastConfig';
import { IPage } from '../pageState';
import { findKeyByValue } from 'utils/utility';
import { fCSettings } from 'utils/constants';

export const _updateTreeSelection = (
  state: IPage,
  action: {
    payload: any;
    type: string;
  }
) => {
  try {
    const { isSelected, selectedKey } = action.payload; // destructure action payload
    const fCState = state.trainingConfigData.algorithmSettings.algorithm_selection.configuration; // get configuration settings from reducer state
    const parentKeyName = findKeyByValue(fCSettings, selectedKey); // find parent key name by value

    // Logic for update trainingConfigData states
    if (isSelected) {
      if (parentKeyName !== selectedKey && !fCState[parentKeyName].includes(selectedKey)) {
        fCState[parentKeyName].push(selectedKey);
      } else {
        fCState[parentKeyName] = fCSettings[parentKeyName];
      }
    } else {
      if (parentKeyName === selectedKey) {
        fCState[parentKeyName].splice(0, fCState[parentKeyName].length);
      } else {
        const index = fCState[parentKeyName].indexOf(selectedKey);
        fCState[parentKeyName].splice(index, 1);
      }
    }
  } catch (error) {
    // TODO:
  }
};

export const _resetTrainingConfigurations = (state: IPage) => {
  const isUnivariate = !state.trainingConfigData.predictors.length;
  if (!isUnivariate) {
    state.trainingConfigData.predictors
      .sort((a, b) => (a.predictorName > b.predictorName ? 1 : -1))
      .map((predictor) => {
        predictor.direction = 'None';
        predictor.isActive = 1;
        predictor.predictorRank = 0;
      });
  }

  const algorithmSelection =
    state.trainingConfigData.algorithmSettings.algorithm_selection.configuration;
  algorithmSelection.ml_dl_algorithms = ['DL', 'ML', 'prophet'];
  algorithmSelection.parametric_algorithms = ['sarima'];
  algorithmSelection.ensemble_algorithms = [];
  if (isUnivariate) {
    algorithmSelection.smoothing_algorithms = [
      'holt_winters',
      'loess',
      'moving_average',
      'naive',
      'simple_average',
      'stochastic_smoothing'
    ];
  }

  state.trainingConfigData.algorithmSettings.penalized_error.weight_matrix = [
    { lower_limit: '-inf', upper_limit: 'inf', penalty: '' }
  ];

  const advancedConfig = state.trainingConfigData.algorithmSettings.advanced_configurations;
  advancedConfig.model_selection_criteria = 'RMSE';
  advancedConfig.exemption_periods = [{ start_date: '', end_date: '' }];
  advancedConfig.cross_validation = false;
  advancedConfig.outlier_detection = false;
  state.trainingConfigData.algorithmSettings.start_date = '';
  state.trainingConfigLocalScope.exemptionPeriodsCheckboxChecked = false;
  state.trainingConfigLocalScope.trainModelFromCheckBoxChecked = false;
};

export const _getForecastConfigDataSuccess = (
  state: IPage,
  action: { payload: TrainingConfigI }
) => {
  try {
    state.isLoading = false;
    action.payload.predictors.sort((a, b) => (a.predictorRank > b.predictorRank ? 1 : -1));
    state.trainingConfigData = action.payload;
    if (
      state.trainingConfigData.algorithmSettings.advanced_configurations.exemption_periods
        .length === 0
    ) {
      state.trainingConfigData.algorithmSettings.advanced_configurations.exemption_periods.push({
        start_date: '',
        end_date: ''
      });
      state.trainingConfigLocalScope.exemptionPeriodsCheckboxChecked = false;
    } else {
      state.trainingConfigLocalScope.exemptionPeriodsCheckboxChecked = true;
    }

    if (state.trainingConfigData.algorithmSettings.penalized_error.weight_matrix.length === 0) {
      state.trainingConfigData.algorithmSettings.penalized_error.weight_matrix.push({
        lower_limit: '-inf',
        upper_limit: 'inf',
        penalty: ''
      });
    }
    if (!state.trainingConfigData.algorithmSettings.start_date) {
      state.trainingConfigData.algorithmSettings.start_date = '';
      state.trainingConfigLocalScope.trainModelFromCheckBoxChecked = false;
    } else {
      state.trainingConfigLocalScope.trainModelFromCheckBoxChecked = true;
    }
  } catch (error) {
    console.error('get forecast config ', error);
  }
};
