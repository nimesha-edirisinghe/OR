import { ComponentStory, ComponentMeta } from '@storybook/react';

import AppLogo from './AppLogo';

export default {
  title: 'OR scale/AppLogo',
  component: AppLogo,
} as ComponentMeta<typeof AppLogo>;

const Template: ComponentStory<typeof AppLogo> = (args) => (
  <AppLogo {...args} />
);

export const Solid = Template.bind({});
