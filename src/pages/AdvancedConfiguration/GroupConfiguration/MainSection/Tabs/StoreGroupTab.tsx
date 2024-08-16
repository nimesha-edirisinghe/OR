import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import StoreGroup from '../StoreGroup/StoreGroup';
import FilterItemsSelectionDrawer from '../StoreGroup/StoreGroupCreation/AnchorLocationFilter/FilterItemsSelectionDrawer/FilterItemsSelectionDrawer';
import StoreGroupViewDrawer from '../StoreGroup/StoreGroupView/StoreGroupViewDrawer';
import {
  IGroupConfigurationSlice,
  groupConfigurationSliceSelector
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { useSelector } from 'react-redux';
import StoreGroupCardEditDrawer from '../StoreGroup/StoreGroupCard/StoreGroupCardEdit/StoreGroupCardEditDrawer';

interface StoreGroupTabProps {}

const StoreGroupTab: FC<StoreGroupTabProps> = () => {
  const groupConfigurationSlice: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const storeGroupViewDrawer =
    groupConfigurationSlice.groupConfigurationLocalScope.storeGroupViewDrawer;
  const isEditDrawerOpen = groupConfigurationSlice.groupConfigurationLocalScope.isEditEnabled;
  const storeGroup = groupConfigurationSlice.selectedGroup!;
  const groupType = groupConfigurationSlice.GroupTypes!;
  return (
    <Box w="full" h="full">
      <FilterItemsSelectionDrawer
        isOpen={!!groupConfigurationSlice.groupFilter?.filterLocalScope.isOpenItemSelectionDrawer}
      />
      <StoreGroupViewDrawer isOpen={storeGroupViewDrawer} />
      <StoreGroupCardEditDrawer
        isOpen={isEditDrawerOpen}
        storeGroup={storeGroup}
        groupType={groupType}
      />
      <StoreGroup />
    </Box>
  );
};

export default StoreGroupTab;
