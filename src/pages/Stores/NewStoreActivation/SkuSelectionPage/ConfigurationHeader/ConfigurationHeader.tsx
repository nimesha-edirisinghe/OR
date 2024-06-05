import { FC, useEffect, useState } from 'react';
import { HStack, VStack } from '@chakra-ui/react';

import AppText from 'components/AppText/AppText';
import AppInputGroup from 'components/newTheme/AppInputGroup/AppInputGroup';
import { useDispatch, useSelector } from 'react-redux';
import {
  newStoreActivationSliceSelector,
  setSkuSearchKey
} from 'state/pages/stores/newActivation/storeNewActivationState';

interface HeaderProps {}

const ConfigurationHeader: FC<HeaderProps> = () => {
  const dispatch = useDispatch();
  const state = useSelector(newStoreActivationSliceSelector).skuSelectionView;
  const [searchKey, setSearchKey] = useState(state.selection.selectedSkus.search || '');

  useEffect(() => {
    setSearchKey(state.selection.selectedSkus.search || '');
  }, [state.selection.selectedSkus.search]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKey(value);
  };

  const handleSearchFieldPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.defaultPrevented) {
      event.preventDefault();
      dispatch(setSkuSearchKey(searchKey));
    }
  };
  return (
    <VStack w="full">
      <HStack h="full" w="full" spacing="20px" justify="flex-start">
        <AppText
          color="#8EB3CA"
          fontSize="13px"
          fontWeight={400}
          lineHeight="24px"
          _groupHover={{ color: '#000' }}
        >
          Please select the SKUs for which you want to add the configuration. By default, all SKUs
          are selected.
        </AppText>
      </HStack>

      <AppInputGroup
        placeholder="Search your SKUs here"
        value={searchKey}
        onChange={handleInputChange}
        fontSize="14px"
        variant="primary"
        inputSize="large"
        width="100%"
        height="46px"
        onKeyDown={handleSearchFieldPress}
      />
    </VStack>
  );
};

export default ConfigurationHeader;
