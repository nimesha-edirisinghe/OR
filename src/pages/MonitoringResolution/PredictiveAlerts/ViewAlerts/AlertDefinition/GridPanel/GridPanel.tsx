import { FC, useCallback, useEffect, useState } from 'react';
import AppSimpleGrid from 'components/newTheme/AppSimpleGrid/AppSimpleGrid';
import { Box, BoxProps, HStack, useDisclosure } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IAlert,
  alertSliceSelector,
  getAlertConfigsRequest,
  getAlertsRequest,
  editAlertDataRequest,
  toggleGraphPanel,
  updateGraphPayloadData
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import { AlertForecastChartTable, AlertGraphForecastDataI } from 'types/alertConfig';
import AppButton from 'components/newTheme/AppButton/AppButton';
import { AlertGraphRequestBodyI } from 'types/requests/viewRequests';
import AppUserInputPrompt from 'components/AppUserInputPrompt/AppUserInputPrompt';
import AppText from 'components/AppText/AppText';
import { neutral_100, yellow_500 } from 'theme/colors';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppPopup from 'components/newTheme/AppPopup/AppPopup';
import { isNumber } from 'lodash';

interface Props extends BoxProps {}

const GridPanel: FC<Props> = ({ ...rest }) => {
  const {
    isOpen: isOpenPrompt,
    onToggle: onTogglePrompt,
    onClose: onClosePrompt
  } = useDisclosure();
  const {
    isOpen: isOpenCancelPrompt,
    onToggle: onToggleCancelPrompt,
    onClose: onCloseCancelPrompt
  } = useDisclosure();
  const alertState: IAlert = useSelector(alertSliceSelector);
  const isAnchorSelected = alertState.selectedChartType !== 'sku';
  const headers = alertState.dfTable?.headers || [];
  const [rows, setRows] = useState<
    (AlertForecastChartTable['skuForecast'] | AlertForecastChartTable['compareForecast'])[]
  >([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const tempSKURow: any[] = [];
  const dispatch = useDispatch();

  const closeGraphPanel = () => {
    dispatch(toggleGraphPanel());
  };

  const formattedDataRow = rows
    .filter((arr) => arr.every((value) => value !== null))
    .map((row, idx) => {
      let editableFlags: boolean[] = [];
      if (row[0] === 'SKU Forecast') {
        tempSKURow.push(...row);
        editableFlags = [
          false,
          ...row.map((_val, indx) => alertState.graphData[indx]?.skuActual === null)
        ];
      }
      return {
        id: idx,
        row: row,
        editableFlags
      };
    });

  useEffect(() => {
    const _rows = [];
    if (alertState.dfTable?.skuForecast) {
      _rows.push(alertState.dfTable?.skuForecast);
    }
    if (alertState.dfTable?.compareForecast) {
      _rows.push(alertState.dfTable?.compareForecast);
    }
    setRows(_rows);
  }, [alertState.dfTable?.skuForecast, alertState.dfTable?.compareForecast]);

  const updateSkuValue = (id: number|string, index: number, value: string | number) => {
    tempSKURow[index] = value;
    let flag: boolean = false;
    flag = !tempSKURow.slice(1, tempSKURow.length).some((value) => value.length);
    setIsButtonDisabled(flag);
  };

  const compareAndReturnUniqueArrayOfObject = () => {
    const collectUniqChangeData: AlertGraphForecastDataI[] = [];

    alertState.graphData.forEach((obj, index) => {
      const edited = +tempSKURow[index + 1];
      if (obj.skuProjected !== edited && obj.skuActual === null) {
        collectUniqChangeData.push({
          actual: obj.skuProjected,
          date: obj.date,
          edited
        });
      }
    });
    return collectUniqChangeData;
  };

  const updateTableData = () => {
    const selectedSku = alertState.selectedSku;
    const payload: AlertGraphRequestBodyI = {
      alertKey: alertState.alertLocalScope.selectedViewAlertObj?.alertKey,
      alertType: alertState.alertLocalScope.selectedAlertTypeObj?.alertType,
      anchorKey: selectedSku?.anchorKey,
      anchorProdKey: selectedSku?.anchorProdKey,
      anchorProdModelKey: selectedSku?.anchorProdModelKey,
      forecastData: compareAndReturnUniqueArrayOfObject(),
      forecastKey: selectedSku?.forecastKey,
      groupKey: selectedSku?.groupCode
    };
    dispatch(updateGraphPayloadData(payload));
  };

  const openPopup = () => {
    updateTableData();
    onTogglePrompt();
  };

  const updateGraphData = () => {
    dispatch(editAlertDataRequest(alertState.graphPayloadData));
    dispatch(getAlertConfigsRequest({ initRequest: true }));
    dispatch(getAlertsRequest({ alertOnly: 1 }));
    closeGraphPanel();
  };

  const saveConfirmationPrompt = useCallback(() => {
    return (
      <AppUserInputPrompt
        isOpen={isOpenPrompt}
        onClose={onClosePrompt}
        leftBtnName="Cancel"
        rightBtnName="Update"
        title="Edit Forecast"
        onConfirmHandler={updateGraphData}
        onCloseHandler={onClosePrompt}
      >
        <AppText fontSize="13px" fontWeight={400} mt={2} color={neutral_100} width="68%">
          This action will permanently update the values of the modified forecasts. Are you sure you
          want to continue?
        </AppText>
      </AppUserInputPrompt>
    );
  }, [isOpenPrompt]);

  const cancelConfirmationPrompt = useCallback(() => {
    return (
      <AppPopup
        isOpen={isOpenCancelPrompt}
        onClose={onCloseCancelPrompt}
        leftBtnName="NO"
        rightBtnName="YES"
        title="Cancel Changes?"
        infoMessage={
          <AppText fontSize="13px" fontWeight={400} mt={2} color={neutral_100}>
            Are you sure you wish the cancel the changes made to the forecasts?
          </AppText>
        }
        onConfirmHandler={onCloseCancelPrompt}
        onCloseHandler={closeGraphPanel}
        icon={<AppIcon name="warningPrompt" fill={yellow_500} width="54px" height="54px" />}
      />
    );
  }, [isOpenCancelPrompt]);

  return (
    <>
      <Box w="full" h={isAnchorSelected ? '115px' : '75px'}>
        {saveConfirmationPrompt()}
        {cancelConfirmationPrompt()}
        <AppSimpleGrid
          headers={headers}
          rows={formattedDataRow}
          maxW="100%"
          maxH={'120px'}
          isEditable={alertState.isGraphModalEditable}
          freezedColumns={[0]}
          cellCallback={updateSkuValue}
        />
      </Box>
      {alertState.isGraphModalEditable && (
        <HStack w="full" pt="10px" justify="end">
          <AppButton
            onClick={onToggleCancelPrompt}
            variant="secondary"
            size="medium"
            p="10px 14px 10px 14px"
            height="36px"
            width="105px"
            borderRadius="8px"
          >
            Cancel
          </AppButton>
          <AppButton
            onClick={openPopup}
            variant="primary"
            size="medium"
            p="10px 14px 10px 14px"
            height="36px"
            width="123px"
            borderRadius="8px"
            isDisabled={isButtonDisabled}
          >
            Save Changes
          </AppButton>
        </HStack>
      )}
    </>
  );
};

export default GridPanel;
