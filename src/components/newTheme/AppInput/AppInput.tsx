import React, { ChangeEvent } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormControlProps,
  InputProps,
  HStack
} from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { neutral_400 } from 'theme/colors';

interface Props extends InputProps {
  value: string | undefined;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  error?: string | null;
  variant?: 'error' | 'primary';
  isRequired?: boolean;
  caption?: string | null;
}

const AppInput: React.FC<Props & InputProps & FormControlProps> = ({
  label,
  value,
  onChange,
  error,
  variant = 'primary',
  isRequired = false,
  caption,
  ...rest
}) => {
  const selectVariant = error ? 'error' : variant;
  return (
    <FormControl isInvalid={!!error} {...rest}>
      {label && (
        <FormLabel variant={selectVariant} htmlFor={label} size="default">
          <HStack spacing="1px">
            <AppText fontSize="12px" fontWeight={400} color="#999">
              {label}
            </AppText>
            {isRequired && (
              <AppText size="body2" color="#F8705E">
                *
              </AppText>
            )}
          </HStack>
        </FormLabel>
      )}
      <Input id={label} variant={selectVariant} value={value} onChange={onChange} {...rest} />
      {error ? (
        <FormErrorMessage color="formErrorMessage.error._default" mt="4px">
          {error}
        </FormErrorMessage>
      ) : (
        caption && (
          <AppText size="caption" color={neutral_400} mt="4px">
            {caption}
          </AppText>
        )
      )}
    </FormControl>
  );
};

export default AppInput;
