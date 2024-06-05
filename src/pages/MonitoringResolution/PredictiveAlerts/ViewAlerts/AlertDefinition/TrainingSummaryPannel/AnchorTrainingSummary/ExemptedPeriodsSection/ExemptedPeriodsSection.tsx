import { HStack, VStack } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import useScrollState from 'hooks/useScrollState';
import { FC } from 'react';
import { neutral_100, ocean_blue_400, ocean_blue_50, ocean_blue_500 } from 'theme/colors';
import { scrollbarYStyles } from 'theme/styles';
import { ExemptedPeriodsInfoI } from 'types/view/trainingSummary';

interface Props {
  exemptedPeriodsInfo: ExemptedPeriodsInfoI[];
}

const ExemptedPeriodsSection: FC<Props> = ({ exemptedPeriodsInfo }) => {
  const [scroll, handleMouseEnter, handleMouseLeave] = useScrollState();

  return (
    <VStack
      h="136px"
      w="full"
      justify="start"
      spacing={0}
      align="start"
      p="16px"
      bg={ocean_blue_500}
      borderRadius="8px"
    >
      <AppText size="body3" color={ocean_blue_50}>
        Exempted Periods
      </AppText>
      <VStack
        w="full"
        align="start"
        pt="8px"
        __css={scrollbarYStyles}
        gap="2px"
        maxH={'50px'}
        overflow="hidden"
        overflowY={scroll}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {exemptedPeriodsInfo.length === 0 ? (
          <AppText size="h5Semibold" color={neutral_100}>
            _
          </AppText>
        ) : (
          exemptedPeriodsInfo?.map((infoItem, index) => (
            <HStack
              borderRadius="4px"
              h="18px"
              bg={ocean_blue_400}
              p="8px"
              key={index}
              minW="163px"
            >
              <AppText
                size="body3"
                color={neutral_100}
                noOfLines={1}
                style={{ wordBreak: 'break-all' }}
              >{`${infoItem.start_date} to ${infoItem.end_date}`}</AppText>
            </HStack>
          ))
        )}
      </VStack>
    </VStack>
  );
};

export default ExemptedPeriodsSection;
