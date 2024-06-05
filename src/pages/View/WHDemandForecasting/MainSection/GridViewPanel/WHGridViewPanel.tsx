import { Box, HStack, Skeleton, VStack } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import ForecastingHeader from '../../ForecastingHeader/ForecastingHeader';
import AppSimpleGrid from 'components/newTheme/AppSimpleGrid/AppSimpleGrid';
import { useDispatch, useSelector } from 'react-redux';
import { TableHeader } from 'types/responses/viewResponses';
import AppText from 'components/AppText/AppText';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { neutral_100, neutral_300, ocean_blue_600 } from 'theme/colors';
import { useNavigate } from 'react-router-dom';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import {
  IWhDFView,
  getDemandForecastDataRequest,
  updateShouldReloadData,
  whDfViewSliceSelector
} from 'state/pages/view/whDemandForecastView/whDfViewPageState';

interface WHGridViewPanelProps {}

const WHGridViewPanel: FC<WHGridViewPanelProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dfViewState: IWhDFView = useSelector(whDfViewSliceSelector);
  const tableHeaders = dfViewState.gridSkuListData?.headers as TableHeader[];
  const tableDataList = dfViewState.gridSkuListData?.list;
  const selectedSkuList = dfViewState.selectedSkuList;
  const selectedSkuCount = selectedSkuList.length;
  const dataLoading = dfViewState.loading.skuDataLoading;
  const searchKey = dfViewState.dfViewLocalScope.skuSearchKey;

  let rowData: { id?: any; isSelected?: boolean; row: any[] }[] = [];
  const freezeCols = [0, 1];

  rowData =
    tableDataList?.map((item) => ({
      id: item.anchorProdKey,
      isSelected: false,
      row: (tableHeaders.length && tableHeaders.map((header) => item[header.key])) || []
    })) || [];

  useEffect(() => {
    const abortController = new AbortController();
    try {
      dispatch(getDemandForecastDataRequest({ searchKey }));
    } catch (error) {
      console.error('error ocurred', error);
    }
    return () => {
      abortController.abort();
    };
  }, []);

  const backHandler = () => {
    navigate('/app/wh-forecast/view');
    dispatch(updateShouldReloadData(false));
  };

  const pageContent = () => {
    return (
      <VStack w={'full'} h={'full'} p="16px">
        <HStack w={'full'} h={'full'} justify={'space-between'}>
          <HStack spacing="8px">
            <AppIconButton
              aria-label="next"
              icon={
                <AppIcon
                  transition="transform 0.25s ease"
                  name="chevronLeft"
                  width="7px"
                  height="11px"
                  fill={neutral_300}
                />
              }
              variant="secondary"
              size="iconMedium"
              onClick={backHandler}
              bg={ocean_blue_600}
            />
            <AppText size="h3Semibold" color={neutral_100}>
              {selectedSkuCount} Forecasts Selected
            </AppText>
          </HStack>
          <HStack>
            <ForecastingHeader skuMaximized={true} maximizedHandler={() => {}} />
          </HStack>
        </HStack>

        <Skeleton isLoaded={!dataLoading} w={'full'} h={'full'}>
          <Box
            w={'full'}
            h={'calc(100vh - 160px)'}
            borderRadius={'8px'}
            p={'16px'}
            bg={ocean_blue_600}
            position={'relative'}
          >
            <AppSimpleGrid
              headers={tableHeaders}
              rows={rowData}
              maxW="100%"
              maxH="93%"
              freezedColumns={freezeCols}
            />

            <HStack position={'absolute'} bottom={3}>
              <AppText
                size="body3"
                color={'rgba(62, 99, 123, 1)'}
              >{`Showing ${selectedSkuCount} out of ${selectedSkuCount} Forecasts`}</AppText>
            </HStack>
          </Box>
        </Skeleton>
      </VStack>
    );
  };

  return <InsightsPageLayout children={pageContent()} />;
};

export default WHGridViewPanel;
