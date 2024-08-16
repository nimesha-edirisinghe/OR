import { FC } from 'react';
import { Center, HStack } from '@chakra-ui/react';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { blue_500, ocean_blue_100, ocean_blue_600 } from 'theme/colors';
import AppText from 'components/newTheme/AppText/AppText';
import { Navigator } from 'hooks/useNavigator';

import { GetAlertList } from 'types/responses/alertConfigResponse';

interface Props {
  graphNavigator: Navigator<GetAlertList>;
}

const ForecastChartNavigator: FC<Props> = ({ graphNavigator }) => {
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
      <Center h="28px" w="72px" bg={ocean_blue_600} borderRadius="8px">
        <AppText size="body3" color={ocean_blue_100}>
          {`${graphNavigator.currentStepIndex + 1}/${graphNavigator.steps.length || 0}`}
        </AppText>
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
