import { differenceInSeconds } from "date-fns";


export const formatTimeDuration = (
    startDateTime: number | null,
    endDateTime: number | null
  ): string => {
    if (startDateTime === null || endDateTime === null) return '';
  
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);
  
    const timeDifferenceInSeconds = differenceInSeconds(end, start);
  
    if (timeDifferenceInSeconds < 0) return '';
  
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);
    const seconds = timeDifferenceInSeconds % 60;
  
    let formattedDuration = '';
  
    if (hours > 0) {
      formattedDuration += `${hours} hr `;
    }
  
    if (minutes > 0) {
      formattedDuration += `${minutes} min `;
    }
  
    if (seconds > 0 || formattedDuration === '') {
      formattedDuration += `${seconds} sec`;
    }
  
    return formattedDuration.trim();
  };