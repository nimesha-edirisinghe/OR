import { Box, Center, HStack } from '@chakra-ui/react';
import { FC, useState } from 'react';
import SelectedItem from './SelectedItem';
import { KeyValueI } from 'types/responses/insightResponses';
import { RightFilterItemContentI } from 'types/groupConfig';
import { AnimatePresence } from 'framer-motion';
import AppText from 'components/newTheme/AppText/AppText';
import { neutral_500, ocean_blue_350, ocean_blue_500 } from 'theme/colors';

interface Props {
  addOrRemoveItem: (status: boolean, item: KeyValueI) => void;
  selectedRightSideItem: RightFilterItemContentI | undefined;
  defaultMessage: string;
}

const RightPanel: FC<Props> = ({ selectedRightSideItem, addOrRemoveItem, defaultMessage }) => {
  const [onPanelHover, setOnPanelHover] = useState(false);
  return (
    <AnimatePresence>
      <Box h="full" w="full" bg={ocean_blue_500} borderRadius="6px" overflow="hidden">
        <HStack borderBottom="1px solid var(--yellow-500, #FFA914);" py="8px" px="16px" pb="8px">
          <AppText size="body3">
            Selected ({selectedRightSideItem && selectedRightSideItem.selectedItems.length})
          </AppText>
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
          {selectedRightSideItem?.selectedItems.length || selectedRightSideItem?.isSelectAll ? (
            (selectedRightSideItem.selectedItems as KeyValueI[]).map((item) => (
              <SelectedItem key={item.key} item={item} addOrRemoveItem={addOrRemoveItem} />
            ))
          ) : (
            <Center h="full">
              <AppText size="italic" color={neutral_500} fontStyle="italic">
                {defaultMessage}
              </AppText>
            </Center>
          )}
          {selectedRightSideItem?.isSelectAll && (
            <SelectedItem key="select_all" item={{ key: 'select_all', value: 'All' }} />
          )}
        </Box>
      </Box>
    </AnimatePresence>
  );
};

export default RightPanel;
