import { HStack } from '@chakra-ui/react';
import { FC } from 'react';
import AccuracyCard from '../../../FCAnalyzerCommonComponents/AccuracyCard/AccuracyCard';
import { AccuracyI } from 'types/responses/view/forecastAnalyzer';

interface Props {
  accuracyData: AccuracyI | null;
}

const AccuracySection: FC<Props> = ({ accuracyData }) => {
  const overallAccuracy = accuracyData?.overallAccuracy;
  const averageAccuracy = accuracyData?.averageAccuracy;
  const averageDeviation = accuracyData?.averageDeviation;
  return (
    <HStack h="80px" flex={1} spacing="16px">
      <AccuracyCard
        name="Overall Accuracy"
        heading={overallAccuracy?.heading}
        value={overallAccuracy?.values}
      />
      <AccuracyCard
        name="Average Accuracy"
        heading={averageAccuracy?.heading}
        value={averageAccuracy?.values}
      />
      <AccuracyCard
        name="Average Deviation"
        heading={averageDeviation?.heading}
        value={averageDeviation?.values}
      />
    </HStack>
  );
};

export default AccuracySection;
