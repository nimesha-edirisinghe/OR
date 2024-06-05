import { TableHeader } from 'types/responses/viewResponses';

export const storeConfigInstructions: { [key: string]: string } = {
    '1': 'Download the template:  Begin by downloading the CSV template from the provided link. This template includes a list of SKU-locations and the input columns.',
    '2': 'Input the forecast data: Input the forecast data for each SKU-location into the respective columns in the template. Ensure all required fields are filled accurately.',
    '3': 'Verify Data Accuracy: Before proceeding, review all entries for accuracy. Double-check the numbers and ensure that formatting aligns with the template specifications.',
    '4': 'Upload the Completed Template: Once you have verified the data, upload the completed template back to OrderRight. Ensure the file format remains unchanged from the original download.'
  };

  export const SkuFilterType = {
    code: 2,
    type: 'sku'
  };
    
  export const storeActivationHeader: TableHeader[] = [
    {
      w: 195,
      displayValue: 'Group',
      key: 'groupCode',
      cellType: 'generalCell'
    },
    {
      w: 305,
      displayValue: 'New Store',
      key: 'store',
      cellType: 'generalCell'
    },
    {
      w: 179,
      displayValue: 'City',
      key: 'city',
      cellType: 'generalCell'
    },
    {
      w: 116,
      displayValue: 'SKUs',
      key: 'skuCount',
      cellType: 'generalCell'
    },
    {
      w: 60,
      displayValue: 'Configure',
      key: 'wrench',
      cellType: 'actionIconCell',
      actionIcons: ['wrench']
    }
  ];


  export const similarStores = ["27 - Bellaire",
  "29 - Clear Lake",
  "37 - Eastwood",
  "12 - Garden Oaks",
  "86 - Greenway/Upper Kirby",
  "16 - Kingwood",
  "378 - Memorial",
  "157 - Meyerland",
  "28 - Midtown Hypermarket",
  "22 - Montrose Whole Sale Store",
  "20 - Museum District",
  "348 - Oak Forest",
  "321 - Pearland",
  "190 - Rice Military",
  "10 - Sharpstown Whole Sale Store",
  "98 - Spring Branch",
  "7 - Sugar Land",
  "145 - Tanglewood",
  "15 - The Energy Corridor",
  "39 - The Heights Hypermarket",
  "194 - The Woodlands Whole Sale Store",
  "303 - Upper Kirby Hypermarket",
  "181 - West University Place Hypermarket",
  "19 - Westchase"];