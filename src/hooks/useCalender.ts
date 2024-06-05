import { useState } from 'react';

type datePickerType = 'datePicker' | 'dateRangePicker';

const useCalender = (type: datePickerType) => {
  const [selectedDate, setSelectedDate] = useState();
  const [validMaxDate, setValidMaxDate] = useState();
  const [selectedDateRange, setSelectedDateRange] = useState();

  return [
    selectedDate,
    setSelectedDate,
    validMaxDate,
    setValidMaxDate,
    selectedDateRange,
    setSelectedDateRange
  ];
};

export default useCalender;
