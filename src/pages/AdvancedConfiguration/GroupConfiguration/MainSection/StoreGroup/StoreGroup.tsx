import { FC, useCallback, useEffect, useState } from 'react';
import EmptyGroupPanel from '../Tabs/EmptyGroupPanel';
import { GroupTypes } from 'types/groupConfig';
import { Box, HStack, VStack, Flex, Skeleton } from '@chakra-ui/react';
import { scrollbarYStyles } from 'theme/styles';
import StoreGroupCardView from './StoreGroupCard/StoreGroupCardView';
import { IUser, userSliceSelector } from 'state/user/userState';
import { useDispatch, useSelector } from 'react-redux';
import {
  IGroupConfigurationSlice,
  getGroupListRequest,
  groupConfigurationSliceSelector,
  resetGroupDetail,
  resetGroupFilter,
  resetStoreGroup,
  setMorePageRequested
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { AccessPermissionEnum, GroupTypesEnum, MenuItems } from 'utils/enum';
import { ocean_blue_100 } from 'theme/colors';
import AppButton from 'components/newTheme/AppButton/AppButton';
import { useNavigate } from 'react-router-dom';
import AppInputGroup from 'components/newTheme/AppInputGroup/AppInputGroup';
import AppText from 'components/AppText/AppText';
import { STORE_GROUP_PAGE_SIZE } from 'utils/constants';
import useAccessType from 'hooks/useMenuAccessType';
import { hasAccessPermission } from 'utils/permissions';

interface Props {}

const StoreGroup: FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState: IUser = useSelector(userSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const [searchKey, setSearchKey] = useState<string>('');
  const [isSearchRequested, setSearchRequest] = useState<boolean>(false);
  const storeGroupList = groupConfigurationState.storeGroup?.list;
  const storeCount = groupConfigurationState.storeGroup?.totalCount || 0;
  const isLoading = groupConfigurationState.isGroupListLoading;
  const isGroupStoreEmpty = storeGroupList === undefined || storeGroupList.length === 0;

  const accessType = useAccessType(MenuItems.GROUP_CONFIGURATION);
  const accessNotAllowed = !hasAccessPermission(accessType, [AccessPermissionEnum.EDIT]);

  const onClickHandler = (type: GroupTypes) => {
    dispatch(resetStoreGroup());
    dispatch(setMorePageRequested(false));
    navigate('/app/group-config/store/create');
  };

  useEffect(() => {
    setSearchRequest(false);
    setSearchKey('');
  }, [selectedOrgKey]);

  const onClickCreateGroup = () => {
    dispatch(resetStoreGroup());
    dispatch(resetGroupFilter());
    dispatch(resetGroupDetail());
    navigate('/app/group-config/store/create');
  };

  const sendRequest = useCallback((searchKey: string) => {
    dispatch(resetStoreGroup());
    dispatch(getGroupListRequest({ groupType: GroupTypesEnum.STORE, searchKey }));
  }, []);

  const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKey(value);
  };

  const handleSearchFieldPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.defaultPrevented) {
      event.preventDefault();
      sendRequest(searchKey);
      setSearchRequest(true);
    }
  };

  const handleScroll = (e: any) => {
    const bottom = Math.trunc(e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight;
    const previousPageLoadRequestNumber = groupConfigurationState.pageLoaded;
    const totalCount = groupConfigurationState.storeGroup?.totalCount;
    const totalPageRetrievable = (totalCount && Math.ceil(totalCount / STORE_GROUP_PAGE_SIZE)) || 0;
    const isEndOfGroupList = previousPageLoadRequestNumber >= totalPageRetrievable;
    const pageLoadRequestNumber = groupConfigurationState.pageLoaded + 1;

    if (bottom && !isEndOfGroupList) {
      dispatch(setMorePageRequested(true));
      dispatch(
        getGroupListRequest({ groupType: GroupTypesEnum.STORE, pageNumber: pageLoadRequestNumber })
      );
    }
  };

  return (
    <>
      <VStack align="stretch" spacing="12px" overflow={'hidden'} py={'2px'}>
        {(!isGroupStoreEmpty || isSearchRequested) && (
          <HStack w="full" h="35px" justify="space-between">
            <HStack>
              <AppInputGroup
                placeholder="Search"
                value={searchKey || ''}
                onChange={onSearchHandler}
                fontSize="14px"
                variant="primary"
                inputSize="large"
                width="232px"
                height={'36px'}
                onKeyDown={handleSearchFieldPress}
              />
            </HStack>
            <HStack spacing={'20px'}>
              <HStack>
                <AppText fontSize={'12px'} fontWeight={'300'} color={ocean_blue_100}>
                  No. of Groups:
                </AppText>
                <AppText fontSize={'14px'} fontWeight={'600'} color={ocean_blue_100}>
                  {storeCount}
                </AppText>
              </HStack>
              <AppButton
                variant="primary"
                size="medium"
                onClick={onClickCreateGroup}
                px="25px"
                isDisabled={accessNotAllowed}
              >
                Create Group
              </AppButton>
            </HStack>
          </HStack>
        )}
        <Box
          h="calc(100vh - 200px)"
          overflow="hidden"
          overflowY="scroll"
          mb="50px"
          __css={scrollbarYStyles}
          onScroll={handleScroll}
        >
          <Skeleton h="full" isLoaded={!isLoading || !isGroupStoreEmpty}>
            {!isGroupStoreEmpty || isSearchRequested ? (
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
              <EmptyGroupPanel
                groupType={GroupTypesEnum.STORE}
                onClickHandler={onClickHandler}
                isDisabled={accessNotAllowed}
              />
            )}
          </Skeleton>
        </Box>
      </VStack>
    </>
  );
};

export default StoreGroup;
