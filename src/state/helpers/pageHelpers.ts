import { showErrorToast } from 'state/toast/toastState';
import {
  ExemptionPeriodI,
  CandidateAlgoTreeDataI,
  WeightMatrixI,
  AnchorPredictorConfigI,
  FCSKUPredictorI
} from 'types/forecastConfig';
import { ConfigurationI } from 'types/forecastConfig';
import { getDateRange } from 'utils/date';

// Helper function to find the parent item of a given child node
export const findParentItem = (
  treeData: CandidateAlgoTreeDataI[],
  childNode: CandidateAlgoTreeDataI
): CandidateAlgoTreeDataI | undefined => {
  for (const node of treeData) {
    if (node.children && node.children.includes(childNode)) {
      return node;
    }
    if (node.children) {
      const foundItem = findParentItem(node.children, childNode);
      if (foundItem) {
        return foundItem;
      }
    }
  }
  return undefined;
};

export const penalizedErrorValidation = (penalizedErrors: WeightMatrixI[]) => {
  let isValid = true;

  const firstPenalizedError = penalizedErrors.at(0)!;
  if (firstPenalizedError.lower_limit !== '-inf') {
    isValid = false;
    showErrorToast(
      "The initial lower limit of the Penalized Error configuration should be set to '-inf'."
    );
    return;
  }

  const lastPenalizedError = penalizedErrors.at(-1)!;
  if (lastPenalizedError.upper_limit !== 'inf') {
    isValid = false;
    showErrorToast(
      "The final upper limit of the Penalized Error configuration should be set to 'inf'."
    );
    return;
  }

  penalizedErrors.forEach((penalizedError) => {
    if (penalizedError.lower_limit === '' || penalizedError.upper_limit === '') {
      showErrorToast('Input boxes under Penalized Error configuration cannot be empty.');
      isValid = false;
      return;
    }
    if (parseFloat(penalizedError.lower_limit) > parseFloat(penalizedError.upper_limit)) {
      showErrorToast(
        'The value in the Penalized Error lower limit cannot be greater than the upper limit'
      );
      isValid = false;
      return;
    }
  });
  return isValid;
};

export const isValidDateInput = (dateInput: string) => {
  if (dateInput === '') {
    showErrorToast('Input boxes under Exemption period cannot be empty.');
    return false;
  }
  return true;
};

export const exemptionPeriodsValidation = (exemptionPeriods: ExemptionPeriodI[]) => {
  let isValid = true;
  exemptionPeriods.forEach((exemptionPeriod) => {
    if (
      !isValidDateInput(exemptionPeriod.start_date) ||
      !isValidDateInput(exemptionPeriod.end_date)
    ) {
      isValid = false;
      return;
    }
    if (getDateRange(exemptionPeriod.start_date, exemptionPeriod.end_date)) {
      showErrorToast('The maximum period between two dates must not exceed 14 days.');
      isValid = false;
      return;
    }
  });
  return isValid;
};

export const candidateAlgorithmValidation = (algorithmSelection: ConfigurationI) => {
  let isValid = false;
  Object.values(algorithmSelection).forEach((algorithms) => {
    if (algorithms.length > 0) {
      isValid = true;
      return;
    }
  });
  if (!isValid) {
    showErrorToast('Please select at least one Candidate Algorithm');
  }
  return isValid;
};

export const hasFromDatabase = (
  anchorPredictorConfigs: AnchorPredictorConfigI[],
  skuPredictorsConfigs: FCSKUPredictorI[]
) => {
  let fromDb = false;
  if (
    anchorPredictorConfigs.some((predictor) => predictor.config_type === 'From database') ||
    skuPredictorsConfigs.some((predictor) => predictor.configType === 'From database')
  ) {
    fromDb = true;
  }
  return fromDb;
};
