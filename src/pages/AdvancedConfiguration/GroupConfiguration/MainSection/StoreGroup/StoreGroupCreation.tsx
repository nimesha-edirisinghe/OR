import { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  IGroupConfigurationSlice,
  groupConfigurationSliceSelector
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import FilterItemsSelectionDrawer from './StoreGroupCreation/AnchorLocationFilter/FilterItemsSelectionDrawer/FilterItemsSelectionDrawer';
import StoreGroupCreationDrawer from './StoreGroupCreation/StoreGroupCreationStepper';

interface GroupCreationProps {}

const StoreGroupCreation: FC<GroupCreationProps> = (GroupCreationProps) => {
  const groupConfigurationSlice: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );

  return (
    <>
      <FilterItemsSelectionDrawer
        isOpen={!!groupConfigurationSlice.groupFilter?.filterLocalScope.isOpenItemSelectionDrawer}
      />
      <StoreGroupCreationDrawer />
    </>
  );
};

export default StoreGroupCreation;
