import MainPageLayout from 'layouts/PageLayouts/MainPageLayout';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, userSliceSelector } from 'state/user/userState';
import PlanningConfigDrawer from './PlanningConfigDrawer/PlanningConfigDrawer';
import {
  closeRplDrawer,
  executePlanningRunNowRequest,
  getReplenishmentConfigDataRequest,
  rplConfigPageSliceSelector,
  setRplConfigCurrentPage
} from 'state/pages/advancedConfiguration/replenishmentConfigurationPage/rplConfigPageState';
import PlanningRunNowDrawer from './PlanningRunNowDrawer/PlanningRunNowDrawer';
import PlanningScheduleDrawer from './PlanningScheduleDrawer/PlanningScheduleDrawer';
import AppInputGroup from 'components/newTheme/AppInputGroup/AppInputGroup';
import { layoutSliceSelector } from 'state/layout/layoutState';
import ReplenishmentMainSection from './ReplenishmentMainSection/ReplenishmentMainSection';
import AppPopup from 'components/newTheme/AppPopup/AppPopup';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { yellow_500 } from 'theme/colors';
import { useDisclosure } from '@chakra-ui/react';

interface Props {}

const ReplenishmentConfigurationPage: FC<Props> = () => {
  const page = useSelector(rplConfigPageSliceSelector);
  const rplConfigPageState = useSelector(rplConfigPageSliceSelector);
  const isLeftMenuOpen = useSelector(layoutSliceSelector).leftMenuOpen;
  const userState: IUser = useSelector(userSliceSelector);
  const rplPageState = useSelector(rplConfigPageSliceSelector);
  const dispatch = useDispatch();
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const [searchKey, setSearchKey] = useState<string>('');
  const estimatedTime = rplPageState.estimatedTime;
  const planningRunNowDrawer=rplConfigPageState.rplPlanningConfigLocalScope.planningRunNowDrawer
  const {
    isOpen: isPromptOpen,
    onToggle: onPromptToggle,
    onClose: onPromptClose
  } = useDisclosure();

  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (selectedOrgKey) {
        dispatch(getReplenishmentConfigDataRequest({ pageNo: 1 }));
        dispatch(setRplConfigCurrentPage(1));
      }
      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('replenishment config fetching error ', error);
    }
  }, [selectedOrgKey]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKey(value);
  };

  const handleSearchFieldPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.defaultPrevented) {
      event.preventDefault();
      dispatch(
        getReplenishmentConfigDataRequest({
          pageNo: 1,
          searchKey: searchKey
        })
      );
      dispatch(setRplConfigCurrentPage(1));
    }
  };

  const paginateHandler = (pageNo: number) => {
    dispatch(
      getReplenishmentConfigDataRequest({
        pageNo
      })
    );
  };

  const refreshHandler = () => {
    dispatch(
      getReplenishmentConfigDataRequest({
        pageNo: 1
      })
    );
    dispatch(setRplConfigCurrentPage(1));
  };

  const renderConfigurationTable = useCallback(() => {
    return <ReplenishmentMainSection />;
  }, []);

  const renderHeaderBody = () => {
    return (
      <AppInputGroup
        placeholder="Search"
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

  const onDrawerClose = () => {
    dispatch(closeRplDrawer());
    onPromptClose();
  };

  const onRunNowHandler = () => {
    dispatch(executePlanningRunNowRequest(''));
    onDrawerClose();
  };

  useEffect(()=>{
    if(planningRunNowDrawer)
      onPromptToggle()
    },[planningRunNowDrawer]);

  return (
    <>
      <PlanningConfigDrawer
        isOpen={rplConfigPageState.rplPlanningConfigLocalScope.planningConfigDrawer}
      />
       <AppPopup
        isOpen={isPromptOpen}
        onClose={onDrawerClose}
        leftBtnName="NO"
        rightBtnName="YES"
        title="Confirmation"
        infoMessage={`Replenishing planning for ${rplPageState.rplPlanningConfigLocalScope.selectedPlaningObj?.skuCount} SKUs is estimated to take approximately ${estimatedTime?.estimated_time_hour} hours ${estimatedTime?.estimated_time_min} minutes and ${estimatedTime?.estimated_time_sec} seconds. This process cannot be interrupted`}
        onConfirmHandler={onDrawerClose}
        onCloseHandler={onRunNowHandler}
        icon={<AppIcon name="warningPrompt" fill={yellow_500} width="54px" height="54px" />}
      />
      <PlanningScheduleDrawer
        isOpen={rplConfigPageState.rplPlanningConfigLocalScope.planningScheduleDrawer}
      />
      <MainPageLayout
        subTitle=""
        title=""
        paginateHandler={paginateHandler}
        isLoading={page.isLoading}
        pageContent={renderConfigurationTable()}
        headerContent={renderHeaderBody()}
        totalRecordsCount={rplConfigPageState.totalRecordsCount}
        refreshHandler={refreshHandler}
      />
    </>
  );
};

export default ReplenishmentConfigurationPage;
