import { ComponentStory, ComponentMeta } from '@storybook/react';

import AppText from './AppText';

export default {
  title: 'OR scale/App Text/Dark Mode',
  component: AppText,
  argTypes: {
    variant: {
      options: ['title', 'subTitle', 'regular', 'label'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof AppText>;

const Template: ComponentStory<typeof AppText> = args => <AppText {...args} />;

export const Title = Template.bind({});
Title.args = {
  children: 'Title Text',
  variant: 'title'
};

export const SubTitle = Template.bind({});
SubTitle.args = {
  children: 'Title Text',
  variant: 'title'
};

export const Regular = Template.bind({});
Regular.args = {
  children: 'Title Text',
  variant: 'title'
};

export const Label = Template.bind({});
Label.args = {
  children: 'Title Text',
  variant: 'title'
};

Title.decorators = [
  () => {
    return (
      <>
        <AppText {...Title.args} variant={'title'} >Sample Text</AppText>
        <AppText {...SubTitle.args} variant={'subTitle'} >Sample Text</AppText>
        <AppText {...Regular.args} variant={'regular'} >Sample Text</AppText>
        <AppText {...Label.args} variant={'label'} >Sample Text</AppText>
      </>
    );
  },
];