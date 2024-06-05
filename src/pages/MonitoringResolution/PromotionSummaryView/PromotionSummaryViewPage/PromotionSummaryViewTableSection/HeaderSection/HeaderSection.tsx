import { useEffect, FC, useState } from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import AppText from 'components/AppText/AppText';
import AppInputGroup from 'components/newTheme/AppInputGroup/AppInputGroup';
import { blue_500, ocean_blue_100, ocean_blue_600 } from 'theme/colors';
import {
  getFilterCountRequest,
  getLabelsRequest,
  groupConfigurationSliceSelector,
  IGroupConfigurationSlice,
  toggleDrawerFilter,
  updateGroupFilter
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import {
  getPromotionSummaryDataRequest,
  IPromotionSummaryView,
  promotionSummaryViewSliceSelector,
  setPromotionSummaryPaginationPageNo,
  setPromotionSummarySearchKey
} from 'state/pages/monitoringAndResolution/promotionSummaryView/promotionSummaryViewState';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { produce } from 'immer';
import { GroupLabelTypes } from 'types/requests/groupConfigRequests';
import { timeStampToDateString } from 'utils/utility';

interface HeaderSectionProps {
  filterLabelTypes?: GroupLabelTypes;
}

const HeaderSection: FC<HeaderSectionProps> = ({ filterLabelTypes }) => {
  const promotionSummaryViewState: IPromotionSummaryView = useSelector(
    promotionSummaryViewSliceSelector
  );
  const lastDataIngestionDate = promotionSummaryViewState.skuListData?.lastDataIngestion!;
  const searchKey = promotionSummaryViewState.promotionSummaryViewLocalScope?.skuSearchKey;
  const groupConfigState: IGroupConfigurationSlice = useSelector(groupConfigurationSliceSelector);
  const filterAppliedIndicator = groupConfigState.groupFilter.filterAppliedIndicator;
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setPromotionSummarySearchKey(value));
  };

  const handleSearchFieldPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.defaultPrevented) {
      event.preventDefault();
      dispatch(setPromotionSummaryPaginationPageNo(1));
      dispatch(getPromotionSummaryDataRequest());
    }
  };

  const onFilterClick = () => {
    dispatch(
      getLabelsRequest({
        labelTypes: filterLabelTypes || ['location', 'product', 'anchor', 'store', 'sku']
      })
    );
    const _groupFilter = produce(
      groupConfigState.groupFilter,
      (draft: IGroupConfigurationSlice['groupFilter']) => {
        if (draft) {
          draft.filterLocalScope.beforeEditFilterOptionsLevel1 =
            draft.filterLocalScope.rightPanelRetainDataList;
        }
      }
    );
    dispatch(updateGroupFilter(_groupFilter));
    dispatch(getFilterCountRequest({ whFlag: 0 }));
    dispatch(toggleDrawerFilter({ isOpen: true }));
  };

  useEffect(() => {
    dispatch(getPromotionSummaryDataRequest());
  }, [filterAppliedIndicator]);

  return (
    <HStack w="full" h="36px" justify="space-between">
      <HStack spacing="16px">
        <AppInputGroup
          placeholder="Search"
          value={searchKey}
          onChange={handleInputChange}
          fontSize="14px"
          variant="primary"
          inputSize="large"
          width="232px"
          height="36px"
          onKeyDown={handleSearchFieldPress}
        />
        <AppIconButton
          aria-label="filter"
          icon={
            <AppIcon
              transition="transform 0.25s ease"
              name="filter"
              width="14px"
              height="14px"
              fill={blue_500}
            />
          }
          variant="secondary"
          size="iconMedium"
          onClick={onFilterClick}
          bg={ocean_blue_600}
        />
      </HStack>
      <HStack w="auto">
        <AppText size="body3" color={ocean_blue_100} transition="all 0.2s ease">
          Last Data Ingestion:
        </AppText>
        <Box minW="130px" w="auto">
          <AppText size="body3" color={ocean_blue_100} transition="all 0.2s ease">
            {timeStampToDateString(lastDataIngestionDate, 'yyyy-MM-dd hh:mm a')}
          </AppText>
        </Box>
      </HStack>
    </HStack>
  );
};

export default HeaderSection;
