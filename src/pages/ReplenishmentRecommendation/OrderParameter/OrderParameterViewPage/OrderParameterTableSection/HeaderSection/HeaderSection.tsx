import { Box, HStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppTooltip from 'components/AppTooltip/AppTooltip';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import AppInputGroup from 'components/newTheme/AppInputGroup/AppInputGroup';
import AppText from 'components/newTheme/AppText/AppText';
import { produce } from 'immer';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IGroupConfigurationSlice,
  getFilterCountRequest,
  getLabelsRequest,
  groupConfigurationSliceSelector,
  toggleDrawerFilter,
  updateGroupFilter
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import {
  IOrderParameter,
  getRplParameterSummaryRequest,
  orderParameterSliceSelector,
  setOrderParameterCurrentPageNo,
  setOrderParameterSearchKey
} from 'state/pages/replenishmentRecommendation/orderParameter/orderParameterState';
import { blue_500, ocean_blue_600, ocean_blue_100 } from 'theme/colors';
import { GroupLabelTypes } from 'types/requests/groupConfigRequests';
import { timeStampToDateString } from 'utils/utility';

interface Props {
  filterLabelTypes?: GroupLabelTypes;
}

const HeaderSection: FC<Props> = ({ filterLabelTypes }) => {
  const dispatch = useDispatch();
  const orderParameterState: IOrderParameter = useSelector(orderParameterSliceSelector);
  const groupConfigState: IGroupConfigurationSlice = useSelector(groupConfigurationSliceSelector);
  const filterAppliedIndicator = groupConfigState.groupFilter.filterAppliedIndicator;
  const lastUpdatedDate = orderParameterState.summaryData?.lastUpdate!;
  const searchKey = orderParameterState.orderParameterLocalScope.searchKey;

  const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setOrderParameterSearchKey(value));
  };

  const onSearchKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.defaultPrevented) {
      event.preventDefault();
      dispatch(setOrderParameterCurrentPageNo(1));
      dispatch(getRplParameterSummaryRequest());
    }
  };

  const onFilterHandler = () => {
    dispatch(
      getLabelsRequest({
        labelTypes: filterLabelTypes || ['location', 'product', 'vendor', 'store', 'sku']
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

    dispatch(getFilterCountRequest({ whFlag: 2 }));
    dispatch(toggleDrawerFilter({ isOpen: true }));
  };
  return (
    <HStack w="full" h="36px" justify="space-between">
      <HStack spacing="16px">
        <AppInputGroup
          placeholder="Search"
          value={searchKey}
          onChange={onSearchHandler}
          fontSize="14px"
          variant="primary"
          inputSize="large"
          width="232px"
          height="36px"
          onKeyDown={onSearchKeyDownHandler}
        />
        <AppTooltip label={'Filter'} noOfLines={1} placement="bottom-start">
          <Box>
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
              onClick={onFilterHandler}
              bg={ocean_blue_600}
            />
          </Box>
        </AppTooltip>
      </HStack>
      <HStack w="auto">
        <AppText size="body3" color={ocean_blue_100} transition="all 0.2s ease">
          Last Data Ingestion:
        </AppText>
        <Box minW="130px" w="auto">
          <AppText size="body3" color={ocean_blue_100} transition="all 0.2s ease">
            {timeStampToDateString(lastUpdatedDate, 'yyyy-MM-dd hh:mm a')}
          </AppText>
        </Box>
      </HStack>
    </HStack>
  );
};

export default HeaderSection;
