import { Box, Flex, HStack } from '@chakra-ui/react';
import OrgHeader from './OrgHeader/OrgHeader';
import UserHeader from './UserHeader/UserHeader';
import { IUser, userSliceSelector } from 'state/user/userState';
import { useSelector } from 'react-redux';
import AppText from 'components/newTheme/AppText/AppText';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { useLocation } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { getPageTitle } from 'state/layout/stateHelpers/stH_Layout';
import { ocean_blue_600 } from 'theme/colors';
import LogoSection from './LogoSection';
import { layoutSliceSelector } from 'state/layout/layoutState';

interface Props {
  isModuleHeader?: boolean;
}

const Header: FC<Props> = ({ isModuleHeader = false }) => {
  const userState: IUser = useSelector(userSliceSelector);
  const menuState = useSelector(layoutSliceSelector);
  const refreshToggle = menuState.refreshToggle;

  const [pageTitle, setPageTitle] = useState('');
  const location = useLocation();

  useEffect(() => {
    const _pageTitle = getPageTitle(menuState.leftMenu, location.pathname);
    setPageTitle(_pageTitle);
  }, [location, refreshToggle]);

  return (
    <Flex
      align="center"
      w="full"
      h="76px"
      bg={ocean_blue_600}
      py="16px"
      pl="24px"
      justifyContent="space-between"
    >
      {isModuleHeader ? (
        <LogoSection />
      ) : (
        <Box cursor="pointer" userSelect="none">
          <AppText variant="h3Semibold">{pageTitle}</AppText>
        </Box>
      )}

      <HStack
        w={isModuleHeader ? '115px' : '338px'}
        h="64px"
        spacing="12px"
        mr="20px"
        justify="end"
      >
        {!isModuleHeader && <OrgHeader />}
        {
          // TODO: will enable these two icons in future
        }
        {/* {!isModuleHeader && (
          <AppIconButton
            aria-label="next"
            icon={<AppIcon name="bell" width="24px" height="24px" fill="header.icon._default" />}
            variant="iconPrimary"
            size="iconLarge"
            onClick={() => {}}
            bg="header.panelBg._default"
          />
        )}
        <AppIconButton
          aria-label="next"
          icon={
            <AppIcon name="questionCircle" width="18px" height="18px" fill="header.icon._default" />
          }
          variant="iconPrimary"
          size="iconLarge"
          onClick={() => {}}
          bg="header.panelBg._default"
        /> */}
        <UserHeader userName={userState.user.name} email={userState.user.username} />
      </HStack>
    </Flex>
  );
};

export default Header;
