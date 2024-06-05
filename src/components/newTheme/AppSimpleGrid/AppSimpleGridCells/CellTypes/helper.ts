import {
  blue_500,
  blue_500_t28,
  green_100_t20,
  green_600,
  red_400,
  red_500_t28,
  yellow_500,
  yellow_500_t28
} from 'theme/colors';

export const getColorsByValue = (value: string): [string, string, string] => {
  const colorMap: Record<string, [string, string, string]> = {
    Failed: [red_500_t28, red_400, 'Failed'],
    Completed: [green_100_t20, green_600, 'Completed'],
    Processing: [yellow_500_t28, yellow_500, 'Processing'],
    Running: [yellow_500_t28, yellow_500, 'Running'],
    Queued: [blue_500_t28, blue_500, 'Queued']
  };
  return colorMap[value] || ['', '', ''];
};
