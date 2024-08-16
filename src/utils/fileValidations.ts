interface FileValidationResultI {
  isValid: boolean;
  errorMessage?: string;
}

export const validateBulkEditForecastFile = (file: File): FileValidationResultI => {
  if (!file.name.toLowerCase().endsWith('.csv')) {
    return { isValid: false, errorMessage: 'Incorrect file format' };
  }

  const startsWithIntegerRegex = /^[0-9]/;
  if (!startsWithIntegerRegex.test(file.name)) {
    return {
      isValid: false,
      errorMessage: 'The file name must start with an integer.'
    };
  }

  const allowedCharactersRegex = /^[a-zA-Z0-9\s\-_.]+$/;
  if (!allowedCharactersRegex.test(file.name)) {
    return {
      isValid: false,
      errorMessage:
        'The file name contains invalid characters. Only letters (a-z, A-Z), numbers (0-9), spaces, hyphens (-), underscores (_), and periods (.) are allowed.'
    };
  }
  if (file.name.length > 100) {
    return {
      isValid: false,
      errorMessage: 'The file name exceeds the maximum allowed length of 100 characters.'
    };
  }

  const maxSizeBytes = 25 * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      isValid: false,
      errorMessage: 'The file size exceeds the maximum allowed limit of 25MB.'
    };
  }

  return { isValid: true };
};
