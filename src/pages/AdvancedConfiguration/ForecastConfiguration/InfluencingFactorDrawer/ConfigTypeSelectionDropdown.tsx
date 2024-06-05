import { HStack } from '@chakra-ui/layout';
import { FC, useEffect, useRef, useState } from 'react';
import AppSkipper from 'components/AppSkipper/AppSkipper';
import AppDropdown from 'components/newTheme/AppDropdown/AppDropdown';
import AppText from 'components/AppText/AppText';
import { neutral_400 } from 'theme/colors';

export type InfluencingFactorConfigType =
  | 'Forecasted trend'
  | 'Historical values'
  | 'Continue last'
  | 'Percentage change'
  | 'From database';

export type SKUPredictorConfigType = 'Historical Median' | 'From database';
export type dropdownType = 'anchor' | 'sku';
interface Props {
  configType: InfluencingFactorConfigType;
  uniqueKey: number;
  configValue?: number;
  dropdownType: dropdownType;
  onConfigTypeChange: (
    value: InfluencingFactorConfigType | SKUPredictorConfigType,
    index: number
  ) => void;
  onPercentageConfigValueChange?: (value: number, index: number) => void;
}

const ConfigTypeSelectionDropdown: FC<Props> = ({
  configType,
  uniqueKey,
  configValue,
  onPercentageConfigValueChange,
  onConfigTypeChange,
  dropdownType
}) => {
  const [selectedConfigType, setSelectedConfigType] = useState<
    InfluencingFactorConfigType | SKUPredictorConfigType
  >(configType);
  const configTypes: InfluencingFactorConfigType[] = [
    'Forecasted trend',
    'Historical values',
    'Continue last',
    'Percentage change',
    'From database'
  ];

  const isConfigTypePercentage: boolean = selectedConfigType === 'Percentage change';
  const percentageDropdownWidth: string = isConfigTypePercentage ? '397px' : '560px';
  const skuConfigTypes: SKUPredictorConfigType[] = ['Historical Median', 'From database'];

  useEffect(() => {
    setSelectedConfigType(configType);
  }, [configType]);

  const onItemSelect = (
    config: InfluencingFactorConfigType | SKUPredictorConfigType,
    uniqueKey: number
  ) => {
    setSelectedConfigType(config);
    onConfigTypeChange(config, uniqueKey);
  };

  return (
    <HStack>
      {dropdownType === 'anchor' && (
        <AppDropdown
          options={configTypes}
          buttonWidth={percentageDropdownWidth}
          height="36px"
          handleItemClick={(config: any) => onItemSelect(config, uniqueKey)}
          selectedItem={selectedConfigType}
        />
      )}
      {dropdownType === 'sku' && (
        <AppDropdown
          options={skuConfigTypes}
          buttonWidth={percentageDropdownWidth}
          height="36px"
          handleItemClick={(config: any) => onItemSelect(config, uniqueKey)}
          selectedItem={selectedConfigType}
        />
      )}

      {isConfigTypePercentage && (
        <AppSkipper
          onValueChange={(value) =>
            onPercentageConfigValueChange && onPercentageConfigValueChange(value, uniqueKey)
          }
          value={configValue || null}
          w="153px"
          h="36px"
          isUpDownIconVisible={false}
        />
      )}
    </HStack>
  );
};

export default ConfigTypeSelectionDropdown;
