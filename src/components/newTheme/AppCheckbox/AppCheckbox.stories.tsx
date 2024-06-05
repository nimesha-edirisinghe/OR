import { Meta, ComponentStory } from '@storybook/react';
import AppCheckbox from './AppCheckbox';

export default {
  title: 'OR scale/New Theme/CustomCheckbox',
  component: AppCheckbox
} as Meta;

const Template: ComponentStory<typeof AppCheckbox> = (args) => <AppCheckbox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isChecked: false,
  isDisabled: false
};
