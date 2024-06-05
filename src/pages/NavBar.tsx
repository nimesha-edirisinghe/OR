import { Flex, HStack, Box } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { useNavigate } from 'react-router-dom';
import { useORAuth } from 'utils/auth';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppButton from 'components/newTheme/AppButton/AppButton';
import LogoSection from 'layouts/Header/LogoSection';
import { blue_500 } from 'theme/colors';

const NavBar = () => {
  const { keycloak } = useORAuth();
  const navigate = useNavigate();

  const onLoginHandler = () => {
    keycloak.login();
    navigate('/app/home');
  };

  return (
    <Flex w="100%" px="6" align="center" justify="space-between">
      <HStack as="nav">
        <Box pl={'20px'} onClick={() => navigate('/')} cursor={'pointer'}>
          <LogoSection />
        </Box>
      </HStack>
      <HStack>
        {!keycloak.authenticated && (
          <>
            <Box mr={'10px'}>
              <AppButton size="sm" variant="secondary" onClick={() => {}}>
                <AppText color={blue_500}>
                  <a
                    href="https://algonomy.com/contact-us/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contact us
                  </a>
                </AppText>
              </AppButton>
            </Box>
            <Box>
              <AppButton size="sm" variant="primary" onClick={onLoginHandler}>
                <AppText>Log In</AppText>
              </AppButton>
            </Box>
          </>
        )}
        {!!keycloak.authenticated && (
          <HStack>
            <Box>
              <AppButton
                size="sm"
                variant="secondary"
                type="button"
                onClick={() => {
                  keycloak.logout();
                  navigate('/');
                }}
                leftIcon={<AppIcon name="logOut" fill={blue_500} w="20px" h="20px" />}
              >
                <AppText variant="btnLabel" color={blue_500}>
                  Logout
                </AppText>
              </AppButton>
            </Box>
          </HStack>
        )}
      </HStack>
    </Flex>
  );
};

export default NavBar;
