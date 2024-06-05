import React from 'react';
import { Meta, ComponentStory } from '@storybook/react';
import AppPopup from './AppPopup';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { yellow_500 } from 'theme/colors';

export default {
  title: 'OR scale/New Theme/AppPopup',
  component: AppPopup
} as Meta;

const Template: ComponentStory<typeof AppPopup> = (args) => <AppPopup {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  onClose: () => {},
  infoMessage:
    'Are you sure you want to upload the configurations as a .CSV file? This action will discard the changes you have done manually.',
  leftBtnName: 'Cancel',
  rightBtnName: 'Proceed',
  onConfirmHandler: () => {},
  onCloseHandler: () => {},
  icon: <AppIcon name="warningPrompt" fill={yellow_500} width="54px" height="54px" />
};
