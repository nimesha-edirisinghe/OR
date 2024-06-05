import { VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { ocean_blue_500 } from 'theme/colors';
import ModelDetailsItem from './ModelDetailsItem';
import { ModelDetailsDataI } from 'types/view/trainingSummary';

interface Props {
  modelInfo: ModelDetailsDataI;
}

const ModelDetailsSection: FC<Props> = ({ modelInfo }) => {
  return (
    <VStack
      bg={ocean_blue_500}
      h="154px"
      w="full"
      borderRadius="8px"
      p="16px"
      align="start"
      spacing="8px"
    >
      <ModelDetailsItem label="Model Name" value={modelInfo.modelName} />
      <ModelDetailsItem label="Frequency" value={modelInfo.frequency} />
      <ModelDetailsItem label="Model Type" value={modelInfo.modelType} />
      <ModelDetailsItem label="Forecasting Variable" value={modelInfo.forecastingVariable} />
      <ModelDetailsItem label="Influencing Factor" value={modelInfo.influencingFactor} />
    </VStack>
  );
};

export default ModelDetailsSection;
