import { FC } from 'react';
import { VStack } from '@chakra-ui/react';
import SelectionSummaryItem from '../../../FCAnalyzerCommonComponents/SelectionSummaryItem/SelectionSummaryItem';
import { ocean_blue_600 } from 'theme/colors';
import { FCAnalyzerSkuResponseI } from 'types/responses/view/forecastAnalyzer';

interface Props {
  skuDetails: FCAnalyzerSkuResponseI | null;
}

const SelectionSummarySection: FC<Props> = ({ skuDetails }) => {
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
      <SelectionSummaryItem label="SKU" value={skuDetails?.sku ?? ''} />
      <SelectionSummaryItem label="Store" value={skuDetails?.store ?? ''} />
      <SelectionSummaryItem label="Department" value={skuDetails?.department ?? ''} />
      <SelectionSummaryItem label="Anchor" value={skuDetails?.anchor ?? ''} />
      <SelectionSummaryItem label="Validation Period" value={skuDetails?.validationPeriod ?? ''} />
    </VStack>
  );
};

export default SelectionSummarySection;
