import { Box, HStack, VStack } from '@chakra-ui/react';
import AppTooltip from 'components/AppTooltip/AppTooltip';
import AppProgressBar from 'components/newTheme/AppProgressBar/AppProgressBar';
import AppText from 'components/newTheme/AppText/AppText';
import useScrollState from 'hooks/useScrollState';
import { FC, useCallback } from 'react';
import { neutral_100, ocean_blue_50, ocean_blue_500 } from 'theme/colors';
import { scrollbarYStyles } from 'theme/styles';
import { VariableImportanceT } from 'types/view/trainingSummary';

interface Props {
  predictorInfo: VariableImportanceT[];
}

const VariableImportanceSection: FC<Props> = ({ predictorInfo }) => {
  const [scroll, handleMouseEnter, handleMouseLeave] = useScrollState();

  const renderVariableImportanceItem = useCallback(() => {
    return (
      <>
        {predictorInfo?.map((item) => (
          <HStack w="full" pos="relative">
            <Box minW="128px" maxW="128px" h="15px">
              <AppText size="caption" color={neutral_100} noOfLines={1}>
                <AppTooltip label={item?.predictor_name}>{item?.predictor_name}</AppTooltip>
              </AppText>
            </Box>
            <Box w="full">
              <AppProgressBar
                value={item?.feature_value}
                colorScheme="linear-gradient(180deg, #F8705E 0%, #FFA914 100%)"
              />
            </Box>
          </HStack>
        ))}
      </>
    );
  }, [predictorInfo, scroll]);
  return (
    <VStack
      w="full"
      maxH="328px"
      minH="226px"
      bg={ocean_blue_500}
      borderRadius="8px"
      p="16px"
      align="start"
      spacing="8px"
      __css={scrollbarYStyles}
      overflow="hidden"
      overflowY={scroll}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      gap="8px"
    >
      <Box h="18px">
        <AppText size="body3" color={ocean_blue_50} noOfLines={1}>
          Variable Importance
        </AppText>
      </Box>

      {renderVariableImportanceItem()}
    </VStack>
  );
};

export default VariableImportanceSection;
