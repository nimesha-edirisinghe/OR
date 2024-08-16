import { FC } from 'react';
import { Center, Flex, HStack } from '@chakra-ui/react';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { blue_500, ocean_blue_100, ocean_blue_500, ocean_blue_600 } from 'theme/colors';
import AppText from 'components/newTheme/AppText/AppText';
import { Navigator } from 'hooks/useNavigator';
import { DemandForecastSkuListItem } from 'types/responses/viewResponses';

interface Props {
  graphNavigator: Navigator<DemandForecastSkuListItem>;
  isAllSkuSelected: boolean;
  totalSkuCount: number;
}

const ForecastChartNavigator: FC<Props> = ({ graphNavigator, isAllSkuSelected, totalSkuCount }) => {
  const selectedSkuLength = isAllSkuSelected ? totalSkuCount : graphNavigator.steps.length;

  return (
    <HStack spacing="4px">
      <AppIconButton
        aria-label="chevronLeft"
        icon={
          <AppIcon
            transition="transform 0.25s ease"
            name="chevronLeft"
            width="8px"
            height="8px"
            fill={blue_500}
          />
        }
        variant="secondary"
        size="iconSmall"
        onClick={graphNavigator.back}
        bg={ocean_blue_600}
        isDisabled={graphNavigator.isFirstStep}
      />
      <Center h="28px" w="72px" bg={ocean_blue_500} borderRadius="8px">
        <Flex
          h="28px"
          w="72px"
          bg={ocean_blue_600}
          justify={'center'}
          align={'center'}
          borderRadius={'8px'}
        >
          <AppText
            size="body3"
            justifyContent={'center'}
            alignItems={'center'}
            color={ocean_blue_100}
          >
            {`${graphNavigator.currentStepIndex + 1}/${selectedSkuLength || 0}`}
          </AppText>
        </Flex>
      </Center>
      <AppIconButton
        aria-label="chevronRight"
        icon={
          <AppIcon
            transition="transform 0.25s ease"
            name="chevronRight"
            width="8px"
            height="8px"
            fill={blue_500}
          />
        }
        variant="secondary"
        size="iconSmall"
        onClick={graphNavigator.next}
        bg={ocean_blue_600}
        isDisabled={graphNavigator.isLastStep}
      />
    </HStack>
  );
};

export default ForecastChartNavigator;
