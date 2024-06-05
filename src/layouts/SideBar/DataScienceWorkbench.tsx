import { BoxProps, HStack, Img } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import CollapsedMenuActiveIndicator from 'components/AppSideBarNavigation/AppCollapsedSideBarNavigation/CollapsedMenuComponents/CollapsedMenuActiveIndicator';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { neutral_200, ocean_blue_500 } from 'theme/colors';

interface Props extends BoxProps {
  isActive: boolean;
}

const DataScienceWorkbench: FC<Props> = ({ isActive, ...rest }) => (
  <HStack
    w="280px"
    h="56px"
    gap="6px"
    p="0px 16px 0px 17px"
    borderTop="1px solid #284B61"
    {...rest}
    bg={isActive ? ocean_blue_500 : 'transparent'}
    pos="relative"
    _hover={{
      bg: ocean_blue_500
    }}
  >
    {isActive ? <CollapsedMenuActiveIndicator /> : null}
    <AppIcon name="workbench" w="25px" h="25px" />
    <AppText color={neutral_200} fontSize="13px" fontWeight={600}>
      Data Science Workbench
    </AppText>
  </HStack>
);

export default DataScienceWorkbench;
