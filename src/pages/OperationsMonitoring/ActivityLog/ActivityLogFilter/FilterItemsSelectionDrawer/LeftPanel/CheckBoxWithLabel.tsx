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
import { CustomIcon } from 'pages/AdvancedConfiguration/GroupConfiguration/MainSection/StoreGroup/StoreGroupCreation/AnchorLocationFilter/FilterItemsSelectionDrawer/LeftPanel/CheckBoxWithLabel';

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
