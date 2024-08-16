import { FC } from 'react';
import { VStack } from '@chakra-ui/layout';
import AppScheduling from 'components/AppScheduling/AppScheduling';
// import AppCheckboxWithLabel from 'components/AppCheckboxWithLabel/AppCheckboxWithLabel';
import { useDispatch, useSelector } from 'react-redux';
import {
  jobScheduleSliceSelector,
  removeScheduleJobRequest,
  setJobScheduleConfig,
  updateJobScheduleState
} from 'state/pages/shared/jobScheduling/jobSchedulingState';
import { closeDrawer } from 'state/pages/advancedConfiguration/forecastConfigurationPage/pageState';
import useAccessType from 'hooks/useMenuAccessType';
import { hasAccessPermission } from 'utils/permissions';
import { AccessPermissionEnum, MenuItems } from 'utils/enum';

interface TrainingTabProps {}

const TrainingTab: FC<TrainingTabProps> = () => {
  const dispatch = useDispatch();
  const jobScheduleState = useSelector(jobScheduleSliceSelector);
  const selectedScheduleType = jobScheduleState.jobSchedulingData.scheduleType;

  const repeatEveryOnChangeHandler = (selectedOption: { key: string; value: string }) => {
    if (selectedScheduleType !== selectedOption.key) {
      dispatch(
        setJobScheduleConfig({
          field: 'scheduleType',
          value: selectedOption.key
        })
      );
    }
  };

  const onChangeTrainingFrequency = (value: number) => {
    dispatch(
      setJobScheduleConfig({
        field: 'frequency',
        value: value
      })
    );
  };

  const onChangeTrainingDay = (value: number) => {
    dispatch(
      setJobScheduleConfig({
        field: 'repeatOnDays',
        value: value
      })
    );
  };

  const setEsEnabledHandler = (isActive: boolean) => {
    const activeState = isActive ? 1 : 0;
    dispatch(updateJobScheduleState(activeState));
  };

  const onRemoveSchedule = () => {
    dispatch(closeDrawer());
    dispatch(removeScheduleJobRequest());
  };

  const accessType = useAccessType(MenuItems.FORECASTING_SETUP_AND_SCHEDULING);
  const accessNotAllowed = !hasAccessPermission(accessType, [AccessPermissionEnum.SCHEDULE]);

  return (
    <VStack pt="8px" spacing="20px" align="start">
      <AppScheduling
        repeatEveryOnChange={repeatEveryOnChangeHandler}
        onChangeFrequency={onChangeTrainingFrequency}
        onChangeDay={onChangeTrainingDay}
        onDeleteHandler={onRemoveSchedule}
        setEsEnabledHandler={setEsEnabledHandler}
        isDisabled={accessNotAllowed}
      />
    </VStack>
  );
};

export default TrainingTab;
