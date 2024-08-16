import { HStack } from '@chakra-ui/react';
import { FC } from 'react';
import AlertHeaderCell from './AlertTableDataCells/AlertHeaderCell';
import {
  IAlert,
  addOrRemoveFromSelectedSkuList,
  alertSliceSelector,
  updateSkuListSelectedStatus
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import AppCheckbox from 'components/newTheme/AppCheckbox/AppCheckbox';
import { useDispatch, useSelector } from 'react-redux';
import AppText from 'components/AppText/AppText';
import { neutral_200 } from 'theme/colors';
import { AlertTableViewTypeEnum } from 'utils/enum';

interface Props {
  alertTableHeaders: IAlert['alertDataList']['headers'];
  tableType: AlertTableViewTypeEnum;
}

const AlertTableHeader: FC<Props> = ({ alertTableHeaders, tableType }) => {
  const alertState: IAlert = useSelector(alertSliceSelector);
  const isAllSkuSelected = alertState.alertLocalScope.globalSkuSelected;
  const selectedSkuList = alertState.selectedSkuList;
  const isAnyRowSelected = selectedSkuList?.some((item) => item.isSelected) && !isAllSkuSelected;
  const isOperationEnabled = tableType === AlertTableViewTypeEnum.INDIVIDUAL;

  const dispatch = useDispatch();

  const onChangeHandler = (isChecked: boolean, id: number) => {
    dispatch(
      updateSkuListSelectedStatus({
        id: 1,
        type: 'all'
      })
    );
    dispatch(
      addOrRemoveFromSelectedSkuList({
        isSelectedAll: isChecked,
        selectedType: 'all'
      })
    );
  };

  return (
    <HStack spacing="1px">
      {alertTableHeaders && (
        <>
          {isOperationEnabled && (
            <AlertHeaderCell key={'-1'} minW="40px" position={'sticky'} left={0}>
              <AppCheckbox
                id={1}
                isDisabled={isAnyRowSelected}
                isChecked={isAllSkuSelected}
                onChange={onChangeHandler}
              />
            </AlertHeaderCell>
          )}
          {Object.entries(alertTableHeaders).map((td, key) => (
            <AlertHeaderCell key={key} flex={1}>
              <AppText size="h4Semibold" noOfLines={1} color={neutral_200}>
                {td[1]}
              </AppText>
            </AlertHeaderCell>
          ))}
          {isOperationEnabled && (
            <AlertHeaderCell key={'-2'} minW="40px">
              {''}
            </AlertHeaderCell>
          )}
        </>
      )}
    </HStack>
  );
};

export default AlertTableHeader;
