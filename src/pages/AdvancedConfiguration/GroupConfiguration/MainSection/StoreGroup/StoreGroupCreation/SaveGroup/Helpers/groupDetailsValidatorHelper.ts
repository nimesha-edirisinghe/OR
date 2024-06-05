import { ERROR_MESSAGES } from 'constants/messages';
import { showErrorToast } from 'state/toast/toastState';
import { GroupDetailsI } from 'types/groupConfig';
import { ScheduleType } from 'types/responses/jobScheduleResponses';

const isInvalidInput = (frequency: ScheduleType, horizon: number, name: string): boolean => {
  return frequency === null || horizon === 0 || name.trim() === '';
};

export const groupDetailsValidator = (groupDetails: GroupDetailsI): boolean => {
  const { frequency, horizon, name } = groupDetails;

  if (isInvalidInput(frequency, horizon, name)) {
    showErrorToast(ERROR_MESSAGES.ERROR_MESSAGE_ALL_FIELDS_MANDATORY);
    return false;
  }

  return true;
};
