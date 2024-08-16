import { FC, useCallback, useMemo, useState } from 'react';
import { Box, HStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import AppButton from 'components/AppButton/AppButton';
import { useNavigate } from 'react-router-dom';
import {
  IAlert,
  alertSliceSelector,
  clearAlertName,
  getAlertConfigsRequest
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import { useDispatch, useSelector } from 'react-redux';
import { timeStampToDateString } from 'utils/utility';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { blue_500, ocean_blue_100, ocean_blue_600 } from 'theme/colors';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import AppInputGroup from 'components/newTheme/AppInputGroup/AppInputGroup';
import { debounce } from 'lodash';
import AppTooltip from 'components/AppTooltip/AppTooltip';
import { hasAccessPermission } from 'utils/permissions';
import useAccessType from 'hooks/useMenuAccessType';
import { AccessPermissionEnum, MenuItems } from 'utils/enum';
import useTooltip from 'hooks/useTooltip';

interface Props {}

const ViewAlertHeader: FC<Props> = () => {
  const [searchKey, setSearchKey] = useState<string>('');
  const alertState: IAlert = useSelector(alertSliceSelector);
  const lastUpdatedDate = alertState.alertSummaryList.lastUpdatedOn;
  const [isFilterTooltipOpen, handleFilterMouseEnter, handleFilterMouseLeave] = useTooltip();

  const accessType = useAccessType(MenuItems.PREDICTIVE_ALERTS);
  const isDisabled = !hasAccessPermission(accessType, [AccessPermissionEnum.EDIT]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendRequest = useCallback((searchKey: string) => {
    dispatch(
      getAlertConfigsRequest({
        searchKey
      })
    );
  }, []);

  const debouncedSendRequest = useMemo(() => {
    return debounce(sendRequest, 1000);
  }, [sendRequest]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKey(value);
    debouncedSendRequest(value);
  };

  const refreshHandler = () => {
    dispatch(getAlertConfigsRequest({}));
  };

  const createNewAlertHandler = () => {
    dispatch(clearAlertName());
    navigate('/app/predictive-alerts/create');
  };

  return (
    <HStack
      justify="space-between"
      w="full"
      height="full"
      borderRadius="10px"
      py="2px"
      userSelect="none"
    >
      <HStack spacing="14px">
        <AppInputGroup
          placeholder="Search"
          value={searchKey}
          onChange={handleInputChange}
          fontSize="14px"
          variant="primary"
          inputSize="large"
          width="306px"
        />
        <HStack w="auto">
          <AppText
            fontSize="12px"
            fontWeight={400}
            color={ocean_blue_100}
            transition="all 0.2s ease"
          >
            Last Update:
          </AppText>
          <AppText
            fontSize="12px"
            fontWeight={400}
            color={ocean_blue_100}
            transition="all 0.2s ease"
          >
            {timeStampToDateString(lastUpdatedDate, 'yyyy-MM-dd hh:mm a')}
          </AppText>
        </HStack>
      </HStack>
      <HStack spacing="8px">
        <AppTooltip
          label={'Refresh'}
          noOfLines={1}
          placement="bottom-start"
          isOpen={isFilterTooltipOpen}
          onClose={handleFilterMouseLeave}
        >
          <Box onMouseEnter={handleFilterMouseEnter} onMouseLeave={handleFilterMouseLeave}>
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
          </Box>
        </AppTooltip>
        <AppButton
          variant="primary"
          size="medium"
          onClick={createNewAlertHandler}
          px="25px"
          isDisabled={isDisabled}
        >
          Create new alert
        </AppButton>
      </HStack>
    </HStack>
  );
};

export default ViewAlertHeader;
