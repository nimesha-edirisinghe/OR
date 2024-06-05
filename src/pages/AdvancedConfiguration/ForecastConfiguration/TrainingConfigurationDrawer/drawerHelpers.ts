import { TrainingConfigI, TrainingConfigLocalI } from 'types/forecastConfig';

export const isUnderDefaultSettings = (
  trainingConfigData: TrainingConfigI,
  trainingConfigLocalScope: TrainingConfigLocalI
) => {
  try {
    const isPredictorsDirectionNoneAndAscendingOrderAndNotRanked =
      (trainingConfigData.predictors &&
        trainingConfigData.predictors.every((predictor, index, predictors) => {
          if (predictor.direction !== 'None' || !predictor.isActive || !!predictor.predictorRank) {
            return false;
          }

          let isSorted = true;
          if (predictors[index + 1]) {
            isSorted =
              predictors[index + 1].predictorName.localeCompare(predictor.predictorName) > 0
                ? true
                : false;
          }
          if (!isSorted) {
            return false;
          }
          return true;
        })) ||
      false;

    if (!isPredictorsDirectionNoneAndAscendingOrderAndNotRanked) return false;

    const algorithmSelection =
      trainingConfigData.algorithmSettings.algorithm_selection.configuration;

    if (algorithmSelection.ml_dl_algorithms.length !== 3) return false;
    if (algorithmSelection.parametric_algorithms.length !== 1) return false;
    if (
      !trainingConfigData.predictors.length &&
      algorithmSelection.smoothing_algorithms.length !== 6
    )
      return false;
    if (algorithmSelection.ensemble_algorithms.length > 0) return false;

    const advanceConfigurations = trainingConfigData.algorithmSettings.advanced_configurations;
    if (
      advanceConfigurations.cross_validation ||
      advanceConfigurations.outlier_detection ||
      trainingConfigLocalScope.trainModelFromCheckBoxChecked ||
      trainingConfigLocalScope.exemptionPeriodsCheckboxChecked
    )
      return false;
    if (advanceConfigurations.model_selection_criteria !== 'RMSE') return false;

    return true;
  } catch (e) {
    console.error('error in default training config check ', e);
    return false;
  }
};
