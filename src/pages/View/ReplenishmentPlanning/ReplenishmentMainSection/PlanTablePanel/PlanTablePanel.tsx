import { Box, Flex } from '@chakra-ui/react';
import AppDateCalendar from 'components/AppDateCalendar/Calender/AppDateCalendar';
import { iconName } from 'components/AppIcon/svgIcons';
import AppSimpleGrid from 'components/newTheme/AppSimpleGrid/AppSimpleGrid';
import ReplenishmentOrderTableFooter from 'pages/MonitoringResolution/PredictiveAlerts/ViewAlerts/AlertDefinition/ReplenishmentPanel/ReplenishmentOrderTableFooter';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDateToYMD } from 'state/helpers/dateHelper';
import {
  IRPLView,
  addNewReplCellData,
  deleteReplCellData,
  rplViewSliceSelector,
  setReplEditable,
  updateReplCellData
} from 'state/pages/view/replenishmentView/rplViewPageState';
import { ocean_blue_600 } from 'theme/colors';
import { AlertCalendarI, AlertCalendarPrevMonthI } from 'types/alertConfig';
import { RplOrderQtyDetailsI } from 'types/responses/viewResponses';
import { AlertReplenishmentActionTypeEnum } from 'utils/enum';

interface Props {
  tableHeight: string;
  maximized: boolean;
}

interface PlanTableHeader {
  w: number;
  displayValue: string;
  key: keyof RplOrderQtyDetailsI;
}

const PlanTablePanel: FC<Props> = ({ tableHeight, maximized }) => {
  const calendarRef: any = useRef();
  const rplViewState: IRPLView = useSelector(rplViewSliceSelector);
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
  const orderQtyDetails = rplViewState.rplPlanDetails?.orderQtyDetails;
  const headers = orderQtyDetails?.headers!;
  const rows = orderQtyDetails?.list!;
  const isEditable: boolean = rplViewState.isReplEditable;
  const editableFlags = [true, true, false, false, true, false];
  const iconList: string[] = ['calenderWithDate', '', '', '', 'calenderWithDate'];
  const header: any = headers?.map((item, index) => {
    const tempItem: any = {
      ...item,
      w: maximized ? 268 : 150,
      actionIcons: [iconList[index]]
    };
    if (isEditable) tempItem['cellType'] = editableFlags[index] && 'actionIconCell';
    return tempItem;
  });

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
    dispatch(addNewReplCellData());
  };
  const updateCellValue = (id: number | string, index: number, value: string | number) => {
    const isDate = isNaN(Date.parse(value.toString())) === false;
    const isValueValid = /^\d+$/.test(value.toString()) || value.toString() === '' || isDate;
    if (isValueValid) dispatch(updateReplCellData({ id, index, value }));
  };

  const changeDate = (date: Date) => {
    updateCellValue(calendarData.id, calendarData.index, formatDateToYMD(date));
    setCalendarData({ ...calendarData, visibility: false });
  };

  const iconClickHandler = (id: string, metaInfo: string, iconName?: iconName) => {
    dispatch(deleteReplCellData(id));
  };

  const onEditActionHandler = (
    ref: any,
    id: number | string | any,
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
    const startDateValue = dataRow.find((data) => data.id === id)?.row[0];
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
            calendarTopPadding={0}
          />
        </Flex>
      )}
      <AppSimpleGrid
        headers={header}
        rows={dataRow}
        maxW="100%"
        maxH={tableHeight}
        textAlign="start"
        isEditable={isEditable}
        cellCallback={updateCellValue}
        onActionHandler={iconClickHandler}
        onEditActionHandler={onEditActionHandler}
        footerRow={isEditable && <ReplenishmentOrderTableFooter addNewCell={addNewCell} />}
      />
    </Box>
  );
};

export default PlanTablePanel;
