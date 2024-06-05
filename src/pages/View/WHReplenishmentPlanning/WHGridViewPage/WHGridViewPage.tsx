import { FC, useCallback, useEffect } from 'react';
import { HStack, VStack, Skeleton } from '@chakra-ui/react';
import { ocean_blue_600 } from 'theme/colors';
import { useSelector } from 'react-redux';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { useNavigate } from 'react-router-dom';
import { IUser, userSliceSelector } from 'state/user/userState';
import AppNoDataAvailablePanel from 'components/newTheme/AppNoDataAvailablePanel/AppNoDataAvailablePanel';
import { IRPLWhView, rplWHViewSliceSelector } from 'state/pages/view/whReplenishmentView/whRplViewState';
import WHGridViewPageHeader from './WHGridViewPageHeader/WHGridViewPageHeader';
import WHGridViewTableSection from './WHGridViewTableSection/WHGridViewTableSection';

interface Props {}

const WHGridViewPage: FC<Props> = () => {
  const navigate = useNavigate();
  const userState: IUser = useSelector(userSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;  
  const rplWhViewState: IRPLWhView = useSelector(rplWHViewSliceSelector);
  const dataLoading = rplWhViewState.loading.data;
  const tableDataList = rplWhViewState.rplWhSkuExpandedDataList;

  const pageContent = useCallback(() => {
    useEffect(() => {
      if (!selectedOrgKey) {
        navigate('/app/wh-replenishment');
      }
      if (tableDataList !== null) {
        navigate('/app/wh-replenishment');
      }
    }, [selectedOrgKey]);

    return (
      <VStack w="full" spacing="20px" p="20px">
        <HStack h="36px" w="full">
          <WHGridViewPageHeader />
        </HStack>
        <Skeleton
          w="full"
          height="calc(100vh - 175px)"
          borderRadius="8px"
          isLoaded={!dataLoading}
          bg={ocean_blue_600}
          p="16px"
          fadeDuration={1}
          speed={1}
        >
          {tableDataList?.list.length === 0 && !dataLoading ? (
            <AppNoDataAvailablePanel />
          ) : (
            <WHGridViewTableSection />
          )}
        </Skeleton>
      </VStack>
    );
  }, [dataLoading, selectedOrgKey]);

  return (
    <>
      <InsightsPageLayout children={pageContent()} />
    </>
  );
};

export default WHGridViewPage;
