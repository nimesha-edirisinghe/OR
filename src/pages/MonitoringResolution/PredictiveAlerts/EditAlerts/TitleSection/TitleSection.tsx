import { FC } from 'react';
import { HStack, VStack } from '@chakra-ui/react';
import { IAlert, alertSliceSelector } from 'state/pages/monitoringAndResolution/Alert/alertState';
import { useDispatch, useSelector } from 'react-redux';
import AppInput from 'components/AppInput/AppInput';
import AppText from 'components/AppText/AppText';
import AppButton from 'components/AppButton/AppButton';
import { neutral_400, neutral_500 } from 'theme/colors';

interface Props {}

const TitleSection: FC<Props> = () => {
  const alertState: IAlert = useSelector(alertSliceSelector);

  const dispatch = useDispatch();

  return (
    <VStack
      w="full"
      h="auto"
      py="2px"
      userSelect="none"
      spacing="35px"
      justify="space-between"
      align="start"
    >
      <VStack align="start" spacing="4px">
        <AppText fontWeight={400} fontSize="12px" lineHeight="18px" color={neutral_400}>
          Alert Title
        </AppText>
        <AppInput
          h="40px"
          w="400px"
          onChange={() => {}}
          fontSize="14px"
          fontWeight={400}
          borderColor={neutral_500}
        />
      </VStack>
      <HStack spacing="26px">
        <VStack spacing="0px" align="start">
          <AppText fontWeight={300} fontSize="32px" lineHeight="43px" color="#FFE98A">
            150
          </AppText>
          <AppText fontWeight={400} fontSize="14px" lineHeight="18px" color="#FCFCFC">
            SKU Locations
          </AppText>
        </VStack>
        <AppButton variant="outline" onClick={() => {}} px="14px" py="8px" h="34px">
          <AppText fontWeight={400} fontSize="14px" lineHeight="22px" color="#FFFFFF">
            Modify List
          </AppText>
        </AppButton>
      </HStack>
    </VStack>
  );
};

export default TitleSection;
