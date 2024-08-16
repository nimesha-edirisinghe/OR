import { FC } from 'react';
import StartOn from './StartOn';
import RepeatEvery from './RepeatEvery';
import RepeatOn from './RepeatOn';
import EndOn from './EndOn';
import { useSelector } from 'react-redux';
import { jobScheduleSliceSelector } from 'state/pages/shared/jobScheduling/jobSchedulingState';
import { timeStampToDateString } from 'utils/utility';
import { VStack } from '@chakra-ui/react';
import ActionSection from './ActionSection';

interface AppSchedulingProps {
  repeatEveryOnChange: (selectedOption: { key: string; value: string }) => void;
  onChangeFrequency: (value: number) => void;
  onChangeDay: (value: number) => void;
  onDeleteHandler: () => void;
  setEsEnabledHandler: (isChecked: boolean) => void;
  isDisabled?: boolean;
}

const AppScheduling: FC<AppSchedulingProps> = ({
  repeatEveryOnChange,
  onChangeFrequency,
  onChangeDay,
  onDeleteHandler,
  setEsEnabledHandler,
  isDisabled = false
}) => {
  const jobScheduleState = useSelector(jobScheduleSliceSelector);
  const schedulingEndDate = jobScheduleState.jobSchedulingData?.endDate;
  const scheduleType = jobScheduleState.jobSchedulingData?.scheduleType;
  const frequency = jobScheduleState.jobSchedulingData.scheduleConfiguration?.frequency;
  const schedulingDay = jobScheduleState.jobSchedulingData.scheduleConfiguration?.days[0];
  const isActive = jobScheduleState.jobScheduleLocalScope.currentEnableStatus;
  const scheduleBatchId = jobScheduleState.jobSchedulingData.scheduleBatchId;

  const formattedEndDate = timeStampToDateString(schedulingEndDate as number, 'yyyy-MM-dd');
  return (
    <VStack spacing="28px">
      <StartOn status={!!isActive} isDisabled={isDisabled} />
      <RepeatEvery
        onChangeOption={repeatEveryOnChange}
        onChangeFrequency={onChangeFrequency}
        frequency={frequency}
        scheduleType={scheduleType!}
        status={!!isActive}
        isDisabled={isDisabled}
      />
      {scheduleType !== 'Days' && scheduleType !== '' && (
        <RepeatOn
          selectedRepeatEveryOption={scheduleType!}
          onChangeDay={onChangeDay}
          selectedDay={schedulingDay}
          status={!!isActive}
          isDisabled={isDisabled}
        />
      )}
      <EndOn selectedDate={formattedEndDate} status={!!isActive} isDisabled={isDisabled} />

      {scheduleBatchId !== null && !isDisabled && (
        <>
          <ActionSection
            onDeleteHandler={onDeleteHandler}
            isEnabled={!!isActive}
            setIsEnabledHandler={setEsEnabledHandler}
          />
        </>
      )}
    </VStack>
  );
};

export default AppScheduling;
