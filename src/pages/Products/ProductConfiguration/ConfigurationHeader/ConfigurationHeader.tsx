import { FC, useEffect, useState } from 'react';
import { HStack, VStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';

import { ocean_blue_600, white_100 } from 'theme/colors';
import { useNavigate } from 'react-router-dom';
import AppText from 'components/AppText/AppText';
import AppInputGroup from 'components/newTheme/AppInputGroup/AppInputGroup';
import { useDispatch, useSelector } from 'react-redux';

import {
  newProductActivationSliceSelector,
  setLocationSearchKey
} from 'state/pages/product/newActivation/productNewActivationState';

interface HeaderProps {}

const ConfigurationHeader: FC<HeaderProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(newProductActivationSliceSelector).locationSelectionView;
  const [searchKey, setSearchKey] = useState(state.selection.filterItem.search || '');

  useEffect(() => {
    setSearchKey(state.selection.filterItem.search || '');
  }, [state.selection.filterItem.search]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKey(value);
  };

  const handleSearchFieldPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.defaultPrevented) {
      event.preventDefault();
      dispatch(setLocationSearchKey(searchKey));
    }
  };
  return (
    <VStack mt={'70px'} w="full">
      <HStack h="full" w="full" spacing="20px" justify="flex-start">
        <AppText
          color="#8EB3CA"
          fontSize="13px"
          fontWeight={400}
          lineHeight="24px"
          _groupHover={{ color: '#000' }}
        >
          Please select the stores for which you want to add the configuration. By default, all
          stores are selected.
        </AppText>
      </HStack>

      <AppInputGroup
        placeholder="Search your Locations here"
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
