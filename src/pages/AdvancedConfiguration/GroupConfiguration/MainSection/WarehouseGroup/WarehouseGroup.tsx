import { FC } from 'react';
import EmptyGroupPanel from '../Tabs/EmptyGroupPanel';
import { GroupTypes } from 'types/groupConfig';
import { Box, Flex, VStack } from '@chakra-ui/react';
import { scrollbarYStyles } from 'theme/styles';
import { useSelector } from 'react-redux';
import {
  IGroupConfigurationSlice,
  groupConfigurationSliceSelector
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import StoreGroupCardView from '../StoreGroup/StoreGroupCard/StoreGroupCardView';
import { AccessPermissionEnum, GroupTypesEnum, MenuItems } from 'utils/enum';
import { useNavigate } from 'react-router-dom';
import useAccessType from 'hooks/useMenuAccessType';
import { hasAccessPermission } from 'utils/permissions';

interface Props {}

const WarehouseGroup: FC<Props> = () => {
  const navigate = useNavigate();
  const groupConfigurationSlice: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const warehouseGroupList = groupConfigurationSlice.warehouseGroupe?.list;
  const accessType = useAccessType(MenuItems.GROUP_CONFIGURATION);
  const accessNotAllowed = !hasAccessPermission(accessType, [AccessPermissionEnum.EDIT]);

  const onClickHandler = (type: GroupTypes) => {
    navigate('/app/group-config/warehouse/create');
  };

  return (
    <>
      <VStack align="stretch" spacing="12px">
        <Box
          h="calc(100vh - 315px)"
          overflow="hidden"
          overflowY="scroll"
          mb={'50px'}
          __css={scrollbarYStyles}
        >
          {warehouseGroupList && warehouseGroupList.length > 0 ? (
            <Flex gap="20px" wrap="wrap" justify="start">
              {warehouseGroupList?.map((warehouseGroup, index) => (
                <StoreGroupCardView
                  key={index}
                  storeGroup={warehouseGroup}
                  groupType={GroupTypesEnum.WAREHOUSE}
                />
              ))}
            </Flex>
          ) : (
            <EmptyGroupPanel
              groupType={GroupTypesEnum.WAREHOUSE}
              onClickHandler={onClickHandler}
              isDisabled={accessNotAllowed}
            />
          )}
        </Box>
      </VStack>
    </>
  );
};

export default WarehouseGroup;
