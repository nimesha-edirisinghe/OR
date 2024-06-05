import { Box, VStack } from '@chakra-ui/react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetSkuListData } from 'state/pages/view/demandForecastView/dfViewPageState';
import { IUser, userSliceSelector } from 'state/user/userState';
import MainHomeSection from './MainHomeSection/MainHomeSection';
import { scrollbarYStyles } from 'theme/styles';
import { getCommonLastUpdateDateRequest } from 'state/pages/common/commonState';
import { setActiveMenuItem, setActiveSubMenuItem } from 'state/layout/layoutState';

interface Props {}

const HomePage: FC<Props> = () => {
  const userState: IUser = useSelector(userSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetSkuListData());
  });
  useEffect(() => {
    dispatch(setActiveMenuItem({ menuItem: 'Home' }));
    dispatch(setActiveSubMenuItem({ subMenuItem: '/app/home' }));
  }, []);

  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (selectedOrgKey) {
        dispatch(getCommonLastUpdateDateRequest());
      }
      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('summary details fetching error ocurred', error);
    }
  }, [selectedOrgKey]);

  const homePageContent = useCallback(() => {
    return (
      <VStack
        h="full"
        w="full"
        px="20px"
        pt="20px"
        spacing="16px"
        overflow="hidden"
        overflowY="scroll"
        __css={scrollbarYStyles}
      >
        <MainHomeSection />
      </VStack>
    );
  }, [selectedOrgKey]);

  return (
    <>
      <InsightsPageLayout children={homePageContent()} />
    </>
  );
};

export default HomePage;
