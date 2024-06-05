import { Text, TextProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props extends TextProps {
  children: ReactNode;
}

const AppText: React.FC<Props & TextProps> = ({ children, ...rest }: Props) => {
  return <Text {...rest}>{children}</Text>;
};

export default AppText;
