import { BoxProps, HStack, Img } from '@chakra-ui/react';
import { MayaLogo } from 'assets/images/mayaLogo';
import { AppIcon } from 'components/AppIcon/AppIcon';
import CollapsedMenuActiveIndicator from 'components/AppSideBarNavigation/AppCollapsedSideBarNavigation/CollapsedMenuComponents/CollapsedMenuActiveIndicator';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { neutral_200, ocean_blue_500 } from 'theme/colors';

interface Props extends BoxProps {
  isActive: boolean;
}

const ChatWithMaya: FC<Props> = ({ isActive, ...rest }) => (
  <HStack
    w="280px"
    h="56px"
    gap="6px"
    p="0px 12px 0px 16px"
    {...rest}
    bg={isActive ? ocean_blue_500 : 'transparent'}
    pos="relative"
    _hover={{
      bg: ocean_blue_500
    }}
  >
    {isActive ? <CollapsedMenuActiveIndicator /> : null}
    {isActive ? (
      <Img style={{ width: '26px', height: '26px', marginLeft: '0px' }} src={MayaLogo} />
    ) : (
      <AppIcon name="mayaLogo" w="27px" h="28px" />
    )}
    <AppText color={neutral_200} fontSize="13px" fontWeight={600}>
      Maya
    </AppText>
  </HStack>
);

export default ChatWithMaya;
