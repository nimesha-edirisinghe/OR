import { GridItem } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { ocean_blue_300, ocean_blue_50 } from 'theme/colors';

interface Props {
  children: React.ReactNode;
  borderBottom?: string;
  borderRight?: string;
  fontSize?: string;
  color?: string;
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
  borderBottomLeftRadius?: string;
  borderBottomRightRadius?: string;
}

const PerformanceGridItem: FC<Props> = ({
  children,
  borderBottom = '',
  borderRight = '',
  fontSize = 'body3',
  color = ocean_blue_50,
  borderTopLeftRadius = '',
  borderTopRightRadius = '',
  borderBottomLeftRadius = '',
  borderBottomRightRadius = ''
}) => {
  return (
    <GridItem
      border="1px solid"
      borderColor={ocean_blue_300}
      borderBottom={borderBottom}
      borderRight={borderRight}
      borderTopLeftRadius={borderTopLeftRadius}
      borderTopRightRadius={borderTopRightRadius}
      borderBottomLeftRadius={borderBottomLeftRadius}
      borderBottomRightRadius={borderBottomRightRadius}
      px="16px"
      display="flex"
      alignItems="center"
    >
      <AppText size={fontSize} color={color} noOfLines={2}>
        {children}
      </AppText>
    </GridItem>
  );
};

export default PerformanceGridItem;
