import { HStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import AppInputGroup from 'components/newTheme/AppInputGroup/AppInputGroup';
import { useDispatch, useSelector } from 'react-redux';
import { layoutSliceSelector, leftMenuToggler, setActiveMenuItem } from 'state/layout/layoutState';
import { yellow_500 } from 'theme/colors';

export default function LeftMenuToggler() {
  const leftMenuOpen = useSelector(layoutSliceSelector).leftMenuOpen;
  const dispatch = useDispatch();

  const onClickExpand = () => {
    dispatch(leftMenuToggler());
    dispatch(setActiveMenuItem({ menuItem: null }));
  };

  return (
    <HStack
      borderLeft="4px solid transparent"
      transition=".6s"
      pl="8px"
      width="244px"
      w="full"
      pr="16px"
    >
      <AppIconButton
        minW="36px"
        h="36px"
        aria-label="side bar toggler"
        variant="iconPrimary"
        size="iconMedium"
        justifyContent="center"
        alignItems="center"
        icon={
          <AppIcon
            name="hDoubleArrow"
            w="20px"
            h="20px"
            transform={leftMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
            transition="transform 1s ease"
            fill={yellow_500}
          />
        }
        onClick={onClickExpand}
      />
      {leftMenuOpen && (
        <AppInputGroup
          placeholder="Search"
          value=""
          onChange={() => {}}
          fontSize="14px"
          variant="primary"
          w="210px"
        />
      )}
    </HStack>
  );
}
