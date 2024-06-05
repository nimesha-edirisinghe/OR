import { Box, HStack, VStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppButton from 'components/newTheme/AppButton/AppButton';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { neutral_200, neutral_300, ocean_blue_600 } from 'theme/colors';

interface Props {
  fileName: string;
  fileSize: string;
  uploadFileHandler: () => void;
  onActionHandler: (actionType: string) => void;
}

const InitialUploadPanel: FC<Props> = ({
  fileName,
  fileSize,
  uploadFileHandler,
  onActionHandler
}) => {
  return (
    <VStack w="full" bg={ocean_blue_600} align="start" spacing="8px">
      <AppText size="h3Semibold">File Upload</AppText>
      <AppText size="body2">
        This will permanently update the current forecasted values. Are you sure you want to submit?
      </AppText>
      <HStack pt="8px" w={'full'} align={'center'}>
        <AppIcon
          transition="transform 0.25s ease"
          name="csvFile"
          fill={neutral_200}
          color={neutral_200}
          h="32px"
          w="32px"
        />
        <VStack w="full" align="start" spacing="8px" justify="center">
          <HStack>
            <Box maxW="200px" justifyContent="start">
              <AppText size="h5Semibold" color={neutral_200} noOfLines={1}>
                {fileName}
              </AppText>
            </Box>
            <AppText size="body3" color={neutral_300} noOfLines={1}>
              {fileSize}
            </AppText>
          </HStack>
        </VStack>
      </HStack>
      <HStack justify="end" w="full" spacing="12px" pt="12px">
        <AppButton variant="secondary" size="medium" onClick={() => onActionHandler('cancel')}>
          Cancel
        </AppButton>
        <AppButton variant="primary" size="medium" onClick={uploadFileHandler}>
          Submit
        </AppButton>
      </HStack>
    </VStack>
  );
};

export default InitialUploadPanel;
