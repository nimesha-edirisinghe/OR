import { Box, HStack, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  layoutSliceSelector,
  setActiveMenuItem,
  setActiveSubMenuItem
} from 'state/layout/layoutState';
import LeftMenuToggler from './LeftMenuToggler';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppText from 'components/newTheme/AppText/AppText';
import AppCollapsedSideBarNavigation from 'components/AppSideBarNavigation/AppCollapsedSideBarNavigation/AppCollapsedSideBarNavigation';
import AppExpandedSideBarNavigation from 'components/AppSideBarNavigation/AppExpandedSideBarNavigation/AppExpandedSideBarNavigation';
import { ocean_blue_100, ocean_blue_350, ocean_blue_600 } from 'theme/colors';
import { useLocation, useNavigate } from 'react-router-dom';
import ColorModeToggler from './ColorModeToggler';
import { scrollbarYStyles } from 'theme/styles';
import DataScienceWorkbench from './DataScienceWorkbench';
import { useEffect, useRef, useState } from 'react';
import { Direction } from 'utils/enum';

const Sidebar = () => {
  const leftMenu = useSelector(layoutSliceSelector).leftMenu;
  const leftMenuOpen = useSelector(layoutSliceSelector).leftMenuOpen;
  const [isReachedBottom, setIsReachedBottom] = useState<boolean>(false);
  const [isReachedTop, setIsReachedTop] = useState<boolean>(true);
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [clientHeight, setClientHeight] = useState<number>(0);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref && ref.current) {
      if (ref.current.scrollHeight > 600) setIsReachedBottom(true);
      setClientHeight(ref.current.clientHeight);
    }
  }, []);

  const navigateToWorkbench = () => {
    dispatch(setActiveMenuItem({ menuItem: null }));
    dispatch(setActiveSubMenuItem({ subMenuItem: null }));
    navigate('/modules');
  };

  const handleScroll = (e: any) => {
    const top = e.currentTarget.scrollTop === 0;
    const bottom = Math.trunc(e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight;

    setScrollTop(e.target.scrollTop);
    setClientHeight(e.target.clientHeight);

    if (top) setIsReachedTop(true);
    else setIsReachedTop(false);

    if (bottom) setIsReachedBottom(true);
    else setIsReachedBottom(false);
  };

  const onClickScrollButton = (direction: Direction) => {
    let scrollTo: { top: number; behavior: ScrollBehavior };
    if (ref && ref.current) {
      if (direction === Direction.UP) {
        scrollTo = {
          top: scrollTop - clientHeight,
          behavior: 'smooth'
        };
      } else {
        scrollTo = {
          top: scrollTop + clientHeight,
          behavior: 'smooth'
        };
      }
      ref.current.scrollTo(scrollTo);
    }
  };

  return (
    <Box
      minW={leftMenuOpen ? '280px' : '56px'}
      overflowX="hidden"
      overflowY="hidden"
      transition=".2s ease-in"
      height="100vh"
      userSelect="none"
      __css={{
        '&::-webkit-scrollbar': {
          w: '1'
        },
        '&::-webkit-scrollbar-track': {
          w: '1'
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '10',
          bg: ocean_blue_350
        }
      }}
    >
      <VStack
        align="start"
        width={leftMenuOpen ? '280px' : '56px'}
        bg={ocean_blue_600}
        minH="100vh"
        transition=".2s ease-in"
        overflowX="hidden"
        spacing={0}
      >
        <VStack align="start">
          <HStack py="20px" w="full" pl="16px" gap="14px" minW="280px" spacing="4px">
            <AppIcon
              name="logo"
              width="24px"
              height="24px"
              _groupHover={{
                fill: 'left-menu-icon-hover-color'
              }}
            />
            <VStack alignItems="start" spacing="0px" m="0px">
              <AppText size="h2Regular">Order Right</AppText>
              <AppText
                size="caption"
                lineHeight="15px"
                mt="0px"
                color={ocean_blue_100}
                textAlign="left"
              >
                By Algonomy
              </AppText>
            </VStack>
          </HStack>

          <HStack py="8px">
            <LeftMenuToggler />
          </HStack>
          {/* <LeftMenuSearch /> */}

          <VStack
            h="calc(100vh - 210px)"
            justifyContent="space-between"
            overflowY="scroll"
            __css={scrollbarYStyles}
            onScroll={handleScroll}
            ref={ref}
          >
            <VStack spacing={0} align="start">
              {leftMenuOpen ? (
                <AppExpandedSideBarNavigation
                  leftMenu={leftMenu}
                  isReachedTop={isReachedTop}
                  isReachedBottom={isReachedBottom}
                  onClickScrollButton={onClickScrollButton}
                />
              ) : (
                <AppCollapsedSideBarNavigation
                  leftMenu={leftMenu}
                  isReachedTop={isReachedTop}
                  isReachedBottom={isReachedBottom}
                  onClickScrollButton={onClickScrollButton}
                />
              )}
            </VStack>
          </VStack>
        </VStack>

        {/* <ColorModeToggler /> */}
        {true && (
          <DataScienceWorkbench
            onClick={navigateToWorkbench}
            cursor="pointer"
            isActive={location.pathname === '/app/workbench'}
          />
        )}
      </VStack>
    </Box>
  );
};

export default Sidebar;
