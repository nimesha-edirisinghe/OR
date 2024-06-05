export interface IMethod {
  id: number;
  selected: boolean;
  value: string;
}
export const METHOD_LIST: IMethod[] = [
  {
    id: 1,
    selected: false,
    value: 'Use similar products information (algorithmic method)'
  },
  {
    id: 2,
    selected: false,
    value: 'As a percentage of the similar product'
  },
  {
    id: 3,
    selected: false,
    value: 'Mimic the category trend with a base value'
  },
  {
    id: 4,
    selected: false,
    value: 'Manually input the forecast'
  },
  {
    id: 5,
    selected: false,
    value: 'Obtain replenishment recommendations without a forecast (Min-Max replenishment)'
  }
];

export const productConfigInstructions: { [key: string]: string } = {
  '1': 'Download the template:  Begin by downloading the CSV template from the provided link. This template includes a list of SKU-locations and the input columns.',
  '2': 'Input the forecast data: Input the forecast data for each SKU-location into the respective columns in the template. Ensure all required fields are filled accurately.',
  '3': 'Verify Data Accuracy: Before proceeding, review all entries for accuracy. Double-check the numbers and ensure that formatting aligns with the template specifications.',
  '4': 'Upload the Completed Template: Once you have verified the data, upload the completed template back to OrderRight. Ensure the file format remains unchanged from the original download.'
};
