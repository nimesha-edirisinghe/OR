import { Box, VStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC, useState } from 'react';
import { scrollbarYStyles } from 'theme/styles';
import InfluencingFactorHeader from './InfluencingFactorHeader';
import InfluencingFactorItem from './InfluencingFactorItem';
import { GroupLabelI, InfluencingFactorTypes } from 'types/groupConfig';
import { INSTRUCTION_MESSAGES } from 'constants/messages';
import { ocean_blue_400, white } from 'theme/colors';

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
  const [scroll, setScroll] = useState<boolean>(false);

  return (
    <VStack spacing="0px" borderRadius="6px" w="full">
      {!isReadOnly && (
        <Box w="full" mb="24px">
          <AppText textAlign={'center'} fontWeight={300} size="body3" color={white}>
            {INSTRUCTION_MESSAGES.GRANULARITY_LEVEL_FOR_APPLICABLE_INFLUENCING_FACTORS}
          </AppText>
        </Box>
      )}
      <VStack
        borderRadius={'6px'}
        maxH="calc(100vh - 130px)"
        bg={ocean_blue_400}
        w="full"
        m={'0px !important'}
        onMouseEnter={() => setScroll(true)}
        onMouseLeave={() => setScroll(false)}
      >
        <VStack w={'full'} zIndex={2}>
          <InfluencingFactorHeader isReadOnly={isReadOnly} />
        </VStack>
        <VStack
          w={'full'}
          zIndex={1}
          spacing={0}
          overflowX="hidden"
          mt={'0px !important'}
          overflowY={scroll ? 'scroll' : 'hidden'}
          __css={scrollbarYStyles}
        >
          {influencingFactors?.map((factor, index) => (
            <InfluencingFactorItem
              factor={factor}
              onChangeHandler={onChangeHandler}
              key={index}
              isReadOnly={isReadOnly}
            />
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
};

export default InfluencingFactorsPicker;
