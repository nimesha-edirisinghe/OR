import { FC, ChangeEvent } from 'react';
import { Checkbox, CheckboxProps, HStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';

interface AppCheckboxWithLabelProps extends CheckboxProps {
  isChecked: boolean;
  label: string;
  name: string;
  onChangeHandler: (value: boolean) => void;
}

const AppCheckboxWithLabel: FC<AppCheckboxWithLabelProps> = ({
  isChecked,
  label,
  name,
  onChangeHandler,
  ...rest
}) => {
  return (
    <HStack spacing={0}>
      <Checkbox
        colorScheme="#8C8C8C"
        size="lg"
        border="none"
        borderColor="#555"
        mr="15px"
        variant={'custom'}
        _checked={{
          outline: 'none'
        }}
        isChecked={isChecked}
        value={''}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeHandler(e.target.checked)}
        {...rest}
      />
      <AppText fontSize="13px" fontWeight="400px" lineHeight="30px">
        {label}
      </AppText>
    </HStack>
  );
};

export default AppCheckboxWithLabel;
