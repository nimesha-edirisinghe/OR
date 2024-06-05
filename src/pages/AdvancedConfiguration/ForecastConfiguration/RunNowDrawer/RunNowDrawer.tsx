import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  HStack,
  VStack,
  useDisclosure
} from '@chakra-ui/react';
import AppButton from 'components/newTheme/AppButton/AppButton';
import AppText from 'components/AppText/AppText';
import { FC, useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeDrawer,
  executeRunNowRequest,
  fcConfigPageSliceSelector,
  getEstimatedTimeRequest
} from 'state/pages/advancedConfiguration/forecastConfigurationPage/pageState';
import { getGroupDetailsByRowId } from 'utils/utility';
import { showWarningToast } from 'state/toast/toastState';
import { WARNING_MESSAGES } from 'constants/messages';
import {
  ocean_blue_350,
  blue_500,
  ocean_blue_100,
  ocean_blue_200,
  ocean_blue_50,
  ocean_blue_700,
  neutral_100,
  ocean_blue_600,
  neutral_200,
  ocean_blue_500
} from 'theme/colors';
import AppUserInputPrompt from 'components/AppUserInputPrompt/AppUserInputPrompt';
import AppCheckbox from 'components/newTheme/AppCheckbox/AppCheckbox';
import { AppIcon } from 'components/AppIcon/AppIcon';

interface RunNowDrawerProps {
  isOpen: boolean;
}

const RunNowDrawer: FC<RunNowDrawerProps> = ({ isOpen }) => {
  const pageState = useSelector(fcConfigPageSliceSelector);
  const groupDisplayName =
    pageState.trainingConfigLocalScope.selectedFcConfigObj?.groupDetails?.groupDisplayName;
  const { onOpen } = useDisclosure();
  const {
    isOpen: isPromptOpen,
    onToggle: onPromptToggle,
    onClose: onPromptClose
  } = useDisclosure();
  const btnRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const [isSelectedTraining, setIsSelectedTraining] = useState(false);
  const [isSelectedForecasting, setIsSelectedForecasting] = useState(false);

  useEffect(() => {
    onOpen();
  }, []);

  const onDrawerClose = () => {
    dispatch(closeDrawer());
    setIsSelectedTraining(false);
    setIsSelectedForecasting(false);
  };

  const onSaveHandler = () => {
    dispatch(executeRunNowRequest(isSelectedTraining, isSelectedForecasting));
    onPromptClose();
  };
  const getGroupDetails = () => {
    if (pageState.tableData) {
      const groupName = getGroupDetailsByRowId(pageState.tableData, pageState.selectedRowId);
      return groupName;
    }
  };

  const generateConfirmationMessage = (): string => {
    const hours = pageState.estimatedTime?.estimated_time_hour;
    const min = pageState.estimatedTime?.estimated_time_min;
    const sec = pageState.estimatedTime?.estimated_time_sec;
    const message = `${
      getGroupDetails()?.anchorCount
    } anchors is estimated to take approximately ${hours} hours ${min} minutes and ${sec} seconds`;

    if (isSelectedTraining && isSelectedForecasting) {
      return `Training and forecasting for ${message}`;
    } else if (isSelectedTraining) {
      return `Training for ${message}`;
    }
    return `Forecasting for ${message}`;
  };

  const runNowConfirmationPrompt = useCallback(() => {
    return (
      <AppUserInputPrompt
        isOpen={isPromptOpen}
        onClose={onPromptClose}
        leftBtnName="NO"
        rightBtnName="YES"
        title="Confirmation"
        onConfirmHandler={onSaveHandler}
        onCloseHandler={onPromptClose}
      >
        <AppText fontSize="12px" fontWeight={400} mt={2} width="68%">
          {generateConfirmationMessage()}
        </AppText>
        <AppText fontSize="12px" fontWeight={400}>
          Are you sure you want to proceed?
        </AppText>
      </AppUserInputPrompt>
    );
  }, [isPromptOpen, dispatch, pageState.estimatedTime]);

  const onClickRunHandler = () => {
    if (isSelectedForecasting || isSelectedTraining) {
      dispatch(getEstimatedTimeRequest(isSelectedTraining, isSelectedForecasting));
      onPromptToggle();
    } else {
      showWarningToast(WARNING_MESSAGES.PLEASE_SELECT_OPERATION);
    }
  };

  return (
    <>
      {runNowConfirmationPrompt()}
      <Drawer isOpen={isOpen} placement="right" onClose={onDrawerClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent
          maxH="100vh"
          bg={ocean_blue_600}
          w="600px"
          maxW="600px"
          boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
          px="20px"
          pr="16px"
          pt="22px"
          userSelect="none"
        >
          <DrawerCloseButton mt="10px" color={blue_500} />

          <HStack gap="12px">
            <AppIcon
              name="singleLeftArrow"
              fill={blue_500}
              cursor="pointer"
              height="24px"
              width="24px"
              onClick={() => onDrawerClose()}
            />
            <AppText
              color={neutral_100}
              lineHeight="19.5px"
              fontSize="13px"
              fontWeight="700"
              fontStyle="normal"
            >
              Run Now &gt; {groupDisplayName}
            </AppText>
          </HStack>
          <DrawerBody p={0} overflow="hidden">
            <Box
              maxH="71vh"
              overflowX="hidden"
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
              <VStack w="full" h="400px" pt="20px" pl="8px" top={0} align="stretch" spacing="8px">
                <AppText color={neutral_200} fontSize="14px" fontWeight="700">
                  Select the option from below list
                </AppText>
                <VStack spacing="4px">
                  <Box
                    backgroundColor={ocean_blue_500}
                    borderRadius="8px"
                    w="560px"
                    h="56px"
                    alignContent="center"
                    p="16px 8px 16px 12px"
                  >
                    <AppCheckbox
                      id={0}
                      label="Training"
                      isChecked={isSelectedTraining}
                      onChange={() => setIsSelectedTraining(!isSelectedTraining)}
                      isDisabled={false}
                    />
                  </Box>
                  <Box
                    backgroundColor={ocean_blue_500}
                    borderRadius="8px"
                    w="560px"
                    h="56px"
                    alignContent="center"
                    p="16px 8px 16px 12px"
                  >
                    <AppCheckbox
                      id={1}
                      label="Forecasting"
                      isChecked={isSelectedForecasting}
                      onChange={() => setIsSelectedForecasting(!isSelectedForecasting)}
                      isDisabled={false}
                    />
                  </Box>
                </VStack>
              </VStack>
            </Box>
          </DrawerBody>

          <DrawerFooter p={0}>
            <Flex direction="column" w="full" pb="15px">
              <HStack w="full" justify="end" spacing="12px">
                <AppButton
                  onClick={onDrawerClose}
                  variant="secondary"
                  w="105px"
                  h="36px"
                  borderRadius="8px"
                  p="10px 14px 10px 14px"
                  fontSize="13px"
                  fontWeight="400"
                  color={blue_500}
                >
                  Cancel
                </AppButton>
                <AppButton
                  onClick={onClickRunHandler}
                  variant="primary"
                  w="105px"
                  h="36px"
                  borderRadius="8px"
                  p="10px 14px 10px 14px"
                  fontSize="13px"
                  fontWeight="400"
                  color={neutral_100}
                >
                  Run
                </AppButton>
              </HStack>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default RunNowDrawer;
