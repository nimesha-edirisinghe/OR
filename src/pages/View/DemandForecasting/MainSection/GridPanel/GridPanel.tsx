import { FC, useCallback, useEffect, useState } from 'react';
import AppSimpleGrid from 'components/newTheme/AppSimpleGrid/AppSimpleGrid';
import { Box, BoxProps, HStack, useDisclosure } from '@chakra-ui/react';
import {
  dfViewSliceSelector,
  editForecastDataRequest,
  IDFView,
  setTableStatus,
  toggleGraphPanel,
  updateForecastTableData
} from 'state/pages/view/demandForecastView/dfViewPageState';
import { useDispatch, useSelector } from 'react-redux';
import { DemandForecastChartTable } from 'types/view';
import { AlertGraphForecastDataI } from 'types/alertConfig';
import { AlertGraphRequestBodyI } from 'types/requests/viewRequests';
import AppButton from 'components/newTheme/AppButton/AppButton';
import { yellow_500 } from 'theme/colors';
import AppPopup from 'components/newTheme/AppPopup/AppPopup';
import { AppIcon } from 'components/AppIcon/AppIcon';
import {
  IGroupConfig,
  groupConfigSliceSelector
} from 'state/pages/shared/groupConfig/groupConfigState';

interface Props extends BoxProps {}

const GridPanel: FC<Props> = ({ ...rest }) => {
  const {
    isOpen: isOpenSavePrompt,
    onToggle: onToggleSavePrompt,
    onClose: onCloseSavePrompt
  } = useDisclosure();
  const {
    isOpen: isOpenCancelPrompt,
    onToggle: onToggleCancelPrompt,
    onClose: onCloseCancelPrompt
  } = useDisclosure();
  const dispatch = useDispatch();
  const dfViewState: IDFView = useSelector(dfViewSliceSelector);
  const headers = dfViewState.dfTable?.headers || [];
  const [rows, setRows] = useState<
    (DemandForecastChartTable['skuForecast'] | DemandForecastChartTable['compareForecast'])[]
  >([]);
  const sharedGroupState: IGroupConfig = useSelector(groupConfigSliceSelector);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const groupKey = sharedGroupState.selectedGroupKey!;
  const isAnchorSelected =
    dfViewState.aggregateOption.selectedAggregateOption !== 'sku' &&
    dfViewState.aggregateOption.selectedAggregateOption !== 'aggregate';
  const isTableEditable = dfViewState.isTableEditable;
  const editedForecastData: number[] = [];

  const formattedDataRow = rows
    .filter((arr) => arr.every((value) => value !== null))
    .map((row, index) => {
      let editableFlags: boolean[] = [];
      if (index === 0) {
        editedForecastData.push(...(row as number[]));
        editableFlags = [
          false,
          ...row.map((_val, indx) => dfViewState.graphData[indx]?.skuActual === null)
        ];
      }
      return {
        id: index,
        row: row,
        editableFlags
      };
    });

  useEffect(() => {
    const _rows = [];
    if (dfViewState.dfTable?.skuForecast) {
      _rows.push(dfViewState.dfTable?.skuForecast);
    }
    if (dfViewState.dfTable?.compareForecast) {
      _rows.push(dfViewState.dfTable?.compareForecast);
    }
    setRows(_rows);
  }, [dfViewState.dfTable?.skuForecast, dfViewState.dfTable?.compareForecast]);

  const validateCell = (): boolean => {
    let skuActualCellNumber: number = 1;
    const isAnyForecastEdited = dfViewState.graphData.some((item, index) => {
      if (item.skuActual === null && skuActualCellNumber === 1) {
        skuActualCellNumber = index + 1;
      }
      return item.skuActual === null && item.skuProjected != editedForecastData[index + 1];
    });
    const isAnyValueInValid = editedForecastData
      .slice(skuActualCellNumber)
      .some((item) => item <= 0);
    return isAnyForecastEdited && !isAnyValueInValid;
  };

  const getEditedForecastData = () => {
    const forecastData: AlertGraphForecastDataI[] = [];
    dfViewState.graphData.forEach((forecast, index) => {
      const editedValue = editedForecastData[index + 1];
      if (forecast.skuActual === null && forecast.skuProjected !== editedValue) {
        forecastData.push({
          actual: forecast.skuProjected,
          date: forecast.date,
          edited: parseFloat(editedValue.toString())
        });
      }
    });
    return forecastData;
  };

  const updateTableData = () => {
    const selectedSku = dfViewState.selectedSku;
    const payload: AlertGraphRequestBodyI = {
      anchorKey: selectedSku?.anchorKey,
      anchorProdKey: selectedSku?.anchorProdKey,
      anchorProdModelKey: selectedSku?.anchorProdModelKey,
      forecastData: getEditedForecastData(),
      forecastKey: selectedSku?.forecastKey!,
      groupKey: groupKey
    };
    dispatch(editForecastDataRequest(payload));
  };

  const onUpdateTableCell = (id: string | number, index: number, value: string | number) => {
    const isValidNumber = /^\d*\.?\d*$/.test(value.toString());
    if (isValidNumber) {
      editedForecastData[index] = value as number;
      dispatch(updateForecastTableData({ index, value: value as number }));
      const isAllCellValid = validateCell();
      setIsButtonDisabled(!isAllCellValid);
    }
  };

  const saveConfirmationPrompt = useCallback(() => {
    return (
      <AppPopup
        isOpen={isOpenSavePrompt}
        onClose={onCloseSavePrompt}
        leftBtnName="Cancel"
        rightBtnName="Update"
        title="Edit Forecast"
        infoMessage="This action will permanently update the values of the modified forecasts. Are you sure you
          want to continue?"
        onConfirmHandler={onCloseSavePrompt}
        onCloseHandler={onClickConfirmHandler}
        icon={<AppIcon name="warningPrompt" fill={yellow_500} width="54px" height="54px" />}
      />
    );
  }, [isOpenSavePrompt]);

  const onCloseGraphPanel = () => {
    dispatch(toggleGraphPanel());
    dispatch(setTableStatus(false));
  };

  const cancelConfirmationPrompt = useCallback(() => {
    return (
      <AppPopup
        isOpen={isOpenCancelPrompt}
        onClose={onCloseCancelPrompt}
        leftBtnName="YES"
        rightBtnName="NO"
        title="Cancel Changes?"
        infoMessage="Are you sure you wish the cancel the changes made to the forecasts?"
        onConfirmHandler={onCloseGraphPanel}
        onCloseHandler={onCloseCancelPrompt}
        icon={<AppIcon name="warningPrompt" fill={yellow_500} width="54px" height="54px" />}
      />
    );
  }, [isOpenCancelPrompt]);

  const onSaveHandler = () => {
    onToggleSavePrompt();
  };

  const onClickConfirmHandler = () => {
    updateTableData();
    dispatch(toggleGraphPanel());
    dispatch(setTableStatus(false));
  };

  return (
    <>
      {saveConfirmationPrompt()}
      {cancelConfirmationPrompt()}
      <Box h={isAnchorSelected ? '115px' : '75px'} w="full">
        <AppSimpleGrid
          headers={headers}
          rows={formattedDataRow}
          maxW="100%"
          maxH="120px"
          freezedColumns={[0]}
          textAlign="end"
          isEditable={isTableEditable}
          cellCallback={onUpdateTableCell}
        />
      </Box>
      {isTableEditable && (
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
            onClick={onSaveHandler}
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
