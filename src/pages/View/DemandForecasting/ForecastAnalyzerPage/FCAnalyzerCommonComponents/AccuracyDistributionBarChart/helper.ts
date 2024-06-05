import { ocean_blue_100, ocean_blue_200, ocean_blue_50 } from 'theme/colors';

type BarNameT = 'High' | 'Avg' | 'Low';

export const getBarFillColor = (name: BarNameT): string => {
  let color: string;
  switch (name) {
    case 'High':
      color = ocean_blue_50;
      break;
    case 'Avg':
      color = ocean_blue_100;
      break;
    case 'Low':
      color = ocean_blue_200;
      break;
    default:
      color = '';
  }

  return color;
};
