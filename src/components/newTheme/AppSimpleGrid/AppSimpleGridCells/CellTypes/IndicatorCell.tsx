import { Box, HStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppPopover from 'components/AppPopover/AppPopover';
import AppText from 'components/AppText/AppText';
import { CSSProperties, FC, useCallback } from 'react';
import { ocean_blue_500, ocean_blue_100, ocean_blue_400, red_500 } from 'theme/colors';
import { getColorsByValue } from './helper';

interface Props {
  displayValue: string;
  showIndicator?: boolean;
}

const IndicatorCell: FC<Props> = ({ displayValue, showIndicator = true }) => {
  const [bgColor, textColor, value] = getColorsByValue(displayValue);

  const moreOptionPopoverStyles: CSSProperties = {
    maxWidth: '300px',
    margin: 0,
    borderRadius: '8px'
  };

  const renderFailedPopup = useCallback(() => {
    return (
      <Box
        h="78px"
        w="300px"
        px="12px"
        pb="12px"
        pt="10px"
        bg={ocean_blue_500}
        borderRadius="8px"
        boxShadow="0px 12px 20px 0px #001019"
        border={'1px solid'}
        borderColor={ocean_blue_400} 
      >
        <AppText size="body3" color={ocean_blue_100}>
          Data validation failed due to issues identified within the data. Download the provided
          file to view and correct the highlighted errors.
        </AppText>
      </Box>
    );
  }, []);

  return (
    <HStack justify="space-between">
      <Box w="fit-content" h="24px" px="8px" py="2px" bg={bgColor} mt="-1px" borderRadius="8px">
        <AppText size="body2" noOfLines={1} color={textColor}>
          {value}
        </AppText>
      </Box>
      {displayValue === 'Failed' && showIndicator && (
        <AppPopover
          onClose={() => {}}
          contentStyles={moreOptionPopoverStyles}
          trigger="hover"
          placement="bottom-end"
          children={
            <AppIcon
              transition="transform 0.25s ease"
              name="infoCircle"
              w="18px"
              h="18px"
              fill={red_500}
            />
          }
          content={renderFailedPopup()}
        />
      )}
    </HStack>
  );
};

export default IndicatorCell;
