import { FC } from 'react';
import { TabType } from './TrainingConfigurationDrawer';
import { Flex, FlexProps } from '@chakra-ui/layout';
import AppText from 'components/AppText/AppText';
import { motion } from 'framer-motion';
import { blue_500, neutral_100, ocean_blue_100 } from 'theme/colors';

interface Props extends FlexProps {
  onTabChange: (value: TabType) => void;
  displayName: string;
  isActive: boolean;
  tabType: TabType;
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
      borderBottom={`2px solid ${isActive ? blue_500:ocean_blue_100}`}
    >
      <AppText size="14_500" color={isActive ? blue_500 : neutral_100}>
        {displayName}
      </AppText>
    </Flex>
  );
};

export default TabHeader;
