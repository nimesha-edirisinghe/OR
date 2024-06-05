import { HStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  IDFView,
  dfViewSliceSelector,
  getUploadHistoryDataRequest,
  setUploadHistorySearchKey,
  updateShouldReloadData
} from 'state/pages/view/demandForecastView/dfViewPageState';
import { blue_500, neutral_100, neutral_300, ocean_blue_100, ocean_blue_600 } from 'theme/colors';

interface Props {
  enabledAction?: boolean;
}

const BulkEditHeader: FC<Props> = ({ enabledAction = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dfViewState: IDFView = useSelector(dfViewSliceSelector);
  const lastUpdateDataTime = dfViewState.lastUpdatedDateTime;

  const backHandler = () => {
    navigate('/app/demand-forecast/view');
    dispatch(updateShouldReloadData(false));
  };

  const onRefreshHandler = () => {
    dispatch(
      getUploadHistoryDataRequest({
        pageNumber: 1
      })
    );
    dispatch(setUploadHistorySearchKey(''));
  };
  return (
    <HStack
      w="full"
      height="36px"
      borderRadius="10px"
      py="2px"
      userSelect="none"
      justifyContent="space-between"
    >
      <HStack spacing="8px">
        <AppIconButton
          aria-label="next"
          icon={
            <AppIcon
              transition="transform 0.25s ease"
              name="chevronLeft"
              width="7px"
              height="11px"
              fill={neutral_300}
            />
          }
          variant="secondary"
          size="iconMedium"
          onClick={backHandler}
          bg={ocean_blue_600}
        />
        <AppText size="h3Semibold" color={neutral_100}>
          Bulk Edit Forecast
        </AppText>
      </HStack>
      {enabledAction && (
        <HStack spacing="16px">
          <HStack spacing="4px">
            <AppText size="body3" color={ocean_blue_100} lineHeight="18px">
              Last Update:
            </AppText>
            <AppText size="body3" color={ocean_blue_100} lineHeight="18px">
              {lastUpdateDataTime}
            </AppText>
          </HStack>
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
            onClick={onRefreshHandler}
            bg={ocean_blue_600}
          />
        </HStack>
      )}
    </HStack>
  );
};

export default BulkEditHeader;
