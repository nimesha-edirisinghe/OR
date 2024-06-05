import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import EmptyGroupPanel from '../Tabs/EmptyGroupPanel';
import { GroupTypes } from 'types/groupConfig';
import { Box, HStack, InputGroup, InputRightElement, VStack, Flex } from '@chakra-ui/react';
import { scrollbarYStyles } from 'theme/styles';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import AppInput from 'components/AppInput/AppInput';
import StoreGroupCardView from './StoreGroupCard/StoreGroupCardView';
import StoreGroupCreationDrawer from './StoreGroupCreation/StoreGroupCreationDrawer';
import { IUser, userSliceSelector } from 'state/user/userState';
import { useDispatch, useSelector } from 'react-redux';
import {
  IGroupConfigurationSlice,
  getFilterCountRequest,
  getGroupListRequest,
  getLabelsRequest,
  groupConfigurationSliceSelector,
  openGroupConfigDrawer,
  resetGroupFilter
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { debounce } from 'lodash';
import { GroupTypesEnum } from 'utils/enum';
import FilterItemsSelectionDrawer from './StoreGroupCreation/AnchorLocationFilter/FilterItemsSelectionDrawer/FilterItemsSelectionDrawer';
import StoreGroupViewDrawer from './StoreGroupView/StoreGroupViewDrawer';
import FooterSection from '../../FooterSection/FooterSection';
import { blue_500, ocean_blue_400, ocean_blue_50, ocean_blue_600, white } from 'theme/colors';
import AppButton from 'components/newTheme/AppButton/AppButton';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';

interface Props {}

const StoreGroup: FC<Props> = () => {
  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const [searchKey, setSearchKey] = useState<string>('');
  const searchInputRef = useRef<HTMLInputElement>();
  const userState: IUser = useSelector(userSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const dispatch = useDispatch();
  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const storeGroupList = groupConfigurationState.storeGroup?.list;
  const storeGroupCreationDrawer =
    groupConfigurationState.groupConfigurationLocalScope.storeGroupCreationDrawer;
  const storeGroupViewDrawer =
    groupConfigurationState.groupConfigurationLocalScope.storeGroupViewDrawer;

  useEffect(() => {
    searchVisible && searchInputRef.current && searchInputRef.current.focus();
  }, [searchVisible]);

  const onClickHandler = (type: GroupTypes) => {};

  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (selectedOrgKey) {
        dispatch(getGroupListRequest({ groupType: GroupTypesEnum.STORE }));
      }
      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('Group details fetching error ', error);
    }
  }, [selectedOrgKey]);

  const drawerHandler = () => {
    dispatch(resetGroupFilter());
    dispatch(openGroupConfigDrawer());
    dispatch(getFilterCountRequest({ whFlag: 0 }));
    dispatch(
      getLabelsRequest({ labelTypes: ['location', 'product', 'anchor', 'predictor', 'store'] })
    );
  };

  const sendRequest = useCallback((searchKey: string) => {
    dispatch(getGroupListRequest({ groupType: GroupTypesEnum.STORE, searchKey }));
  }, []);

  const debouncedSendRequest = useMemo(() => {
    return debounce(sendRequest, 1000);
  }, [sendRequest]);

  const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKey(value);
    debouncedSendRequest(value);
  };

  const closeHandler = () => {
    setSearchVisible(false);
    setSearchKey('');
    debouncedSendRequest('');
  };
  return (
    <>
      <FilterItemsSelectionDrawer
        isOpen={!!groupConfigurationState.groupFilter?.filterLocalScope.isOpenItemSelectionDrawer}
      />
      <StoreGroupCreationDrawer isOpen={storeGroupCreationDrawer} />
      <StoreGroupViewDrawer isOpen={storeGroupViewDrawer} />

      <VStack align="stretch" spacing="12px" overflow={'hidden'} paddingBottom={'2px'}>
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
            <AppIconButton
              aria-label="search"
              icon={
                <AppIcon
                  transition="transform 0.25s ease"
                  name="search"
                  width="24px"
                  height="24px"
                  fill={blue_500}
                />
              }
              variant="secondary"
              size="iconMedium"
              onClick={() => {
                setSearchVisible(true);
              }}
              bg={ocean_blue_600}
            />
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
          >
            Create Group
          </AppButton>
        </HStack>
        <Box
          h="calc(100vh - 230px)"
          overflow="hidden"
          overflowY="scroll"
          mb="50px"
          __css={scrollbarYStyles}
        >
          {storeGroupList && storeGroupList.length > 0 ? (
            <Flex gap="20px" wrap="wrap" justify="start">
              {storeGroupList?.map((storeGroup, index) => (
                <StoreGroupCardView
                  key={index}
                  storeGroup={storeGroup}
                  groupType={GroupTypesEnum.STORE}
                />
              ))}
            </Flex>
          ) : (
            <EmptyGroupPanel groupType={GroupTypesEnum.STORE} onClickHandler={onClickHandler} />
          )}
        </Box>
        <FooterSection />
      </VStack>
    </>
  );
};

export default StoreGroup;
