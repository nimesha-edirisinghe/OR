import { Center } from '@chakra-ui/react';
import { FC } from 'react';
import AnalyzingDataPanel from '../../../FCAnalyzerCommonComponents/AnalyzingDataPanel/AnalyzingDataPanel';
import { useNavigate } from 'react-router-dom';
import { updateShouldReloadData } from 'state/pages/view/demandForecastView/dfViewPageState';
import { useDispatch } from 'react-redux';

interface Props {
  progress: number[];
  dataLength: number;
}

const InprogressSection: FC<Props> = ({ progress, dataLength }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const percentage = (progress.length / dataLength) * 100;

  const cancelHandler = () => {
    dispatch(updateShouldReloadData(false));
    navigate('/app/demand-forecast/view');
  };
  return (
    <Center w="full" h="calc(100vh - 120px)">
      <AnalyzingDataPanel percentage={percentage} cancelHandler={cancelHandler} />
    </Center>
  );
};

export default InprogressSection;
