import { FC } from 'react';
import { Checkbox } from '@chakra-ui/checkbox';
import { HStack } from '@chakra-ui/layout';
import AppText from 'components/AppText/AppText';
import { Divider, VStack } from '@chakra-ui/react';

interface Props {
  label: string;
  isChecked: boolean;
  isDisabled: boolean;
  onChange: (e: any) => void;
}

const CheckBoxWithLabel: FC<Props> = ({ label, isChecked, isDisabled, onChange }) => {
  return (
    <VStack pb="10px" w="full" align="start">
      <HStack spacing={0}>
        <Checkbox
          colorScheme="#8C8C8C"
          size="md"
          border="none"
          borderColor="#555"
          mr="15px"
          variant={'custom'}
          _checked={{
            outline: 'none'
          }}
          isChecked={isChecked}
          onChange={onChange}
          isDisabled={isDisabled}
        />
        <AppText fontSize="14px" fontWeight="400px" lineHeight="22px" wordBreak={'break-all'}>
          {label}
        </AppText>
      </HStack>
      <Divider orientation="horizontal" />
    </VStack>
  );
};

export default CheckBoxWithLabel;
