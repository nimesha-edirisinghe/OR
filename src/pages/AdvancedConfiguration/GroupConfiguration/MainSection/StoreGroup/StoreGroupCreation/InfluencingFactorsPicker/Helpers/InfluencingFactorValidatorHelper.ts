import { ERROR_MESSAGES } from 'constants/messages';
import { showErrorToast } from 'state/toast/toastState';
import { GroupLabelI } from 'types/groupConfig';

export const predictorsSelectionValidator = (predictorList: GroupLabelI[]): boolean => {
  for (const predictor of predictorList) {
    if (!predictor.sku && !predictor.anchor) {
      showErrorToast(ERROR_MESSAGES.ERROR_SPECIFY_GRANULARITY);
      return false;
    }
  }
  return true;
};
