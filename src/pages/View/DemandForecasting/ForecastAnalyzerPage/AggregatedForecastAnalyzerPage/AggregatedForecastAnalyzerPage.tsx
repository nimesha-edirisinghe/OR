import { VStack } from '@chakra-ui/react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, userSliceSelector } from 'state/user/userState';
import { scrollbarYStyles } from 'theme/styles';
import FCAnalyzerHeader from '../FCAnalyzerHeader/FCAnalyzerHeader';
import FCAnalyzerMainSection from './AggregatedFCAnalyzerMainSection/AggregatedFCAnalyzerMainSection';
import {
  IForecastAnalyzer,
  clearPercentage,
  fetchAccuracyDistributionDataRequest,
  fetchAggregatedGraphDataRequest,
  fetchExclusionCriteriaRequest,
  fetchKpiAccuracyRequest,
  fetchSkuDetailsDataRequest,
  forecastAnalyzerSliceSelector
} from 'state/pages/view/forecastAnalyzer/forecastAnalyzerState';
import { FCAnalyzerTypeEnum } from 'utils/enum';
import InprogressSection from './AggregatedFCAnalyzerMainSection/InprogressSection/InprogressSection';
import { useNavigate } from 'react-router-dom';

interface Props {}

const AggregatedForecastAnalyzerPage: FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState: IUser = useSelector(userSliceSelector);
  const fcAnalyzerState: IForecastAnalyzer = useSelector(forecastAnalyzerSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const progressPercentage = fcAnalyzerState.progressPercentage;
  const kpiAccuracyData = fcAnalyzerState.kpiAccuracyData;

  const readyToShowPage = progressPercentage.length === 5;
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    if (kpiAccuracyData !== null) {
      navigate('/app/demand-forecast');
    }
  }, [selectedOrgKey]);

  useEffect(() => {
    try {
      const abortController = new AbortController();
      dispatch(clearPercentage());
      dispatch(fetchKpiAccuracyRequest({ type: FCAnalyzerTypeEnum.AGGREGATED }));
      dispatch(fetchAggregatedGraphDataRequest({ type: FCAnalyzerTypeEnum.AGGREGATED }));
      dispatch(fetchExclusionCriteriaRequest({ type: FCAnalyzerTypeEnum.AGGREGATED }));
      dispatch(fetchSkuDetailsDataRequest({ type: FCAnalyzerTypeEnum.AGGREGATED }));
      dispatch(fetchAccuracyDistributionDataRequest({ type: FCAnalyzerTypeEnum.AGGREGATED }));
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

  const aggregateViewContent = useCallback(() => {
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
            <FCAnalyzerMainSection />
          </>
        ) : (
          <InprogressSection progress={progressPercentage} dataLength={5} />
        )}
      </VStack>
    );
  }, [progressPercentage, showPage, readyToShowPage]);

  return (
    <>
      <InsightsPageLayout children={aggregateViewContent()} />
    </>
  );
};

export default AggregatedForecastAnalyzerPage;
