import { Box, Skeleton } from '@chakra-ui/react';
import AppTable from 'components/AppTable/AppTable';
import {
  onTableSearch,
  replenishmentConfigTableRowDataMapping,
  rplTableHeaders
} from 'components/AppTable/TableDataMapping/ReplenishmentConfigTable';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { layoutSliceSelector } from 'state/layout/layoutState';
import { rplConfigPageSliceSelector } from 'state/pages/advancedConfiguration/replenishmentConfigurationPage/rplConfigPageState';
import { ocean_blue_600 } from 'theme/colors';
import { scrollbarYStyles } from 'theme/styles';
import FooterSection from './FooterSection/FooterSection';
import { getCommonLastUpdateDateRequest } from 'state/pages/common/commonState';

interface Props {}

const ReplenishmentMainSection: FC<Props> = () => {
  const dispatch = useDispatch();
  const isLeftMenuOpen = useSelector(layoutSliceSelector).leftMenuOpen;
  const rplConfigPageState = useSelector(rplConfigPageSliceSelector);
  const isLoading = rplConfigPageState.isLoading;

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
          {rplConfigPageState.rplConfigTableData && (
            <AppTable
              variant="default"
              onTableSearch={onTableSearch}
              tableHeaders={rplTableHeaders}
              tableRowDataMapping={replenishmentConfigTableRowDataMapping}
              tableRowsDataSet={rplConfigPageState.rplConfigTableData || []}
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

export default ReplenishmentMainSection;
