import { HStack, VStack } from '@chakra-ui/react';
import { iconName } from 'components/AppIcon/svgIcons';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ocean_blue_200, ocean_blue_400, ocean_blue_600 } from 'theme/colors';
import { useDispatch } from 'react-redux';
import {
  setIsLoadWhData,
  setReplEditable
} from 'state/pages/view/whReplenishmentView/whRplViewState';
import { WHReplTypeEnum } from 'utils/enum';

export interface moreOptionItems {
  id: number;
  iconName: iconName;
  value: string;
  path?: string;
}

interface Props {
  onMaxMinHandler?: () => void;
  options: moreOptionItems[];
  isOpenPanel?: boolean;
  type: WHReplTypeEnum;
}

const MoreOptionContent: FC<Props> = ({ options, isOpenPanel, type, onMaxMinHandler }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickMoreOption = (item: moreOptionItems, option: number) => {
    if (option === 0) {
      if (!isOpenPanel && type === WHReplTypeEnum.INDIVIDUAL) onMaxMinHandler && onMaxMinHandler();
      if (type === WHReplTypeEnum.INDIVIDUAL) dispatch(setReplEditable(true));
    }
    dispatch(setIsLoadWhData(false));
    navigate(item.path!);
  };

  return (
    <VStack
      w="277px"
      bg={ocean_blue_600}
      borderRadius="8px"
      overflow="hidden"
      border="1px solid"
      borderColor={ocean_blue_400}
      spacing={0}
      boxShadow="0px 12px 20px 0px #001019"
      zIndex={15}
    >
      {options.map((item, index) => (
        <HStack
          key={item.id}
          h="36px"
          w="full"
          spacing="4px"
          cursor="pointer"
          _hover={{
            bg: ocean_blue_400
          }}
          px="12px"
          onClick={() => onClickMoreOption(item, index)}
        >
          <AppText
            size="body3"
            fontSize="13px"
            fontWeight={400}
            lineHeight="22px"
            color={ocean_blue_200}
          >
            {item.value}
          </AppText>
        </HStack>
      ))}
    </VStack>
  );
};

export default MoreOptionContent;
