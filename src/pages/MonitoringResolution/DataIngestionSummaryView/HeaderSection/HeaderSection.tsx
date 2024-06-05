import { FC, useState } from 'react';
import { HStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import AppText from 'components/AppText/AppText';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppInputGroup from 'components/newTheme/AppInputGroup/AppInputGroup';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { blue_500, ocean_blue_100, ocean_blue_600 } from 'theme/colors';

import {
  IDataIngestionSummaryView,
  summaryViewSliceSelector,
  setDataIngestionSummaryPaginationAction,
  getDataIngestionSummaryViewDataRequest
} from 'state/pages/monitoringAndResolution/dataIngestionSummaryView/dataIngestionSummaryViewState';

interface HeaderSectionProps {
  searchHandler: (key: string) => void;
}

const HeaderSection: FC<HeaderSectionProps> = ({ searchHandler }) => {
  const [searchKey, setSearchKey] = useState<string>('');

  const dataIngestionSummaryViewState: IDataIngestionSummaryView =
    useSelector(summaryViewSliceSelector);
  const lastUpdateDataTime = dataIngestionSummaryViewState.lastUpdateDataTime;
  const dataIngestionSummaryDataLoading =
    dataIngestionSummaryViewState.loading?.dataIngestionSummaryDataLoading;
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKey(value);
  };

  const handleSearchFieldPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.defaultPrevented) {
      event.preventDefault();
      searchHandler(searchKey);
    }
  };

  const refreshHandler = () => {
    dispatch(setDataIngestionSummaryPaginationAction(1));
    searchHandler('');
    setSearchKey('');
    dispatch(getDataIngestionSummaryViewDataRequest());
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
          isDisabled={dataIngestionSummaryDataLoading}
          fontSize="14px"
          variant="primary"
          inputSize="large"
          width="306px"
          onKeyDown={handleSearchFieldPress}
        />
      </HStack>
      <HStack spacing="8px">
        <HStack w="auto">
          <AppText size="body3" color={ocean_blue_100} transition="all 0.2s ease">
            Last Update:
          </AppText>
          <AppText size="body3" color={ocean_blue_100} transition="all 0.2s ease">
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
          onClick={refreshHandler}
          bg={ocean_blue_600}
        />
      </HStack>
    </HStack>
  );
};

export default HeaderSection;
