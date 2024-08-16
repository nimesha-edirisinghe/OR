import { Box, HStack, Tag, VStack, useDisclosure } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { CSSProperties, FC, useCallback, useState } from 'react';
import { StoreGroupI } from 'types/responses/groupConfigResponses';
import { useDispatch } from 'react-redux';
import {
  deleteGroupRequest,
  getFilterCountRequest,
  getLabelsRequest,
  groupDefinitionRequest,
  resetGroupFilter,
  resetStoreGroup,
  setSelectedStore,
  toggleEditDrawer,
  toggleViewGroupConfigDrawer
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { GroupTypes } from 'types/groupConfig';
import AppPopover from 'components/AppPopover/AppPopover';
import AppTooltip from 'components/AppTooltip/AppTooltip';
import {
  blue_500,
  green_100_t20,
  green_600,
  ocean_blue_400,
  ocean_blue_500,
  ocean_blue_600,
  red_400,
  red_500_t28,
  white,
  yellow_500
} from 'theme/colors';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { AccessPermissionEnum, GroupTypesEnum, MenuItems } from 'utils/enum';
import AppPopup from 'components/newTheme/AppPopup/AppPopup';
import MoreOptionContent from './StoreGroupCardEdit/MoreOptionContent';
import useAccessType from 'hooks/useMenuAccessType';
import { hasAccessPermission } from 'utils/permissions';

interface Props {
  storeGroup: StoreGroupI;
  groupType: GroupTypes;
}

const optionPopoverStyles: CSSProperties = {
  maxWidth: '180px',
  margin: 0,
  borderRadius: '8px',
  borderColor: ocean_blue_400,
  marginTop: '-6.5px'
};

const StoreGroupCardView: FC<Props> = ({ storeGroup, groupType }) => {
  const dispatch = useDispatch();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const {
    isOpen: IsMoreOptionOpen,
    onToggle: onMoreOptionToggle,
    onClose: OnMoreOptionClose
  } = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);

  const accessType = useAccessType(MenuItems.GROUP_CONFIGURATION);
  const accessNotAllowed = !hasAccessPermission(accessType, [AccessPermissionEnum.EDIT]);

  const onCardHoverHandler = () => {
    setIsEdit((prev) => !prev);
    OnMoreOptionClose();
  };

  const onEditHandler = () => {
    const store =
      groupType === GroupTypesEnum.STORE ? GroupTypesEnum.STORE : GroupTypesEnum.WAREHOUSE;
    dispatch(setSelectedStore({ storeGroup: storeGroup, groupType: store }));
    dispatch(toggleEditDrawer());
  };

  const onViewGroup = (activeStep: 0 | 1) => {
    dispatch(
      getLabelsRequest({ labelTypes: ['location', 'product', 'anchor', 'predictor', 'store'] })
    );
    dispatch(resetGroupFilter());
    dispatch(setSelectedStore({ storeGroup: storeGroup, groupType: 'store' }));
    dispatch(getFilterCountRequest({ whFlag: 0 }));
    dispatch(toggleViewGroupConfigDrawer({ state: true, activeStep }));
    setTimeout(() => {
      dispatch(groupDefinitionRequest());
    }, 1000);
  };

  const onDeleteHandler = (groupKey: number) => {
    if (groupType === GroupTypesEnum.STORE) dispatch(resetStoreGroup());
    dispatch(deleteGroupRequest({ groupKey, groupType }));
    onClose();
  };

  const deleteConfirmationPrompt = useCallback(() => {
    return (
      <AppPopup
        isOpen={isOpen}
        onClose={onClose}
        leftBtnName="Cancel"
        rightBtnName="Delete"
        title="Delete Changes"
        infoMessage={`Are you sure you with to delete this group? (This action is not reversible)`}
        onConfirmHandler={onClose}
        onCloseHandler={() => onDeleteHandler(storeGroup.groupKey)}
        icon={<AppIcon name="warningPrompt" fill={yellow_500} width="54px" height="54px" />}
      />
    );
  }, [isOpen]);

  const formatText = (text: string) => {
    if (text.length > 12) {
      const formattedText = text.slice(0, 12);
      return `${formattedText}...`;
    } else {
      return text;
    }
  };

  const onClickDelete = () => {
    onToggle();
  };

  const onClickStoreOption = (option: number) => {
    if (option === 0) onViewGroup(0);
    else if (option === 1) onViewGroup(1);
    else if (option === 2) onEditHandler();
    else onClickDelete();
  };

  const onClickWarehouseOption = (option: number) => {
    if (option === 0) onEditHandler();
    else onClickDelete();
  };

  const onResolveMoreOption =
    groupType === GroupTypesEnum.STORE ? onClickStoreOption : onClickWarehouseOption;

  return (
    <>
      {deleteConfirmationPrompt()}
      <Box
        minW="350px"
        flex={1}
        onMouseEnter={onCardHoverHandler}
        onMouseLeave={onCardHoverHandler}
      >
        <VStack
          bg={ocean_blue_500}
          w="full"
          h="210px"
          px="14px"
          py="14px"
          borderRadius="8px"
          gap={'8px'}
        >
          <HStack justify="space-between" w="full">
            <AppText
              w="full"
              fontSize="16px"
              fontWeight={600}
              lineHeight="24px"
              color={white}
              noOfLines={1}
            >
              {storeGroup.groupDesc.length > 12 ? (
                <AppTooltip
                  label={`${storeGroup.groupKey} - ${storeGroup.groupDesc}`}
                  placement="auto-start"
                >
                  <span>{`${storeGroup.groupKey} - ${formatText(storeGroup.groupDesc)}`}</span>
                </AppTooltip>
              ) : (
                <span>{`${storeGroup.groupKey} - ${storeGroup.groupDesc}`}</span>
              )}
            </AppText>
            <HStack justify="end">
              {!!storeGroup.currentEnabledStatus ? (
                <Tag bg={green_100_t20}>
                  <AppText size={'body2'} fontWeight={400} color={green_600}>
                    Active
                  </AppText>
                </Tag>
              ) : (
                <Tag bg={red_500_t28}>
                  <AppText fontSize="body2" fontWeight={400} color={red_400}>
                    Inactive
                  </AppText>
                </Tag>
              )}
            </HStack>
          </HStack>
          <HStack w={'full'} spacing={'75px'}>
            <VStack w={'50%'} align="start">
              <AppText size="body3" fontWeight={400} color={'#57809A'} mt={'2px !important'}>
                Anchor-locations
              </AppText>
              <AppText size="body2" fontWeight={400} color={white} mt={'2px !important'}>
                {storeGroup.anchorCount}
              </AppText>
            </VStack>

            <VStack w={'50%'} align="start">
              <AppText size="body3" fontWeight={400} color={'#57809A'} mt={'2px !important'}>
                SKU-locations
              </AppText>
              <AppText size="body2" fontWeight={400} color={white} mt={'2px !important'}>
                {storeGroup.skuCount}
              </AppText>
            </VStack>
          </HStack>
          <VStack w="full" align="start">
            <VStack align="start">
              <AppText size="body3" fontWeight={400} color={'#57809A'} mt={'2px !important'}>
                Forecasting Freq
              </AppText>
              <AppText size="body2" fontWeight={400} color={white} mt={'2px !important'}>
                {storeGroup.forecastingFrequency}
              </AppText>
            </VStack>
            <HStack justify="space-between" w="full">
              <HStack justify={'space-between'} w="full">
                <HStack>
                  <VStack align="start">
                    <AppText size="body3" fontWeight={400} color={'#57809A'} mt={'2px !important'}>
                      Horizon
                    </AppText>
                    <AppText size="body2" fontWeight={400} color={white} mt={'2px !important'}>
                      {storeGroup.forecastingHorizon}
                    </AppText>
                  </VStack>
                </HStack>
                {isEdit && (
                  <HStack>
                    <AppPopover
                      isOpen={IsMoreOptionOpen}
                      onClose={OnMoreOptionClose}
                      trigger="click"
                      children={
                        <AppIconButton
                          aria-label="resolve"
                          icon={
                            <AppIcon
                              transition="transform 0.25s ease"
                              name={'ellipsis'}
                              fill={blue_500}
                            />
                          }
                          variant="secondary"
                          size="iconMedium"
                          onClick={onMoreOptionToggle}
                          bg={ocean_blue_600}
                          isDisabled={accessNotAllowed}
                        />
                      }
                      content={
                        <MoreOptionContent
                          onResolveMoreOption={onResolveMoreOption}
                          groupType={groupType}
                        />
                      }
                      contentStyles={optionPopoverStyles}
                    />
                  </HStack>
                )}
              </HStack>
            </HStack>
          </VStack>
        </VStack>
      </Box>
    </>
  );
};

export default StoreGroupCardView;
