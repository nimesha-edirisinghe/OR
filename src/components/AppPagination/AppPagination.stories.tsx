import { ComponentStory, ComponentMeta } from '@storybook/react';

import AppPagination from './AppPagination';

export default {
  title: 'OR scale/AppPagination',
  component: AppPagination,
} as ComponentMeta<typeof AppPagination>;

const Template: ComponentStory<typeof AppPagination> = (args) => (
  <AppPagination {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  recordLength: 50,
};
