import { ComponentStory, ComponentMeta } from '@storybook/react';
import AppText from './AppText';

export default {
  title: 'OR scale/New Theme/App Text',
  component: AppText,
  argTypes: {
    size: {
      control: {
        type: 'radio',
        options: [
          'h1Semibold',
          'h1Regular',
          'h2Semibold',
          'h2Regular',
          'h3Semibold',
          'h3Regular',
          'h4Semibold',
          'h5Semibold',
          'body1',
          'body2',
          'body3',
          'caption'
        ]
      }
    }
  }
} as ComponentMeta<typeof AppText>;

const Template: ComponentStory<typeof AppText> = (args) => <AppText {...args} />;

export const Text = Template.bind({});

const createStory = (size: string) => {
  return {
    ...Template.bind({}),
    args: {
      children: size.charAt(0).toUpperCase() + size.slice(1),
      size: size
    }
  };
};

export const H1Semibold = createStory('h1Semibold');
export const H1Regular = createStory('h1Regular');
export const H2Semibold = createStory('h2Semibold');
export const H2Regular = createStory('h2Regular');
export const H3Semibold = createStory('h3Semibold');
export const H3Regular = createStory('h3Regular');
export const H4Semibold = createStory('h4Semibold');
export const H5Semibold = createStory('h5Semibold');
export const Body1 = createStory('body1');
export const Body2 = createStory('body2');
export const Body3 = createStory('body3');
export const Caption = createStory('caption');

Text.decorators = [
  () => (
    <>
      <AppText {...H1Semibold.args} />
      <AppText {...H1Regular.args} />
      <AppText {...H2Semibold.args} />
      <AppText {...H2Regular.args} />
      <AppText {...H3Semibold.args} />
      <AppText {...H3Regular.args} />
      <AppText {...H4Semibold.args} />
      <AppText {...H5Semibold.args} />
      <AppText {...Body1.args} />
      <AppText {...Body2.args} />
      <AppText {...Body3.args} />
      <AppText {...Caption.args} />
    </>
  )
];
