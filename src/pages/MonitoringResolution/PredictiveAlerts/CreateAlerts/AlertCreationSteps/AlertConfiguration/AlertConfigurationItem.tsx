import { Box, Collapse, HStack, VStack } from '@chakra-ui/react';
import AppToggle from 'components/AppToggle/AppToggle';
import { produce } from 'immer';
import { ChangeEvent, FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAlertType } from 'state/pages/monitoringAndResolution/Alert/alertState';
import store from 'state/store';
import { AlertTypesI } from 'types/alertConfig';
import { isPercentageValid, validateCompareValue } from './Helpers/AlertConfigurationValidator';
import { userSliceSelector } from 'state/user/userState';
import {
  getCaptionFromFrequency,
  getLabelFromFrequency
} from './Helpers/AlertConfigurationDataFormatter';
import AppText from 'components/newTheme/AppText/AppText';
import AppInput from 'components/newTheme/AppInput/AppInput';
import {
  neutral_100,
  neutral_200,
  ocean_blue_200,
  ocean_blue_500,
  ocean_blue_600
} from 'theme/colors';

interface AlertConfigurationItemProps {
  alertTypeData: AlertTypesI;
  alertRiskTagRequired?: boolean;
}

const AlertConfigurationItem: FC<AlertConfigurationItemProps> = ({ alertTypeData }) => {
  const dispatch = useDispatch();
  const userState = useSelector(userSliceSelector);
  const responseTimeGranularity = userState.selectedOrg.responseTimeGranularity;
  const formattedGranularity = getLabelFromFrequency(responseTimeGranularity);
  const formattedCaption = getCaptionFromFrequency(responseTimeGranularity);
  const alertTypeName: string = ['Growth', 'Degrowth'].includes(alertTypeData.name)
    ? `${alertTypeData.name} (YoY)`
    : alertTypeData.name;

  const renderPrimaryAlertType = useCallback(() => {
    return (
      <VStack align="start" spacing="16px" pb="16px" mt="16px">
        <AppText size="body2" color="rgba(250, 250, 250, 0.80)" w="78%">
          {alertTypeData.firstDescription}
        </AppText>
        <VStack align="start" spacing="4px">
          <AppInput
            w="452px"
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeNumberOfDays(e.target.value)}
            label="Enter number of days"
            value={alertTypeData.compareValue}
            variant="primary"
            size="small"
            fontSize="14px"
            isRequired={true}
            placeholder="Number of days"
            error={alertTypeData.error}
          />
        </VStack>
      </VStack>
    );
  }, [alertTypeData]);

  const renderSecondaryAlertType = useCallback(() => {
    return (
      <VStack align="start" spacing="16px" pb="16px" mt="16px">
        <AppText size="body2" color={neutral_100} w="78%">
          {alertTypeData.firstDescription}
        </AppText>
        <VStack align="start" spacing="4px">
          <AppInput
            w="452px"
            label={`Enter the number of forecasted ${formattedGranularity} to compare`}
            placeholder={`Number of ${formattedGranularity} (e.g : 12)`}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChangeCompareValueText(e.target.value)
            }
            variant="primary"
            fontSize="14px"
            isRequired={true}
            value={alertTypeData.compareValue}
            error={alertTypeData.error}
            caption={formattedCaption}
          />
        </VStack>
        <AppText size="body2" color={neutral_100} w="78%">
          {alertTypeData.secondDescription}
        </AppText>
        <VStack align="start" spacing="4px">
          <AppInput
            w="452px"
            label="Enter the threshold percentage"
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeThresholdText(e.target.value)}
            fontSize="14px"
            isRequired={true}
            value={alertTypeData.threshold}
            placeholder="Threshold percentage (e.g : 90%)"
            error={alertTypeData.error}
          />
        </VStack>
      </VStack>
    );
  }, [alertTypeData, formattedGranularity]);

  const onEnableToggleChange = () => {
    const _al = store.getState().alert.defaultAlertTypes;
    const _alertTypes = produce(_al, (draft) => {
      draft.find((alert) => alert.type === alertTypeData.type)!.enable = !draft.find(
        (alert) => alert.type === alertTypeData.type
      )?.enable;
      return draft;
    });
    dispatch(updateAlertType(_alertTypes));
  };

  const onChangeNumberOfDays = (text: string) => {
    if (text === '' || /^\d*$/.test(text)) {
      const number = parseInt(text, 10);
      if (text === '' || (number >= 1 && number <= 999)) {
        const _al = store.getState().alert.defaultAlertTypes;
        const _alertTypes = produce(_al, (draft) => {
          draft.map((alert) => {
            if (alert.type === alertTypeData.type) {
              alert.compareValue = text;
              alert.error = null;
            }
            return alert;
          });
        });
        dispatch(updateAlertType(_alertTypes));
      }
    }
  };

  const onChangeCompareValueText = (text: string) => {
    if (!/^\d*$/.test(text)) {
      return;
    }
    const numericValue = text.replace(/[^0-9]/g, '');
    const isValidCompareValue = validateCompareValue(numericValue, responseTimeGranularity);

    if (isValidCompareValue) {
      const _al = store.getState().alert.defaultAlertTypes;
      const _alertTypes = produce(_al, (draft) => {
        draft.map((alert) => {
          if (alert.type === alertTypeData.type) {
            alert.compareValue = numericValue;
            alert.error = null;
          }
          return alert;
        });
      });
      dispatch(updateAlertType(_alertTypes));
    }
  };

  const onChangeThresholdText = (text: string) => {
    if (isPercentageValid(text)) {
      const _al = store.getState().alert.defaultAlertTypes;
      const _alertTypes = produce(_al, (draft) => {
        draft.map((alert) => {
          if (alert.type === alertTypeData.type) {
            alert.threshold = text;
            alert.error = null;
          }
          return alert;
        });
      });
      dispatch(updateAlertType(_alertTypes));
    }
  };

  return (
    <Box borderRadius="8px" bg={ocean_blue_600} w="636px" p="16px 20px 16px 20px">
      <HStack justify="space-between" onClick={() => onEnableToggleChange()} cursor="pointer">
        <AppText fontSize="13px" fontWeight={600} color={neutral_200} lineHeight="19.5px">
          {alertTypeName}
        </AppText>
        <AppToggle isChecked={alertTypeData.enable} onChange={() => {}} size="sm" />
      </HStack>
      <Collapse in={alertTypeData.enable} animateOpacity>
        {alertTypeData.isPrimaryAlert ? renderPrimaryAlertType() : renderSecondaryAlertType()}
      </Collapse>
    </Box>
  );
};

export default AlertConfigurationItem;
