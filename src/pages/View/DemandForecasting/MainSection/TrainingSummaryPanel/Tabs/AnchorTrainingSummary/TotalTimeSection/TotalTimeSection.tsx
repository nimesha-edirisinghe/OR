import { HStack, VStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppText from 'components/newTheme/AppText/AppText';
import useScrollState from 'hooks/useScrollState';
import { FC, useCallback } from 'react';
import {
  neutral_100,
  ocean_blue_100,
  ocean_blue_50,
  ocean_blue_500,
  yellow_500
} from 'theme/colors';
import { scrollbarYStyles } from 'theme/styles';
import { TimeBreakdownT } from 'types/view/trainingSummary';

interface Props {
  timeBreakdown?: TimeBreakdownT;
}

const TotalTimeSection: FC<Props> = ({ timeBreakdown }) => {
  const [scroll, handleMouseEnter, handleMouseLeave] = useScrollState();
  const totalTime =
    timeBreakdown && Object.entries(timeBreakdown).find((value, key) => value[0] === 'Total Time');

  const renderTotalTimeItem = useCallback(() => {
    const breakDown =
      timeBreakdown &&
      Object.entries(timeBreakdown).filter((value, key) => value[0] !== 'Total Time');

    return (
      <>
        {breakDown &&
          breakDown.map((item, index) => (
            <HStack w="full" justify="space-between" align="center" key={index}>
              <AppText color={neutral_100} size="h5Semibold">
                {item[0]}
              </AppText>
              <AppText size="caption" color={yellow_500}>
                {`${item[1]} seconds`}
              </AppText>
            </HStack>
          ))}
      </>
    );
  }, [timeBreakdown, scroll]);

  return (
    <HStack
      w="full"
      h="152px"
      bg={ocean_blue_500}
      borderRadius="8px"
      p="16px"
      align="center"
      spacing="16px"
    >
      <VStack minW="83px" spacing={0} align="start">
        <AppText color={ocean_blue_50} size="body3">
          Total Time
        </AppText>
        <AppText color={neutral_100} size="h5Semibold">
          {totalTime && totalTime[1]} seconds
        </AppText>
      </VStack>
      <AppIcon
        transition="transform 0.25s ease"
        name="dashBracket"
        fill={ocean_blue_100}
        h="104px"
        w="16px"
        stroke={ocean_blue_100}
      />
      <VStack
        spacing="16px"
        maxH="120px"
        w="full"
        align="start"
        __css={scrollbarYStyles}
        top={0}
        gap="16px"
        overflow="hidden"
        overflowY={scroll}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {renderTotalTimeItem()}
      </VStack>
    </HStack>
  );
};

export default TotalTimeSection;
