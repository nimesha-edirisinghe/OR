import { ComponentStory, ComponentMeta } from '@storybook/react';

import AppConfirmationPrompt from './AppConfirmationPrompt';

export default {
  title: 'OR scale/AppConfirmationPrompt',
  component: AppConfirmationPrompt,
  argTypes: {
    isOpen: { control: 'boolean' },
  },
} as ComponentMeta<typeof AppConfirmationPrompt>;

const Template: ComponentStory<typeof AppConfirmationPrompt> = (args) => (
  <AppConfirmationPrompt {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  onClose: () => {},
  title: 'My Title',
  infoMessage:
    'The changes you have made in training configuration will be discarded.',
  confirmationMessage: 'Are you sure you want to continue?',
  leftBtnName: 'Yes',
  rightBtnName: 'No',
};
