import { Radio } from '@chakra-ui/radio';
import { HStack } from '@chakra-ui/react';
import { ChangeEvent, FC } from 'react';
import { neutral_700 } from 'theme/colors';

interface Props {
  isChecked: boolean;
  onChange: (value: string) => void;
  colorScheme: string;
  size: 'sm' | 'md' | 'lg';
  value: string;
  children?: React.ReactNode;
  variant?: 'primary';
  isDisabled?: boolean;
}

const AppRadio: FC<Props> = ({
  children,
  value = '',
  isChecked,
  onChange,
  colorScheme,
  size = 'md',
  variant,
  isDisabled = false
}) => {
  return (
    <HStack spacing={0}>
      <Radio
        _checked={{
          bg: colorScheme,
          boxShadow: `inset 0 0 0 2.5px ${neutral_700}`
        }}
        _focus={{
          boxShadow: `inset 0 0 0 2.5px ${neutral_700}`
        }}
        size={size}
        mr="8px"
        isChecked={isChecked}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        variant={variant}
        isDisabled={isDisabled}
        transition="all 0.2s ease-in"
      >
        {children}
      </Radio>
    </HStack>
  );
};

export default AppRadio;
