import { HStack, VStack } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  layoutSliceSelector,
  LeftMenu,
  MenuItem,
  setActiveMenuItem,
  setActiveSubMenuItem
} from 'state/layout/layoutState';
import AppExpandedSideBarNavItem from './AppExpandedSideBarNavItem';
import AppExpandedSideBarSubMenu from './AppExpandedSideBarSubMenu';
import { ocean_blue_50, ocean_blue_500_t95, ocean_blue_500_t97 } from 'theme/colors';
import { AppIcon } from 'components/AppIcon/AppIcon';
import ChatWithMaya from 'layouts/SideBar/ChatWithMaya';
import { Direction } from 'utils/enum';
import { storeInLocal } from 'utils/localStorage';

interface Props {
  leftMenu: LeftMenu;
  isReachedTop: boolean;
  isReachedBottom: boolean;
  onClickScrollButton: (direction: Direction) => void;
}

const AppExpandedSideBarNavigation: FC<Props> = ({
  leftMenu,
  isReachedTop,
  isReachedBottom,
  onClickScrollButton
}) => {
  const leftMenuState = useSelector(layoutSliceSelector);
  const activeMenuItem = leftMenuState.activeMenuItem;
  const activeSubMenuItem = leftMenuState.activeSubMenuItem;
  const isMayaActive = leftMenuState.isMayaActive;
  const [isExpandMenuVisible, setIsExpandedMenuVisible] = useState<boolean>(false);
  const scrollBarArrowWidth = isExpandMenuVisible ? '56px' : 'full';

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const backToMainMenu = () => {
    dispatch(setActiveMenuItem({ menuItem: null }));
  };

  const onSubMenuSelect = (subMenu: MenuItem | null) => {
    dispatch(setActiveSubMenuItem({ subMenuItem: subMenu ? subMenu.path! : null }));
    if (subMenu) {
      navigate(subMenu.path!);
      storeInLocal('activeSubMenuItem', subMenu.path!);
    }
  };

  const createSubMenu = useCallback(() => {
    if (activeMenuItem) {
      const mainMenu = leftMenu[activeMenuItem];
      const subMenuList = leftMenu[activeMenuItem].subMenu!;

      if (!subMenuList) {
        dispatch(setActiveMenuItem({ menuItem: null }));
        return null;
      }

      return (
        <AppExpandedSideBarSubMenu
          mainMenu={mainMenu}
          subMenuList={subMenuList}
          onSubMenuSelect={onSubMenuSelect}
          activeSubMenuItem={activeSubMenuItem}
          backToMainMenu={backToMainMenu}
        />
      );
    } else return null;
  }, [activeMenuItem, activeSubMenuItem]);

  useEffect(() => {
    if (activeMenuItem) setIsExpandedMenuVisible(true);
    else setIsExpandedMenuVisible(false);
  }, [activeMenuItem]);

  const navigateToMaya = () => {
    dispatch(setActiveMenuItem({ menuItem: null }));
    dispatch(setActiveSubMenuItem({ subMenuItem: null }));
    storeInLocal('activeSubMenuItem', '/app/maya');
    navigate('/app/maya');
  };

  return (
    <HStack align="start" spacing={0}>
      <VStack spacing={0} align={'start'} position={'relative'}>
        {!isReachedTop && (
          <VStack
            position={'sticky'}
            top={'0'}
            w={scrollBarArrowWidth}
            zIndex={1}
            transition={'.5s'}
            cursor={'pointer'}
            onClick={() => onClickScrollButton(Direction.UP)}
          >
            <VStack
              bg={ocean_blue_500_t95}
              h={'56px'}
              w={`full`}
              justify={'start'}
              position={'absolute'}
              top={'0'}
            >
              <AppIcon
                transition={'.6s'}
                name={'forwardRight'}
                fill={ocean_blue_50}
                transform={'rotate(270deg)'}
                w={'24px'}
                h={'24px'}
              />
            </VStack>
          </VStack>
        )}
        {isMayaActive && (
          <ChatWithMaya
            onClick={navigateToMaya}
            cursor="pointer"
            isActive={location.pathname === '/app/maya'}
          />
        )}

        {Object.keys(leftMenu).length > 0 &&
          Object.keys(leftMenu).map((menuItem, key) => {
            const isActive = activeMenuItem === menuItem;
            return (
              <AppExpandedSideBarNavItem
                leftMenu={leftMenu}
                menuItem={leftMenu[menuItem] as MenuItem}
                displayName={leftMenu[menuItem].displayName}
                iconName={leftMenu[menuItem].iconName}
                key={key}
                menuName={menuItem}
                isActive={isActive}
              />
            );
          })}
        {!isReachedBottom && (
          <VStack
            position={'sticky'}
            bottom={'0'}
            w={scrollBarArrowWidth}
            zIndex={1}
            transition={'.5s'}
            cursor={'pointer'}
            onClick={() => onClickScrollButton(Direction.DOWN)}
          >
            <VStack
              bg={ocean_blue_500_t97}
              h="56px"
              w={'full'}
              position={'absolute'}
              bottom={'0'}
              justify={'end'}
            >
              <AppIcon
                transition={'.6s'}
                name="forwardRight"
                fill={ocean_blue_50}
                transform={'rotate(90deg)'}
                w={'24px'}
                h={'24px'}
              />
            </VStack>
          </VStack>
        )}
      </VStack>
      {createSubMenu()}
    </HStack>
  );
};

export default AppExpandedSideBarNavigation;
