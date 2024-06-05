import { Box, Center, Flex, HStack, VStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppText from 'components/AppText/AppText';
import { FC, useCallback, useEffect } from 'react';
import {
  neutral_100,
  ocean_blue_100,
  ocean_blue_350,
  ocean_blue_500,
  ocean_blue_600,
  ocean_blue_700
} from 'theme/colors';
import { useORAuth } from 'utils/auth';

interface Props {}

const AccessDeniedPage: FC<Props> = () => {
  const { keycloak, initialized } = useORAuth();

  useEffect(() => {
    if (keycloak.authenticated) {
      keycloak.logout();
    }
  });

  const pageContent = useCallback(() => {
    return (
      <Flex
        minH="100vh"
        direction={'row'}
        width={{ base: '100%', '2xl': '1980px' }}
        margin="auto"
        bg={ocean_blue_700}
      >
        <Flex width="full" direction="column">
          <Flex
            align="center"
            w="full"
            h="76px"
            bg={ocean_blue_600}
            py="16px"
            pl="24px"
            justifyContent="space-between"
          >
            <HStack py="30px" w="full" pl="20px" gap="14px" minW="280px" float={'right'}>
              <AppIcon
                name="logo"
                width="22px"
                height="22px"
                cursor="pointer"
                _groupHover={{
                  fill: 'left-menu-icon-hover-color'
                }}
              />
              <VStack alignItems="start" spacing="0px" m="0px">
                <AppText size="h2Regular">Order Right</AppText>
                <AppText
                  size="caption"
                  lineHeight="15px"
                  mt="0px"
                  color={ocean_blue_100}
                  textAlign="left"
                >
                  By Algonomy
                </AppText>
              </VStack>
            </HStack>
          </Flex>

          <Box
            maxH="91vh"
            maxW="calc(100vw - 56px)"
            transition=".2s ease-in"
            overflowX="hidden"
            overflowY="auto"
            __css={{
              '&::-webkit-scrollbar': {
                w: '1'
              },
              '&::-webkit-scrollbar-track': {
                w: '1'
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '10',
                bg: ocean_blue_350
              }
            }}
          >
            <VStack w="full" h="full" transition="all 0.1s ease-in" spacing="10px" p="16px">
              <Center
                h="calc(100vh - 70vh)"
                w="calc(100vw - 30vw)"
                verticalAlign="middle"
                bg={ocean_blue_500}
                borderRadius="20px"
              >
                <VStack spacing="8px" w="full" align="center">
                  <AppText size="numeric" mb={10} color={neutral_100}>
                    Access Denied!
                  </AppText>
                  <AppText size="h2Regular" color={neutral_100}>
                    You have been logged out due to insufficient privilege!
                  </AppText>
                  <AppText size="h1Semibold" color={neutral_100}>
                    Please contact the Sysem Adminstrator.
                  </AppText>
                </VStack>
              </Center>
            </VStack>
          </Box>
        </Flex>
      </Flex>
    );
  }, []);

  return <>{pageContent()}</>;
};

export default AccessDeniedPage;
