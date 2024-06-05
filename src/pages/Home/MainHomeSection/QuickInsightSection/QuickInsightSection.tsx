import { Box, HStack, Img, VStack } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { neutral_200, ocean_blue_50, ocean_blue_500, ocean_blue_600 } from 'theme/colors';
import QuickInsightLeftImage from 'assets/svg/quickInsightLeftImage.svg';
import QuickInsightRightImage from 'assets/svg/quickInsightRightImage.svg';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActiveSubMenuItem } from 'state/layout/layoutState';

interface Props {}

const QuickInsightSection: FC<Props> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const forecastSummaryHandler = () => {
    dispatch(setActiveSubMenuItem({ subMenuItem: '/app/insights/forecast-summary' }));
    navigate('/app/insights/forecast-summary');
  };

  const replenishmentSummaryHandler = () => {
    dispatch(setActiveSubMenuItem({ subMenuItem: '/app/insights/replenishment-summary' }));
    navigate('/app/insights/replenishment-summary');
  };

  return (
    <VStack
      minH="285px"
      w="full"
      bg={ocean_blue_600}
      borderRadius="8px"
      p="20px"
      align="start"
      spacing="12px"
    >
      <AppText>Quick Insights</AppText>
      <HStack h="177px" w="full" spacing="12px">
        <VStack flex={1} h="full" bg={ocean_blue_500} borderRadius="8px" p="20px" spacing="12px">
          <AppText size="body2" color={neutral_200}>
            Is availability impacting how much you sell ? Examine ways to make the same better!
          </AppText>
          <Box
            w="full"
            maxH="88px"
            position="relative"
            cursor={'pointer'}
            onClick={forecastSummaryHandler}
          >
            <Img
              src={QuickInsightLeftImage}
              w="full"
              h="full"
              objectFit="cover"
              alt="Quick Insight Image"
              top="0"
              left="0"
              borderRadius="8px"
            />
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              zIndex="1"
            >
              <AppIcon
                transition="transform 0.25s ease"
                name="redirect"
                color={neutral_200}
                h="24px"
                w="24px"
              />
            </Box>
          </Box>
        </VStack>
        <VStack flex={1} h="full" bg={ocean_blue_500} borderRadius="8px" p="20px" spacing="12px">
          <AppText size="body2" color={neutral_200}>
            Concerned about loss of sales? Well, we have suggestions on how to prevent it!
          </AppText>
          <Box
            w="full"
            maxH="88px"
            position="relative"
            cursor={'pointer'}
            onClick={replenishmentSummaryHandler}
          >
            <Img
              src={QuickInsightRightImage}
              w="full"
              h="full"
              objectFit="cover"
              alt="Quick Insight Image"
              top="0"
              left="0"
              borderRadius="8px"
            />
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              zIndex="1"
            >
              <AppIcon
                transition="transform 0.25s ease"
                name="redirect"
                color={neutral_200}
                h="24px"
                w="24px"
              />
            </Box>
          </Box>
        </VStack>
      </HStack>
      <AppText color={ocean_blue_50} size="body2">
        Explore other interesting dashboards from our menu
      </AppText>
    </VStack>
  );
};

export default QuickInsightSection;
