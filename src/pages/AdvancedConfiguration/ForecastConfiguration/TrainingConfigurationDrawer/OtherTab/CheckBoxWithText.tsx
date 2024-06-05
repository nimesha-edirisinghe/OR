import { Checkbox } from '@chakra-ui/checkbox';
import { HStack } from '@chakra-ui/layout';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import { OtherConfigCheckBoxName } from './OtherTab';
import { ocean_blue_100 } from 'theme/colors';

interface Props {
  text: string;
  name: OtherConfigCheckBoxName;
  onChange: (name: OtherConfigCheckBoxName, value: boolean) => void;
  isChecked?: boolean;
}

const CheckBoxWithText: FC<Props> = ({ text, isChecked = false, name, onChange }) => {
  return (
    <HStack spacing={0}>
      <Checkbox
        colorScheme={ocean_blue_100}
        iconColor={ocean_blue_100}
        size="lg"
        border="none"
        borderColor={ocean_blue_100}
        mr="15px"
        variant={'custom'}
        _checked={{
          outline: 'none'
        }}
        isChecked={isChecked}
        value={name}
        onChange={(e: any) => onChange(name, e.target.checked)}
      />
      <AppText fontSize="13px" fontWeight="400px" lineHeight="30px">
        {text}
      </AppText>
    </HStack>
  );
};

export default CheckBoxWithText;
