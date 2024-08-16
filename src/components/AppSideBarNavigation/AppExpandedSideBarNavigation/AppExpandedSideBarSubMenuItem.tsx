import { BoxProps, HStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppTooltip from 'components/AppTooltip/AppTooltip';
import AppText from 'components/newTheme/AppText/AppText';
import { FC, useCallback } from 'react';
import { neutral_100, neutral_400, ocean_blue_100, ocean_blue_400 } from 'theme/colors';

interface Props extends BoxProps {
  subMenuName: string;
  subMenuType: 'title' | 'default' | 'active';
  backToMainMenu?: () => void;
}

const AppExpandedSideBarSubMenuItem: FC<Props> = ({
  subMenuType,
  subMenuName,
  backToMainMenu,
  ...rest
}) => {
  const subMenu = useCallback(() => {
    switch (subMenuType) {
      case 'title':
        return (
          <HStack h="40px" spacing="8px" w="full" {...rest} justify="start" px="4px">
            <AppIcon
              name="chev"
              w="24px"
              h="24px"
              fill={ocean_blue_100}
              _groupHover={{ fill: neutral_100 }}
              transition=".6s"
              cursor="pointer"
              onClick={backToMainMenu}
            />
            <AppText
              size="body2"
              color={neutral_100}
              p={0}
              noOfLines={1}
              style={{ wordBreak: 'break-all' }}
            >
              {subMenuName?.length > 20 ? (
                <AppTooltip label={subMenuName} placement="bottom-end" zIndex={1}>
                  {subMenuName?.substring(0, 20) + '...'}
                </AppTooltip>
              ) : (
                subMenuName
              )}
            </AppText>
          </HStack>
        );
        break;
      case 'active':
        return (
          <HStack
            h="40px"
            _hover={{ bg: ocean_blue_400 }}
            cursor="pointer"
            w="full"
            transition="0.6s"
            pl="36px"
            {...rest}
          >
            <AppText size="body2" color="#0AA5FF" noOfLines={1}>
              {subMenuName?.length > 23 ? (
                <AppTooltip label={subMenuName} noOfLines={1} placement="bottom-end" zIndex={1}>
                  {subMenuName?.substring(0, 23) + '...'}
                </AppTooltip>
              ) : (
                subMenuName
              )}
            </AppText>
          </HStack>
        );
        break;
      case 'default':
        return (
          <HStack
            h="40px"
            _hover={{ bg: ocean_blue_400 }}
            cursor="pointer"
            w="full"
            transition="0.6s"
            pl="36px"
            {...rest}
          >
            <AppText size="body2" color={ocean_blue_100} noOfLines={1}>
              {subMenuName?.length > 23 ? (
                <AppTooltip label={subMenuName} noOfLines={1} placement="bottom-end" zIndex={1}>
                  {subMenuName?.substring(0, 23) + '...'}
                </AppTooltip>
              ) : (
                subMenuName
              )}
            </AppText>
          </HStack>
        );
        break;
    }
  }, [subMenuName, subMenuType]);

  return subMenu();
};

export default AppExpandedSideBarSubMenuItem;
