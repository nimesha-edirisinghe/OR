import { Box, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { MenuItem } from 'state/layout/layoutState';
import { ocean_blue_500 } from 'theme/colors';
import AppCollapsedSideBarSubMenuItem from '../AppCollapsedSideBarSubMenuItem';

interface Props {
  mainMenu: Partial<MenuItem>;
  subMenuList: MenuItem['subMenu'];
  activeSubMenuItem: string | null;
  onSubMenuSelect: (subMenu: MenuItem) => void;
}

const CollapsedMenuHoveredPopupContent: FC<Props> = ({
  mainMenu,
  subMenuList,
  activeSubMenuItem,
  onSubMenuSelect
}) => {
  return (
    <Box zIndex={4}>
      <VStack
        spacing={0}
        w="224px"
        align="start"
        justify="start"
        bg={ocean_blue_500}
        borderRadius="8px"
        overflow="hidden"
      >
        <AppCollapsedSideBarSubMenuItem subMenuType="title" subMenuName={mainMenu.displayName!} />

        {Object.entries(subMenuList).map((entry) => {
          const [key, subMenu] = entry;
          if (!(key === 'subMenu' || key === 'isOpen')) {
            return (subMenu as MenuItem).path === activeSubMenuItem ? (
              <AppCollapsedSideBarSubMenuItem
                key={key}
                subMenuType="active"
                subMenuName={(subMenu as MenuItem).displayName}
                onClick={() => {}}
              />
            ) : (
              <AppCollapsedSideBarSubMenuItem
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

export default CollapsedMenuHoveredPopupContent;
