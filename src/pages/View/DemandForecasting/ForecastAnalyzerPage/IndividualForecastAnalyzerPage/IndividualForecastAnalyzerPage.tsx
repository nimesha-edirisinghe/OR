import { VStack } from '@chakra-ui/react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, userSliceSelector } from 'state/user/userState';
import { scrollbarYStyles } from 'theme/styles';
import MainSection from './MainSection/MainSection';
import FCAnalyzerHeader from '../FCAnalyzerHeader/FCAnalyzerHeader';
import {
  IForecastAnalyzer,
  clearPercentage,
  fetchIndividualGraphDataRequest,
  fetchKpiAccuracyRequest,
  fetchKpiDataRequest,
  fetchPlannedActualDataRequest,
  fetchSkuDetailsDataRequest,
  forecastAnalyzerSliceSelector
} from 'state/pages/view/forecastAnalyzer/forecastAnalyzerState';
import { FCAnalyzerTypeEnum } from 'utils/enum';
import InprogressSection from './MainSection/InprogressSection/InprogressSection';
import { useNavigate } from 'react-router-dom';
import { updateShouldReloadData } from 'state/pages/view/demandForecastView/dfViewPageState';

interface Props {}

const IndividualForecastAnalyzerPage: FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState: IUser = useSelector(userSliceSelector);
  const fcAnalyzerState: IForecastAnalyzer = useSelector(forecastAnalyzerSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const progressPercentage = fcAnalyzerState.progressPercentage;
  const kpiAccuracyData = fcAnalyzerState.kpiAccuracyData;
  const originPage = fcAnalyzerState.fcAnalyzerLocalScope.originPage;

  const readyToShowPage = progressPercentage.length === 5;
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    if (kpiAccuracyData !== null) {
      if (originPage === 'alert') {
        dispatch(updateShouldReloadData(false));
        navigate('/app/predictive-alerts');
      } else {
        dispatch(updateShouldReloadData(false));
        navigate('/app/demand-forecast');
      }
    }
  }, [selectedOrgKey]);

  useEffect(() => {
    try {
      const abortController = new AbortController();
      dispatch(clearPercentage());
      dispatch(fetchKpiAccuracyRequest());
      dispatch(fetchIndividualGraphDataRequest());
      dispatch(fetchPlannedActualDataRequest());
      dispatch(fetchKpiDataRequest());
      dispatch(fetchSkuDetailsDataRequest({ type: FCAnalyzerTypeEnum.INDIVIDUAL }));
      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('Data fetching', error);
    }
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowPage(true);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  const individualViewContent = useCallback(() => {
    return (
      <VStack
        w="full"
        px="20px"
        py="20px"
        gap="20px"
        overflow="hidden"
        overflowY="scroll"
        __css={scrollbarYStyles}
      >
        {showPage && readyToShowPage ? (
          <>
            <FCAnalyzerHeader />
            <MainSection />
          </>
        ) : (
          <InprogressSection progress={progressPercentage} dataLength={5} />
        )}
      </VStack>
    );
  }, [progressPercentage, showPage, readyToShowPage]);

  return (
    <>
      <InsightsPageLayout children={individualViewContent()} />
    </>
  );
};

export default IndividualForecastAnalyzerPage;
