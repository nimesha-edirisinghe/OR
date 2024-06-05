import { FC, KeyboardEvent, useState } from 'react';
import { Center, HStack } from '@chakra-ui/react';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { blue_500, ocean_blue_100, ocean_blue_600 } from 'theme/colors';
import AppText from 'components/newTheme/AppText/AppText';
import { Navigator } from 'hooks/useNavigator';
import AppInput from 'components/newTheme/AppInput/AppInput';
import { showErrorToast } from 'state/toast/toastState';
import { GetAlertList } from 'types/responses/alertConfigResponse';

interface Props {
  graphNavigator: Navigator<GetAlertList>;
}

const ForecastChartNavigator: FC<Props> = ({ graphNavigator }) => {
  const [currantPosEdit, setCurrantPosEdit] = useState(false);
  const [currentPos, setCurrantPos] = useState(0);

  const onInputChange = (e: any) => {
    setCurrantPos(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement> | KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.defaultPrevented) {
      e.preventDefault();

      if (currentPos >= graphNavigator.steps.length || currentPos <= 0) {
        showErrorToast('Enter valid number');
        return false;
      }

      graphNavigator.goTo(currentPos - 1);
      setCurrantPosEdit(false);
    }
  };

  const startNavigationInputChange = () => {
    setCurrantPosEdit(true);
    setCurrantPos(graphNavigator.currentStepIndex + 1);
  };

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
        {!currantPosEdit && (
          <AppText size="body3" color={ocean_blue_100} onClick={startNavigationInputChange}>
            {`${graphNavigator.currentStepIndex + 1}/${graphNavigator.steps.length || 0}`}
          </AppText>
        )}
        {currantPosEdit && (
          <AppInput
            autoFocus
            onChange={(e: any) => onInputChange(e)}
            onKeyDown={(e) => handleKeyPress(e)}
            value={`${currentPos}`}
            h="25px"
            fontSize="12px"
            textAlign="center"
            maxLength={3}
            bg={ocean_blue_600}
            borderRadius={'8px'}
          />
        )}
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
