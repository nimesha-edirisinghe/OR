import { Img, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { ocean_blue_100, ocean_blue_500 } from 'theme/colors';
import AppText from '../AppText/AppText';
import NoDataImage from 'assets/svg/noDataImage.svg';

interface Props {}

const AppNoDataAvailablePanel: FC<Props> = () => {
  return (
    <VStack h="full" w="full" borderRadius="8px" bg={ocean_blue_500} justify="center">
      <Img src={NoDataImage} w="234.6px" h="137.49px" alt="empty image" />
      <AppText size="italic" color={ocean_blue_100}>
        No Data Available
      </AppText>
    </VStack>
  );
};

export default AppNoDataAvailablePanel;
