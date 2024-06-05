import { Box, HStack } from '@chakra-ui/react';
import { FC, useState } from 'react';
import SelectedItem from './SelectedItem';
import { KeyValueI } from 'types/responses/insightResponses';
import { RightFilterItemContentI } from 'types/requests/insightRequest';
import { ocean_blue_350, ocean_blue_500 } from 'theme/colors';
import AppText from 'components/AppText/AppText';
import { scrollbarYStyles } from 'theme/styles';

interface Props {
  addOrRemoveItem: (status: boolean, item: KeyValueI) => void;
  selectedRightSideItem: RightFilterItemContentI | undefined;
}

const RightPanel: FC<Props> = ({ selectedRightSideItem, addOrRemoveItem }) => {
  const [onPanelHover, setOnPanelHover] = useState(false);
  return (
    <Box h="full" w="full" bg={ocean_blue_500} borderRadius="6px" overflowY="hidden">
      <HStack
        borderBottom="1px solid var(--yellow-500, #FFA914);"
        py="8px"
        px="16px"
        pb="8px"
        mb="10px"
      >
        <AppText size="body3">
          Selected ({selectedRightSideItem && selectedRightSideItem.selectedItems.length})
        </AppText>
      </HStack>
      <Box
        w="full"
        height="full"
        maxH={'calc(100vh - 290px)'}
        overflowY={onPanelHover ? 'auto' : 'hidden'}
        onMouseEnter={() => setOnPanelHover(true)}
        onMouseLeave={() => setOnPanelHover(false)}
        __css={scrollbarYStyles}
        paddingBottom={'10px'}
      >
        {selectedRightSideItem &&
          selectedRightSideItem.selectedItems.map((item) => (
            <SelectedItem key={item.key} item={item} addOrRemoveItem={addOrRemoveItem} />
          ))}
        {selectedRightSideItem?.isSelectAll && (
          <SelectedItem key="select_all" item={{ key: 'select_all', value: 'All' }} />
        )}
      </Box>
    </Box>
  );
};

export default RightPanel;
