import { Box, HStack, VStack } from '@chakra-ui/react';
import AppRadioBoxWithText from 'components/AppRadioBoxWithText/AppRadioBoxWithText';
import AppText from 'components/AppText/AppText';
import { FC, useCallback, useState } from 'react';
import { InsightReportDataI } from 'types/insight';
import InsightChart from '../InsightChart/InsightChart';

interface InventoryChartPanelProps {
  title: string;
  isEnableValQtyController: boolean;
  isEnableBenchmark: boolean;
  reportData: InsightReportDataI[];
  benchmarkOption?: string;
}

const InventoryChartPanel: FC<InventoryChartPanelProps> = ({
  title,
  isEnableValQtyController,
  isEnableBenchmark,
  reportData,
  benchmarkOption
}) => {
  const [radioValue, setRadioValue] = useState<string>('value');

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(event.target.value);
  };

  const renderValueQtyController = useCallback(() => {
    return (
      <HStack h="30px" justifyContent="flex-start" mt="10px" mb="10px" spacing={5}>
        <AppRadioBoxWithText
          text="Value"
          name="value"
          onChange={onChangeHandler}
          isChecked={radioValue === 'value'}
          colorScheme="#026FE9"
        />
        <AppRadioBoxWithText
          text="Quantity"
          name="quantity"
          onChange={onChangeHandler}
          isChecked={radioValue === 'quantity'}
          colorScheme="#026FE9"
        />
      </HStack>
    );
  }, [radioValue]);

  return (
    <VStack h="full" w="full" align="start">
      {
        // TODO: need to add Inventory and stock sales ratio switch
      }
      <AppText size="16_600">{title}</AppText>
      {isEnableValQtyController && renderValueQtyController()}
      <Box h="511px" w="full">
        <InsightChart
          reportData={reportData}
          isEnableBenchmark={isEnableBenchmark}
          actualDataKey={radioValue === 'value' ? 'actual_val' : 'actual_qty'}
          projectionDataKey={radioValue === 'value' ? 'proj_val' : 'proj_qty'}
          benchmarkDataKey={
            benchmarkOption === 'atDeployment'
              ? radioValue === 'value'
                ? 'benchmark_dep'
                : 'benchmark_qty_dep'
              : radioValue === 'value'
              ? 'benchmark_sply'
              : 'benchmark_qty_sply'
          }
          benchmarkName={benchmarkOption === 'sply' ? 'Same period last year' : 'At Deployment'}
        />
      </Box>
    </VStack>
  );
};

export default InventoryChartPanel;
