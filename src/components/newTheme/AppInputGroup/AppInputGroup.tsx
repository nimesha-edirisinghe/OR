import React, { ChangeEvent } from 'react';
import {
  FormControlProps,
  InputProps,
  InputGroup,
  InputRightElement,
  InputLeftElement
} from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppInput from 'components/AppInput/AppInput';
import { ocean_blue_300, ocean_blue_350 } from 'theme/colors';

interface Props extends InputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  error?: string | undefined;
  variant?: 'error' | 'primary';
  placeholder?: string;
  inputSize?: string;
  width?: string;
  height?: string;
}

const AppInputGroup: React.FC<Props & InputProps & FormControlProps> = ({
  label,
  value,
  onChange,
  error,
  variant = 'primary',
  placeholder = '',
  inputSize = 'small',
  width,
  height,
  ...rest
}) => {
  return (
    <InputGroup size="md" p={0} w={width}>
      <AppInput
        placeholder={placeholder}
        size={inputSize}
        w="full"
        py="10px"
        variant="primary"
        _placeholder={{
          color: { ocean_blue_350 }
        }}
        onChange={onChange}
        h={height}
        value={value}
        {...rest}
      />
      <InputRightElement h="full">
        <AppIcon name="search" fill={ocean_blue_300} w="24px" h="24px" />
      </InputRightElement>
    </InputGroup>
  );
};

export default AppInputGroup;
