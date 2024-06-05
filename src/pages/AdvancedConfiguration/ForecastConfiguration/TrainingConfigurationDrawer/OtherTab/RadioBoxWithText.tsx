import { HStack } from '@chakra-ui/layout';
import { Radio } from '@chakra-ui/radio';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import { neutral_200, neutral_700, ocean_blue_100, ocean_blue_200 } from 'theme/colors';
import { BestFitCriteriaRadioName } from './OtherTab';

interface Props {
  text: string;
  name: BestFitCriteriaRadioName;
  isChecked: boolean;
  onChange: (name: BestFitCriteriaRadioName, value: boolean) => void;
  lineHeight?: string;
}

const RadioBoxWithText: FC<Props> = ({ text, name, isChecked, onChange, lineHeight = '30px' }) => {
  const textColor: string = isChecked ? neutral_200 : ocean_blue_200;
  const textWeight: string = isChecked ? '600' : '400';

  return (
    <HStack spacing="8px">
      <Radio
        _checked={{
          bg: ocean_blue_100,
          boxShadow: `inset 0 0 0 2.5px ${neutral_700}`
        }}
        _focus={{
          boxShadow: `inset 0 0 0 2.5px ${neutral_700}`
        }}
        colorScheme={ocean_blue_100}
        size="md"
        isChecked={isChecked}
        value={name}
        onClick={(e: any) => onChange(name, e.target.value)}
      />
      <AppText fontSize="13px" fontWeight={textWeight} lineHeight={lineHeight} color={textColor}>
        {text}
      </AppText>
    </HStack>
  );
};

export default RadioBoxWithText;
