import { FC } from 'react';
import { HStack, VStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';

import { ocean_blue_600, white_100 } from 'theme/colors';
import { useNavigate } from 'react-router-dom';
import AppText from 'components/AppText/AppText';
import { useDispatch, useSelector } from 'react-redux';

import {
  IProductNewActivationView,
  newProductActivationSliceSelector
} from 'state/pages/product/newActivation/productNewActivationState';
import { ActivationSubPages } from 'pages/Products/NewProductActivation/NewProductActivationPage';

interface HeaderProps {
  subPage: ActivationSubPages;
}

const PageHeader: FC<HeaderProps> = ({ subPage = 'Location-Selection' }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state: IProductNewActivationView = useSelector(newProductActivationSliceSelector);
  const selectionState = state.productActivationView.selection;
  const backUrl =
    subPage == 'Detail-Selection'
      ? '/app/products/new-activation/location-selection'
      : '/app/products/new-activation';

  let text =
    state.mode == 'single' && selectionState.activeSelection
      ? 'Add Configuration: ' + selectionState.activeSelection.newSku
      : '';
  if (state.mode == 'multiple' && selectionState.selected) {
    text = 'Add Configuration: ' + Object.keys(selectionState.selected).length + ' Products';
  }

  return (
    <VStack w="full">
      <HStack h="full" w="full" spacing="20px">
        <AppIconButton
          aria-label="refresh"
          icon={
            <AppIcon
              transition="transform 0.25s ease"
              name="singleLeftArrow"
              width="20px"
              height="20px"
              fill={white_100}
            />
          }
          variant="secondary"
          size="iconMedium"
          bg={ocean_blue_600}
          onClick={() => navigate(backUrl)}
        />
        <AppText
          color="#fff"
          fontSize="16px"
          fontWeight={600}
          lineHeight="24px"
          _groupHover={{ color: '#000' }}
        >
          {text}
        </AppText>
      </HStack>
    </VStack>
  );
};

export default PageHeader;
