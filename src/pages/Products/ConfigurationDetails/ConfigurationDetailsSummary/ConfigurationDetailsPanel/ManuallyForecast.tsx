import { Box, HStack, VStack } from '@chakra-ui/react';
import AppInput from 'components/AppInput/AppInput';
import AppText from 'components/AppText/AppText';
import React, { FC } from 'react';
import {  ocean_blue_500 } from 'theme/colors';
import { productConfigInstructions as instructions } from '../Common/constant';
import AppButton from 'components/AppButton/AppButton';

interface IProps {}

const ManuallyForecast: FC<IProps> = () => {
  return (
    <VStack h="auto" w="full" align="start" bg={ocean_blue_500} p="16px" borderRadius="8px">
      <AppText size="h3Semibold">Instructions</AppText>
      <Box>
        {Object.keys(instructions).map((x: string) => (
          <HStack key={'inst_' + x} align="start">
            <Box minW="11px" textAlign="right">
              <AppText size="body2" color="#8EADC1">
                {x}.
              </AppText>
            </Box>
            <AppText size="body2" color="#8EADC1">
              {instructions[x]}
            </AppText>
          </HStack>
        ))}
      </Box>
      <HStack align="left" spacing="10px">
        <AppButton variant="secondary" size="medium" onClick={() => ''}>
          Download Template
        </AppButton>
        <AppButton variant="secondary" size="medium" onClick={() => ''}>
          Upload
        </AppButton>
      </HStack>
    </VStack>
  );
};

export default ManuallyForecast;
