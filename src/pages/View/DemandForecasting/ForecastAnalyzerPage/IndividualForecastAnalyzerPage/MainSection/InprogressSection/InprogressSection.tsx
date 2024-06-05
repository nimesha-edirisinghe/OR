import { Center } from '@chakra-ui/react';
import { FC } from 'react';
import AnalyzingDataPanel from '../../../FCAnalyzerCommonComponents/AnalyzingDataPanel/AnalyzingDataPanel';
import { useNavigate } from 'react-router-dom';
import {
  IForecastAnalyzer,
  forecastAnalyzerSliceSelector
} from 'state/pages/view/forecastAnalyzer/forecastAnalyzerState';
import { useDispatch, useSelector } from 'react-redux';
import { updateShouldReloadData } from 'state/pages/view/demandForecastView/dfViewPageState';

interface Props {
  progress: number[];
  dataLength: number;
}

const InprogressSection: FC<Props> = ({ progress, dataLength }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fcAnalyzerState: IForecastAnalyzer = useSelector(forecastAnalyzerSliceSelector);
  const percentage = (progress.length / dataLength) * 100;
  const originPage = fcAnalyzerState.fcAnalyzerLocalScope.originPage;

  const cancelHandler = () => {
    navigate('/app/demand-forecast/view');

    if (originPage === 'alert') {
      dispatch(updateShouldReloadData(false));
      navigate('/app/predictive-alerts/definition');
    } else {
      dispatch(updateShouldReloadData(false));
      navigate('/app/demand-forecast/view');
    }
  };

  return (
    <Center w="full" h="calc(100vh - 120px)">
      <AnalyzingDataPanel percentage={percentage} cancelHandler={cancelHandler} />
    </Center>
  );
};

export default InprogressSection;
