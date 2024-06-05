import { FC } from 'react';
import { Box, Flex, FlexProps } from '@chakra-ui/layout';
import AppText from 'components/AppText/AppText';
import { motion } from 'framer-motion';
import { JobScheduleTypes } from 'types/requests/jobScheduleRequest';
import { blue_500, ocean_blue_100 } from 'theme/colors';

interface Props extends FlexProps {
  onTabChange: (value: JobScheduleTypes) => void;
  displayName: string;
  isActive: boolean;
  tabType: JobScheduleTypes;
}

const TabHeader: FC<Props> = ({ onTabChange, displayName, isActive, tabType, ...rest }) => {
  return (
    <Flex
      h="full"
      align="center"
      justify="center"
      onClick={() => onTabChange(tabType)}
      cursor="pointer"
      as={motion.div}
      {...rest}
      borderBottom={`2px solid ${isActive ?blue_500:ocean_blue_100}`}
    >
      <AppText size="14_500" color={isActive ? blue_500 : ''}>
        {displayName}
      </AppText>
    </Flex>
  );
};

export default TabHeader;
