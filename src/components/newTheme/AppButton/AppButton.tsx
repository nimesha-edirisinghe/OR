import { Button, ButtonProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props extends ButtonProps {
  children: ReactNode;
  onClick: () => void;
  _leftIcon?: any;
  _rightIcon?: any;
  isDisabled?: boolean;
}

const AppButton: React.FC<Props & ButtonProps> = ({
  children,
  onClick,
  _leftIcon,
  _rightIcon,
  isDisabled = false,
  ...rest
}: Props) => {
  const tapAnimation = {
    scale: 0.98,
    transition: {
      duration: 0.2
    }
  };

  return (
    <Button
      whiletap={!isDisabled && tapAnimation}
      transition="0.25s ease-in"
      leftIcon={_leftIcon}
      rightIcon={_rightIcon}
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      onClick={isDisabled ? undefined : onClick}
      isDisabled={isDisabled}
      minW={'100px'}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default AppButton;
