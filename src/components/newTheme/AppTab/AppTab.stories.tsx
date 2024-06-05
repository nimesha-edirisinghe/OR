import { Meta, ComponentStory } from '@storybook/react';
import AppTab from './AppTab';

export default {
  title: 'OR scale/New Theme/AppTab',
  component: AppTab
} as Meta;

const Template: ComponentStory<typeof AppTab> = (args) => <AppTab {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  tabs: [
    { label: 'Tab 1', content: <div>Content for Tab 1</div> },
    { label: 'Tab 2', content: <div>Content for Tab 2</div> },
    { label: 'Tab 3', content: <div>Content for Tab 3</div>, disabled: true },
    { label: 'Tab 4', content: <div>Content for Tab 4</div> }
  ],
  selectedTab: 0,
  onSelectTab: (index: number) => console.log(`Selected tab index: ${index}`),
  variant: 'primary'
};
