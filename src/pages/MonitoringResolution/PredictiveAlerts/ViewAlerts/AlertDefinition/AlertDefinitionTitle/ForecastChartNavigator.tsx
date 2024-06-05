import { FC, useEffect, useState } from 'react';
import { Center, HStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  demandForecastChartRequest,
  dfViewSliceSelector,
  IDFView,
  setSelectedSkuAction
} from 'state/pages/view/demandForecastView/dfViewPageState';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { blue_500, ocean_blue_100, ocean_blue_500, ocean_blue_600 } from 'theme/colors';
import AppText from 'components/newTheme/AppText/AppText';

interface Props {}

const ForecastChartNavigator: FC<Props> = () => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const dfViewState: IDFView = useSelector(dfViewSliceSelector);
  const skuList = dfViewState.selectedSkuList;

  const hasNext = skuList && currentIndex < skuList.length - 1;
  const hasPrevious = currentIndex > 0;

  const handleNext = () => {
    if (hasNext) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (hasPrevious) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  useEffect(() => {
    dispatch(setSelectedSkuAction(currentIndex));
    dispatch(demandForecastChartRequest({ chartType: dfViewState.selectedChartType }));
  }, [currentIndex]);

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
        onClick={handlePrevious}
        bg={ocean_blue_600}
        isDisabled={!hasPrevious}
      />
      <Center h="28px" w="72px" bg={ocean_blue_500} borderRadius="8px">
        <AppText size="body3" color={ocean_blue_100}>
          {`${currentIndex + 1}/${skuList?.length || 0}`}
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
        onClick={handleNext}
        bg={ocean_blue_600}
        isDisabled={!hasNext}
      />
    </HStack>
  );
};

export default ForecastChartNavigator;
