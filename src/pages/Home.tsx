import NavBar from './NavBar';
import { Box, Img, Spinner, VStack } from '@chakra-ui/react';
import { useORAuth } from 'utils/auth';
import { ocean_blue_100, ocean_blue_600, white } from 'theme/colors';
import HomePageHero from 'assets/svg/homePageHero.svg';
import AlgonomyLogo from 'assets/svg/algonomyLogo.svg';
import AppText from 'components/newTheme/AppText/AppText';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { initialized, keycloak } = useORAuth();
  const navigate = useNavigate();

  useEffect(() => { 
    if (keycloak.authenticated){ 
      navigate("/app/home"); 
    }  
  }, [keycloak.authenticated]);

  return initialized ? (
    <VStack w="full" height="100vh" bg={ocean_blue_600} overflowY="hidden">
      <NavBar />
      <Box pt="10px">
        <AppText size="h1Semibold" w="524px" textAlign="center" color={white}>
          The Only Algorithmic Decisioning Platform for Retail
        </AppText>
      </Box>
      <AppText size="body3" w="524px" textAlign="center" color={white} mt="12px" mb="40px">
        Harness the power of Algorithms to automate and optimize decisioning - across merchandising
        and supply chain.
      </AppText>
      <Box pt="40px">
        <Img src={HomePageHero} />
      </Box>

      <VStack pos="absolute" bottom={'23px'} spacing={0}>
        <Box>
          <AppText size="caption" textAlign="center" color={ocean_blue_100}>
            © 2024 Algonomy | www.algonomy.com
          </AppText>
        </Box>
        <Img src={AlgonomyLogo} w="58px" h="17px" alt="" />
      </VStack>
    </VStack>
  ) : (
    <Spinner />
  );
};

export default Home;
