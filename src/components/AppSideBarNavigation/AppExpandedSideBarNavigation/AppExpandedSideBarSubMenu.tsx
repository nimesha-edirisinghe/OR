import { Box, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { MenuItem } from 'state/layout/layoutState';
import { ocean_blue_500 } from 'theme/colors';
import AppExpandedSideBarSubMenuItem from './AppExpandedSideBarSubMenuItem';

interface Props {
  mainMenu: Partial<MenuItem>;
  subMenuList: MenuItem['subMenu'];
  activeSubMenuItem: string | null;
  onSubMenuSelect: (subMenu: MenuItem | null) => void;
  backToMainMenu: () => void;
}

const AppExpandedSideBarSubMenu: FC<Props> = ({
  mainMenu,
  subMenuList,
  activeSubMenuItem,
  onSubMenuSelect,
  backToMainMenu
}) => {
  return (
    <Box
      zIndex={4}
      bg={ocean_blue_500}
      h="calc(100vh - 156px)"
      borderTopRadius="8px"
      userSelect="none"
      pos="absolute"
      top="156px"
      left="56px"
    >
      <VStack spacing={0} w="224px" align="start" justify="start">
        <AppExpandedSideBarSubMenuItem
          subMenuType="title"
          subMenuName={mainMenu.displayName!}
          backToMainMenu={() => backToMainMenu()}
        />

        {subMenuList &&
          Object.entries(subMenuList).map((entry) => {
            const [key, subMenu] = entry;
            if (!(key === 'subMenu' || key === 'isOpen')) {
              return (subMenu as MenuItem).path === activeSubMenuItem ? (
                <AppExpandedSideBarSubMenuItem
                  key={key}
                  subMenuType="active"
                  subMenuName={(subMenu as MenuItem).displayName}
                  onClick={() => {}}
                />
              ) : (
                <AppExpandedSideBarSubMenuItem
                  key={key}
                  subMenuType="default"
                  subMenuName={(subMenu as MenuItem).displayName}
                  onClick={() => onSubMenuSelect(subMenu as MenuItem)}
                />
              );
            }
          })}
      </VStack>
    </Box>
  );
};

export default AppExpandedSideBarSubMenu;
