import { Box, HStack, useDisclosure } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppNavigation from 'components/AppNavigation/AppNavigation';
import AppPopover from 'components/AppPopover/AppPopover';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import AppText from 'components/newTheme/AppText/AppText';
import { Navigator } from 'hooks/useNavigator';
import useTooltip from 'hooks/useTooltip';
import ReplEditedPopoverContent, {
  editedReplPopoverStyles
} from 'pages/View/ReplenishmentPlanning/ReplenishmentMainSection/ActionBar/ReplEditedPopoverContent';
import { CSSProperties, FC } from 'react';
import { useSelector } from 'react-redux';
import {
  IRPLWhView,
  rplWHViewSliceSelector
} from 'state/pages/view/whReplenishmentView/whRplViewState';
import { blue_500, ocean_blue_400, ocean_blue_600, yellow_500 } from 'theme/colors';
import { ReplenishmentSkuListItem } from 'types/responses/viewResponses';
import { whReplSingleMoreOptionItemList } from 'utils/constants';
import MoreOptionContent from '../../WHReplenishmentHeader/MoreOptionContent';

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
  const rplWHViewState: IRPLWhView = useSelector(rplWHViewSliceSelector);
  const totalSkuCount = rplWHViewState.rplWhSkuDataList?.totalCount;
  const isSelectAll = rplWHViewState.rplWhViewLocalScope.globalRplWhSkuSelected;
  const selectedSKUCount = rplWHViewState.rplWhSelectedSkuList.length;
  const selectedSkuName =
    rplWHViewState.rplWhSelectedSku?.sku + ' | ' + rplWHViewState.rplWhSelectedSku?.location;
  const [isTooltipOpen, handleMouseEnter, handleMouseLeave] = useTooltip();
  const isEdited = !!rplWHViewState.rplWhPlanDetails?.isEdited;

  const moreOptionPopoverStyles: CSSProperties = {
    maxWidth: '277px',
    margin: 0,
    borderRadius: '8px',
    borderColor: ocean_blue_400,
    marginTop: '-6.5px',
    zIndex: 100
  };

  return (
    <HStack h="full" w="full" px="16px" justify="space-between">
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
              icon={<AppIcon transition="transform 0.25s ease" name="wrench" fill={blue_500} />}
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
          content={<MoreOptionContent options={whReplSingleMoreOptionItemList} />}
        />
        <AppIconButton
          aria-label="maximize"
          icon={
            <AppIcon
              transition="transform 0.25s ease"
              name={isOpenPanel ? "collapse" : "expand"}
              stroke={blue_500}
            />
          }
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
