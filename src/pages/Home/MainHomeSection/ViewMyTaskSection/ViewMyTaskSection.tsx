import { HStack, VStack } from '@chakra-ui/react';
import AppButton from 'components/newTheme/AppButton/AppButton';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { green_500, neutral_200, ocean_blue_600 } from 'theme/colors';

interface Props {}

const ViewMyTaskSection: FC<Props> = () => {
  const navigate = useNavigate();

  const viewTaskHandler = () => {
    navigate('/app/vl/task-board');
  };
  return (
    <VStack
      minH="176px"
      w="full"
      bg={ocean_blue_600}
      borderRadius="8px"
      py="20px"
      px="6px"
      align="start"
    >
      <VStack px="14px" align="start">
        <AppText color={neutral_200} size="h3Semibold">
          Efficiently manage replenishment plans and request purchase orders.
        </AppText>
        <HStack spacing="8px">
          <AppText color={green_500} size="h1Semibold">
            18
          </AppText>
          <AppText color={neutral_200} size="body2">
            Tasks to be completed
          </AppText>
        </HStack>
      </VStack>
      <AppButton variant="secondary" size="medium" onClick={viewTaskHandler}>
        View My Tasks
      </AppButton>
    </VStack>
  );
};

export default ViewMyTaskSection;
