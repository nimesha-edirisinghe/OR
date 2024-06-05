import { Box, Flex, HStack } from '@chakra-ui/layout';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import AppText from 'components/AppText/AppText';
import AppThreeStateSwitch from 'components/AppThreeStateSwitch/AppThreeStateSwitch';
import AppCheckbox from 'components/newTheme/AppCheckbox/AppCheckbox';
import useScrollState from 'hooks/useScrollState';
import { produce } from 'immer';
import { FC, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fcConfigPageSliceSelector,
  checkAllPredictionsToggle,
  reOrderPredictorList,
  updatePredictors
} from 'state/pages/advancedConfiguration/forecastConfigurationPage/pageState';
import { ocean_blue_350, ocean_blue_500, neutral_200 } from 'theme/colors';
import { scrollbarYStyles } from 'theme/styles';
import { TrainingConfigPredictorsI } from 'types/forecastConfig';

interface Props {}

const InfluencingFactorTab: FC<Props> = () => {
  const dispatch = useDispatch();
  const page = useSelector(fcConfigPageSliceSelector);
  const predictors = page.trainingConfigData.predictors;
  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);
  const [scroll, handleMouseEnter, handleMouseLeave] = useScrollState();

  const handleSort = () => {
    let _items = [...predictors];
    const draggedItemContent = _items.splice(dragItem.current, 1)[0];
    _items.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    _items = produce(_items, (draft) => {
      draft.map((predictor, key) => (predictor.predictorRank = key + 1));
    });
    dispatch(reOrderPredictorList(_items));
  };

  const selectedPredictorsCount = useMemo(() => {
    return (predictors && predictors.filter((predictor) => predictor.isActive).length) || 0;
  }, [predictors]);

  return (
    <Box
      maxH="71vh"
      overflowX="hidden"
      __css={scrollbarYStyles}
      overflowY={scroll}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Flex justifyContent="space-between" w="554px" pr="8px">
        <HStack>
          <AppText fontSize="13px" fontWeight="400" color="#57809A" minW="30px">
            {selectedPredictorsCount}/{predictors ? predictors.length : 0}
          </AppText>
          <AppText fontSize="13px" fontWeight="400" color="#57809A">
            influencing factors selected
          </AppText>
        </HStack>
        {predictors && predictors.length > 0 && (
          <HStack justify="flex-end">
            <AppText
              fontSize="13px"
              fontWeight="400"
              textAlign="center"
              w="110px"
              color={'#57809A'}
            >
              Direction
            </AppText>
            <AppCheckbox
              id={0}
              isChecked={predictors && selectedPredictorsCount === predictors.length}
              onChange={(e: any) => dispatch(checkAllPredictionsToggle())}
            />
          </HStack>
        )}
      </Flex>
      <Flex
        w="full"
        mt="8px"
        align="start"
        direction="column"
        transition="all 2s ease"
        gap="13px"
        pr="20px"
      >
        {predictors &&
          predictors.map((predictor: TrainingConfigPredictorsI, index: number) => {
            let predictorDirectionToCount = 0;
            if (predictor.direction === 'N') {
              predictorDirectionToCount = -1;
            }
            if (predictor.direction === 'P') {
              predictorDirectionToCount = 1;
            }

            return (
              <Flex
                draggable
                onDragStart={(e) => (dragItem.current = index)}
                onDragEnter={(e) => (dragOverItem.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
                cursor="pointer"
                transition="all 2s ease"
                w="554px"
                h="44px"
                backgroundColor={ocean_blue_500}
                p="8px"
                justify="space-between"
                borderRadius="4px"
                key={index}
              >
                <HStack alignItems="center">
                  <AppIconChakra name="drag" fill={ocean_blue_350} />
                  <AppText fontSize="12px" fontWeight="400" ml="18px" color={neutral_200}>
                    {predictor.predictorName}
                  </AppText>
                </HStack>
                <HStack>
                  <AppThreeStateSwitch
                    onChange={(count) => {
                      let countToDirection: TrainingConfigPredictorsI['direction'] = 'None';
                      if (count === 1) {
                        countToDirection = 'P';
                      }
                      if (count === -1) {
                        countToDirection = 'N';
                      }
                      dispatch(
                        updatePredictors({ actionType: 'direction', data: countToDirection, index })
                      );
                    }}
                    count={predictorDirectionToCount}
                  />
                  <AppCheckbox
                    id={index + 1}
                    isChecked={!!predictor.isActive}
                    onChange={(e: any, id?: number) =>
                      dispatch(updatePredictors({ actionType: 'check', data: e, index }))
                    }
                  />
                </HStack>
              </Flex>
            );
          })}
      </Flex>
    </Box>
  );
};

export default InfluencingFactorTab;
