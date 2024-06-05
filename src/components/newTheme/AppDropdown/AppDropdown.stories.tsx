import { Meta, ComponentStory } from '@storybook/react';
import AppDropdown from './AppDropdown';

export default {
  title: 'OR scale/New Theme/Dropdown',
  component: AppDropdown
} as Meta;

const Template: ComponentStory<typeof AppDropdown> = (args) => <AppDropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  options: ['Option 1', 'Option 2', 'Option 3'],
  variant: 'primary'
};
