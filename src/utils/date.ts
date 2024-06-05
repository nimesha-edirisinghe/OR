import { AM_PM } from 'components/AppTimePicker/AppAMPMSkipper';
import { differenceInDays } from 'date-fns';

export const getDateRange = (startDate: any, endDate: any) => {
  return differenceInDays(endDate, startDate);
};

export const convertTo24hours = (hours: number, amPm: AM_PM) => {
  if (hours < 12 && amPm === 'AM') {
    return hours;
  } else if (hours === 12 && amPm === 'AM') {
    return 0;
  } else if (hours === 12 && amPm === 'PM') {
    return 12;
  } else if (hours < 12 && amPm === 'PM') {
    return hours + 12;
  } else if (hours > 12 && amPm === 'PM') {
    return hours;
  } else if (hours > 12 && amPm === 'AM') {
    return hours - 12;
  }
};
