import { ComponentStory, ComponentMeta } from '@storybook/react';

import AppTooltip from './AppTooltip';

export default {
  title: 'OR scale/Tooltip',
  component: AppTooltip,
} as ComponentMeta<typeof AppTooltip>;

const Template: ComponentStory<typeof AppTooltip> = (args) => (
  <AppTooltip {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: 'Hover me',
  label: 'Hover me',
  borderRadius: '5px',
  bgColor: 'fg-default',
  fontWeight: 400,
};
