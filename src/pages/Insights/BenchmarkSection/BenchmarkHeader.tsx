import { FC } from 'react';
import { Flex, HStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import AppRadioBoxWithText from 'components/AppRadioBoxWithText/AppRadioBoxWithText';
import { useDispatch, useSelector } from 'react-redux';
import {
  IInsight,
  insightSliceSelector,
  setBenchmarkOption
} from 'state/pages/insights/insightState';

interface BenchmarkHeaderProps {}

const BenchmarkHeader: FC<BenchmarkHeaderProps> = () => {
  const dispatch = useDispatch();
  const insightState: IInsight = useSelector(insightSliceSelector);
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setBenchmarkOption({
        benchmarkOption: event.target.value
      })
    );
  };

  return (
    <Flex h="39px" dir="row" pl="7px" alignItems="center" userSelect="none">
      <HStack pr="20px">
        <AppText fontSize={'13px'} fontWeight={500}>
          Benchmark
        </AppText>
      </HStack>
      <HStack pr="9px">
        <AppRadioBoxWithText
          text="At Deployment"
          name="atDeployment"
          isChecked={insightState.benchmarkOption === 'atDeployment'}
          onChange={onChangeHandler}
          colorScheme="#026FE9"
        />
      </HStack>
      <HStack>
        <AppRadioBoxWithText
          text="Same period last year"
          name="sply"
          isChecked={insightState.benchmarkOption === 'sply'}
          onChange={onChangeHandler}
          colorScheme="#026FE9"
        />
      </HStack>
    </Flex>
  );
};

export default BenchmarkHeader;
