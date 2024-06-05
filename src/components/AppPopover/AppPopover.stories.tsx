import { ComponentStory, ComponentMeta } from '@storybook/react';

import AppPopover from './AppPopover';

export default {
  title: 'OR scale/AppPopover',
  component: AppPopover,
} as ComponentMeta<typeof AppPopover>;

const Template: ComponentStory<typeof AppPopover> = (args) => (
  <AppPopover {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  content: <h1>Hello</h1>,
  children: <h1>Hover me</h1>,
};
