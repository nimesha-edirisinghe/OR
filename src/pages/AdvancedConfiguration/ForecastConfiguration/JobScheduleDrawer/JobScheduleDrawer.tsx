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
  useDisclosure
} from '@chakra-ui/react';
import AppButton from 'components/newTheme/AppButton/AppButton';
import AppText from 'components/AppText/AppText';
import { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TrainingTab from './Tabs/TrainingTab';
import ForecastingTab from './Tabs/ForecastingTab';
import {
  closeDrawer,
  fcConfigPageSliceSelector,
  getTableDataRequest
} from 'state/pages/advancedConfiguration/forecastConfigurationPage/pageState';
import { JobScheduleTypes } from 'types/requests/jobScheduleRequest';
import {
  clearJobScheduleConfig,
  createScheduleRequest,
  getJobSchedulesRequest,
  jobScheduleSliceSelector,
  removeScheduleJobRequest,
  setSelectedJobScheduleType
} from 'state/pages/shared/jobScheduling/jobSchedulingState';
import {
  validateStartAndEndDates,
  validateSchedulingData,
  validateSchedulingAllField
} from 'state/helpers/jobSchedulingHelper';
import { blue_500, neutral_100, ocean_blue_100, ocean_blue_600 } from 'theme/colors';
import AppUserInputPrompt from 'components/AppUserInputPrompt/AppUserInputPrompt';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppTab from 'components/newTheme/AppTab/AppTab';

interface Props {
  isOpen: boolean;
}

const JobScheduleDrawer: FC<Props> = ({ isOpen }) => {
  const pageState = useSelector(fcConfigPageSliceSelector);
  const jobScheduleState = useSelector(jobScheduleSliceSelector);
  const selectedJobScheduleType = jobScheduleState.jobScheduleLocalScope.selectedJobScheduleType;
  const groupDisplayName =
    pageState.trainingConfigLocalScope.selectedFcConfigObj?.groupDetails?.groupDisplayName;
  const jobScheduleConfigData = jobScheduleState.jobSchedulingData;

  const {
    isOpen: isOpenSavePrompt,
    onToggle: onToggleSavePrompt,
    onClose: onCloseSavePrompt
  } = useDisclosure();
  const dispatch = useDispatch();

  const tabList: JobScheduleTypes[] = ['training', 'forecasting'];
  let selectedTabIndex: number = tabList.indexOf(selectedJobScheduleType);

  const onDrawerClose = () => {
    dispatch(closeDrawer());
    onCloseSavePrompt();
  };

  const onTabChange = (index: number) => {
    if (selectedJobScheduleType !== tabList[index]) {
      dispatch(setSelectedJobScheduleType(tabList[index]));
      dispatch(getJobSchedulesRequest('fc'));
    }
  };

  const onSaveHandler = () => {
    const isAnyFieldFilled: boolean = validateSchedulingAllField(
      jobScheduleConfigData,
      jobScheduleConfigData.startDate,
      jobScheduleConfigData.endDate
    );

    if (isAnyFieldFilled) {
      const isValidScheduleConfigs = validateSchedulingData(jobScheduleConfigData);
      const isValidStartAndEndDate = validateStartAndEndDates(
        jobScheduleConfigData.startDate,
        jobScheduleConfigData.endDate
      );

      if (isValidScheduleConfigs && isValidStartAndEndDate) {
        dispatch(createScheduleRequest('fc'));
        dispatch(getTableDataRequest({ groupName: '', pageNo: 1 }));
        onDrawerClose();
      }
    } else {
      dispatch(closeDrawer());
      dispatch(removeScheduleJobRequest());
    }

    onCloseSavePrompt();
  };

  const onClearHandler = () => {
    dispatch(clearJobScheduleConfig());
  };

  const saveConfirmationPrompt = useCallback(() => {
    return (
      <AppUserInputPrompt
        isOpen={isOpenSavePrompt}
        onClose={onCloseSavePrompt}
        leftBtnName="NO"
        rightBtnName="YES"
        title="Save Changes"
        onConfirmHandler={onSaveHandler}
        onCloseHandler={onCloseSavePrompt}
      >
        <AppText fontSize="12px" fontWeight={400} mt={2} width="68%">
          The changes made in the Schedule will be applied to all the Anchors in the group.
        </AppText>
        <AppText fontSize="12px" fontWeight={400}>
          Are you sure you want to continue?
        </AppText>
      </AppUserInputPrompt>
    );
  }, [isOpenSavePrompt]);

  return (
    <>
      {saveConfirmationPrompt()}
      <Drawer isOpen={isOpen} placement="right" onClose={onDrawerClose}>
        <DrawerOverlay />
        <DrawerContent
          maxH="100vh"
          bg={ocean_blue_600}
          w="600px"
          maxW="600px"
          boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
          px="20px"
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
              Schedule &gt; {groupDisplayName}
            </AppText>
          </HStack>
          <DrawerBody p={0} overflow="hidden">
            <Box mt="20px">
              <AppTab
                tabs={[
                  { label: 'Training', content: <TrainingTab /> },
                  { label: 'Forecasting', content: <ForecastingTab /> }
                ]}
                selectedTab={selectedTabIndex}
                onSelectTab={onTabChange}
                variant="primary"
              />
            </Box>
          </DrawerBody>
          <DrawerFooter p={0}>
            <Flex direction="column" w="full" pb="15px">
              <HStack w="full" justify="end" gap="8px">
                <AppButton
                  onClick={onClearHandler}
                  variant="secondary"
                  fontSize="13px"
                  fontWeight="400"
                  p="10px 14px 10px 14px"
                  borderRadius="8px"
                  color={blue_500}
                  w="105px"
                  h="36px"
                >
                  Clear
                </AppButton>
                <AppButton
                  onClick={onToggleSavePrompt}
                  variant="primary"
                  p="10px 14px 10px 14px"
                  borderRadius="8px"
                  fontSize="13px"
                  fontWeight="400"
                  color={neutral_100}
                  w="105px"
                  h="36px"
                >
                  Save
                </AppButton>
              </HStack>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default JobScheduleDrawer;
