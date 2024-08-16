import { VStack } from '@chakra-ui/react';
import { FC } from 'react';
import AppScheduling from 'components/AppScheduling/AppScheduling';
import { useDispatch } from 'react-redux';
import {
  removeScheduleJobRequest,
  setJobScheduleConfig,
  updateJobScheduleState
} from 'state/pages/shared/jobScheduling/jobSchedulingState';
import { closeDrawer } from 'state/pages/advancedConfiguration/forecastConfigurationPage/pageState';
import useAccessType from 'hooks/useMenuAccessType';
import { hasAccessPermission } from 'utils/permissions';
import { AccessPermissionEnum, MenuItems } from 'utils/enum';

interface ForecastingTabProps {}

const ForecastingTab: FC<ForecastingTabProps> = () => {
  const dispatch = useDispatch();

  const repeatEveryOnChangeHandler = (selectedOption: { key: string; value: string }) => {
    dispatch(
      setJobScheduleConfig({
        field: 'scheduleType',
        value: selectedOption.key
      })
    );
  };

  const onChangeForecastingFrequency = (value: number) => {
    dispatch(
      setJobScheduleConfig({
        field: 'frequency',
        value: value
      })
    );
  };

  const onChangeForecastingDay = (value: number) => {
    dispatch(
      setJobScheduleConfig({
        field: 'repeatOnDays',
        value: value
      })
    );
  };

  const setEsEnabledHandler = (isActive: boolean) => {
    dispatch(updateJobScheduleState(isActive ? 1 : 0));
  };

  const onRemoveSchedule = () => {
    dispatch(closeDrawer());
    dispatch(removeScheduleJobRequest());
  };

  const accessType = useAccessType(MenuItems.FORECASTING_SETUP_AND_SCHEDULING);
  const accessNotAllowed = !hasAccessPermission(accessType, [AccessPermissionEnum.SCHEDULE]);

  return (
    <VStack pt="8px" spacing="20px">
      <AppScheduling
        repeatEveryOnChange={repeatEveryOnChangeHandler}
        onChangeFrequency={onChangeForecastingFrequency}
        onChangeDay={onChangeForecastingDay}
        onDeleteHandler={onRemoveSchedule}
        setEsEnabledHandler={setEsEnabledHandler}
        isDisabled={accessNotAllowed}
      />
    </VStack>
  );
};

export default ForecastingTab;
