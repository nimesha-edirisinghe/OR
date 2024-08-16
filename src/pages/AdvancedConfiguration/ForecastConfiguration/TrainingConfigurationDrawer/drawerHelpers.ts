import {
  AdvancesConfigI,
  ConfigurationI,
  TrainingConfigI,
  TrainingConfigLocalI,
  TrainingConfigPredictorsI
} from 'types/forecastConfig';

export type CustomConfigT = 'Custom' | 'Default';

export const isPredictorsInDefaultState = (predictors: TrainingConfigPredictorsI[]) => {
  console.log();
  if (!predictors || predictors.length === 0) {
    return false;
  }
  for (let i = 0; i < predictors.length; i++) {
    const predictor = predictors[i];

    if (predictor.direction !== 'None' || !predictor.isActive) {
      return false;
    }
    if (i < predictors.length - 1 && predictor.predictorName > predictors[i + 1].predictorName) {
      return false;
    }
  }
  return true;
};

export const validateAlgorithmSelection = (trainingConfigData: TrainingConfigI) => {
  const algorithmSelection = trainingConfigData.algorithmSettings.algorithm_selection.configuration;
  if (algorithmSelection.ml_dl_algorithms.length !== 3) return false;
  if (algorithmSelection.parametric_algorithms.length !== 1) return false;
  if (!trainingConfigData.predictors.length && algorithmSelection.smoothing_algorithms.length !== 6)
    return false;
  if (algorithmSelection.ensemble_algorithms.length > 0) return false;
  return true;
};

export const checkAdvancedConfigurations = (
  advanceConfigurations: AdvancesConfigI,
  trainingConfigLocalScope: TrainingConfigLocalI
) => {
  if (
    advanceConfigurations.cross_validation ||
    advanceConfigurations.outlier_detection ||
    trainingConfigLocalScope.trainModelFromCheckBoxChecked ||
    trainingConfigLocalScope.exemptionPeriodsCheckboxChecked
  )
    return false;
  if (advanceConfigurations.model_selection_criteria !== 'RMSE') return false;
  return true;
};

export const isUnderDefaultSettings = (trainingConfigData: TrainingConfigI) => {
  try {
    const validAlgorithmSelection = validateAlgorithmSelection(trainingConfigData);
    if (!validAlgorithmSelection) return false;

    return true;
  } catch (e) {
    console.error('error in default training config check ', e);
    return false;
  }
};

export const isUnderCustomConfigSettings = (
  trainingConfigData: TrainingConfigI,
  trainingConfigLocalScope: TrainingConfigLocalI
): CustomConfigT => {
  try {
    const predictorsInDefaultState = isPredictorsInDefaultState(trainingConfigData.predictors);
    if (!predictorsInDefaultState) return 'Custom';

    const validAlgorithmSelection = validateAlgorithmSelection(trainingConfigData);
    if (!validAlgorithmSelection) return 'Custom';

    const advanceConfigurations = trainingConfigData.algorithmSettings.advanced_configurations;
    const validAdvancedConfigurations = checkAdvancedConfigurations(
      advanceConfigurations,
      trainingConfigLocalScope
    );
    if (!validAdvancedConfigurations) return 'Custom';

    return 'Default';
  } catch (e) {
    console.error('error in default training config check ', e);
    return 'Default';
  }
};
