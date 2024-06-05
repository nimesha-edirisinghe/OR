import { Box, HStack, useDisclosure } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppNavigation from 'components/AppNavigation/AppNavigation';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import AppText from 'components/newTheme/AppText/AppText';
import { Navigator } from 'hooks/useNavigator';
import { CSSProperties, FC } from 'react';
import { useSelector } from 'react-redux';
import {
  IRPLView,
  rplViewSliceSelector,
} from 'state/pages/view/replenishmentView/rplViewPageState';
import { blue_500, ocean_blue_400, ocean_blue_600, yellow_500 } from 'theme/colors';
import { ReplenishmentSkuListItem } from 'types/responses/viewResponses';
import ReplEditedPopoverContent, { editedReplPopoverStyles } from './ReplEditedPopoverContent';
import AppPopover from 'components/AppPopover/AppPopover';
import useTooltip from 'hooks/useTooltip';
import MoreOptionContent from '../../ReplenishmentHeader/MoreOptionContent';
import { storeReplSingleMoreOptionItemList } from 'utils/constants';

interface ActionBarProps {
  onMaxMinHandler: () => void;
  navigator: Navigator<ReplenishmentSkuListItem>;
  isOpenPanel?: boolean;
}

const ActionBar: FC<ActionBarProps> = ({ onMaxMinHandler, navigator, isOpenPanel }) => {
  const {
    isOpen: isOpenMoreOption,
    onToggle: onToggleMoreOption,
    onClose: onCloseMoreOption
  } = useDisclosure();
  const [isTooltipOpen, handleMouseEnter, handleMouseLeave] = useTooltip();
  const rplViewState: IRPLView = useSelector(rplViewSliceSelector);
  const totalSkuCount = rplViewState.rplSkuDataList?.totalCount;
  const isSelectAll = rplViewState.rplViewLocalScope.globalRplSkuSelected;
  const selectedSKUCount = rplViewState.rplSelectedSkuList.length;
  const selectedSkuName =
    rplViewState.rplSelectedSku?.sku + ' | ' + rplViewState.rplSelectedSku?.location;
  const isEdited = !!rplViewState.rplPlanDetails?.isEdited;

  const moreOptionPopoverStyles: CSSProperties = {
    maxWidth: '277px',
    margin: 0,
    borderRadius: '8px',
    borderColor: ocean_blue_400,
    marginTop: '-6.5px',
    zIndex: 100
  };
  
  return (
    <HStack h="full" w="full" p="12px" justify="space-between">
      <HStack>
        <AppNavigation navigator={navigator} totalCount={isSelectAll ? totalSkuCount : null} />
        <AppText h="28px" p="4px" size="h4Semibold">
          {selectedSkuName}
        </AppText>
        {isEdited && (
          <AppPopover
            isOpen={isTooltipOpen}
            onClose={handleMouseLeave}
            contentStyles={editedReplPopoverStyles}
            trigger="hover"
            children={
              <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <AppIcon fill={yellow_500} name="infoCircle" w="20px" h="20px" />
              </Box>
            }
            content={<ReplEditedPopoverContent />}
          />
        )}
      </HStack>
      <HStack>
        <AppPopover
          isOpen={isOpenMoreOption}
          onClose={onCloseMoreOption}
          contentStyles={moreOptionPopoverStyles}
          trigger="click"
          children={
            <AppIconButton
              aria-label="moreOption"
              icon={
                <AppIcon transition="transform 0.25s ease" name="wrench" fill={blue_500} />
              }
              variant="secondary"
              size="iconMedium"
              onClick={onToggleMoreOption}
              bg={isOpenMoreOption ? ocean_blue_400 : ocean_blue_600}
              isDisabled={!isSelectAll && selectedSKUCount == 0}
              h="28px"
              w="28px"
              p="7px"
            />
          }
          content={<MoreOptionContent options={storeReplSingleMoreOptionItemList}/>}
        />
        <AppIconButton
          aria-label="maximize"
          icon={<AppIcon transition="transform 0.25s ease" name={isOpenPanel ? "collapse" : "expand"} stroke={blue_500} />}
          variant="secondary"
          size="iconMedium"
          onClick={onMaxMinHandler}
          bg={ocean_blue_600}
          disabled
          h="28px"
          w="28px"
          p="7px"
        />
      </HStack>
    </HStack>
  );
};

export default ActionBar;
