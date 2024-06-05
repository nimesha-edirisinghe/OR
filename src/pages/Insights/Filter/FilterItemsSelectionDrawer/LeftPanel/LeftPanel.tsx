import { Box } from '@chakra-ui/react';
import { FC, useRef } from 'react';
import CheckBoxWithLabel from './CheckBoxWithLabel';
import { IInsight, insightSliceSelector } from 'state/pages/insights/insightState';
import { useDispatch, useSelector } from 'react-redux';
import { RightFilterItemContentI } from 'types/requests/insightRequest';
import { KeyValueI } from 'types/responses/insightResponses';
import { ocean_blue_350 } from 'theme/colors';

interface Props {
  selectedRightSideItem: RightFilterItemContentI | undefined;
  addOrRemoveItem: (status: boolean, item: KeyValueI) => void;
}

const LeftPanel: FC<Props> = ({ selectedRightSideItem, addOrRemoveItem }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const insightState: IInsight = useSelector(insightSliceSelector);
  const filterItemListData = insightState.dashboardFilter.filterItemListData;
  const dispatch = useDispatch();

  return (
    <Box
      ref={containerRef}
      h="full"
      w="full"
      bg="prompt-bg-color"
      borderRadius="6px"
      pt="27px"
      px="17px"
      overflowX="hidden"
      overflowY="auto"
      transition=".2s ease-in"
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
  );
};

export default LeftPanel;
