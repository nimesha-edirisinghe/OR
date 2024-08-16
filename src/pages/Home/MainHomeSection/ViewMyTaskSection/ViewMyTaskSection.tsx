import { HStack, VStack } from '@chakra-ui/react';
import AppButton from 'components/newTheme/AppButton/AppButton';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setActiveSubMenuItem } from 'state/layout/layoutState';
import { IHome, homeSliceSelector } from 'state/pages/home/homeState';
import { green_500, neutral_200, ocean_blue_600 } from 'theme/colors';

interface Props {
  isDisabled?: boolean;
}

const ViewMyTaskSection: FC<Props> = ({ isDisabled = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const taskCountState: IHome = useSelector(homeSliceSelector);
  const taskCount = taskCountState.taskCount;

  const viewTaskHandler = () => {
    if (!isDisabled) {
      dispatch(setActiveSubMenuItem({ subMenuItem: '/app/vl/task-board' }));
      navigate('/app/vl/task-board');
    }
  };

  const formattedTaskCount =
    taskCount && Object.keys(taskCount).length > 0 ? taskCount.POREP : 'No';

  return (
    <VStack
      minH="164px"
      w="full"
      bg={ocean_blue_600}
      borderRadius="8px"
      px="6px"
      align="start"
      justify="center"
    >
      <VStack px="14px" align="start">
        <AppText color={neutral_200} size="h3Semibold">
          Efficiently manage replenishment plans and request purchase orders.
        </AppText>
        <HStack spacing="8px">
          <AppText color={green_500} size="h1Semibold">
            {formattedTaskCount}
          </AppText>
          <AppText color={neutral_200} size="body2">
            Tasks to be completed
          </AppText>
        </HStack>
      </VStack>
      <AppButton
        variant="secondary"
        size="medium"
        onClick={viewTaskHandler}
        isDisabled={isDisabled}
      >
        View My Tasks
      </AppButton>
    </VStack>
  );
};

export default ViewMyTaskSection;
