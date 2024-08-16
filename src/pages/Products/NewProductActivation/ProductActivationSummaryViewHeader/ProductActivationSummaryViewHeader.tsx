import { Box, HStack, VStack, useDisclosure } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppText from 'components/AppText/AppText';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { blue_500, ocean_blue_100, ocean_blue_600, yellow_500, yellow_500_t28 } from 'theme/colors';
import AppButton from 'components/newTheme/AppButton/AppButton';
import {
  ISelectProductView,
  getProductNewActivationRequest,
  newProductActivationSliceSelector,
  resetSelectionData,
  setConfigMode
} from 'state/pages/product/newActivation/productNewActivationState';
import { useNavigate } from 'react-router-dom';
import { showErrorToast } from 'state/toast/toastState';
import { STORE_ACTIVATION_PAGE_SIZE } from 'utils/constants';

interface ProductActivationSummaryViewHeaderProps {}

const ProductActivationSummaryViewHeader: FC<ProductActivationSummaryViewHeaderProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const viewState: ISelectProductView = useSelector(
    newProductActivationSliceSelector
  ).productActivationView;
  const selectionState = viewState.selection;
  const totalSelected = selectionState.selectedCount;
  const lastUpdateDataTime = viewState.data.lastUpdated!;

  const refreshHandler = () => {
    dispatch(resetSelectionData());
    // dispatch(getStoreNewActivationRequest());
    dispatch(
      getProductNewActivationRequest({
        pageNumber: viewState.data.pageNumber,
        pageSize: STORE_ACTIVATION_PAGE_SIZE,
        filter: [],
        searchKey: ''
      })
    );
  };

  const onConfigureClick = () => {
    if (totalSelected == 0) {
      showErrorToast('Please select at least one Product');
      return;
    }

    dispatch(
      setConfigMode({
        mode: totalSelected == 1 ? 'single' : 'multiple',
        id: totalSelected == 1 ? selectionState.activeSelection.anchorProdKey : ''
      })
    );
    navigate('/app/products/new-activation/location-selection');
  };

  return (
    <>
      <HStack h="full" w="full">
        <VStack h="full" width="50%">
          {totalSelected > 0 && (
            <HStack h="full" w="full" justify="flex-start" spacing="20px">
              <Box bg={yellow_500_t28} p="4px 8px" borderRadius="8px">
                <AppText size="body2" color={yellow_500} transition="all 0.2s ease">
                  {totalSelected} Product{totalSelected === 1 ? '' : 's'} selected
                </AppText>
              </Box>
            </HStack>
          )}
        </VStack>
        <VStack h="full" width="50%">
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
            <AppButton variant="secondary" size="medium" onClick={onConfigureClick} px="14px">
              <AppText size="body2" color={blue_500}>
                Configure
              </AppText>
            </AppButton>
          </HStack>
        </VStack>
      </HStack>
    </>
  );
};

export default ProductActivationSummaryViewHeader;
