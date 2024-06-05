import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import EmptyGroupPanel from '../Tabs/EmptyGroupPanel';
import { GroupTypes } from 'types/groupConfig';
import { Box, Flex, HStack, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import { scrollbarYStyles } from 'theme/styles';
import AppButton from 'components/AppButton/AppButton';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import AppInput from 'components/AppInput/AppInput';
import { IUser, userSliceSelector } from 'state/user/userState';
import { useDispatch, useSelector } from 'react-redux';
import {
  IGroupConfigurationSlice,
  getGroupListRequest,
  groupConfigurationSliceSelector,
  openGroupConfigDrawer
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import StoreGroupCardView from '../StoreGroup/StoreGroupCard/StoreGroupCardView';
import { debounce } from 'lodash';
import { GroupTypesEnum } from 'utils/enum';
import WarehouseGroupCreationDrawer from './WarehouseGroupCreation/WarehouseGroupCreationDrawer';
import { ocean_blue_400, ocean_blue_50, white } from 'theme/colors';

interface Props {}

const WarehouseGroup: FC<Props> = () => {
  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>();
  const userState: IUser = useSelector(userSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const groupConfigurationSlice: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const [searchKey, setSearchKey] = useState<string>('');
  const warehouseGroupList = groupConfigurationSlice.warehouseGroupe?.list;
  const configDrawer =
    groupConfigurationSlice.groupConfigurationLocalScope.storeGroupCreationDrawer;
  const dispatch = useDispatch();

  useEffect(() => {
    searchVisible && searchInputRef.current && searchInputRef.current.focus();
  }, [searchVisible]);

  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (selectedOrgKey) {
        dispatch(getGroupListRequest({ groupType: GroupTypesEnum.WAREHOUSE }));
      }
      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('Group details fetching error ', error);
    }
  }, [selectedOrgKey]);

  const onClickHandler = (type: GroupTypes) => {};

  const sendRequest = useCallback((searchKey: string) => {
    dispatch(getGroupListRequest({ groupType: GroupTypesEnum.WAREHOUSE, searchKey }));
  }, []);

  const debouncedSendRequest = useMemo(() => {
    return debounce(sendRequest, 1000);
  }, [sendRequest]);

  const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKey(value);
    debouncedSendRequest(value);
  };

  const drawerHandler = () => {
    dispatch(openGroupConfigDrawer());
  };

  const closeHandler = () => {
    setSearchVisible(false);
    setSearchKey('');
    debouncedSendRequest('');
  };

  return (
    <>
      <WarehouseGroupCreationDrawer isOpen={configDrawer} />
      <VStack align="stretch" spacing="12px">
        <HStack w="full" h="35px" justify="end">
          {searchVisible ? (
            <InputGroup w="30%" transition="all 0.3s ease" mr="32px">
              <AppInput
                w="full"
                h="32px"
                bg={ocean_blue_400}
                fontSize="12px"
                borderColor="#353434"
                pl="6px"
                onChange={onSearchHandler}
                value={searchKey}
                ref={searchInputRef}
              />
              <InputRightElement>
                <AppIconChakra
                  name="close"
                  fill={ocean_blue_50}
                  width="10px"
                  height="10px"
                  cursor="pointer"
                  onClick={closeHandler}
                  mb="8px"
                />
              </InputRightElement>
            </InputGroup>
          ) : (
            <Box mr="32px">
              <AppIconChakra
                name="search"
                fill={ocean_blue_50}
                _hover={{ fill: 'left-menu-icon-hover-color' }}
                width="18px"
                height="18px"
                cursor="pointer"
                onClick={() => {
                  setSearchVisible(true);
                }}
              />
            </Box>
          )}

          <AppButton
            variant="primary"
            size="medium"
            onClick={drawerHandler}
            px="25px"
            leftIcon={
              <AppIconChakra
                name="plus"
                fill={white}
                width="20px"
                height="20px"
                cursor="pointer"
                transition="all 0.2s ease"
              />
            }
            isDisabled={!!warehouseGroupList?.length}
          >
            Create Group
          </AppButton>
        </HStack>
        <Box
          h="calc(100vh - 315px)"
          overflow="hidden"
          overflowY="scroll"
          pr="10px"
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
            <EmptyGroupPanel groupType={GroupTypesEnum.WAREHOUSE} onClickHandler={onClickHandler} />
          )}
        </Box>
      </VStack>
    </>
  );
};

export default WarehouseGroup;
