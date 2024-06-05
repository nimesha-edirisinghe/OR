import { FC } from 'react';
import VLPage from './VLPage/VLPage';

interface Props {}

const VL: FC<Props> = () => {
  
  return (
    <VLPage path='embeddedComponent=taskboard'></VLPage>
  );
};

export default VL;
