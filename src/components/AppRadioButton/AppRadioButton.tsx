import { HStack } from '@chakra-ui/layout';
import { Radio } from '@chakra-ui/radio';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import { neutral_700 } from 'theme/colors';

interface Props {
  text: string;
  name: string;
  isChecked: boolean;
  onChange: (name: string, value: boolean) => void;
}

const AppRadioButton: FC<Props> = ({ text, name, isChecked, onChange }) => {
  return (
    <HStack spacing={0}>
      <Radio
        _checked={{
          bg: '#8C8C8C',
          boxShadow: `inset 0 0 0 2.5px ${neutral_700}`
        }}
        _focus={{
          boxShadow: `inset 0 0 0 2.5px ${neutral_700}`
        }}
        colorScheme="#8C8C8C"
        size="lg"
        mr="15px"
        isChecked={isChecked}
        value={name}
        onClick={(e: any) => onChange(name, e.target.value)}
      />
      <AppText fontSize="13px" fontWeight="400px" lineHeight="30px">
        {text}
      </AppText>
    </HStack>
  );
};

export default AppRadioButton;
