import { FC } from 'react';
import { Checkbox } from '@chakra-ui/checkbox';
import { HStack } from '@chakra-ui/layout';
import AppText from 'components/AppText/AppText';
import {
  neutral_100,
  ocean_blue_100,
  ocean_blue_200,
  ocean_blue_400,
  ocean_blue_500
} from 'theme/colors';
import { Icon } from '@chakra-ui/react';

export function CustomIcon(props: any) {
  const { isIndeterminate, isChecked, ...rest } = props;

  const d =
    'M19 7V17C19 18.103 18.103 19 17 19H7C5.897 19 5 18.103 5 17V7C5 5.897 5.897 5 7 5H17C18.103 5 19 5.897 19 7ZM17 7H7V17H17.002L17 7ZM15 9H9V15H15V9Z';

  const uncheckedD =
    'M19 17V7C19 5.897 18.103 5 17 5H7C5.897 5 5 5.897 5 7V17C5 18.103 5.897 19 7 19H17C18.103 19 19 18.103 19 17ZM7 7H17L17.002 17H7V7Z';

  return (
    <>
      {isChecked ? (
        <Icon viewBox="0 0 24 24" {...rest} p={0} m={0} w="24px" h="24px">
          <path d={d} />
        </Icon>
      ) : (
        <Icon viewBox="0 0 24 24" {...rest} p={0} m={0} w="24px" h="24px">
          <path d={uncheckedD} />
        </Icon>
      )}
    </>
  );
}

interface Props {
  label: string;
  isChecked: boolean;
  isDisabled: boolean;
  onChange: (e: any) => void;
  py?: string;
}

const CheckBoxWithLabel: FC<Props> = ({
  label,
  isChecked,
  isDisabled,
  onChange,
  py = '4px',
  ...rest
}) => {
  const textColor = isChecked ? neutral_100 : ocean_blue_100;
  const textHoverColor = ocean_blue_200;
  const bgColor = ocean_blue_500;
  const bgHoverColor = ocean_blue_400;

  return (
    <HStack
      spacing="8px"
      bg={bgColor}
      _hover={{ bg: bgHoverColor }}
      pl="12px"
      pr="8px"
      py={py}
      transition="1s"
      {...rest}
    >
      <Checkbox
        role="group"
        icon={<CustomIcon fill={textColor} _groupHover={{ fill: textHoverColor }} />}
        colorScheme={textColor}
        border="1px solid transparent"
        outline="none"
        _checked={{
          outline: 'none'
        }}
        isChecked={isChecked}
        onChange={onChange}
        isDisabled={isDisabled}
      >
        <AppText
          size="body2"
          color={textColor}
          _groupHover={{ color: textHoverColor }}
          wordBreak={'break-all'}
        >
          {label}
        </AppText>
      </Checkbox>
    </HStack>
  );
};

export default CheckBoxWithLabel;
