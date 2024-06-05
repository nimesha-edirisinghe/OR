import { HStack } from '@chakra-ui/react';
import { FC } from 'react';
import { ocean_blue_600 } from 'theme/colors';
import SKUWithAnchorCard from '../../../FCAnalyzerCommonComponents/SKUWithAnchorCard/SKUWithAnchorCard';
import { KPIResponseI } from 'types/responses/view/forecastAnalyzer';

interface Props {
  kpiData: KPIResponseI | null;
}

const SKUWithAnchorSection: FC<Props> = ({ kpiData }) => {
  const totalSku = kpiData?.totalSku;
  const totalOutOfStockSku = kpiData?.totalOutOfStockSku;
  const totalSkuWithDiscount = kpiData?.totalSkuWithDiscount;
  const newSku = kpiData?.newSku;
  return (
    <HStack
      h="153px"
      w="full"
      spacing="16px"
      bg={ocean_blue_600}
      borderRadius="8px"
      flex={1}
      pr="16px"
    >
      <SKUWithAnchorCard isSkuCard name="Total SKUs in the Anchor" value={totalSku} />
      <SKUWithAnchorCard name="Total Out of Stock SKUs in the Anchor" value={totalOutOfStockSku} />
      <SKUWithAnchorCard
        name="Total SKUs with discount differences in the Anchor"
        value={totalSkuWithDiscount}
      />
      <SKUWithAnchorCard name="Newly Introduced SKUs in the Anchor " value={newSku} />
    </HStack>
  );
};

export default SKUWithAnchorSection;
