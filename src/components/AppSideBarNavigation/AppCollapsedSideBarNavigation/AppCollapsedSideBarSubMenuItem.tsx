import { BoxProps, HStack } from '@chakra-ui/react';
import AppTooltip from 'components/AppTooltip/AppTooltip';
import AppText from 'components/newTheme/AppText/AppText';
import { FC, useCallback } from 'react';
import { neutral_100, ocean_blue_100, ocean_blue_400 } from 'theme/colors';

interface Props extends BoxProps {
  subMenuName: string;
  subMenuType: 'title' | 'default' | 'active';
}

const AppCollapsedSideBarSubMenuItem: FC<Props> = ({ subMenuType, subMenuName, ...rest }) => {
  const subMenu = useCallback(() => {
    switch (subMenuType) {
      case 'title':
        return (
          <HStack h="40px" spacing={0} w="full" pl="16px" pr="12px" {...rest}>
            <AppText
              size="body2"
              color={neutral_100}
              p={0}
              noOfLines={1}
              style={{ wordBreak: 'break-all' }}
            >
              {subMenuName.length > 22 ? (
                <AppTooltip label={subMenuName} noOfLines={1} placement="bottom-end" zIndex={1}>
                  {subMenuName?.substring(0, 22) + '...'}
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
            pl="16px"
            pr="12px"
            {...rest}
          >
            <AppText size="body2" color="#0AA5FF" noOfLines={1}>
              {subMenuName.length > 26 ? (
                <AppTooltip label={subMenuName} noOfLines={1} placement="bottom-end" zIndex={1}>
                  {subMenuName?.substring(0, 26) + '...'}
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
            pl="16px"
            pr="12px"
            {...rest}
          >
            <AppText size="body2" color={ocean_blue_100} noOfLines={1}>
              {subMenuName.length > 26 ? (
                <AppTooltip label={subMenuName} noOfLines={1} placement="bottom-end" zIndex={1}>
                  {subMenuName?.substring(0, 26) + '...'}
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

export default AppCollapsedSideBarSubMenuItem;
