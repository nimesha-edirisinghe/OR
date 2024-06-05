import { FC } from 'react';
import { Box, Center, VStack } from '@chakra-ui/layout';
import AppText from 'components/AppText/AppText';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import { userSliceSelector } from 'state/user/userState';

const FactoryButton: FC = () => {
  const navigate = useNavigate();
  const user = useSelector(userSliceSelector).user;

  const factoryEnabled = useCallback(() => {
    return (
      <Box
        as={motion.div}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1.02 }}
        w={'194px'}
        h={'317px'}
        backgroundColor={'rgba(0, 0, 0, 0.8)'}
        borderRadius={'9px'}
        display={'flex'}
        justifyContent={'center'}
        position={'relative'}
        overflow="hidden"
        role="group"
        onClick={() => navigate('/app/demand-forecast')}
        cursor="pointer"
      >
        <Box
          position={'absolute'}
          w={'2px'}
          h={'2px'}
          borderRadius={' 70%'}
          top={'152px'}
          left={'94px'}
          bgGradient={
            'linear-gradient(360deg, rgba(247, 204, 69, 0.8) 0%, rgba(203, 154, 0, 0.8) 100%)'
          }
          zIndex={0}
          as={motion.div}
          _groupHover={{
            transform: 'scale(200)',
            transition: '0.4s ease-out',
            opacity: '0.6'
          }}
        ></Box>
        <Center w={'194px'} h={'317px'} zIndex={2}>
          <AppIconChakra name="factory" fill="#F7CC45" w="100px" h="100px" />
        </Center>
      </Box>
    );
  }, [user]);

  const factoryDisabled = useCallback(() => {
    return (
      <VStack
        w={'194px'}
        h={'317px'}
        backgroundColor={'rgba(0, 0, 0, 0.8)'}
        borderRadius={'9px'}
        justifyContent={'center'}
        overflow="hidden"
        role="group"
        cursor="not-allowed"
        align="center"
        p={5}
      >
        <AppIconChakra name="factory" fill="#555" w="100px" h="100px" />
      </VStack>
    );
  }, [user]);

  return (
    <VStack spacing={4}>
      <AppText>Factory</AppText>
      {user['base_modules']?.Factory ? factoryEnabled() : factoryDisabled()}
    </VStack>
  );
};

export default FactoryButton;
