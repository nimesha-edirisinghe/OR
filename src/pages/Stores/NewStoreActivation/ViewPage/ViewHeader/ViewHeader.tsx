import { Center, HStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppText from 'components/AppText/AppText';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { showErrorToast } from 'state/toast/toastState';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  blue_500,
  ocean_blue_100,
  ocean_blue_600,
  state_warning,
  yellow_500_t28
} from 'theme/colors';
import {
  ISelectStoreView,
  getStoreNewActivationRequest,
  newStoreActivationSliceSelector,
  resetSelectionData,
  resetSkuSelectionData,
  setConfigMode
} from 'state/pages/stores/newActivation/storeNewActivationState';
import AppButton from 'components/newTheme/AppButton/AppButton';
import { useNavigate } from 'react-router-dom';
import { STORE_ACTIVATION_PAGE_SIZE } from 'utils/constants';
import useAccessType from 'hooks/useMenuAccessType';
import { hasAccessPermission } from 'utils/permissions';
import { AccessPermissionEnum, MenuItems } from 'utils/enum';

interface HeaderProps {}

const ViewHeader: FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const viewState: ISelectStoreView = useSelector(
    newStoreActivationSliceSelector
  ).storeActivationView;
  const selectionState = viewState.selection;
  const totalSelected = selectionState.selectedCount || 0;
  const lastUpdateDataTime = viewState.data.lastUpdated!;

  const accessType = useAccessType(MenuItems.NEW_STORE_ACTIVATION);
  const accessNotAllowed = !hasAccessPermission(accessType, [AccessPermissionEnum.EDIT]);

  const refreshHandler = () => {
    dispatch(resetSelectionData());
    dispatch(
      getStoreNewActivationRequest({
        pageNumber: viewState.data.pageNumber,
        pageSize: STORE_ACTIVATION_PAGE_SIZE,
        filter: [],
        searchKey: viewState.selection.searchKey || ''
      })
    );
  };

  const onConfigureClick = () => {
    if (totalSelected == 0) {
      showErrorToast('Please select at least one Store');
      return;
    }

    dispatch(resetSkuSelectionData());
    dispatch(
      setConfigMode({
        mode: totalSelected == 1 ? 'single' : 'multiple',
        id: totalSelected == 1 ? selectionState.activeSelection.anchorProdKey : ''
      })
    );
    navigate('/app/stores/new-activation/sku-selection');
  };

  return (
    <>
      <HStack h="full" w="full" justify="space-between">
        {totalSelected > 0 && (
          <>
            <HStack h="full" w="full" justify="flex-start" spacing="16px">
              <Center h="36px" bg={yellow_500_t28} borderRadius="8px">
                <AppText fontSize="13px" color={state_warning} px="8px" py="4px" fontWeight={400}>
                  {totalSelected} Store{totalSelected === 1 ? '' : 's'} selected
                </AppText>
              </Center>
            </HStack>
          </>
        )}
        <HStack h="full" w="full" justify="flex-end" spacing="20px">
          <HStack w="auto">
            <AppText size="body3" color={ocean_blue_100} transition="all 0.2s ease">
              Last Update:
            </AppText>
            <AppText size="body3" color={ocean_blue_100} transition="all 0.2s ease">
              {lastUpdateDataTime}
            </AppText>
          </HStack>
          <AppIconButton
            aria-label="refresh"
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
          <AppIconButton
            aria-label="refresh"
            icon={
              <AppIcon
                transition="transform 0.25s ease"
                name="history"
                width="20px"
                height="20px"
                fill={blue_500}
              />
            }
            variant="secondary"
            size="iconMedium"
            bg={ocean_blue_600}
          />
          <AppButton
            variant="secondary"
            size="medium"
            onClick={onConfigureClick}
            px="14px"
            isDisabled={accessNotAllowed}
          >
            <AppText size="body2" color={blue_500}>
              Configure
            </AppText>
          </AppButton>
        </HStack>
      </HStack>
    </>
  );
};

export default ViewHeader;
