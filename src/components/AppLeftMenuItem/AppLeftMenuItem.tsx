import { Box, BoxProps, HStack } from '@chakra-ui/react';
import { AppIconChakra, iconName } from 'assets/svg/chakraIcons';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { leftMenuToggler } from 'state/layout/layoutState';

interface Props extends BoxProps {
  iconName?: iconName;
  menuRef: string[];
  menuName: string | undefined;
  leftPadding?: string;
  path?: string;
  hasSubMenu?: boolean | undefined;
  expanded?: boolean | undefined;
  toggleCollapsibleMenu?: (menuRef: string[]) => void | undefined;
}

export const AppLeftMenuItem: FC<Props> = ({
  iconName = null,
  leftPadding = '0px',
  hasSubMenu = false,
  expanded = false,
  menuRef,
  menuName,
  path = '',
  toggleCollapsibleMenu
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <HStack pl={leftPadding} justifyContent="space-between" width="272px" height="25px">
      <HStack>
        {iconName && (
          <Box>
            <AppIconChakra
              mr="15px"
              name={iconName}
              fill="left-menu-icon-color"
              _hover={{ fill: 'left-menu-icon-hover-color' }}
              width="20px"
              height="20px"
              cursor="pointer"
            />
          </Box>
        )}

        <AppText
          size="lsm"
          whiteSpace="nowrap"
          fontSize="14px"
          fontWeight={hasSubMenu ? 500 : 400}
          _hover={{ color: 'left-menu-icon-hover-color' }}
          userSelect="none"
          color="left-menu-item-font-color"
          onClick={path !== '' ? () => navigate(path) : () => {}}
          cursor={path !== '' ? 'pointer' : 'default'}
        >
          {menuName}
        </AppText>
      </HStack>

      {hasSubMenu && (
        <AppIconChakra
          name={'arrowUpDown'}
          fill="left-menu-icon-color"
          _hover={{ fill: 'left-menu-icon-hover-color' }}
          width="20px"
          height="20px"
          cursor="pointer"
          transform={expanded ? 'rotate(0deg)' : 'rotate(540deg)'}
          transition="transform 1s ease"
          onClick={() => toggleCollapsibleMenu && toggleCollapsibleMenu(menuRef)}
        />
      )}
    </HStack>
  );
};
