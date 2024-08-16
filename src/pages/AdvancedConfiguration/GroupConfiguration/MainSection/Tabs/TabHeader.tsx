import { FC } from 'react';
import { Box } from '@chakra-ui/layout';
import AppTab from 'components/newTheme/AppTab/AppTab';
import StoreGroupTab from './StoreGroupTab';
import WarehouseGroup from '../WarehouseGroup/WarehouseGroup';
import {
  IGroupConfigurationSlice,
  groupConfigurationSliceSelector,
  setActiveStoreTab
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { useDispatch, useSelector } from 'react-redux';

interface Props {}

const TabHeader: FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const groupConfigurationSlice: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const selectedTab = groupConfigurationSlice.activeStoreTab;

  const onSelectTabHandler = (index: number) => {
    dispatch(setActiveStoreTab(index));
  };

  return (
    <Box h="full" w="full" alignItems={'start'}>
      <AppTab
        tabs={[
          {
            label: 'Product-store',
            content: <StoreGroupTab />
          },
          { label: 'Product-warehouse', content: <WarehouseGroup /> }
        ]}
        selectedTab={selectedTab}
        onSelectTab={onSelectTabHandler}
        variant="primary"
        tabWidth="130px"
      />
    </Box>
  );
};

export default TabHeader;
