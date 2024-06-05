import { HStack, Box, Flex } from '@chakra-ui/react';
import AppDateCalendar from 'components/AppDateCalendar/Calender/AppDateCalendar';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { iconName } from 'components/AppIcon/svgIcons';
import AppText from 'components/AppText/AppText';
import AppSimpleGrid from 'components/newTheme/AppSimpleGrid/AppSimpleGrid';
import { FC, useState } from 'react';
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

interface PrevMonthI {
  date: Date;
  day: number;
  isDisabled: boolean;
}
interface CalendarI {
  id: number;
  index: number;
  visibility: boolean;
  coordinates: {
    x: number;
    y: number;
  };
  prevMonth: PrevMonthI;
}
interface ReplenishmentOrderTableProps {}

const ReplenishmentOrderTable: FC<ReplenishmentOrderTableProps> = () => {
  const alertState: IAlert = useSelector(alertSliceSelector);
  const dispatch = useDispatch();
  const [calendarData, setCalendarData] = useState<CalendarI>({
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
  const orderQtyDetails = alertState.rplPlanDetails?.orderQtyDetails;
  const headers = orderQtyDetails?.headers!;
  const rows: any = orderQtyDetails?.list!;
  const isEditable: boolean = alertState.isReplenishmentEditable;
  const editableFlags = [true, true, false, true, false];
  const iconList: string[] = ['calenderWithDate', '', '', 'calenderWithDate'];

  const header: any = headers?.map((item, index) => {
    const tempItem: any = {
      ...item,
      w: 268,
      actionIcons: [iconList[index]]
    };
    if (isEditable) tempItem['cellType'] = editableFlags[index] && 'actionIconCell';
    return tempItem;
  });

  if (isEditable) {
    header.push({
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
      if (isEditable) tempRow.push(' ');
      return { id: row.id, row: tempRow, editableFlags };
    });

  const addNewCell = () => {
    dispatch(addNewCellData());
  };
  const updateCellValue = (id: number | string, index: number, value: string | number) => {
    dispatch(updateCellData({ id, index, value }));
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
    const prevMonth: PrevMonthI = {
      date: new Date(),
      day: 0,
      isDisabled: false
    };
    if (index === 3) {
      const startDate: Date = new Date(rows[id].row[0]);
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
    <Box h="30%" w="full">
      {calendarData.visibility && (
        <Flex
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
        footerRow={
          isEditable && (
            <td colSpan={5}>
              <Box bg={ocean_blue_400} w="full" h="36px" p="8px">
                <HStack w="130px" spacing="4px" onClick={addNewCell} cursor="pointer">
                  <AppIcon name="plus" fill={neutral_200} w="10.5px" h="10.5px" />
                  <AppText fontSize="13px" fontWeight="400" color={neutral_200}>
                    Add another plan
                  </AppText>
                </HStack>
              </Box>
            </td>
          )
        }
      />
    </Box>
  );
};

export default ReplenishmentOrderTable;
