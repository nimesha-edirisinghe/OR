import { FC, useState } from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { ocean_blue_300, ocean_blue_600, red_400 } from 'theme/colors';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppText from 'components/newTheme/AppText/AppText';
import { motion } from 'framer-motion';

interface Props {
  name: string;
  alerted?: boolean;
  value?: number | null;
}

const ExclusionCriteriaItem: FC<Props> = ({ name, alerted = false, value = null }) => {
  const [isHovered, setIsHovered] = useState(false);
  const itemColor = alerted ? red_400 : ocean_blue_300;

  return (
    <HStack
      h="30px"
      w="full"
      bg={ocean_blue_600}
      borderRadius="4px"
      px="20px"
      justify="space-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      cursor="pointer"
    >
      <HStack>
        <Box py="4px" h="30px" w="16px">
          <AppIcon name="warning" width="16px" height="16px" fill={itemColor} />
        </Box>
        <AppText size="body3" color={itemColor}>
          {name}
        </AppText>
      </HStack>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ display: 'inline-block' }}
      >
        {isHovered && (
          <AppText size="body3" color={itemColor}>
            {value}
          </AppText>
        )}
      </motion.div>
    </HStack>
  );
};

export default ExclusionCriteriaItem;
