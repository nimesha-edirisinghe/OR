import { useEffect, FC, useState } from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import AppInputGroup from 'components/newTheme/AppInputGroup/AppInputGroup';
import { blue_500, ocean_blue_600 } from 'theme/colors';

import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { GroupLabelTypes } from 'types/requests/groupConfigRequests';
import {
  IProductNewActivationView,
  newProductActivationSliceSelector,
  setProductNewActivationSearchKey
} from 'state/pages/product/newActivation/productNewActivationState';

interface HeaderSectionProps {
  filterLabelTypes?: GroupLabelTypes;
}

const HeaderSection: FC<HeaderSectionProps> = ({ filterLabelTypes }) => {
  const viewState: IProductNewActivationView = useSelector(newProductActivationSliceSelector);
  const [searchKey, setSearchKey] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKey(value);
  };

  const handleSearchFieldPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.defaultPrevented) {
      event.preventDefault();
      dispatch(setProductNewActivationSearchKey(searchKey));
    }
  };

  return (
    <HStack w="full" h="36px" justify="space-between">
      <HStack spacing="16px">
        <AppInputGroup
          placeholder="Search"
          value={searchKey}
          onChange={handleInputChange}
          fontSize="14px"
          variant="primary"
          inputSize="large"
          width="232px"
          height="36px"
          onKeyDown={handleSearchFieldPress}
        />
        <AppIconButton
          aria-label="filter"
          icon={
            <AppIcon
              transition="transform 0.25s ease"
              name="filter"
              width="14px"
              height="14px"
              fill={blue_500}
            />
          }
          variant="secondary"
          size="iconMedium"
          onClick={() => {}}
          bg={ocean_blue_600}
        />
      </HStack>
    </HStack>
  );
};

export default HeaderSection;
