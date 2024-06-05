import { useDisclosure } from '@chakra-ui/hooks';
import { HStack, VStack } from '@chakra-ui/layout';
import { FC, useEffect, useRef, useState } from 'react';
import { useOutsideClick } from '@chakra-ui/react';
import AppDropdown from 'components/newTheme/AppDropdown/AppDropdown';

const dailyConfigTypes = ['Select', '30 Days', '45 Days', '60 Days'] as ConfigType[];
const weeklyConfigTypes = ['Select', '4 Weeks', '8 Weeks', '12 Weeks'] as ConfigType[];
const monthlyConfigTypes = ['Select', '6 months', '9 months', '12 months'] as ConfigType[];

export type DailyConfigType = 'Select' | '30 Days' | '45 Days' | '60 Days';
export type WeeklyConfigType = 'Select' | '4 Weeks' | '8 Weeks' | '12 Weeks';
export type MonthlyConfigType = 'Select' | '6 months' | '9 months' | '12 months';
export type ConfigType = DailyConfigType | WeeklyConfigType | MonthlyConfigType;
export type ResponseTimeGranularity = 'WEEKLY' | 'DAILY' | 'MONTHLY';

interface Props {
  configType?: ConfigType;
  responseTimeGranularity: ResponseTimeGranularity;
  configValue?: number;
  onConfigTypeChange: (value: ConfigType) => void;
}

const ConfigTypeSelection: FC<Props> = ({
  configType,
  configValue,
  responseTimeGranularity,
  onConfigTypeChange
}) => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const [selectedConfigType, setSelectedConfigType] = useState<ConfigType | undefined>(configType);
  const [configTypes, setConfigTypes] = useState<ConfigType[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    switch (responseTimeGranularity) {
      case 'DAILY':
        setConfigTypes(dailyConfigTypes);
        setSelectedConfigType((configValue ? `${configValue} Days` : 'Select') as ConfigType);
        break;
      case 'WEEKLY':
        setConfigTypes(weeklyConfigTypes);
        setSelectedConfigType((configValue ? `${configValue} Weeks` : 'Select') as ConfigType);
        break;
      case 'MONTHLY':
        setConfigTypes(monthlyConfigTypes);
        setSelectedConfigType((configValue ? `${configValue} Months` : 'Select') as ConfigType);
        break;
    }
  }, [responseTimeGranularity, configValue]);

  useOutsideClick({
    ref: ref,
    handler: (event) => {
      if (event.target === ref.current) {
        return;
      }
      onClose();
    }
  });

  const onItemSelect = (config: ConfigType) => {
    setSelectedConfigType(config);
    onConfigTypeChange(config);
    onClose();
  };

  return (
    <HStack>
      <VStack pos="relative" ref={ref}>
        <AppDropdown
          options={configTypes}
          buttonWidth="560px"
          height="36px"
          handleItemClick={(value) => onItemSelect(value as ConfigType)}
          selectedItem={selectedConfigType || ''}
        />
      </VStack>
    </HStack>
  );
};

export default ConfigTypeSelection;
