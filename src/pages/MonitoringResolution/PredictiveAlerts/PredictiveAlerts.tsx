import { FC, useEffect } from 'react';
import ViewAlerts from './ViewAlerts/ViewAlerts';
import { useDispatch } from 'react-redux';
import { setActiveMenuItem, setActiveSubMenuItem } from 'state/layout/layoutState';

interface Props {}

const PredictiveAlerts: FC<Props> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveMenuItem({ menuItem: 'Predictive Alerts' }));
    dispatch(setActiveSubMenuItem({ subMenuItem: '/app/predictive-alerts' }));
  }, []);

  return (
    <>
      <ViewAlerts />
    </>
  );
};

export default PredictiveAlerts;
