import { Box, Center, HStack } from '@chakra-ui/react';
import { FC, useState } from 'react';
import SelectedItem from './SelectedItem';
import { KeyValueI } from 'types/responses/insightResponses';
import { RightFilterItemContentI } from 'types/groupConfig';
import { AnimatePresence } from 'framer-motion';
import AppText from 'components/newTheme/AppText/AppText';
import { neutral_500, ocean_blue_350, ocean_blue_500 } from 'theme/colors';
import { MAX_ALERT_DATA_COUNT } from 'utils/constants';

interface Props {
  addOrRemoveItem: (status: boolean, item: KeyValueI) => void;
  selectedRightSideItem: RightFilterItemContentI | undefined;
  defaultMessage: string;
  totalCount?: number;
}

const RightPanel: FC<Props> = ({
  selectedRightSideItem,
  addOrRemoveItem,
  defaultMessage,
  totalCount = 0
}) => {
  const [onPanelHover, setOnPanelHover] = useState(false);

  const selectedSkuCount = () => {
    if (!selectedRightSideItem) return 0;
    const { selectedItems } = selectedRightSideItem;
    return selectedRightSideItem?.isSelectAll || selectedItems.length >= MAX_ALERT_DATA_COUNT
      ? 'All'
      : selectedItems.length;
  };
  const renderSelectedItems = (selectedRightSideItem: RightFilterItemContentI | undefined) => {
    if (
      selectedRightSideItem?.isSelectAll ||
      (selectedRightSideItem?.selectedItems?.length || 0) >= MAX_ALERT_DATA_COUNT
    ) {
      return <SelectedItem key="select_all" item={{ key: 'select_all', value: 'All' }} />;
    } else if (selectedRightSideItem?.selectedItems.length) {
      return (selectedRightSideItem.selectedItems as KeyValueI[]).map((item) => (
        <SelectedItem key={item.key} item={item} addOrRemoveItem={addOrRemoveItem} />
      ));
    }

    return (
      <Center h="full">
        <AppText size="italic" color={neutral_500} fontStyle="italic">
          {defaultMessage}
        </AppText>
      </Center>
    );
  };

  return (
    <AnimatePresence>
      <Box h="full" w="full" bg={ocean_blue_500} borderRadius="6px" overflow="hidden">
        <HStack borderBottom="1px solid var(--yellow-500, #FFA914);" py="8px" px="16px" pb="8px">
          <AppText size="body3">Selected ({selectedSkuCount()})</AppText>
        </HStack>

        <Box
          w="full"
          height="full"
          maxH={'calc(100vh - 260px)'}
          paddingBottom="10px"
          overflowY={onPanelHover ? 'auto' : 'hidden'}
          onMouseEnter={() => setOnPanelHover(true)}
          onMouseLeave={() => setOnPanelHover(false)}
          __css={{
            '&::-webkit-scrollbar': {
              w: '1'
            },
            '&::-webkit-scrollbar-track': {
              w: '1'
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: '10',
              bg: ocean_blue_350
            }
          }}
        >
          {renderSelectedItems(selectedRightSideItem)}
        </Box>
      </Box>
    </AnimatePresence>
  );
};

export default RightPanel;
