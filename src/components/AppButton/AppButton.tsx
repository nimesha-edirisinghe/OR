import { Button, ButtonProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props extends ButtonProps {
  children: ReactNode;
  _leftIcon?: any;
  onClick: () => void;
}

const AppButton: React.FC<Props & ButtonProps> = ({
  children,
  _leftIcon,
  onClick,
  ...rest
}: Props) => {
  return (
    <Button leftIcon={_leftIcon} {...rest} onClick={onClick}>
      {children}
    </Button>
  );
};

export default AppButton;
