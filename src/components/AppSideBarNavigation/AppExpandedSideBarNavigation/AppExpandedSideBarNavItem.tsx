import { BoxProps, Center, HStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { iconName } from 'components/AppIcon/svgIcons';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { neutral_100, neutral_300, ocean_blue_500 } from 'theme/colors';
import {
  layoutSliceSelector,
  LeftMenu,
  MenuItem,
  setActiveMenuItem,
  setActiveSubMenuItem
} from 'state/layout/layoutState';
import CollapsedMenuActiveIndicator from '../AppCollapsedSideBarNavigation/CollapsedMenuComponents/CollapsedMenuActiveIndicator';
import AppText from 'components/newTheme/AppText/AppText';
import { ocean_blue_100 } from 'theme/colors';
import { useNavigate } from 'react-router-dom';
import AppTooltip from 'components/AppTooltip/AppTooltip';

interface Props extends BoxProps {
  leftMenu: LeftMenu;
  menuItem: MenuItem;
  displayName: string | undefined;
  iconName: string | undefined;
  menuName: string;
  isActive?: boolean;
}

const AppExpandedSideBarNavItem: FC<Props> = ({
  iconName,
  displayName,
  isActive,
  leftMenu,
  menuItem,
  menuName,
  ...rest
}) => {
  const leftMenuState = useSelector(layoutSliceSelector);
  const activeMenuItem = leftMenuState.activeMenuItem;
  const activeSubMenuItem = leftMenuState.activeSubMenuItem;
  const [isSubMenuActive, setIsSubmenuActive] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setIsSubmenuActive(false);
    if (menuItem.subMenu) {
      Object.values(menuItem.subMenu).map((subMenu: any) => {
        if (subMenu.path === activeSubMenuItem) {
          setIsSubmenuActive(true);
        }
      });
    } else {
      if (menuItem.path === activeSubMenuItem) {
        setIsSubmenuActive(true);
      }
    }
  }, [activeMenuItem, activeSubMenuItem]);

  const onMenuItemClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (menuItem.subMenu) {
      dispatch(setActiveMenuItem({ menuItem: menuName }));
    } else {
      dispatch(setActiveSubMenuItem({ subMenuItem: menuItem.path! }));
      menuItem.path && navigate(menuItem.path);
    }
  };

  return (
    <HStack
      spacing={0}
      userSelect="none"
      justify="start"
      w={activeMenuItem ? 'auto' : '280px'}
      role="group"
      cursor="pointer"
      _hover={{
        bg: ocean_blue_500,
        color: neutral_300
      }}
      pr={activeMenuItem ? 'auto' : '12px'}
      bg={isSubMenuActive ? ocean_blue_500 : ''}
      transition=".6s"
      onClick={onMenuItemClick}
      {...rest}
    >
      <Center pos="relative" minW="56px" minH="56px">
        {isSubMenuActive ? <CollapsedMenuActiveIndicator /> : null}
        <AppIcon
          name={iconName as iconName}
          w="24px"
          h="24px"
          fill={ocean_blue_100}
          _groupHover={{ fill: neutral_100 }}
          transition=".6s"
        />
      </Center>
      {!activeMenuItem && (
        <HStack justify="space-between" w="full">
          <AppText
            size="body2"
            color={ocean_blue_100}
            _groupHover={{ color: neutral_300 }}
            noOfLines={1}
            transition=".6s"
            style={{ wordBreak: 'break-all' }}
          >
            {menuItem.displayName?.length>27? 
             <AppTooltip label={menuItem.displayName} noOfLines={1} placement="bottom-end" zIndex={1}>
                {menuItem.displayName?.substring(0,26)+"..."}
              </AppTooltip> 
               :menuItem.displayName}
          </AppText>
        </HStack>
      )}
    </HStack>
  );
};

export default AppExpandedSideBarNavItem;
