import { Box, HStack, Skeleton } from '@chakra-ui/react';
import { FC, useState } from 'react';
import CheckBoxWithLabel from './CheckBoxWithLabel';
import { useDispatch, useSelector } from 'react-redux';
import { KeyValueI } from 'types/responses/insightResponses';
import {
  IGroupConfigurationSlice,
  groupConfigurationSliceSelector
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { RightFilterItemContentI } from 'types/groupConfig';
import { AnimatePresence } from 'framer-motion';
import AppText from 'components/newTheme/AppText/AppText';
import { toggleSelectAllItems } from '../Helpers/selectAllToggleHelper';
import { getFromLocal } from 'utils/localStorage';
import { ocean_blue_500 } from 'theme/colors';
import { scrollbarYStyles } from 'theme/styles';

interface Props {
  selectedRightSideItem: RightFilterItemContentI | undefined;
  addOrRemoveItem: (status: boolean, item: KeyValueI) => void;
  isEnableSelectAll?: boolean;
}

const LeftPanel: FC<Props> = ({
  selectedRightSideItem,
  addOrRemoveItem,
  isEnableSelectAll = true
}) => {
  const groupConfigState: IGroupConfigurationSlice = useSelector(groupConfigurationSliceSelector);
  const groupFilter = groupConfigState.groupFilter;
  const filterType = groupFilter?.filterType!;
  const filterCode = groupFilter?.filterCode!;
  const filterItemListData = groupConfigState.groupFilter.filterItemListData;
  const [onLeftPanelHover, setOnLeftPanelHover] = useState(false);
  const dispatch = useDispatch();
  const viewOutOfCount = groupFilter.filterLocalScope.viewOutOfCount;

  const createListItem = (item: any, key: any) => {
    return (
      <CheckBoxWithLabel
        key={key}
        isChecked={selectedRightSideItem?.isSelectAll ? true : !!item.isSelected}
        label={item.value}
        onChange={(e: any) => addOrRemoveItem(e.target.checked, item)}
        isDisabled={!!selectedRightSideItem?.isSelectAll}
      />
    );
  };

  const getEnable = () => {
    const hasSelectedItems = !!selectedRightSideItem?.selectedItems.length;
    const isFilterListEmpty = filterItemListData.length === 0;

    if (isEnableSelectAll) {
      return hasSelectedItems || isFilterListEmpty;
    }

    return isFilterListEmpty;
  };

  return (
    <AnimatePresence>
      <Box
        h="full"
        w="full"
        bg={ocean_blue_500}
        borderRadius="6px"
        overflowX="hidden"
        overflowY="hidden"
      >
        <HStack borderBottom="1px solid var(--yellow-500, #FFA914);" py="8px" px="16px">
          <AppText size="body3">
            List of {getFromLocal('insightDrawerTitle')} ({viewOutOfCount})
          </AppText>
        </HStack>

        <Skeleton
          w="full"
          height="full"
          isLoaded={!groupConfigState.isSkuIsLoading}
          fadeDuration={1}
          speed={1}
        >
          <Box
            paddingBottom={'10px'}
            w="full"
            height="full"
            maxH={'calc(100vh - 260px)'}
            overflowY={onLeftPanelHover ? 'auto' : 'hidden'}
            onMouseEnter={() => setOnLeftPanelHover(true)}
            onMouseLeave={() => setOnLeftPanelHover(false)}
            __css={scrollbarYStyles}
          >
            <CheckBoxWithLabel
              key="u23"
              label="Select all"
              py="10px"
              isChecked={selectedRightSideItem?.isSelectAll!}
              onChange={(e: any) =>
                toggleSelectAllItems(
                  e.target.checked,
                  filterType,
                  filterCode,
                  groupFilter,
                  dispatch
                )
              }
              isDisabled={getEnable()}
            />

            {filterItemListData.map((item, key) => {
              return createListItem(item, key);
            })}
          </Box>
        </Skeleton>
      </Box>
    </AnimatePresence>
  );
};

export default LeftPanel;
