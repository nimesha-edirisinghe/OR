import { Meta, ComponentStory } from '@storybook/react';
import AppStepper from './AppStepper';

export default {
  title: 'OR scale/New Theme/AppStepper',
  component: AppStepper
} as Meta;

const Template: ComponentStory<typeof AppStepper> = (args) => <AppStepper {...args} />;

export const Default = Template.bind({});
Default.args = {
  activeStep: 0,
  steps: [{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }],
  onStepChange: (step: number) => {
    console.log('Step Changed:', step);
  }
};

export const ActiveStep = Template.bind({});
ActiveStep.args = {
  ...Default.args,
  activeStep: 1
};

export const CompletedStep = Template.bind({});
CompletedStep.args = {
  ...Default.args,
  activeStep: 2,
  description: 'Description comes here'
};
