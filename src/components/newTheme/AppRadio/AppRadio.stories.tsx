import React from 'react';
import { Meta, ComponentStory } from '@storybook/react';
import AppRadio from './AppRadio';

export default {
  title: 'OR scale/New Theme/AppRadio',
  component: AppRadio,
  argTypes: {
    isChecked: {
      control: 'boolean'
    },

    onChange: { action: 'changed' }
  }
} as Meta;

const Template: ComponentStory<typeof AppRadio> = (args) => <AppRadio {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  value: 'option1',
  isChecked: false,
  variant: 'primary',
  isDisabled: false,
  children: 'Test'
};
