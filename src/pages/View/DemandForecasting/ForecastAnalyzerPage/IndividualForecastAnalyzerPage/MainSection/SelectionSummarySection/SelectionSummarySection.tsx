import { VStack } from '@chakra-ui/react';
import { FC } from 'react';
import SelectionSummaryItem from '../../../FCAnalyzerCommonComponents/SelectionSummaryItem/SelectionSummaryItem';
import { ocean_blue_600 } from 'theme/colors';
import { FCAnalyzerSkuResponseI } from 'types/responses/view/forecastAnalyzer';
import { transformSkuObjectToArray } from '../../../helper';

interface Props {
  skuDetails: FCAnalyzerSkuResponseI | null;
}

const SelectionSummarySection: FC<Props> = ({ skuDetails }) => {
  const formattedSkuList = transformSkuObjectToArray(skuDetails);

  return (
    <VStack
      h="170px"
      flex={1}
      spacing="12px"
      p="16px"
      align="start"
      bg={ocean_blue_600}
      borderRadius="8px"
    >
      {formattedSkuList?.map((item) => (
        <SelectionSummaryItem key={item.id} label={item.label} value={item.value} />
      ))}
    </VStack>
  );
};

export default SelectionSummarySection;
