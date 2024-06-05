import { Box, HStack } from '@chakra-ui/react';
import { FC, useState } from 'react';
import TabHeader from './Tabs/TabHeader';
import { GroupTypes } from 'types/groupConfig';
import StoreGroupTab from './Tabs/StoreGroupTab';
import WarehouseGroupTab from './Tabs/WarehouseGroupTab';
import {
  IGroupConfigurationSlice,
  groupConfigurationSliceSelector
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { useSelector } from 'react-redux';
import { GroupTypesEnum } from 'utils/enum';

interface MainSectionProps {}

const MainSection: FC<MainSectionProps> = () => {
  const [activeTab, setActiveTab] = useState<GroupTypes>('store');
  const groupConfigurationSlice: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const onTabChange = (tab: GroupTypes) => {
    setActiveTab(tab);
  };
  return (
    <Box w="full">
      <HStack w="400px" h="50px" pr="20px" spacing="0px" userSelect="none">
        <TabHeader
          displayName="Store Group"
          onTabChange={onTabChange}
          tabType={GroupTypesEnum.STORE}
          isActive={activeTab === GroupTypesEnum.STORE}
          flex={1}
          groupCount={groupConfigurationSlice.storeGroup?.totalCount || 0}
        />
        <TabHeader
          displayName="Warehouse Group"
          onTabChange={onTabChange}
          tabType={GroupTypesEnum.WAREHOUSE}
          isActive={activeTab === GroupTypesEnum.WAREHOUSE}
          flex={1}
          w="full"
          m={0}
          p={0}
          groupCount={groupConfigurationSlice.warehouseGroupe?.totalCount || 0}
        />
      </HStack>
      <Box>
        {activeTab === GroupTypesEnum.STORE && <StoreGroupTab />}
        {activeTab === GroupTypesEnum.WAREHOUSE && <WarehouseGroupTab />}
      </Box>
    </Box>
  );
};

export default MainSection;
