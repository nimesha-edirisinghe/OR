import { Box, HStack, VStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { iconName } from 'components/AppIcon/svgIcons';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsLoadData } from 'state/pages/view/replenishmentView/rplViewPageState';
import { ocean_blue_200, ocean_blue_400, ocean_blue_600 } from 'theme/colors';

export interface moreOptionItems {
  id: number;
  iconName: iconName;
  value: string;
  path?: string;
}
interface Props {
  options: moreOptionItems[];
}

const MoreOptionContent: FC<Props> = ({options}) => {
  const dispatch = useDispatch();

  const onClickMoreOption = (item: moreOptionItems) => {
    dispatch(setIsLoadData(false));
    navigate(item.path!);
  };

  const navigate = useNavigate();
  return (
    <VStack
      w="277px"
      bg={ocean_blue_600}
      borderRadius="8px"
      py="8px"
      border="1px solid"
      borderColor={ocean_blue_400}
      spacing={0}
      boxShadow="0px 12px 20px 0px #001019"
      zIndex={15}
    >
      {options.map((item) => (
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
          onClick={() => onClickMoreOption(item)}
        >
          {/* <Box>
            <AppIcon transition="transform 0.25s ease" name={item.iconName} fill={ocean_blue_200} />
          </Box> */}
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
