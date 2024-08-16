import { ComponentStory, ComponentMeta } from '@storybook/react';

import AppTable from './AppTable';
import {
  tableHeaders,
  getForecastConfigTableRowDataMapping
} from './TableDataMapping/ForecastingConfigTable';

export default {
  title: 'OR scale/AppTable',
  component: AppTable
} as ComponentMeta<typeof AppTable>;

const Template: ComponentStory<typeof AppTable> = (args) => (
  <AppTable variant="default" {...args} />
);
export const Default = Template.bind({});
Default.args = {
  tableHeaders: tableHeaders,
  tableRowDataMapping: getForecastConfigTableRowDataMapping(),
  tableRowsDataSet: [
    {
      groupDetails: {
        groupName: 'Beverages',
        groupKey: 1,
        anchorCount: 500,
        skuCount: 15000
      },
      trainingConfiguration: 'default',
      influencingFactor: 'from database',
      scheduled: '1 scheduled added',
      trainedUpto: 1684318940,
      forecastedFrom: 1684318940
    },
    {
      groupDetails: {
        groupName: 'Beverages',
        groupKey: 1,
        anchorCount: 500,
        skuCount: 15000
      },
      trainingConfiguration: 'default',
      influencingFactor: 'from database',
      scheduled: '1 scheduled added',
      trainedUpto: 1684318940,
      forecastedFrom: 1684318940
    }
  ]
};
