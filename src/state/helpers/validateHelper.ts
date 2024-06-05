import { showErrorToast } from 'state/toast/toastState';
import { ApiResponse } from 'types/api';

export const responseValidator = <T>(
  response: ApiResponse<T>,
  enableToast: boolean = false
): boolean => {
  if (response.status === 0 && enableToast) {
    showErrorToast(response.message);
    return false; // Validation failed
  }

  return true; // Validation passed
};
