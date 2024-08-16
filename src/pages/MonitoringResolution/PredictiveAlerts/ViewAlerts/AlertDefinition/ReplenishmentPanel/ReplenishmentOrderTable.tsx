import { HStack, Box, Flex } from '@chakra-ui/react';
import AppDateCalendar from 'components/AppDateCalendar/Calender/AppDateCalendar';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { iconName } from 'components/AppIcon/svgIcons';
import AppText from 'components/AppText/AppText';
import AppSimpleGrid from 'components/newTheme/AppSimpleGrid/AppSimpleGrid';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDateToYMD } from 'state/helpers/dateHelper';
import {
  IAlert,
  addNewCellData,
  alertSliceSelector,
  deleteCellData,
  updateCellData
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import { neutral_200, ocean_blue_400, ocean_blue_600 } from 'theme/colors';
import { AlertReplenishmentActionTypeEnum } from 'utils/enum';
import ReplenishmentOrderTableFooter from './ReplenishmentOrderTableFooter';
import { AlertCalendarI, AlertCalendarPrevMonthI } from 'types/alertConfig';

interface ReplenishmentOrderTableProps {}

const ReplenishmentOrderTable: FC<ReplenishmentOrderTableProps> = () => {
  const alertState: IAlert = useSelector(alertSliceSelector);
  const dispatch = useDispatch();
  const [calendarData, setCalendarData] = useState<AlertCalendarI>({
    id: 0,
    index: 0,
    visibility: false,
    coordinates: {
      x: 0,
      y: 0
    },
    prevMonth: {
      date: new Date(),
      day: 0,
      isDisabled: false
    }
  });
  const calendarRef: any = useRef();
  const orderQtyDetails = alertState.rplPlanDetails?.orderQtyDetails;
  const headers = orderQtyDetails?.headers || [];
  const rows: any = orderQtyDetails?.list || [];
  const isEditable: boolean = alertState.isReplenishmentEditable;
  const editableFlags = [true, true, false, false, true, false];
  const iconList: string[] = ['calenderWithDate', '', '', '', 'calenderWithDate'];

  const header: any = headers?.map((item, index) => {
    const tempItem: any = {
      ...item,
      w: 268,
      actionIcons: [iconList[index]]
    };
    if (isEditable) tempItem['cellType'] = editableFlags[index] && 'actionIconCell';
    return tempItem;
  });

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setCalendarData({ ...calendarData, visibility: false });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (isEditable) {
    header?.push({
      w: 105,
      displayValue: '',
      key: header.length + 1,
      actionIcons: ['trash'],
      cellType: 'actionIconCell'
    });
  }

  const dataRow = rows
    .filter((row: any) => row.action !== AlertReplenishmentActionTypeEnum.DELETE)
    .map((row: any) => {
      const tempRow: any[] = [...row.row];
      if (isEditable) tempRow?.push(' ');
      return { id: row.id, row: tempRow, editableFlags };
    });

  const addNewCell = () => {
    dispatch(addNewCellData());
  };
  const updateCellValue = (id: number | string, index: number, value: string | number) => {
    const isDate = isNaN(Date.parse(value.toString())) === false;
    const isValueValid = /^\d+$/.test(value.toString()) || value.toString() === '' || isDate;
    if (isValueValid) dispatch(updateCellData({ id, index, value }));
  };

  const changeDate = (date: Date) => {
    updateCellValue(calendarData.id, calendarData.index, formatDateToYMD(date));
    setCalendarData({ ...calendarData, visibility: false });
  };

  const onEditActionHandler = (
    ref: any,
    id: number | string,
    index: number,
    value: number | string,
    metaInfo?: string,
    icon?: iconName
  ) => {
    const coord = ref.current.getBoundingClientRect();
    const prevMonth: AlertCalendarPrevMonthI = {
      date: new Date(),
      day: 0,
      isDisabled: false
    };

    const startDateValue = rows[id].row[0];
    const startDate: Date = startDateValue ? new Date(startDateValue) : new Date();
    if (index === 0) {
      prevMonth.date = startDate;
      prevMonth.day = startDate.getDate();
      prevMonth.isDisabled = false;
    } else if (index === 3) {
      startDate.setDate(startDate.getDate());
      prevMonth.date = startDate;
      prevMonth.day = startDate.getDate();
      prevMonth.isDisabled = true;
    }

    setCalendarData({
      ...calendarData,
      id: +id,
      index,
      visibility: true,
      coordinates: {
        x: coord.x + 33,
        y: coord.y + (coord.height - 2)
      },
      prevMonth
    });
  };
  const iconClickHandler = (id: string, metaInfo: string, iconName?: iconName) => {
    dispatch(deleteCellData(id));
  };

  return (
    <Box h="full" w="full">
      {calendarData.visibility && (
        <Flex
          ref={calendarRef}
          position="absolute"
          left={`${calendarData.coordinates.x}px`}
          top={`${calendarData.coordinates.y}px`}
          zIndex={10}
          w="220px"
          h="300px"
          bg={ocean_blue_600}
          justifyContent="center"
        >
          <AppDateCalendar
            onDateSelect={(date) => changeDate(date)}
            initDate={calendarData.prevMonth.date}
            disabledPrevMonth={calendarData.prevMonth.isDisabled}
            disabledPrevDate={calendarData.prevMonth.day}
          />
        </Flex>
      )}
      <AppSimpleGrid
        headers={header}
        rows={dataRow}
        maxW="100%"
        maxH={'100%'}
        textAlign={'start'}
        isEditable={isEditable}
        cellCallback={updateCellValue}
        onActionHandler={iconClickHandler}
        onEditActionHandler={onEditActionHandler}
        footerRow={isEditable && <ReplenishmentOrderTableFooter addNewCell={addNewCell} />}
      />
    </Box>
  );
};

export default ReplenishmentOrderTable;
