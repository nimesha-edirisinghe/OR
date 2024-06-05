import { FC, useEffect } from 'react';
import { Box, BoxProps, HStack, VStack } from '@chakra-ui/react';
// import AppInput from 'components/AppInput/AppInput';
import FilterTypeItemList from '../AnchorLocationFilter/FilterDrawer/FilterTypeItemList';
import { useDispatch, useSelector } from 'react-redux';
import {
  IGroupConfigurationSlice,
  getLabelsRequest,
  groupConfigurationSliceSelector
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import FilterItemsSelectionDrawer from '../AnchorLocationFilter/FilterItemsSelectionDrawer/FilterItemsSelectionDrawer';
import {
  alertSliceSelector,
  updateAlertName
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import AppText from 'components/newTheme/AppText/AppText';
import AppInput from 'components/newTheme/AppInput/AppInput';
import { motion } from 'framer-motion';
import { neutral_200 } from 'theme/colors';

interface FilterSkuLocationsProps extends BoxProps {}

const FilterSkuLocations: FC<FilterSkuLocationsProps> = ({ ...rest }) => {
  const dispatch = useDispatch();
  const alertState = useSelector(alertSliceSelector);
  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );

  useEffect(() => {
    dispatch(getLabelsRequest({ labelTypes: ['location', 'product', 'anchor', 'store'] }));
  }, []);

  const onAlertTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateAlertName(event.target.value));
  };

  return (
    <Box
      {...rest}
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition="1s"
    >
      <FilterItemsSelectionDrawer
        isOpen={!!groupConfigurationState.groupFilter?.filterLocalScope.isOpenItemSelectionDrawer}
      />
      <Box overflow="auto" w="634px" height="full" borderRadius="10px" userSelect="none">
        <AppText size="body3" textAlign="center" color={neutral_200}>
          Select the SKU-locations for which you want to configure alerts. You can find the required
          SKU-locations easily by applying filters based on product and location hierarchies.
        </AppText>
        <VStack align="start" w="full" pt="20px">
          <VStack w="full" align="start" spacing="8px">
            <HStack spacing="1px">
              <AppText size="body2" color={neutral_200}>
                Alert Name
              </AppText>
              <AppText size="body2" color="#F8705E">
                *
              </AppText>
            </HStack>
            <AppInput
              placeholder="Enter Alert Name"
              value={alertState.alertName}
              onChange={onAlertTitleChange}
              variant="primary"
              size="small"
              fontSize="14px"
              w="full"
              error={alertState.errors.alertName}
              maxLength={40}
            />
          </VStack>

          {/* <VStack w="full" align="start" pt="20px">
            <HStack spacing="1px">
              <AppText size="body2" color={neutral_200}>
                Alert Tags
              </AppText>
            </HStack>
            <AppInput
              placeholder="Enter Alert Tags"
              value=""
              onChange={() => {}}
              variant="primary"
              size="small"
              fontSize="14px"
              w="full"
            />
          </VStack> */}

          <Box pt="20px" w="full">
            <FilterTypeItemList maxH="full" loadTo="page" isGroupDisabled={true} />
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default FilterSkuLocations;
