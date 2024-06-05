import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AppInput from './AppInput';

export default {
  title: 'OR scale/AppInput',
  component: AppInput,
} as ComponentMeta<typeof AppInput>;

const Template: ComponentStory<typeof AppInput> = (args) => (
  <AppInput {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  size: 'sm',
};

export const Outline = Template.bind({});
Outline.args = {
  variant: 'outline',
  size: 'lg',
};
