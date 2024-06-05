import { HStack, VStack } from '@chakra-ui/react';
import AppButton from 'components/newTheme/AppButton/AppButton';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { neutral_200, ocean_blue_600 } from 'theme/colors';

interface Props {}

const SystemInfoSection: FC<Props> = () => {
  const navigate = useNavigate();
  const dataIngestionHandler = () => {
    navigate('/app/data-ingestion-summary');
  };
  const algoExecutionHandler = () => {
    navigate('/app/operations-tracker');
  };
  return (
    <VStack
      minH="156px"
      w="full"
      bg={ocean_blue_600}
      borderRadius="8px"
      py="20px"
      px="6px"
      spacing="8px"
      align="start"
    >
      <VStack px="14px" align="start">
        <AppText size="h3Semibold" color={neutral_200}>
          System Information
        </AppText>
        <AppText size="body2" color={neutral_200}>
          Curious on backend data processing ? Get the most recent status on jobs processing here!
        </AppText>
      </VStack>
      <HStack spacing="8px">
        <AppButton variant="secondary" size="medium" onClick={dataIngestionHandler}>
          Data Ingestion Preview
        </AppButton>
        <AppButton variant="secondary" size="medium" onClick={algoExecutionHandler}>
          Algorithm Execution Preview
        </AppButton>
      </HStack>
    </VStack>
  );
};

export default SystemInfoSection;
