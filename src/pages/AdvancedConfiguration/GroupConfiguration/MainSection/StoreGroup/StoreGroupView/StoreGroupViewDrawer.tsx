import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  HStack,
  VStack
} from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IGroupConfigurationSlice,
  groupConfigurationSliceSelector,
  resetGroupDetail,
  resetGroupFilter,
  toggleViewGroupConfigDrawer
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import FilterTypeItemList from '../StoreGroupCreation/AnchorLocationFilter/FilterDrawer/FilterTypeItemList';
import InfluencingFactorsPicker from '../StoreGroupCreation/InfluencingFactorsPicker/InfluencingFactorsPicker';
import { blue_500, neutral_100, ocean_blue_100, ocean_blue_600 } from 'theme/colors';
import { scrollbarYStyles } from 'theme/styles';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import AppButton from 'components/newTheme/AppButton/AppButton';

interface Props {
  isOpen: boolean;
}

const StoreGroupViewDrawer: FC<Props> = ({ isOpen }) => {
  const dispatch = useDispatch();
  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const groupDetailsState = groupConfigurationState.groupDetails;
  const predictors =
    groupConfigurationState.groupLabels?.filter((x) => x.name === 'predictor') ?? [];
  const activeStep = groupConfigurationState.groupFilter.filterLocalScope.viewFilterActiveStep;

  const renderStepDrawer = useCallback(() => {
    switch (activeStep) {
      case 0:
        return <FilterTypeItemList viewFilter={true} />;
      case 1:
        return (
          <InfluencingFactorsPicker
            influencingFactors={predictors}
            onChangeHandler={() => {}}
            isReadOnly={true}
          />
        );
      default:
        break;
    }
  }, [activeStep, predictors, groupDetailsState]);

  const onCloseDrawer = () => {
    dispatch(resetGroupFilter());
    dispatch(resetGroupDetail());
    dispatch(toggleViewGroupConfigDrawer({ state: false }));
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={() => onCloseDrawer()}>
        <DrawerOverlay />
        <DrawerContent
          maxH="100vh"
          bg={ocean_blue_600}
          maxW="600px"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          w="600px"
          px="16px"
          pt="22px"
          userSelect="none"
          gap={'10px'}
        >
          <HStack justify="space-between" w="full">
            <HStack spacing="12px">
              <AppIconButton
                aria-label="back"
                variant="iconPrimary"
                size="iconLarge"
                justifyContent="center"
                alignItems="center"
                icon={<AppIcon name="singleLeftArrow" w="24px" h="24px" fill={blue_500} />}
                onClick={onCloseDrawer}
              />
              <AppText fontSize="13px" fontWeight="600" color={neutral_100}>
                {activeStep == 0 ? 'View Anchor Locations' : 'View Influencing Factors'}
              </AppText>
            </HStack>
            <AppIconButton
              aria-label="close"
              variant="iconPrimary"
              size="iconLarge"
              justifyContent="center"
              alignItems="center"
              icon={<AppIcon name="cross" stroke={blue_500} w="24px" h="24px" />}
              onClick={onCloseDrawer}
            />
          </HStack>
          <DrawerBody p={0} overflow={'hidden'}>
            <VStack
              maxH={'calc(100vh - 120px)'}
              pb={'25px'}
              overflowY={'scroll'}
              __css={scrollbarYStyles}
            >
              {renderStepDrawer()}
            </VStack>
          </DrawerBody>
          <DrawerFooter p={0}>
            <HStack pb={'15px'} w="full" justify="end">
              <AppButton variant="primary" size="medium" onClick={onCloseDrawer} px="25px">
                Okay
              </AppButton>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default StoreGroupViewDrawer;
