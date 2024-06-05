import { FC } from 'react';
import { Box, Center, HStack, VStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import AppBreadcrumb from 'components/AppBreadcrumb/AppBreadcrumb';
import AppButton from 'components/AppButton/AppButton';
import { useNavigate } from 'react-router-dom';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import { IAlert, alertSliceSelector } from 'state/pages/monitoringAndResolution/Alert/alertState';
import { useSelector } from 'react-redux';
import { timeStampToDateString } from 'utils/utility';

interface PredictiveAlertsHeaderProps {
  pageTitle: string;
  backBtn?: boolean;
  hideRightBtn?: boolean;
}

const PredictiveAlertsHeader: FC<PredictiveAlertsHeaderProps> = ({
  pageTitle,
  backBtn = false,
  hideRightBtn = false
}) => {
  const alertState: IAlert = useSelector(alertSliceSelector);
  const lastUpdatedDate = alertState.alertSummaryList.lastUpdatedOn;
  const breadcrumbItems = [{ label: 'Monitoring & Resolution', path: '/app/predictive-alerts' }];

  const navigate = useNavigate();
  return (
    <Box overflow="auto" w="full" height="full" borderRadius="10px" py="2px" userSelect="none">
      <HStack justify="space-between">
        <HStack spacing="16px">
          {backBtn && (
            <Center
              w="36px"
              h="32px"
              bg="#262626"
              onClick={() => navigate('/app/predictive-alerts')}
              borderRadius="8px"
              cursor="pointer"
            >
              <AppIconChakra
                name={'chevronLeft'}
                fill="#D2D2D2"
                _groupHover={{
                  fill: 'left-menu-icon-hover-color'
                }}
                width="10px"
                height="10px"
              />
            </Center>
          )}
          <VStack justify="start" align="left" spacing="0">
            <Box>
              <AppBreadcrumb items={breadcrumbItems} />
            </Box>
            <Box>
              <AppText fontSize="20px" fontWeight={600} lineHeight="28px">
                {pageTitle}
              </AppText>
            </Box>
          </VStack>
        </HStack>
        {!hideRightBtn && (
          <HStack h="40px" spacing="2px" alignItems={'end'} pb="5px">
            <HStack w="auto" mr="20px" pb="4px">
              <AppText fontSize="12px" fontWeight={400} color="#E6E6E6" transition="all 0.2s ease">
                Last Update:
              </AppText>
              <AppText
                fontSize="12px"
                fontWeight={400}
                color="left-menu-icon-color"
                transition="all 0.2s ease"
              >
                {timeStampToDateString(lastUpdatedDate, 'yyyy-MM-dd hh:mm a')}
              </AppText>
            </HStack>
            <AppButton
              variant="primary"
              size="medium"
              onClick={() => navigate('/app/predictive-alerts/create')}
              px="25px"
            >
              Create new alert
            </AppButton>
          </HStack>
        )}
      </HStack>
    </Box>
  );
};

export default PredictiveAlertsHeader;
