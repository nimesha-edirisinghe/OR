import { Box, HStack } from '@chakra-ui/react';
import { FC, useState } from 'react';
import SelectedItem from './SelectedItem';
import { KeyValueI } from 'types/responses/insightResponses';
import { RightFilterItemContentI } from 'types/groupConfig';
import { neutral_500, ocean_blue_500 } from 'theme/colors';
import AppText from 'components/newTheme/AppText/AppText';
import { scrollbarYStyles } from 'theme/styles';
import { getFromLocal } from 'utils/localStorage';

interface Props {
  addOrRemoveItem: (status: boolean, item: KeyValueI) => void;
  selectedRightSideItem: RightFilterItemContentI | undefined;
}

const RightPanel: FC<Props> = ({ selectedRightSideItem, addOrRemoveItem }) => {
  const [onPanelHover, setOnPanelHover] = useState(false);
  const emptyLabel = getFromLocal('insightDrawerTitle');

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
        maxH={'calc(100vh - 235px)'}
        overflowY={onPanelHover ? 'auto' : 'hidden'}
        onMouseEnter={() => setOnPanelHover(true)}
        onMouseLeave={() => setOnPanelHover(false)}
        __css={scrollbarYStyles}
        paddingBottom={'10px'}
      >
        {selectedRightSideItem &&
          (selectedRightSideItem.selectedItems as KeyValueI[]).map((item) => (
            <SelectedItem key={item.key} item={item} addOrRemoveItem={addOrRemoveItem} />
          ))}
        {selectedRightSideItem?.isSelectAll && (
          <SelectedItem key="select_all" item={{ key: 'select_all', value: 'All' }} />
        )}
        {selectedRightSideItem &&
          selectedRightSideItem.selectedItems.length === 0 &&
          !selectedRightSideItem?.isSelectAll && (
            <HStack h={'full'} w={'full'}>
              <AppText
                w={'full'}
                fontStyle={'italic'}
                color={neutral_500}
                fontSize={'10px'}
                fontWeight={'400'}
                textAlign={'center'}
              >
                {`Selected ${emptyLabel} would displayed here`}
              </AppText>
            </HStack>
          )}
      </Box>
    </Box>
  );
};

export default RightPanel;
