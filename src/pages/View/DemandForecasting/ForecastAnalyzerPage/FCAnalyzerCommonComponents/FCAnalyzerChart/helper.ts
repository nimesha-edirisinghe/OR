export const getTooltipLegendColor = (key: string): string => {
  let returnColor = '';
  if (key === 'actual') {
    returnColor = 'linear-gradient(180deg, #F8705E 0%, #FFA914 100%)';
  } else if (key === 'forecasted') {
    returnColor = 'linear-gradient(180deg, #0560B7 0%, #0AA5FF 100%)';
  } else if (key === 'avgSales') {
    returnColor = 'linear-gradient(180deg, #0AB726 0%, #75D785 100%)';
  }
  return returnColor;
};
