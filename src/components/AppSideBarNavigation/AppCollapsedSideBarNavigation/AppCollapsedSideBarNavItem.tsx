import { BoxProps, Center, HStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { iconName } from 'components/AppIcon/svgIcons';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  layoutSliceSelector,
  LeftMenu,
  MenuItem,
  setActiveMenuItem,
  setActiveSubMenuItem
} from 'state/layout/layoutState';
import { useNavigate } from 'react-router-dom';
import CollapsedMenuHoverPopup from './CollapsedMenuComponents/CollapsedMenuHoverPopup';
import CollapsedMenuActiveIndicator from './CollapsedMenuComponents/CollapsedMenuActiveIndicator';
import CollapsedMenuHoveredPopupContent from './CollapsedMenuComponents/CollapsedMenuHoveredPopupContent';
import { neutral_100, ocean_blue_100, ocean_blue_500 } from 'theme/colors';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { storeInLocal } from 'utils/localStorage';
import AppTooltip from 'components/AppTooltip/AppTooltip';

interface Props extends BoxProps {
  leftMenu: LeftMenu;
  menuItem: MenuItem;
  displayName: string | undefined;
  iconName: string | undefined;
  menuName: string;
  isActive?: boolean;
}

const AppCollapsedSideBarNavItem: FC<Props> = ({
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
  const { height: windowHeight } = useWindowDimensions();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef<any>();
  const [yPos, setYPos] = useState<number | null>(null);
  const [currentTarget, setCurrentTarget] = useState<DOMRect | null>(null);
  const [isSubMenuExist, setIsSubMenuExist] = useState<boolean>(false);

  useEffect(() => {
    const isSubMenuActive = () => {
      if (menuItem.subMenu) {
        return Object.values(menuItem.subMenu).some(
          (subMenu: any) => subMenu.path === activeSubMenuItem
        );
      } else {
        return menuItem.path === activeSubMenuItem;
      }
    };

    setIsSubmenuActive(isSubMenuActive());
  }, [menuItem, activeSubMenuItem, setIsSubmenuActive]);

  const onMouseLeaveMenu = () => {
    dispatch(setActiveMenuItem({ menuItem: null }));
  };

  const onSubMenuSelect = (subMenu: MenuItem) => {
    dispatch(setActiveSubMenuItem({ subMenuItem: subMenu.path! }));
    navigate(subMenu.path!);
    onMouseLeaveMenu();
    storeInLocal('activeSubMenuItem', subMenu.path!);
  };

  const createSubMenu = () => {
    if (activeMenuItem) {
      const mainMenu = leftMenu[activeMenuItem];
      const subMenuList = leftMenu[activeMenuItem].subMenu!;

      if (!subMenuList) {
        return null;
      }

      return (
        <CollapsedMenuHoveredPopupContent
          mainMenu={mainMenu}
          subMenuList={subMenuList}
          onSubMenuSelect={onSubMenuSelect}
          activeSubMenuItem={activeSubMenuItem}
        />
      );
    } else return null;
  };

  const setPopUpPosition = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const currentTargetRect = e.currentTarget.getBoundingClientRect();
    setCurrentTarget(currentTargetRect);
  };

  useEffect(() => {
    if (activeMenuItem) {
      setYPos(null);
      const subMenuList = leftMenu[activeMenuItem].subMenu!;
      const subMenuHeight = (subMenuList && Object.keys(subMenuList).length * 56) || 0;
      const _yPos = currentTarget?.top!;

      const totalHeightRequired = _yPos + subMenuHeight;

      if (totalHeightRequired > windowHeight) {
        const targetBottom = currentTarget?.bottom!;
        const adjustedYPos = targetBottom - subMenuHeight + 40.5;
        setYPos(adjustedYPos);
      } else {
        setYPos(_yPos);
      }
    }
  }, [currentTarget]);

  const onMenuHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, menuItem: string) => {
    dispatch(setActiveMenuItem({ menuItem }));
    setYPos(null);
    setPopUpPosition(e);
    e.preventDefault();

    const subMenu = leftMenu[menuItem].subMenu;
    if (subMenu) setIsSubMenuExist(true);
    else setIsSubMenuExist(false);
  };

  const onParentMenuItemClick = () => {
    if (!menuItem.subMenu) {
      menuItem.path && navigate(menuItem.path);
      dispatch(setActiveMenuItem({ menuItem: menuName }));
      dispatch(setActiveSubMenuItem({ subMenuItem: menuItem.path! }));
      storeInLocal('activeSubMenuItem', menuItem.path!);
    }
  };

  return (
    <HStack
      spacing={0}
      userSelect="none"
      onMouseLeave={() => onMouseLeaveMenu()}
      onMouseEnter={(e) => onMenuHover(e, menuName)}
    >
      <AppTooltip
        label={menuName}
        placement="bottom-end"
        display={isSubMenuExist ? 'none' : 'block'}
      >
        <Center
          pos="relative"
          w="56px"
          h="56px"
          bg={isActive || isSubMenuActive ? ocean_blue_500 : ''}
          cursor="pointer"
          _hover={{
            bg: ocean_blue_500
          }}
          role="group"
          onClick={onParentMenuItemClick}
          {...rest}
        >
          {isSubMenuActive ? <CollapsedMenuActiveIndicator /> : null}
          <AppIcon
            name={iconName as iconName}
            w="24px"
            h="24px"
            fill={isActive || isSubMenuActive ? neutral_100 : ocean_blue_100}
            _groupHover={{ fill: neutral_100 }}
            transition=".500s"
          />
        </Center>
      </AppTooltip>

      {isActive && yPos && (
        <CollapsedMenuHoverPopup yPos={yPos} boxRef={ref} children={createSubMenu()} />
      )}
    </HStack>
  );
};

export default AppCollapsedSideBarNavItem;
