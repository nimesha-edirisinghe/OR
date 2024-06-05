import { Box, HStack, Tag, VStack, useDisclosure } from '@chakra-ui/react';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import AppText from 'components/AppText/AppText';
import { FC, useCallback, useState } from 'react';
import { StoreGroupI } from 'types/responses/groupConfigResponses';
import StoreGroupCardEdit from './StoreGroupCardEdit/StoreGroupCardEdit';
import { useDispatch } from 'react-redux';
import {
  cancelEditMode,
  deleteGroupRequest,
  editGroupRequest,
  getFilterCountRequest,
  getLabelsRequest,
  groupDefinitionRequest,
  resetGroupFilter,
  setActiveStatus,
  setSelectedStore,
  toggleViewGroupConfigDrawer
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { GroupTypes } from 'types/groupConfig';
import AppPopover from 'components/AppPopover/AppPopover';
import AppTooltip from 'components/AppTooltip/AppTooltip';
import {
  green_500,
  neutral_200,
  ocean_blue_400,
  ocean_blue_50,
  ocean_blue_500,
  red_500
} from 'theme/colors';
import AppUserInputPrompt from 'components/AppUserInputPrompt/AppUserInputPrompt';

interface Props {
  storeGroup: StoreGroupI;
  groupType: GroupTypes;
}

const StoreGroupCardView: FC<Props> = ({ storeGroup, groupType }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const {
    isOpen: ctxPopViewIsOpen,
    onToggle: ctxPopViewOnToggle,
    onClose: ctxPopViewOnClose
  } = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const onEditHandler = () => {
    setIsEdit((prev) => !prev);
  };

  const onViewGroup = (activeStep: 0 | 1) => {
    dispatch(
      getLabelsRequest({ labelTypes: ['location', 'product', 'anchor', 'predictor', 'store'] })
    );
    dispatch(resetGroupFilter());
    dispatch(setSelectedStore(storeGroup));
    dispatch(getFilterCountRequest({ whFlag: 0 }));
    dispatch(toggleViewGroupConfigDrawer({ state: true, activeStep }));
    setTimeout(() => {
      dispatch(groupDefinitionRequest());
    }, 1000);
  };

  const onCancelEditHandler = (groupKey: number) => {
    setIsEdit(false);
    dispatch(
      cancelEditMode({
        groupKey,
        groupType
      })
    );
  };

  const onChangeHandler = (groupKey: number) => {
    dispatch(setActiveStatus({ groupType, groupKey }));
  };

  const onDeleteHandler = (groupKey: number) => {
    dispatch(deleteGroupRequest({ groupKey, groupType }));
    onClose();
  };

  const onSaveHandler = (groupKey: number, forecastHorizon: number, groupName: string) => {
    dispatch(editGroupRequest({ groupKey, forecastHorizon, groupName, groupType }));
    setIsEdit(false);
  };

  const deleteConfirmationPrompt = useCallback(() => {
    const renderBody = () => {
      return (
        <>
          <AppText size="usm">{`You are about to delete Group ${storeGroup.groupDesc} permanently.`}</AppText>
          <AppText size="usm" mt={2}>
            Are you sure you want to continue?
          </AppText>
        </>
      );
    };

    return (
      <AppUserInputPrompt
        isOpen={isOpen}
        onClose={onClose}
        leftBtnName="NO"
        rightBtnName="YES"
        title="Delete Group"
        onConfirmHandler={() => onDeleteHandler(storeGroup.groupKey)}
        onCloseHandler={onClose}
        children={renderBody()}
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

  return (
    <>
      {deleteConfirmationPrompt()}
      <Box w="350px">
        {!isEdit ? (
          <VStack
            bg={ocean_blue_500}
            w="full"
            justify="space-between"
            h="210px"
            maxW="350px"
            px="20px"
            py="20px"
            alignContent="center"
            borderRadius="7px"
          >
            <VStack w="full" align="start">
              <HStack justify="space-between" w="full">
                <AppText
                  fontSize="16px"
                  fontWeight={600}
                  lineHeight="24px"
                  color={neutral_200}
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
                    <Tag bg={ocean_blue_400}>
                      <AppText
                        fontSize="12px"
                        fontWeight={400}
                        color={green_500}
                        letterSpacing={0.5}
                      >
                        ACTIVE
                      </AppText>
                    </Tag>
                  ) : (
                    <Tag bg={ocean_blue_400}>
                      <AppText fontSize="12px" fontWeight={400} color={red_500} letterSpacing={0.5}>
                        IN ACTIVE
                      </AppText>
                    </Tag>
                  )}

                  {groupType === 'store' && (
                    <AppPopover
                      isOpen={ctxPopViewIsOpen}
                      onClose={ctxPopViewOnClose}
                      trigger="click"
                      children={
                        <AppIconChakra
                          name="vSpread"
                          fill={ocean_blue_50}
                          onClick={ctxPopViewOnToggle}
                          fontSize="20px"
                        />
                      }
                      content={
                        <VStack
                          bg={ocean_blue_500}
                          borderRadius="6px"
                          p="5px"
                          boxShadow="0px 12px 20px 0px #001019"
                        >
                          <AppText
                            fontSize="13px"
                            fontWeight={400}
                            lineHeight="22px"
                            color={ocean_blue_50}
                            cursor="pointer"
                            onClick={() => onViewGroup(0)}
                            width={'100%'}
                          >
                            Anchor Locations
                          </AppText>
                          <AppText
                            fontSize="13px"
                            fontWeight={400}
                            lineHeight="22px"
                            color={ocean_blue_50}
                            cursor="pointer"
                            onClick={() => onViewGroup(1)}
                            width={'100%'}
                          >
                            Influencing Factors
                          </AppText>
                          <AppText
                            fontSize="13px"
                            fontWeight={400}
                            lineHeight="22px"
                            color={ocean_blue_50}
                            cursor="pointer"
                            onClick={onEditHandler}
                            width={'100%'}
                          >
                            Edit
                          </AppText>
                          <AppText
                            fontSize="13px"
                            fontWeight={400}
                            lineHeight="22px"
                            color={ocean_blue_50}
                            cursor="pointer"
                            onClick={onToggle}
                            width={'100%'}
                          >
                            Delete
                          </AppText>
                        </VStack>
                      }
                      contentStyles={{ width: 200 }}
                    />
                  )}
                </HStack>
              </HStack>
              <HStack>
                <AppText fontSize="14px" fontWeight={400} lineHeight="22px" color={ocean_blue_50}>
                  Anchor-locations :
                </AppText>
                <AppText fontSize="14px" fontWeight={400} lineHeight="22px" color={neutral_200}>
                  {storeGroup.anchorCount}
                </AppText>
              </HStack>
              <HStack>
                <AppText fontSize="14px" fontWeight={400} lineHeight="22px" color={ocean_blue_50}>
                  SKU-locations :
                </AppText>
                <AppText fontSize="14px" fontWeight={400} lineHeight="22px" color={neutral_200}>
                  {storeGroup.skuCount}
                </AppText>
              </HStack>
            </VStack>
            <VStack w="full" align="start">
              <HStack>
                <AppText fontSize="14px" fontWeight={400} lineHeight="22px" color={ocean_blue_50}>
                  Forecasting Freq :
                </AppText>
                <AppText fontSize="14px" fontWeight={400} lineHeight="22px" color={neutral_200}>
                  {storeGroup.forecastingFrequency}
                </AppText>
              </HStack>
              <HStack justify="space-between" w="full">
                <HStack>
                  <AppText fontSize="14px" fontWeight={400} lineHeight="22px" color={ocean_blue_50}>
                    Horizon :
                  </AppText>
                  <AppText fontSize="14px" fontWeight={400} lineHeight="22px" color={neutral_200}>
                    {storeGroup.forecastingHorizon}
                  </AppText>
                </HStack>
              </HStack>
            </VStack>
          </VStack>
        ) : (
          <StoreGroupCardEdit
            onCloseHandler={onCancelEditHandler}
            activeStatus={!!storeGroup.currentEnabledStatus}
            groupKey={storeGroup.groupKey}
            onChangeHandler={onChangeHandler}
            storeGroup={storeGroup}
            onSaveHandler={onSaveHandler}
            groupType={groupType}
          />
        )}
      </Box>
    </>
  );
};

export default StoreGroupCardView;
