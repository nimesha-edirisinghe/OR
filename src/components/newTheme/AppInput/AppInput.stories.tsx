import React, { ChangeEvent } from 'react';
import { ComponentStory } from '@storybook/react';
import AppInput from './AppInput';

export default {
  title: 'OR scale/New Theme/AppInput',
  component: AppInput,
  argTypes: {
    onChange: { action: 'changed' }
  }
};

const Template: ComponentStory<typeof AppInput> = (args) => <AppInput {...args} />;

export const Primary_Large = Template.bind({});
Primary_Large.args = {
  label: 'Your Input',
  value: '',
  onChange: (event: ChangeEvent<HTMLInputElement>) => {
    console.log('Input changed:', event.target.value);
  },
  error: undefined,
  isRequired: false,
  variant: 'primary',
  isDisabled: false,
  size: 'large'
};

export const Primary_Medium = Template.bind({});
Primary_Medium.args = {
  label: 'Your Input',
  value: '',
  onChange: (event: ChangeEvent<HTMLInputElement>) => {
    console.log('Input changed:', event.target.value);
  },
  error: undefined,
  isRequired: false,
  variant: 'primary',
  isDisabled: false,
  size: 'medium'
};
