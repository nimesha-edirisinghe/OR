import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userSliceSelector, getUserFetch } from 'state/user/userState';
import { Box, Center, HStack, Spinner, VStack } from '@chakra-ui/react';
import BaseModuleTile from './BaseModuleTile';
import AppText from 'components/newTheme/AppText/AppText';
import { ocean_blue_50 } from 'theme/colors';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { useNavigate } from 'react-router-dom';

const Module = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(userSliceSelector);

  useEffect(() => {
    dispatch(getUserFetch());
  }, []);

  const backBtnHandler = () => {
    navigate('/app/home');
  };

  return (
    <>
      <Box pos="absolute" top="92px" left="24px">
        <AppIconButton
          aria-label="back"
          variant="iconPrimary"
          size="iconLarge"
          justifyContent="center"
          alignItems="center"
          icon={<AppIcon name="singleLeftArrow" w="24px" h="24px" fill="#0AA5FF" />}
          onClick={backBtnHandler}
        />
      </Box>
      {Object.keys(user.user).length > 0 ? (
        <Center userSelect="none" height="calc(100vh - 150px)">
          <VStack spacing="28px" bg="#0A1922" p="50px" borderRadius="8px">
            <AppText size="h1Regular" color={ocean_blue_50}>
              Data Science Workbench
            </AppText>
            <HStack spacing="20px">
              <BaseModuleTile
                url="forecast/dashboard"
                text="Demand Forecasting"
                logo="telescope"
                module="DF"
              />
              <BaseModuleTile
                url="demand/home"
                text="Demand Sensing"
                logo="baselineAutoGraph"
                module="DS"
              />
              <BaseModuleTile
                url="inventory/home"
                text="Replenishment Planning"
                logo="moduleGroup"
                module="INV"
              />
            </HStack>
          </VStack>
        </Center>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Module;
