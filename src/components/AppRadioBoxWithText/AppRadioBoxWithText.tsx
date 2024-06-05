import { HStack } from '@chakra-ui/layout';
import { Radio } from '@chakra-ui/radio';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import { neutral_700 } from 'theme/colors';

interface Props {
  text: string;
  name: string;
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  colorScheme: string;
}

const AppRadioBoxWithText: FC<Props> = ({ text, name, isChecked, onChange, colorScheme }) => {
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
        colorScheme={colorScheme}
        size="lg"
        mr="8px"
        isChecked={isChecked}
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
      />
      <AppText fontSize="12px" fontWeight="500px" lineHeight="30px">
        {text}
      </AppText>
    </HStack>
  );
};

export default AppRadioBoxWithText;
