import { Center, HStack, usePrevious } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import AppText from 'components/newTheme/AppText/AppText';
import { Navigator } from 'hooks/useNavigator';
import { FC } from 'react';
import { blue_500, ocean_blue_100, ocean_blue_500, ocean_blue_600 } from 'theme/colors';

interface Props<T> {
  navigator: Navigator<T>;
  totalCount?: number | null;
}

const AppNavigation: FC<Props<any>> = ({ 
  navigator, totalCount }) => {
  return (
    <HStack gap={0} spacing={1} h="28px">
      <AppIconButton
        aria-label="maximize"
        icon={
          <AppIcon
            transition="transform 0.25s ease"
            name="chevronLeft"
            width="14px"
            height="14px"
            fill={blue_500}
          />
        }
        variant="secondary"
        size="iconMedium"
        onClick={() => {
          navigator.back();
        }}
        bg={ocean_blue_600}
        isDisabled={navigator.isFirstStep}
        h="28px"
        w="28px"
        p="7px"
      />
      <Center h="28px" w="72px" bg={ocean_blue_500} borderRadius="8px">
        <AppText size="body3" color={ocean_blue_100} px="16px" py="10px">
          {navigator.currentStepIndex + 1}/{totalCount ? totalCount : navigator.steps.length || 0}
        </AppText>
      </Center>
      <AppIconButton
        aria-label="maximize"
        icon={
          <AppIcon
            transition="transform 0.25s ease"
            name="chevronRight"
            width="14px"
            height="14px"
            fill={blue_500}
          />
        }
        variant="secondary"
        size="iconMedium"
        onClick={() => {
          navigator.next();
        }}
        bg={ocean_blue_600}
        isDisabled={navigator.isLastStep}
        h="28px"
        w="28px"
        p="7px"
      />
    </HStack>
  );
};

export default AppNavigation;
