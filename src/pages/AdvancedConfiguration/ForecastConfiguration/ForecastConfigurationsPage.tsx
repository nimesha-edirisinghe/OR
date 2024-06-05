import MainPageLayout from 'layouts/PageLayouts/MainPageLayout';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fcConfigPageSliceSelector,
  getTableDataRequest,
  setFcConfigCurrentPage
} from 'state/pages/advancedConfiguration/forecastConfigurationPage/pageState';
import { IUser, userSliceSelector } from 'state/user/userState';
import InfluencingFactorDrawer from './InfluencingFactorDrawer/InfluencingFactorDrawer';
import RunNowDrawer from './RunNowDrawer/RunNowDrawer';
import JobScheduleDrawer from './JobScheduleDrawer/JobScheduleDrawer';
import { getCommonLastUpdateDateRequest } from 'state/pages/common/commonState';
import AppInputGroup from 'components/newTheme/AppInputGroup/AppInputGroup';
import ForecastConfigMainSection from './ForecastConfigMainSection/ForecastConfigMainSection';
import TrainingConfigurationDrawer from './TrainingConfigurationDrawer/TrainingConfigurationDrawer';

interface Props {}

const ForecastConfigurationsPage: FC<Props> = () => {
  const page = useSelector(fcConfigPageSliceSelector);
  const userState: IUser = useSelector(userSliceSelector);
  const dispatch = useDispatch();
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const [searchKey, setSearchKey] = useState<string>('');

  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (selectedOrgKey !== undefined) {
        dispatch(getTableDataRequest({ groupName: '', pageNo: 1 }));
        dispatch(setFcConfigCurrentPage(1));
        dispatch(getCommonLastUpdateDateRequest());
      }
      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('user fetching error ', error);
    }
  }, [selectedOrgKey]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKey(value);
  };

  const refreshHandler = () => {
    dispatch(getTableDataRequest({ groupName: '' }));
    dispatch(setFcConfigCurrentPage(1));
  };

  const handleSearchFieldPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.defaultPrevented) {
      event.preventDefault();
      dispatch(
        getTableDataRequest({
          pageNo: 1,
          groupName: searchKey
        })
      );
      dispatch(setFcConfigCurrentPage(1));
    }
  };

  const paginateHandler = (pageNo: number) => {
    dispatch(
      getTableDataRequest({
        pageNo: pageNo
      })
    );
  };

  const renderConfigurationTable = useCallback(() => {
    return <ForecastConfigMainSection />;
  }, []);

  const renderHeaderBody = () => {
    return (
      <AppInputGroup
        placeholder="Search group"
        value={searchKey || ''}
        onChange={handleInputChange}
        fontSize="14px"
        variant="primary"
        inputSize="large"
        width="306px"
        height={'36px'}
        onKeyDown={handleSearchFieldPress}
      />
    );
  };

  return (
    <>
      <TrainingConfigurationDrawer
        isOpen={page.trainingConfigLocalScope.trainingConfigurationDrawer}
      />
      <InfluencingFactorDrawer isOpen={page.trainingConfigLocalScope.influencingFactorDrawer} />
      <RunNowDrawer isOpen={page.trainingConfigLocalScope.runNowDrawer} />
      <JobScheduleDrawer isOpen={page.trainingConfigLocalScope.jobScheduleDrawer} />
      <MainPageLayout
        subTitle="Forecasting Configuration"
        title="Advanced Configuration"
        paginateHandler={paginateHandler}
        isLoading={page.isLoading}
        pageContent={renderConfigurationTable()}
        headerContent={renderHeaderBody()}
        totalRecordsCount={page.totalRecordsCount}
        refreshHandler={refreshHandler}
      />
    </>
  );
};

export default ForecastConfigurationsPage;
