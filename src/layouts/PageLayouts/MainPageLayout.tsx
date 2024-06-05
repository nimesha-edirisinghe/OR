import { Box, Flex, HStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import LastLoginSection from 'pages/AdvancedConfiguration/ForecastConfiguration/LastLoginSection/LastLoginSection';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { layoutSliceSelector } from 'state/layout/layoutState';
import { blue_500, ocean_blue_600 } from 'theme/colors';

type Props = {
  title: string;
  subTitle: string;
  paginateHandler: (pageNo: number) => void;
  isLoading: boolean;
  refreshHandler: () => void;
  pageContent?: ReactNode;
  headerContent?: ReactNode;
  totalRecordsCount?: number;
};

export default function MainPageLayout({
  title,
  subTitle,
  paginateHandler,
  isLoading,
  refreshHandler,
  pageContent,
  headerContent,
  totalRecordsCount
}: Props) {
  const isLeftMenuOpen = useSelector(layoutSliceSelector).leftMenuOpen;
  return (
    <Box transition=".2s ease-in" w="full" pt="24px" px="24px" userSelect="none">
      <Flex direction="column" gap="16px">
        <HStack justifyContent="space-between" align={'center'} h="36px">
          {headerContent}
          <HStack spacing="15px">
            <LastLoginSection />
            <AppIconButton
              aria-label="next"
              icon={
                <AppIcon
                  transition="transform 0.25s ease"
                  name="refresh"
                  width="14px"
                  height="14px"
                  fill={blue_500}
                />
              }
              variant="secondary"
              size="iconMedium"
              onClick={refreshHandler}
              bg={ocean_blue_600}
            />
          </HStack>
        </HStack>

        {pageContent}
      </Flex>
    </Box>
  );
}
