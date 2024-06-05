import { ComponentStory } from '@storybook/react';
import AppButton from './AppButton';
import { action } from '@storybook/addon-actions';

export default {
  title: 'OR scale/New Theme/App Button',
  component: AppButton
};

const Template: ComponentStory<typeof AppButton> = (args) => <AppButton {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  children: 'Button',
  onClick: action('clicked'),
  variant: 'primary',
  size: 'large'
};

export const Secondary = Template.bind({});

Secondary.args = {
  children: 'Button',
  onClick: action('clicked'),
  variant: 'secondary',
  size: 'medium',
  isDisabled: true
};

export const WithLeftIcon = Template.bind({});
WithLeftIcon.args = {
  children: 'Button',
  onClick: action('clicked'),
  variant: 'secondary'
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Button',
  onClick: action('clicked'),
  isDisabled: true,
  variant: 'secondary'
};
