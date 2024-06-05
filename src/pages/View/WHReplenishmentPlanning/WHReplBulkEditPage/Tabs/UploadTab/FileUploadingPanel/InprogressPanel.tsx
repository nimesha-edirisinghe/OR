import { Box, HStack, VStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppButton from 'components/newTheme/AppButton/AppButton';
import AppInprogressBar from 'components/newTheme/AppInprogressBar/AppInprogressBar';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import {
  neutral_200,
  neutral_300,
  ocean_blue_600,
  red_100_t20,
  red_300,
  red_800
} from 'theme/colors';
import { FileInfoI } from './FileUploadingPanel';

interface Props {
  headerName: string;
  fileInfo: FileInfoI;
  fileUploadError: string;
  onActionHandler: (actionType: string) => void;
}

const InprogressPanel: FC<Props> = ({ headerName, fileInfo, fileUploadError, onActionHandler }) => {
  const { fileName, fileSize, percentage } = fileInfo;
  return (
    <VStack w="full" bg={ocean_blue_600} align="start" spacing="8px">
      <AppText size="h3Semibold"> {headerName}</AppText>
      <HStack pt="8px" w={'full'} align={'start'}>
        <AppIcon
          transition="transform 0.25s ease"
          name="csvFile"
          fill={neutral_200}
          color={neutral_200}
          h="32px"
          w="32px"
        />
        <VStack w="full" align="start" spacing="8px">
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
          <AppInprogressBar percentage={percentage} />
          <AppText size="body3" color={neutral_300}>
            {Math.round(percentage)}% done
          </AppText>
        </VStack>
      </HStack>
      {fileUploadError && (
        <HStack w="full" bg={red_100_t20} p="8px" borderRadius="8px" align="start" spacing="8px">
          <AppIcon fill={red_800} name="info" w="24px" h="24px" />
          <AppText size="body2" color={red_300}>
            {fileUploadError}
          </AppText>
        </HStack>
      )}
      <HStack justify="end" w="full" spacing="12px" pt="12px">
        {percentage === 100 && (
          <AppButton variant="primary" size="medium" onClick={() => onActionHandler('submit')}>
            Okay
          </AppButton>
        )}
      </HStack>
    </VStack>
  );
};

export default InprogressPanel;
