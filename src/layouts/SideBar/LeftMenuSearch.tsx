import { Box, HStack, InputGroup, InputRightElement } from '@chakra-ui/react';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import AppInput from 'components/AppInput/AppInput';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  layoutSliceSelector,
  leftMenuCollapseExpandAllToggler,
  leftMenuToggler,
  updateLeftMenu
} from 'state/layout/layoutState';
import { onSearch } from 'utils/layouts';

export default function LeftMenuSearch() {
  const ref = useRef<any>(null);
  const layoutState = useSelector(layoutSliceSelector);
  const initialMenuState = layoutState.leftMenu;
  const leftMenuOpen = layoutState.leftMenuOpen;
  const leftMenuExpandAll = layoutState.leftMenuExpandAll;
  const dispatch = useDispatch();

  const onTextChange = (val: string) => {
    const filteredLeftMenu = onSearch(val, initialMenuState);
    dispatch(updateLeftMenu(filteredLeftMenu));
  };

  function handleClick() {
    ref.current && ref.current.focus();
  }

  return (
    <HStack borderLeft="4px solid transparent" transition=".6s" width="full" pt="15px">
      <AppIconChakra
        name="search"
        fill="left-menu-icon-color"
        _hover={{ fill: 'left-menu-icon-hover-color' }}
        width="20px"
        height="20px"
        cursor="pointer"
        opacity={leftMenuOpen ? 0 : 1}
        transform={leftMenuOpen ? 'translate(-50px)' : 'translate(0)'}
        transition="transform 1s ease"
        onClick={() => dispatch(leftMenuToggler())}
      />
      <HStack
        opacity={leftMenuOpen ? 1 : 0}
        transition="transform 500ms ease"
        justify="space-between"
        width="100%"
      >
        <InputGroup
          transform={leftMenuOpen ? 'translate(-35px)' : 'translate(0)'}
          transition="transform 1s ease"
          opacity={leftMenuOpen ? 1 : 0}
          width="210px"
        >
          <AppInput
            zIndex={20}
            height="38px"
            onChange={(e: any) => onTextChange(e.target.value)}
            width="210px"
            ref={ref}
          />
          <InputRightElement
            pointerEvents="none"
            children={
              <AppIconChakra
                name="search"
                fill="left-menu-icon-color"
                width="24px"
                height="24px"
                transition="transform 1s ease"
                opacity={leftMenuOpen ? 1 : 0}
                onClick={() => handleClick()}
              />
            }
          />
        </InputGroup>
        <Box paddingRight={'16px'}>
          <AppIconChakra
            name="collapseExpandAll"
            fill="left-menu-icon-color"
            _hover={{ fill: 'left-menu-icon-hover-color' }}
            width="15px"
            height="15px"
            cursor="pointer"
            opacity={leftMenuOpen ? 1 : 0}
            transform={leftMenuExpandAll ? 'rotate(180deg)' : 'rotate(0deg)'}
            transition="transform 1s ease"
            onClick={() => dispatch(leftMenuCollapseExpandAllToggler())}
          />
        </Box>
      </HStack>
    </HStack>
  );
}
