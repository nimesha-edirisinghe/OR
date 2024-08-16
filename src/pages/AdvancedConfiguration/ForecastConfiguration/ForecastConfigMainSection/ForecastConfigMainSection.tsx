import { Box, Skeleton } from '@chakra-ui/react';
import AppTable from 'components/AppTable/AppTable';
import { onTableSearch } from 'components/AppTable/TableDataMapping/ReplenishmentConfigTable';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { layoutSliceSelector } from 'state/layout/layoutState';
import { ocean_blue_600 } from 'theme/colors';
import { scrollbarYStyles } from 'theme/styles';
import { getCommonLastUpdateDateRequest } from 'state/pages/common/commonState';
import FooterSection from './FooterSection/FooterSection';
import { fcConfigPageSliceSelector } from 'state/pages/advancedConfiguration/forecastConfigurationPage/pageState';
import {
  getForecastConfigTableRowDataMapping,
  tableHeaders
} from 'components/AppTable/TableDataMapping/ForecastingConfigTable';
import useAccessType from 'hooks/useMenuAccessType';
import { hasAccessPermission } from 'utils/permissions';
import { AccessPermissionEnum, MenuItems } from 'utils/enum';

interface Props {}

const ForecastConfigMainSection: FC<Props> = () => {
  const dispatch = useDispatch();
  const isLeftMenuOpen = useSelector(layoutSliceSelector).leftMenuOpen;
  const fConfigPage = useSelector(fcConfigPageSliceSelector);
  const isLoading = fConfigPage.isLoading;

  const accessType = useAccessType(MenuItems.FORECASTING_SETUP_AND_SCHEDULING);
  const accessNotAllowed = !hasAccessPermission(accessType, [AccessPermissionEnum.EXECUTE]);
  const forecastConfigTableRowDataMapping = getForecastConfigTableRowDataMapping(accessNotAllowed);

  useEffect(() => {
    dispatch(getCommonLastUpdateDateRequest());
  }, []);
  return (
    <Box
      h="calc(100vh - 170px)"
      maxW={isLeftMenuOpen ? 'calc(100vw - 345px)' : 'calc(100vw - 50px)'}
      transition=".2s ease-in"
      bg={ocean_blue_600}
      p="16px"
      borderRadius="8px"
    >
      <Skeleton
        w="full"
        h="calc(100vh - 246px)"
        borderRadius="10px"
        isLoaded={!isLoading}
        fadeDuration={1}
        speed={1}
      >
        <Box
          h="calc(100vh - 246px)"
          maxW={isLeftMenuOpen ? 'calc(100vw - 345px)' : 'calc(100vw - 50px)'}
          transition=".2s ease-in"
          overflowX="hidden"
          overflowY="auto"
          __css={scrollbarYStyles}
        >
          {fConfigPage.tableData && (
            <AppTable
              variant="default"
              tableHeaders={tableHeaders}
              tableRowDataMapping={forecastConfigTableRowDataMapping}
              tableRowsDataSet={fConfigPage.tableData || []}
              onTableSearch={onTableSearch}
            />
          )}
        </Box>
      </Skeleton>

      <Box w="full" h="28px" mt="16px">
        <FooterSection />
      </Box>
    </Box>
  );
};

export default ForecastConfigMainSection;
