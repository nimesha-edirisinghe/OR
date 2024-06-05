import { Input, InputProps, forwardRef } from '@chakra-ui/react';

interface Props extends InputProps {
  ref?: any;
}

const AppInput: React.FC<Props & InputProps> = forwardRef(function AppInput(
  { ...rest }: Props,
  ref
) {
  return <Input {...rest} ref={ref} />;
});

export default AppInput;
