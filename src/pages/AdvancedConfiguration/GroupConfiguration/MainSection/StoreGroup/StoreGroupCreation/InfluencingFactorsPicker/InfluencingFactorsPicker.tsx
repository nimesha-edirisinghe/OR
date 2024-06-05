import { Box, VStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import { scrollbarYStyles } from 'theme/styles';
import InfluencingFactorHeader from './InfluencingFactorHeader';
import InfluencingFactorItem from './InfluencingFactorItem';
import { GroupLabelI, InfluencingFactorTypes } from 'types/groupConfig';
import { INSTRUCTION_MESSAGES } from 'constants/messages';
import { ocean_blue_500 } from 'theme/colors';

interface Props {
  influencingFactors: GroupLabelI[] | [];
  isReadOnly?: boolean;
  onChangeHandler: (factorName: string, type: InfluencingFactorTypes, checked: boolean) => void;
}

const InfluencingFactorsPicker: FC<Props> = ({
  influencingFactors,
  onChangeHandler,
  isReadOnly = false
}) => {
  return (
    <VStack spacing="0px">
      <Box w="full" mb="24px">
        <AppText fontWeight={300} fontSize="12px" fontStyle="italic" color="#B3B3B3">
          {INSTRUCTION_MESSAGES.GRANULARITY_LEVEL_FOR_APPLICABLE_INFLUENCING_FACTORS}
        </AppText>
      </Box>
      <InfluencingFactorHeader />
      <Box
        maxH="calc(100vh - 295px)"
        overflowX="hidden"
        overflowY="auto"
        __css={scrollbarYStyles}
        bg={ocean_blue_500}
        p="10px"
        pb="40px"
        w="full"
        borderRadius="6px"
      >
        <VStack>
          {influencingFactors?.map((factor, index) => (
            <InfluencingFactorItem
              factor={factor}
              onChangeHandler={onChangeHandler}
              key={index}
              isReadOnly={isReadOnly}
            />
          ))}
        </VStack>
      </Box>
    </VStack>
  );
};

export default InfluencingFactorsPicker;
