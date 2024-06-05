import { Box, HStack, Skeleton } from '@chakra-ui/react';
import { FC, useRef, useState } from 'react';
import CheckBoxWithLabel from './CheckBoxWithLabel';
import { useDispatch, useSelector } from 'react-redux';
import { KeyValueI } from 'types/responses/insightResponses';
import {
  IGroupConfigurationSlice,
  groupConfigurationSliceSelector
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { RightFilterItemContentI } from 'types/groupConfig';
import {
  neutral_100,
  ocean_blue_100,
  ocean_blue_200,
  ocean_blue_350,
  ocean_blue_400,
  ocean_blue_500
} from 'theme/colors';
import AppText from 'components/newTheme/AppText/AppText';
import { getFromLocal } from 'utils/localStorage';
import AppCheckbox from 'components/newTheme/AppCheckbox/AppCheckbox';
import { toggleSelectAllItems } from '../Helpers/selectAllToggleHelper';
import { scrollbarYStyles } from 'theme/styles';

interface Props {
  selectedRightSideItem: RightFilterItemContentI | undefined;
  addOrRemoveItem: (status: boolean, item: KeyValueI) => void;
  viewFilter: boolean;
}

const LeftPanel: FC<Props> = ({ selectedRightSideItem, addOrRemoveItem, viewFilter }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const groupConfigState: IGroupConfigurationSlice = useSelector(groupConfigurationSliceSelector);
  const [onPanelHover, setOnPanelHover] = useState(false);
  const filterItemListData = groupConfigState.groupFilter.filterItemListData;
  const groupFilter = groupConfigState.groupFilter;
  const filterType = groupFilter?.filterType!;
  const filterCode = groupFilter?.filterCode!;

  const textColor = selectedRightSideItem?.isSelectAll ? neutral_100 : ocean_blue_100;
  const textHoverColor = ocean_blue_200;
  const bgHoverColor = ocean_blue_400;

  const dispatch = useDispatch();

  return (
    <Box
      ref={containerRef}
      h="full"
      w="full"
      bg={ocean_blue_500}
      borderRadius="6px"
      overflowX="hidden"
      overflowY="hidden"
    >
      <HStack
        borderBottom="1px solid var(--yellow-500, #FFA914);"
        py="8px"
        px="16px"
        mb="10px"
        bg={ocean_blue_500}
      >
        <AppText size="body3">List of {getFromLocal('insightDrawerTitle')}</AppText>
      </HStack>
      <Skeleton
        w="full"
        height="full"
        isLoaded={!groupConfigState.isLoading}
        fadeDuration={1}
        speed={1}
        maxH={'calc(100vh - 272px)'}
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
              onChange={(e: any) =>
                toggleSelectAllItems(e, filterType, filterCode, groupFilter, dispatch)
              }
              isDisabled={!!selectedRightSideItem?.selectedItems.length || viewFilter}
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
                isDisabled={!!selectedRightSideItem?.isSelectAll || viewFilter}
              />
            );
          })}
        </Box>
      </Skeleton>
    </Box>
  );
};

export default LeftPanel;
