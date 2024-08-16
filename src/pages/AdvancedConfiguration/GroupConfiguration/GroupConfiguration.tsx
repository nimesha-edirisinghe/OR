import { Box, HStack } from '@chakra-ui/react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, userSliceSelector } from 'state/user/userState';
import MainContainer from './MainSection/MainSection';
import {
  getGroupListRequest,
  resetGroupFilter,
  resetStoreGroup
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { GroupTypesEnum } from 'utils/enum';

interface Props {}

const GroupConfiguration: FC<Props> = () => {
  const userState: IUser = useSelector(userSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (selectedOrgKey) {
        dispatch(resetStoreGroup());
        dispatch(resetGroupFilter());
        dispatch(getGroupListRequest({ groupType: GroupTypesEnum.WAREHOUSE }));
        dispatch(getGroupListRequest({ groupType: GroupTypesEnum.STORE }));
      }
      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('Group details fetching error ', error);
    }
  }, [selectedOrgKey]);

  const groupConfigPageContent = useCallback(() => {
    return (
      <Box w="full" h="full" px="24px" pt="10px">
        <HStack>
          <MainContainer />
        </HStack>
      </Box>
    );
  }, [selectedOrgKey]);

  return (
    <>
      <InsightsPageLayout children={groupConfigPageContent()} />
    </>
  );
};

export default GroupConfiguration;
