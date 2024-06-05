import { Box, HStack, Skeleton } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { KeyValueI } from 'types/responses/insightResponses';
import { RightFilterItemContentI } from 'types/groupConfig';
import { AnimatePresence } from 'framer-motion';
import AppText from 'components/newTheme/AppText/AppText';
import { ocean_blue_500 } from 'theme/colors';
import { scrollbarYStyles } from 'theme/styles';
import CheckBoxWithLabel from './CheckBoxWithLabel';
import { getFilterTitle } from '../Helpers/filterHelper';

interface Props {
  filterItem: RightFilterItemContentI;
  addOrRemoveItem: (status: boolean, item: KeyValueI) => void;
  onSelectAll: (status: boolean) => void;
  filterItemListData: KeyValueI[];
  isLoading?: boolean;
  title?: string;
}

const LeftPanel: FC<Props> = ({
  filterItemListData,
  filterItem,
  addOrRemoveItem,
  isLoading = false,
  onSelectAll,
  title = getFilterTitle(filterItem.type, filterItem.code)
}) => {
  const [onLeftPanelHover, setOnLeftPanelHover] = useState(false);

  const createListItem = (item: any, key: any) => (
    <CheckBoxWithLabel
      key={key}
      isChecked={!!item.isSelected}
      label={item.value}
      onChange={(e: any) => addOrRemoveItem(e.target.checked, item)}
      isDisabled={!!filterItem?.isSelectAll}
    />
  );

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
            List of {title} ({filterItem.outOfCount})
          </AppText>
        </HStack>

        <Skeleton w="full" height="full" isLoaded={!isLoading} fadeDuration={1} speed={1}>
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
              isChecked={filterItem?.isSelectAll!}
              onChange={(e: any) => onSelectAll(e.target.checked)}
              isDisabled={!!filterItem?.selectedItems.length || filterItemListData.length == 0}
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
