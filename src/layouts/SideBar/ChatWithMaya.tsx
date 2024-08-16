import { Box, BoxProps, Flex, HStack, Img, VStack } from '@chakra-ui/react';
import { MayaLogo } from 'assets/images/mayaLogo';
import { AppIcon } from 'components/AppIcon/AppIcon';
import CollapsedMenuActiveIndicator from 'components/AppSideBarNavigation/AppCollapsedSideBarNavigation/CollapsedMenuComponents/CollapsedMenuActiveIndicator';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { layoutSliceSelector } from 'state/layout/layoutState';
import { neutral_200, ocean_blue_300, ocean_blue_400, ocean_blue_500 } from 'theme/colors';

interface Props extends BoxProps {
  isActive: boolean;
}

const ChatWithMaya: FC<Props> = ({ isActive, ...rest }) => {
  const sideBar = useSelector(layoutSliceSelector);
  const leftMenuOpen = sideBar.leftMenuOpen;
  const activeMenuItem = sideBar.activeMenuItem;
  const bgColor =
    (leftMenuOpen && activeMenuItem !== null) || isActive === false
      ? 'transparent'
      : ocean_blue_500;

  return (
    <HStack
      w="280px"
      h="56px"
      gap="6px"
      p={`0px 12px 0px ${isActive ? '8px' : '16px'}`}
      {...rest}
      bg={bgColor}
      pos="relative"
      _hover={{
        bg: ocean_blue_500
      }}
    >
      {isActive ? <CollapsedMenuActiveIndicator /> : null}
      {isActive ? (
        <Flex position="relative">
          <Img
            style={{ width: '26px', height: '26px', paddingLeft: '0px', marginRight: '6px' }}
            src={MayaLogo}
          />
          {!leftMenuOpen && (
            <AppIcon
              name="betaTag"
              fill={ocean_blue_400}
              w="8px"
              h="8px"
              position="absolute"
              right="-4px"
              top="-2px"
            />
          )}
        </Flex>
      ) : (
        <Box position="relative">
          {!leftMenuOpen && (
            <AppIcon
              name="betaTag"
              fill={ocean_blue_400}
              w="8px"
              h="8px"
              position="absolute"
              right="-4px"
              top="-2px"
            />
          )}
          <AppIcon name="mayaLogo" w="27px" h="28px" />
        </Box>
      )}
      <HStack w="full" justifyContent="space-between">
        <AppText color={neutral_200} fontSize="13px" fontWeight={600}>
          Maya
        </AppText>
        <AppText
          bg={ocean_blue_400}
          fontSize="12px"
          fontWeight={400}
          color={ocean_blue_300}
          w="44px"
          h="22px"
          borderRadius="16px"
          p="2px 8px 2px 8px"
          noOfLines={1}
        >
          Beta
        </AppText>
      </HStack>
    </HStack>
  );
};

export default ChatWithMaya;
