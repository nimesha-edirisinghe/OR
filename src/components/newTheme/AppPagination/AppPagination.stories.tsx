import { ComponentStory, Meta } from '@storybook/react';
import { Box } from '@chakra-ui/react';
import AppPagination from './AppPagination';
import { action } from '@storybook/addon-actions';

export default {
  title: 'OR scale/New Theme/AppPagination',
  component: AppPagination,
  argTypes: {
    currentPage: {
      control: { type: 'number' }
    },
    totalPages: {
      control: { type: 'number' }
    },
    onPageChange: {
      action: 'page changed'
    }
  }
} as Meta;

const Template: ComponentStory<typeof AppPagination> = (args) => (
  <Box maxWidth="500px">
    <AppPagination {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  currentPage: 1,
  totalPages: 10,
  onPageChange: (page: number) => {
    action(`Clicked page ${page}`);
  }
};
