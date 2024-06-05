import { FC, useCallback, useEffect } from 'react';
import { HStack, VStack, Skeleton } from '@chakra-ui/react';
import { ocean_blue_600 } from 'theme/colors';
import {
  IRPLView,
  rplViewSliceSelector
} from 'state/pages/view/replenishmentView/rplViewPageState';
import { useSelector } from 'react-redux';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import GridViewPageHeader from './GridViewPageHeader/GridViewPageHeader';
import GridViewTableSection from './GridViewTableSection/GridViewTableSection';
import { useNavigate } from 'react-router-dom';
import { IUser, userSliceSelector } from 'state/user/userState';
import AppNoDataAvailablePanel from 'components/newTheme/AppNoDataAvailablePanel/AppNoDataAvailablePanel';

interface Props {}

const GridViewPage: FC<Props> = () => {
  const navigate = useNavigate();
  const userState: IUser = useSelector(userSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const rplViewState: IRPLView = useSelector(rplViewSliceSelector);
  const dataLoading = rplViewState.loading.data;
  const tableDataList = rplViewState.rplSkuExpandedDataList;

  const pageContent = useCallback(() => {
    useEffect(() => {
      if (!selectedOrgKey) {
        navigate('/app/replenishment-planning');
      }
      if (tableDataList !== null) {
        navigate('/app/replenishment-planning');
      }
    }, [selectedOrgKey]);

    return (
      <VStack w="full" spacing="20px" p="20px">
        <HStack h="36px" w="full">
          <GridViewPageHeader />
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
            <GridViewTableSection />
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

export default GridViewPage;
