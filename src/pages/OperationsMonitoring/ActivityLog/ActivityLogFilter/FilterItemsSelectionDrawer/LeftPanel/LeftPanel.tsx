import { Box, HStack, Skeleton } from '@chakra-ui/react';
import { FC, useEffect, useRef, useState } from 'react';
import CheckBoxWithLabel from './CheckBoxWithLabel';
import { useDispatch, useSelector } from 'react-redux';
import { KeyValueI } from 'types/responses/insightResponses';
import {
  IActivityLogSlice,
  activityLogSliceSelector
} from 'state/pages/operationAndMonitoring/activityLog/activityLogState';
import { FilterItemContentI } from 'types/activityLog';
import {
  neutral_100,
  ocean_blue_100,
  ocean_blue_200,
  ocean_blue_400,
  ocean_blue_500,
  white
} from 'theme/colors';
import AppText from 'components/newTheme/AppText/AppText';
import { getFromLocal } from 'utils/localStorage';
import { toggleSelectAllItems } from '../Helpers/selectAllToggleHelper';
import AppCheckbox from 'components/newTheme/AppCheckbox/AppCheckbox';
import { scrollbarYStyles } from 'theme/styles';

interface Props {
  selectedRightSideItem: FilterItemContentI | undefined;
  addOrRemoveItem: (status: boolean, item: KeyValueI) => void;
}

const LeftPanel: FC<Props> = ({ selectedRightSideItem, addOrRemoveItem }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activityLogState: IActivityLogSlice = useSelector(activityLogSliceSelector);
  const filterItemListData = activityLogState.dashboardFilter.filterItemListData;
  const [onPanelHover, setOnPanelHover] = useState(false);
  const dashboardFilter = activityLogState.dashboardFilter;
  const filterType = dashboardFilter?.filterType!;
  const textColor = selectedRightSideItem?.isSelectAll ? neutral_100 : ocean_blue_100;
  const textHoverColor = ocean_blue_200;
  const bgHoverColor = ocean_blue_400;

  const insightTitleMap: any = {
    'Group Name': 'Group Names',
    Activity: 'Activities',
    'Execution Type': 'Execution Types',
    Status: 'Status',
    User: 'Users',
    Date: 'Dates'
  };
  const insightTitle: string = getFromLocal('insightDrawerTitle') || '';

  const dispatch = useDispatch();
  return (
    <Box
      ref={containerRef}
      h="full"
      w="270px"
      bg={ocean_blue_500}
      borderRadius="8px"
      overflowX="hidden"
      overflowY="hidden"
      transition=".2s ease-in"
    >
      <HStack
        borderBottom="1px solid var(--yellow-500, #FFA914);"
        py="8px"
        px="16px"
        mb="10px"
        bg={ocean_blue_500}
      >
        <AppText fontSize="12px" fontWeight={400} color={white}>
          List of {insightTitleMap[insightTitle] || ''} ({filterItemListData.length})
        </AppText>
      </HStack>
      <Skeleton
        w="full"
        height="full"
        isLoaded={!activityLogState.isLoading}
        fadeDuration={1}
        speed={1}
        maxH={'calc(100vh - 265px)'}
      >
        <Box
          paddingBottom={'10px'}
          w="full"
          height="full"
          overflowY={onPanelHover ? 'auto' : 'hidden'}
          onMouseEnter={() => setOnPanelHover(true)}
          onMouseLeave={() => setOnPanelHover(false)}
          __css={scrollbarYStyles}
        >
          <HStack pl="12px" pr="8px" spacing="8px" w="full" py="10px" _hover={{ bg: bgHoverColor }}>
            <AppCheckbox
              id={1}
              isChecked={selectedRightSideItem?.isSelectAll || false}
              onChange={(e: any) => toggleSelectAllItems(e, filterType, dashboardFilter, dispatch)}
              isDisabled={!!selectedRightSideItem?.selectedItems.length}
            />
            <AppText size="body2" color={textColor} _hover={{ color: textHoverColor }}>
              Select all
            </AppText>
          </HStack>
          {filterItemListData.map((item, key) => {
            return (
              <CheckBoxWithLabel
                key={key}
                isChecked={!!item.isSelected}
                label={item.value}
                onChange={(e: any) => addOrRemoveItem(e.target.checked, item)}
                isDisabled={!!selectedRightSideItem?.isSelectAll}
              />
            );
          })}
        </Box>
      </Skeleton>
    </Box>
  );
};

export default LeftPanel;
