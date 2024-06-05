import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import SelectedItem from './SelectedItem';
import { KeyValueI } from 'types/responses/insightResponses';
import { RightFilterItemContentI } from 'types/requests/insightRequest';
import { ocean_blue_350 } from 'theme/colors';

interface Props {
  addOrRemoveItem: (status: boolean, item: KeyValueI) => void;
  selectedRightSideItem: RightFilterItemContentI | undefined;
}

const RightPanel: FC<Props> = ({ selectedRightSideItem, addOrRemoveItem }) => {
  return (
    <Box
      h="full"
      w="full"
      bg="prompt-bg-color"
      borderRadius="6px"
      pt="27px"
      px="17px"
      overflowY="auto"
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
      {selectedRightSideItem &&
        selectedRightSideItem.selectedItems.map((item) => (
          <SelectedItem key={item.key} item={item} addOrRemoveItem={addOrRemoveItem} />
        ))}
      {selectedRightSideItem?.isSelectAll && (
        <SelectedItem key="select_all" item={{ key: 'select_all', value: 'All' }} />
      )}
    </Box>
  );
};

export default RightPanel;
