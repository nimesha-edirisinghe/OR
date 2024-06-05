import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import WelcomeAlertPanel from './WelcomeAlertPanel';

export default {
  title: 'OR scale/New Theme/Alert Welcome Panel',
  component: WelcomeAlertPanel
} as ComponentMeta<typeof WelcomeAlertPanel>;

const Template: ComponentStory<typeof WelcomeAlertPanel> = (args) => (
  <WelcomeAlertPanel {...args} />
);

export const Primary = Template.bind({});
