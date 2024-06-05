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
import { closeRplDrawer } from 'state/pages/advancedConfiguration/replenishmentConfigurationPage/rplConfigPageState';

interface ReplenishmentPlanningTabProps {}

const ReplenishmentPlanningTab: FC<ReplenishmentPlanningTabProps> = () => {
  const dispatch = useDispatch();
  const jobScheduleState = useSelector(jobScheduleSliceSelector);
  // const isSelectedExecOption = jobScheduleState.jobSchedulingData?.additionalConfig?.etlValidation;
  const selectedScheduleType = jobScheduleState.jobSchedulingData.scheduleType;

  // const onChangeHandler = (value: boolean) => {
  //   dispatch(
  //     setJobScheduleConfig({
  //       field: 'etlValidation',
  //       value: value
  //     })
  //   );
  // };

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
    dispatch(closeRplDrawer());
    dispatch(removeScheduleJobRequest());
  };

  return (
    <VStack pt="41px" spacing="20px" align="start">
      <AppScheduling
        repeatEveryOnChange={repeatEveryOnChangeHandler}
        onChangeFrequency={onChangeTrainingFrequency}
        onChangeDay={onChangeTrainingDay}
        onDeleteHandler={onRemoveSchedule}
        setEsEnabledHandler={setEsEnabledHandler}
      />
    </VStack>
  );
};

export default ReplenishmentPlanningTab;
