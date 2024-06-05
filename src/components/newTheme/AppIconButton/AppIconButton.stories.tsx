import { ComponentStory } from '@storybook/react';
import AppIconButton from './AppIconButton';
import { PhoneIcon } from '@chakra-ui/icons';
import { action } from '@storybook/addon-actions';

export default {
  title: 'OR scale/New Theme/AppIconButton',
  component: AppIconButton
};

const Template: ComponentStory<typeof AppIconButton> = (args) => <AppIconButton {...args} />;

export const PrimaryLarge = Template.bind({});
PrimaryLarge.args = {
  icon: <PhoneIcon />,
  variant: 'iconPrimary',
  size: 'iconLarge',
  onClick: action('clicked'),
  isDisabled: true
};

export const PrimaryMedium = Template.bind({});
PrimaryMedium.args = {
  icon: <PhoneIcon />,
  variant: 'iconPrimary',
  size: 'iconMedium',
  onClick: action('clicked')
};

export const PrimarySmall = Template.bind({});
PrimarySmall.args = {
  icon: <PhoneIcon />,
  variant: 'iconPrimary',
  size: 'iconSmall',
  onClick: action('clicked')
};
