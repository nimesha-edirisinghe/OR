import { Box, HStack, VStack } from '@chakra-ui/react';
import AppButton from 'components/newTheme/AppButton/AppButton';

import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  IStoreNewActivationView,
  configDetailsInputType,
  newStoreActivationSliceSelector,
  resetConfigDetailsData,
  resetSelectionData,
  updateConfigUpdateInput
} from 'state/pages/stores/newActivation/storeNewActivationState';
import { useNavigate } from 'react-router-dom';
import AppText from 'components/newTheme/AppText/AppText';
import {
  neutral_200,
  neutral_400,
  ocean_blue_200,
  ocean_blue_500,
  ocean_blue_600,
  white
} from 'theme/colors';
import AppRadio from 'components/newTheme/AppRadio/AppRadio';
import { storeConfigInstructions as instructions, similarStores } from '../../Common/constants';
import AppDateInput from './DatePanel/AppDateInput';
import getTime from 'date-fns/getTime';
import { showErrorToast, showSuccessToast } from 'state/toast/toastState';
import AppDropdown from 'components/newTheme/AppDropdown/AppDropdown';

interface Props {}
const ConfigDetailPanel: FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewState: IStoreNewActivationView = useSelector(newStoreActivationSliceSelector);
  const inputState = viewState.configDetailView.configDetailsInput;

  const onClearHandler = () => {
    dispatch(resetConfigDetailsData());
  };

  const onSaveHandler = () => {
    if ((inputState.phaseIn || '') == '') {
      showErrorToast('Please select phaseIn');
      return;
    }
    if ((inputState.similarStore || '') == '') {
      showErrorToast('Please select similar store');
      return;
    }
    if ((inputState.dataPointMethod || '') == '') {
      showErrorToast('Please select data points collection method');
      return;
    }
    showSuccessToast('Store Activation initiated');
    dispatch(resetSelectionData());
    navigate('/app/stores/new-activation');
  };

  const handleInputChange = (key: configDetailsInputType, value: any) => {
    dispatch(updateConfigUpdateInput({ key: key, value: value }));
  };

  return (
    <VStack mt={'50px'} w="full" justify="flex-start">
      <HStack h="full" w="full" spacing="20px" justify="flex-start">
        <AppText color={white} fontSize="13px" fontWeight={400} lineHeight="18px" size="body2">
          Please provide the following information, which will be used to create accurate
          forecasts and replenishment schedules for the
          {viewState.skuSelectionView.selection.selectedCount} SKUs of the new store.
        </AppText>
      </HStack>
      <Box borderRadius="8px" alignItems="flex-start" minH="calc(100vh - 255px)" w="full">
        <Box p="20px" mb="10px" w="full" borderRadius="8px" bg={ocean_blue_600}>
          <VStack w="480px" alignItems="flex-start" justify="flex-start" spacing="20px">
            <VStack spacing="4px" w="full">
              <AppDateInput
                label="Store opening date"
                onDateSelect={(date) => handleInputChange('phaseIn', getTime(date))}
                selectedDate={inputState.phaseIn as number}
              ></AppDateInput>
              <AppText size="body3" w="full" textAlign="left" color={neutral_400} lineHeight="15px">
                Refers to the date which product is getting launched
              </AppText>
            </VStack>
            <VStack spacing="4px" w="full">
              <HStack spacing="1px" w="full">
                <AppText size="body2" color={neutral_400} lineHeight="18px">
                  Similar Store
                </AppText>
              </HStack>
              <AppDropdown
                options={similarStores}
                buttonWidth="480px"
                height="36px"
                handleItemClick={(value) => handleInputChange('similarStore', value)}
                selectedItem={inputState.similarStore}
                isDisabled={false}
                isEnableSearch={true}
              />
            </VStack>
          </VStack>
        </Box>
        <Box p="20px" w="full" borderRadius="8px" bg={ocean_blue_600}>
          <VStack w="full" alignItems="flex-start" spacing="20px" justify="flex-start">
            <VStack spacing="12px" w="full" alignItems="flex-start">
              <AppText size="body2" color={white} textAlign="left" lineHeight="18px">
                Select a method to create a forecast until sufficient data points (18) are collected
              </AppText>
              <HStack spacing="1px" w="full">
                <AppRadio
                  value="algo"
                  onChange={(e: string) => handleInputChange('dataPointMethod', e)}
                  isChecked={inputState.dataPointMethod == 'algo'}
                  size="md"
                  colorScheme={neutral_200}
                >
                  <AppText size="body2" color={ocean_blue_200}>
                    Use similar store&apos;s information (algorithmic method)
                  </AppText>
                </AppRadio>
              </HStack>
              <HStack spacing="1px" w="full">
                <AppRadio
                  value="manual"
                  onChange={(e: string) => handleInputChange('dataPointMethod', e)}
                  isChecked={inputState.dataPointMethod == 'manual'}
                  size="md"
                  colorScheme={neutral_200}
                >
                  <AppText size="body2" color={ocean_blue_200}>
                    Manually enter forecast
                  </AppText>
                </AppRadio>
              </HStack>
              {inputState.dataPointMethod == 'manual' && (
                <VStack
                  h="auto"
                  w="full"
                  align="start"
                  bg={ocean_blue_500}
                  p="16px"
                  borderRadius="8px"
                >
                  <AppText size="h3Semibold">Instructions</AppText>
                  <Box>
                    {Object.keys(instructions).map((x: string) => (
                      <HStack key={'inst_' + x} align="start">
                        <Box minW="11px" textAlign="right">
                          <AppText size="body2" color="#8EADC1">
                            {x}.
                          </AppText>
                        </Box>
                        <AppText size="body2" color="#8EADC1">
                          {instructions[x]}
                        </AppText>
                      </HStack>
                    ))}
                  </Box>
                  <HStack align="left" spacing="10px">
                    <AppButton variant="secondary" size="medium" onClick={onClearHandler}>
                      Download Template
                    </AppButton>
                    <AppButton variant="secondary" size="medium" onClick={onClearHandler}>
                      Upload
                    </AppButton>
                  </HStack>
                </VStack>
              )}
            </VStack>
          </VStack>
        </Box>
      </Box>

      <Box w="full" overflowX="auto">
        <HStack w="full" justify="space-between" spacing="12px" pt="20px">
          <AppButton variant="secondary" size="medium" onClick={onClearHandler}>
            Clear
          </AppButton>
          <HStack justify="end" spacing="12px">
            <AppButton
              variant="secondary"
              size="medium"
              onClick={() => {
                navigate('/app/stores/new-activation/sku-selection');
              }}
              px="25px"
            >
              Previous
            </AppButton>
            <AppButton variant="primary" size="medium" onClick={onSaveHandler} px="25px">
              Save & Activate
            </AppButton>
          </HStack>
        </HStack>
      </Box>
    </VStack>
  );
};

export default ConfigDetailPanel;
