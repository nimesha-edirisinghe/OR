import { HStack, VStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import {
  neutral_100,
  ocean_blue_100,
  ocean_blue_50,
  ocean_blue_500,
  yellow_500
} from 'theme/colors';
import { DataLengthInfoI } from 'types/view/trainingSummary';
import { dataLengthModelFrequencyFormatter } from '../Helpers/TrainingSummaryDataFormatter';

interface Props {
  dataLengthInfo: DataLengthInfoI;
}

const DataLengthSection: FC<Props> = ({ dataLengthInfo }) => {
  const trainingLengthValue = dataLengthInfo?.train_set?.value;
  const testingLengthValue = dataLengthInfo?.test_set?.value;
  const trainingDateStart = dataLengthInfo?.train_set?.date_period?.start || '_';
  const trainingDateEnd = dataLengthInfo?.train_set?.date_period?.end || '_';
  const testingDateStart = dataLengthInfo?.test_set?.date_period?.start || '_';
  const testingDateEnd = dataLengthInfo?.test_set?.date_period?.end || '_';
  const totalDataLength = dataLengthInfo?.rows || '_';

  const trainingDate =
    trainingDateStart === '_' || trainingDateEnd === '_'
      ? ''
      : `${trainingDateStart} to ${trainingDateEnd}`;
  const testingDate =
    testingDateStart === '_' || testingDateEnd === '_'
      ? ''
      : `${testingDateStart} to ${testingDateEnd}`;

  const formattedFrequency =
    totalDataLength === '_' ? '' : dataLengthModelFrequencyFormatter(dataLengthInfo?.frequency);

  const formattedTrnTestFrequency =
    trainingDate === '' || testingDate === ''
      ? ''
      : dataLengthModelFrequencyFormatter(dataLengthInfo?.frequency);

  return (
    <HStack bg={ocean_blue_500} h="120px" w="full" borderRadius="8px" p="16px" spacing="16px">
      <VStack h="36px" minW="84px" spacing={0} align="start">
        <AppText color={ocean_blue_50} size="body3">
          Data Length
        </AppText>
        <AppText color={neutral_100} size="h5Semibold">
          {`${totalDataLength} ${formattedFrequency}`}
        </AppText>
      </VStack>
      <AppIcon
        transition="transform 0.25s ease"
        name="dashBracket"
        fill={ocean_blue_100}
        h="60px"
        w="16px"
        stroke={ocean_blue_100}
      />
      <VStack spacing="16px">
        <VStack spacing={0} align="start">
          <AppText size="body3" color={ocean_blue_50}>
            Training Data Length
          </AppText>
          <HStack align="end">
            <AppText size="h5Semibold" color={neutral_100}>
              {`${trainingLengthValue} ${formattedTrnTestFrequency}`}
            </AppText>
            <AppText size="caption" color={yellow_500}>
              {trainingDate}
            </AppText>
          </HStack>
        </VStack>
        <VStack spacing={0} align="start">
          <AppText size="body3" color={ocean_blue_50}>
            Testing Data Length
          </AppText>
          <HStack align="end">
            <AppText size="h5Semibold" color={neutral_100}>
              {`${testingLengthValue} ${formattedTrnTestFrequency}`}
            </AppText>
            <AppText size="caption" color={yellow_500}>
              {testingDate}
            </AppText>
          </HStack>
        </VStack>
      </VStack>
    </HStack>
  );
};

export default DataLengthSection;
