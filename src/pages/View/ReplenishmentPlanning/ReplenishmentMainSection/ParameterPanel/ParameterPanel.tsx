import { HStack } from '@chakra-ui/react';
import { FC, useState } from 'react';
import ParameterItem from './ParameterItem/ParameterItem';
import { RplParameterObjI } from 'types/replenishmentConfig';
import {
  IRPLView,
  rplViewSliceSelector
} from 'state/pages/view/replenishmentView/rplViewPageState';
import { useSelector } from 'react-redux';
import { tableScrollbarXYStyles } from 'theme/styles';

interface ParameterPanelProps {}

const ParameterPanel: FC<ParameterPanelProps> = () => {
  const rplViewState: IRPLView = useSelector(rplViewSliceSelector);
  const [scroll, setScroll] = useState('hidden');
  const orderPlan = rplViewState.rplPlanDetails?.orderPlan;
  const ubp = orderPlan?.unitPrice?.toString() || '';
  const parameterItemArr: RplParameterObjI[] = [
    {
      key: 'plannedOn',
      displayName: 'Planned on',
      value: orderPlan?.plannedOn ?? ''
    },
    {
      key: 'leadTime',
      displayName: 'Lead Time (Days)',
      value: orderPlan?.leadTime?.toString() ?? ''
    },
    {
      key: 'dayOfCover',
      displayName: 'Days of Cover',
      value: orderPlan?.daysOfCover?.toString() ?? ''
    },
    {
      key: 'moq',
      displayName: 'MOQ',
      value: orderPlan?.moq?.toString() ?? ''
    },
    {
      key: 'orderingFrequency',
      displayName: 'Ordering Freq',
      value: orderPlan?.orderingFrequency?.toString() ?? ''
    },
    {
      key: 'shelfLife',
      displayName: 'Shelf Life',
      value: orderPlan?.shelfLife.toString()!
    },
    {
      key: 'unitBuyingPrice',
      displayName: 'Unit Buying Price',
      value: ubp
    },
    {
      key: 'unitOrderQty',
      displayName: 'Supply pack size (units)',
      value: orderPlan?.unitOrderQty?.toString() ?? ''
    },
    {
      key: 'wayOfSupply',
      displayName: 'Ways Of Supply',
      value: orderPlan?.wayOfSupply!
    }
  ];
  return (
    <HStack
      w="full"
      h="full"
      justify="start"
      gap="2px"
      overflow={scroll}
      __css={tableScrollbarXYStyles}
      onMouseEnter={() => setScroll('auto')}
      onMouseLeave={() => setScroll('hidden')}
    >
      {parameterItemArr.map((item) => (
        <ParameterItem parameterObject={item} key={item.key} />
      ))}
    </HStack>
  );
};

export default ParameterPanel;
