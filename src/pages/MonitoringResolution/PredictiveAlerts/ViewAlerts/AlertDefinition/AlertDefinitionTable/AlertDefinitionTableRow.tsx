import { FC, useState } from 'react';
import { HStack } from '@chakra-ui/react';
import { GetAlertList } from 'types/responses/alertConfigResponse';
import {
  IAlert,
  addOrRemoveFromSelectedSkuList,
  alertSliceSelector,
  updateSkuListSelectedStatus
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import AppTooltip from 'components/AppTooltip/AppTooltip';
import AppText from 'components/newTheme/AppText/AppText';
import { neutral_100, neutral_200, ocean_blue_350, ocean_blue_400, red_400 } from 'theme/colors';
import AppCheckbox from 'components/newTheme/AppCheckbox/AppCheckbox';
import { useDispatch, useSelector } from 'react-redux';
import AlertResolveOption from './AlertResolveOption';
import { AlertTableViewTypeEnum } from 'utils/enum';

interface Props {
  data: GetAlertList;
  alertTableHeaders: IAlert['alertDataList']['headers'];
  enableAlertDetection?: boolean;
  tableType: AlertTableViewTypeEnum;
}

const AlertDefinitionTableRow: FC<Props> = ({
  data,
  alertTableHeaders,
  enableAlertDetection = false,
  tableType,
  ...props
}) => {
  const alertState: IAlert = useSelector(alertSliceSelector);
  const tableDataList = alertState.alertDataList?.list;
  const selectedSkuList = alertState.selectedSkuList;
  const isAllSelected = alertState.alertLocalScope.globalSkuSelected;
  const isRowSelected =
    selectedSkuList?.some((item) => item.anchorProdModelKey === data.anchorProdModelKey) || false;
  const isResolveOptionEnabled = (data.forecastKey && data.groupCode) || false;
  const [isResolveCellHovered, setResolveCellHovered] = useState<boolean>(false);
  const [isResolvePopUpOpen, setResolvePopUp] = useState<boolean>(false);
  const cellBgColor = isRowSelected ? ocean_blue_350 : ocean_blue_400;
  const dispatch = useDispatch();

  const updateSelectedListAndSkuStates = (
    anchorProdModelKey: number,
    _selectedSku: GetAlertList
  ) => {
    dispatch(updateSkuListSelectedStatus({ id: anchorProdModelKey }));
    dispatch(addOrRemoveFromSelectedSkuList({ data: _selectedSku, selectedType: '' }));
  };

  const isAlerted = enableAlertDetection && data.alerted === 1;
  const isOperationEnabled = tableType === AlertTableViewTypeEnum.INDIVIDUAL;

  const onChangeHandler = (isChecked: boolean, id: number) => {
    try {
      const _selectedSku = tableDataList?.find(
        (skuObj: GetAlertList) => skuObj.anchorProdModelKey === id
      )!;
      updateSelectedListAndSkuStates(id, _selectedSku);
    } catch (e) {}
  };

  const onMouseLeave = () => {
    setResolveCellHovered(false);
  };

  const onResolvePopUp = (flag: boolean) => {
    setResolvePopUp(flag);
  };

  return (
    <HStack
      alignItems="center"
      spacing="1px"
      mt="1px"
      {...props}
      position={'relative'}
      onMouseEnter={() => {
        setResolveCellHovered(true);
      }}
      onMouseLeave={() => {
        if (!isResolvePopUpOpen) setResolveCellHovered(false);
      }}
    >
      {isOperationEnabled && (
        <HStack
          p="8px"
          bg={cellBgColor}
          justifyContent="space-between"
          h="36px"
          minW="40px"
          position={'sticky'}
          left={0}
          borderLeft={isAlerted ? `1px solid ${red_400}` : 'none'}
        >
          <AppCheckbox
            id={data.anchorProdModelKey}
            isDisabled={isAllSelected}
            isChecked={isRowSelected}
            onChange={onChangeHandler}
            disabledColor={neutral_100}
          />
        </HStack>
      )}

      {alertTableHeaders &&
        Object.entries(alertTableHeaders).map((th, key) => {
          // @ts-ignore
          const dataTxt = data[th[0]] as string;
          const isRowAlerted = isAlerted && !isOperationEnabled && key === 0;
          return (
            <HStack
              p="8px"
              bg={cellBgColor}
              justifyContent="space-between"
              h="36px"
              minW="180px"
              key={key}
              borderLeft={isRowAlerted ? `1px solid ${red_400}` : 'none'}
            >
              <AppText
                size="body2"
                color={neutral_200}
                noOfLines={1}
                style={{ wordBreak: 'break-all' }}
              >
                {dataTxt?.length > 20 ? (
                  <AppTooltip label={dataTxt} placement="auto-start">
                    <span>{dataTxt}</span>
                  </AppTooltip>
                ) : (
                  <span>{dataTxt}</span>
                )}
              </AppText>
            </HStack>
          );
        })}

      {isOperationEnabled && (
        <HStack p="8px" bg={cellBgColor} justifyContent="center" h="36px" minW="40px">
          {isResolveOptionEnabled && isResolveCellHovered && (
            <AlertResolveOption
              groupKey={data.groupCode}
              id={data.anchorProdKey}
              onMouseLeave={onMouseLeave}
              onResolvePopUp={onResolvePopUp}
            />
          )}
        </HStack>
      )}
    </HStack>
  );
};

export default AlertDefinitionTableRow;
