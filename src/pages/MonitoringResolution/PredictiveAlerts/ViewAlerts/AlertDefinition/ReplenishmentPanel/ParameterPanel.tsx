import { HStack, VStack } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import { FC, useState } from 'react';
import { neutral_200, ocean_blue_500, yellow_500 } from 'theme/colors';
import { RplParameterObjI } from 'types/replenishmentConfig';
import { useSelector } from 'react-redux';
import { IAlert, alertSliceSelector } from 'state/pages/monitoringAndResolution/Alert/alertState';
import { scrollbarXStyles } from 'theme/styles';

interface ParameterPanelProps {}

const ParameterPanel: FC<ParameterPanelProps> = () => {
  const alertState: IAlert = useSelector(alertSliceSelector);
  const orderPlan = alertState.rplPlanDetails?.orderPlan;
  const ubp = orderPlan?.unitPrice ? '$' + orderPlan?.unitPrice : '';
  const [scroll, setScroll] = useState('hidden');
  const parameterItemArr: RplParameterObjI[] = [
    {
      key: 'plannedOn',
      displayName: 'Planned on',
      value: orderPlan?.plannedOn!
    },
    {
      key: 'leadTime',
      displayName: 'Lead Time',
      value: orderPlan?.leadTime.toString()!
    },
    {
      key: 'dayOfCover',
      displayName: 'Days of Cover',
      value: orderPlan?.daysOfCover.toString()!
    },
    {
      key: 'moq',
      displayName: 'MOQ',
      value: orderPlan?.moq.toString()!
    },
    {
      key: 'orderingFrequency',
      displayName: 'Ordering Freq',
      value: orderPlan?.orderingFrequency.toString()!
    },
    {
      key: 'unitBuyingPrice',
      displayName: 'Unit Buying Price',
      value: ubp
    },
    {
      key: 'supplyPackSize',
      displayName: 'Supply Pack Size (units)',
      value: orderPlan?.unitOrderQty.toString()!
    },
    {
      key: 'waysOfSupply',
      displayName: 'Ways of supply',
      value: orderPlan?.wayOfSupply!
    }
  ];
  return (
    <HStack
      w="full"
      h={'full'}
      minH={'53px'}
      gap={'2px'}
      overflow={scroll}
      overflowY={'hidden'}
      onMouseEnter={() => setScroll('auto')}
      onMouseLeave={() => setScroll('hidden')}
      __css={scrollbarXStyles}
    >
      {parameterItemArr.map((item) => (
        <>
          <VStack
            key={item.key}
            bg={ocean_blue_500}
            minW={'146px'}
            w={'full'}
            h={'46px'}
            borderRadius={'4px'}
            p={'8px'}
            spacing={0}
          >
            <AppText fontSize={'10px'} fontWeight={400} w={'full'} color={neutral_200}>
              {item.displayName}
            </AppText>
            <AppText size={'body2'} w={'full'} color={yellow_500} fontWeight={600}>
              {item.value}
            </AppText>
          </VStack>
        </>
      ))}
    </HStack>
  );
};

export default ParameterPanel;
