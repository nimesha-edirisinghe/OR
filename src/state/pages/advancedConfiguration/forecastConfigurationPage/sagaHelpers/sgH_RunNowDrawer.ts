import { JobGroupTypes } from 'utils/enum';

export const getJobGroupType = (
  trainingState: boolean,
  forecastingState: boolean
): JobGroupTypes => {
  switch (true) {
    case trainingState && forecastingState:
      return JobGroupTypes.TRAINING_AND_FORECASTING;
    case trainingState:
      return JobGroupTypes.TRAINING;
    default:
      return JobGroupTypes.FORECASTING;
  }
};
