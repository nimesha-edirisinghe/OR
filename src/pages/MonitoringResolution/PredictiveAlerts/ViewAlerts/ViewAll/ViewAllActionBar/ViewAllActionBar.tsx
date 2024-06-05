import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IAlert,
  alertSliceSelector,
  downloadAlertRequest,
  getAlertsRequest,
  setAlertDefinitionPaginationPageNo,
  setAlertDefinitionSearchKey
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { blue_500, ocean_blue_600 } from 'theme/colors';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import AppInputGroup from 'components/newTheme/AppInputGroup/AppInputGroup';
import { debounce } from 'lodash';
import AppDropdown from 'components/newTheme/AppDropdown/AppDropdown';
import { defaultAlertTypeList } from 'state/pages/monitoringAndResolution/Alert/stateHelpers/stH_alert';
import { AlertNamesT, AlertTypesT } from 'types/alertConfig';
import {
  getFilterCountRequest,
  getLabelsRequest,
  toggleDrawerFilter
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';

interface Props {
  initialAlertName: AlertNamesT | undefined;
}

const ViewAllActionBar: FC<Props> = ({ initialAlertName }) => {
  const [selectedItem, setSelectedItem] = useState<string>(initialAlertName || '');
  const [initialRender, setInitialRender] = useState<boolean>(true);
  const alertState: IAlert = useSelector(alertSliceSelector);
  const searchKey = alertState.alertLocalScope?.skuSearchKey;
  const prevSelectedItemRef = useRef(selectedItem);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!initialRender) {
      if (prevSelectedItemRef.current !== selectedItem) {
        // TODO:
      }
    } else {
      setInitialRender(false);
    }
    prevSelectedItemRef.current = selectedItem;
  }, [initialRender, selectedItem]);

  const sendRequest = useCallback(() => {
    dispatch(getAlertsRequest({ alertOnly: 0}));
  }, []);

  const debouncedSendRequest = useMemo(() => {
    return debounce(sendRequest, 1000);
  }, [sendRequest]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setAlertDefinitionSearchKey(value));
  };

  const handleSearchFieldPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.defaultPrevented) {
      event.preventDefault();
      dispatch(setAlertDefinitionPaginationPageNo(1));
      debouncedSendRequest();
    }
  };

  const onClickDownloadHandler = () => {
    dispatch(
      downloadAlertRequest({
        alertOnly: 0, selectedAlertType: selectedItem
      })
    );
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    dispatch(setAlertDefinitionSearchKey(''));
    dispatch(setAlertDefinitionPaginationPageNo(1));
    const alertType = defaultAlertTypeList.find((obj) => obj.name === item)?.type;
    
    dispatch(getAlertsRequest({ alertOnly: 0, selectedAlertType: alertType as AlertTypesT }));
  };

  const alertTypeOptions = defaultAlertTypeList.map((option) => option.name);

  const onFilterClick = () => {
    dispatch(getLabelsRequest({ labelTypes: ['location', 'product', 'store'] }));
    dispatch(getFilterCountRequest({ whFlag: 0 }));
    dispatch(toggleDrawerFilter({ isOpen: true }));
  };

  return (
    <HStack w="full" borderRadius="10px" userSelect="none" justify="space-between">
      <HStack spacing="18px">
        <AppInputGroup
          placeholder="Search"
          value={searchKey}
          onChange={handleInputChange}
          fontSize="14px"
          variant="primary"
          inputSize="large"
          width="306px"
          onKeyDown={handleSearchFieldPress}
        />
      </HStack>
      <HStack spacing="8px">
        <AppDropdown
          options={alertTypeOptions}
          buttonWidth="150px"
          handleItemClick={handleItemClick}
          selectedItem={selectedItem}
        />
        <AppIconButton
          aria-label="next"
          icon={
            <AppIcon
              transition="transform 0.25s ease"
              name="filter"
              width="13px"
              height="15px"
              fill={blue_500}
            />
          }
          variant="secondary"
          size="iconMedium"
          onClick={onFilterClick}
          bg={ocean_blue_600}
        />
        <AppIconButton
          aria-label="next"
          icon={
            <AppIcon
              transition="transform 0.25s ease"
              name="download"
              width="12px"
              height="15px"
              fill={blue_500}
            />
          }
          variant="secondary"
          size="iconMedium"
          onClick={onClickDownloadHandler}
          bg={ocean_blue_600}
        />
      </HStack>
    </HStack>
  );
};

export default ViewAllActionBar;
