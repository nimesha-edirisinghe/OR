import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  VStack
} from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StepItem } from 'components/AppStepper/AppStepper';
import {
  IGroupConfigurationSlice,
  groupConfigurationSliceSelector,
  toggleViewGroupConfigDrawer
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { CreateGroupStepsEnum } from 'utils/enum';
import FilterTypeItemList from '../StoreGroupCreation/AnchorLocationFilter/FilterDrawer/FilterTypeItemList';
import InfluencingFactorsPicker from '../StoreGroupCreation/InfluencingFactorsPicker/InfluencingFactorsPicker';
import { blue_500, ocean_blue_100, ocean_blue_600 } from 'theme/colors';

interface Props {
  isOpen: boolean;
}

const steps: StepItem[] = [
  {
    label: CreateGroupStepsEnum.FIRST_STEP
  },
  {
    label: CreateGroupStepsEnum.SECOND_STEP
  },
  {
    label: CreateGroupStepsEnum.THIRD_STEP
  }
];

const StoreGroupViewDrawer: FC<Props> = ({ isOpen }) => {
  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const groupFilter = groupConfigurationState.groupFilter;
  const groupDetailsState = groupConfigurationState.groupDetails;
  const predictors =
    groupConfigurationState.groupLabels?.filter((x) => x.name === 'predictor') ?? [];
  const selectedGroup = groupConfigurationState.selectedGroup;
  const activeStep = groupConfigurationState.groupFilter.filterLocalScope.viewFilterActiveStep;

  const dispatch = useDispatch();

  const renderStepDrawer = useCallback(() => {
    switch (activeStep) {
      case 0:
        return <FilterTypeItemList viewFilter={true} maxH="calc(100vh - 150px)" />;
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
          pl="16px"
          pr="16px"
          pt="22px"
          userSelect="none"
        >
          <DrawerCloseButton mt="10px" color={blue_500} />
          <HStack>
            <VStack align="left">
              <AppText lineHeight="28px" size="body1" fontWeight="600" fontStyle="normal">
                {activeStep == 0 ? 'Anchor Location' : 'Influencing factors'} -{' '}
                {selectedGroup?.groupDesc}
              </AppText>
            </VStack>
          </HStack>
          <Divider color={ocean_blue_100} h="1px" mt="8px" />
          <DrawerBody p={0} overflow="hidden">
            <VStack pt="50px">{renderStepDrawer()}</VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default StoreGroupViewDrawer;
