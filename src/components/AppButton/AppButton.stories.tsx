import { ComponentStory, ComponentMeta } from '@storybook/react';

import AppButton from './AppButton';

export default {
  title: 'OR scale/Button',
  component: AppButton
} as ComponentMeta<typeof AppButton>;

const Template: ComponentStory<typeof AppButton> = args => <AppButton {...args} />;

export const Solid = Template.bind({});
Solid.args = {
  children: 'Save'
};

export const Outline = Template.bind({});
Outline.args = {
  children: 'Cancel',
  variant: 'outline'
};
