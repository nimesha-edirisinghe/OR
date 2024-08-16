import { HStack, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  layoutSliceSelector,
  LeftMenu,
  MenuItem,
  setActiveMenuItem,
  setActiveSubMenuItem
} from 'state/layout/layoutState';
import AppCollapsedSideBarNavItem from './AppCollapsedSideBarNavItem';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { useNavigate } from 'react-router-dom';
import ChatWithMaya from 'layouts/SideBar/ChatWithMaya';
import { ocean_blue_50, ocean_blue_500_t95, ocean_blue_500_t97 } from 'theme/colors';
import { Direction } from 'utils/enum';
import { storeInLocal } from 'utils/localStorage';

interface Props {
  leftMenu: LeftMenu;
  isReachedTop: boolean;
  isReachedBottom: boolean;
  onClickScrollButton: (direction: Direction) => void;
}

const AppCollapsedSideBarNavigation: FC<Props> = ({
  leftMenu,
  isReachedTop,
  isReachedBottom,
  onClickScrollButton
}) => {
  const leftMenuState = useSelector(layoutSliceSelector);
  const activeMenuItem = leftMenuState.activeMenuItem;
  const isMayaActive = leftMenuState.isMayaActive;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateToMaya = () => {
    dispatch(setActiveMenuItem({ menuItem: null }));
    dispatch(setActiveSubMenuItem({ subMenuItem: null }));
    storeInLocal('activeSubMenuItem', '/app/maya');
    navigate('/app/maya');
  };

  return (
    <HStack align="start" spacing={0}>
      <VStack spacing={0} align={'start'}>
        {!isReachedTop && (
          <VStack
            position={'sticky'}
            top={'0'}
            w={'56px'}
            zIndex={1}
            transition={'.5s'}
            cursor={'pointer'}
            onClick={() => onClickScrollButton(Direction.UP)}
          >
            <VStack
              bg={ocean_blue_500_t95}
              h={'56px'}
              w={'56px'}
              position={'absolute'}
              top={'0'}
              justify={'start'}
              transition={'.5s'}
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
              <AppCollapsedSideBarNavItem
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
          <VStack position={'sticky'} bottom={'0'} w={'56px'} zIndex={1} transition={'.5s'}>
            <VStack
              bg={ocean_blue_500_t97}
              h={'56px'}
              w={'56px'}
              position={'absolute'}
              bottom={'0'}
              justify={'end'}
              cursor={'pointer'}
              onClick={() => onClickScrollButton(Direction.DOWN)}
            >
              <AppIcon
                transition={'.6s'}
                name={'forwardRight'}
                fill={ocean_blue_50}
                transform={'rotate(90deg)'}
                w={'24px'}
                h={'24px'}
              />
            </VStack>
          </VStack>
        )}
      </VStack>
    </HStack>
  );
};

export default AppCollapsedSideBarNavigation;
