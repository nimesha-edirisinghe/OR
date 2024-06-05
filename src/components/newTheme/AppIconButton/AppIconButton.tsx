import { IconButton, IconButtonProps } from '@chakra-ui/react';
import React, { JSXElementConstructor, ReactElement } from 'react';

interface Props extends IconButtonProps {
  icon: ReactElement<any, string | JSXElementConstructor<any>>;
}

const AppIconButton: React.FC<Props> = ({ icon, ...rest }) => {
  return <IconButton icon={icon} {...rest} />;
};

export default AppIconButton;
