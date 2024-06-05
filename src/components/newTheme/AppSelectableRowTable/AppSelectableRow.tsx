import { FC, useCallback } from 'react';
import { Box, Center, HStack } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import { neutral_200, ocean_blue_400 } from 'theme/colors';
import AppCheckbox from '../AppCheckbox/AppCheckbox';
import { DemandForecastSkuListItem } from 'types/responses/viewResponses';
import AppTooltip from 'components/AppTooltip/AppTooltip';

interface Props {
  headerKeys: string[];
  dataRow: DemandForecastSkuListItem;
  onChangeHandler: (isSelected: boolean, id: number) => void;
}

const AppSelectableRow: FC<Props> = ({ headerKeys, dataRow, onChangeHandler }) => {
  const { anchorProdKey, isSelected } = dataRow;

  const renderCellContent = useCallback(
    (key: string) => {
      const cellData = dataRow[key as keyof typeof dataRow];
      const shouldUseTooltip = cellData && cellData.toString().length > 18;

      return (
        <AppText size="body2" color={neutral_200} noOfLines={1}>
          {shouldUseTooltip ? (
            <AppTooltip label={cellData} placement="auto-start">
              <span>{cellData}</span>
            </AppTooltip>
          ) : (
            <span>{cellData}</span>
          )}
        </AppText>
      );
    },
    [dataRow]
  );

  return (
    <HStack spacing="1px" mt="1px">
      <Center w="50px" h="36px" bg={ocean_blue_400}>
        <AppCheckbox
          id={anchorProdKey}
          isChecked={isSelected}
          onChange={(isChecked) => onChangeHandler(isChecked, anchorProdKey)}
        />
      </Center>
      {headerKeys?.map((key) => (
        <Box key={key} px="8px" w="120px" h="36px" bg={ocean_blue_400} py="8px">
          {renderCellContent(key)}
        </Box>
      ))}
    </HStack>
  );
};

export default AppSelectableRow;
