import { HStack, VStack } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { neutral_100, ocean_blue_50, ocean_blue_500 } from 'theme/colors';
import { timeStampToDateString } from 'utils/utility';

interface Props {
  updatedBy: string;
  updatedOn: number;
}

const UpdatedInfoSection: FC<Props> = ({ updatedBy, updatedOn }) => {
  const updatedDateTime = timeStampToDateString(updatedOn, 'yyyy-MM-dd hh:mm a');
  return (
    <HStack w="full" h="68px" borderRadius="8px" align="start" spacing="8px">
      <VStack
        flex={1}
        h="full"
        bg={ocean_blue_500}
        borderRadius="8px"
        justify="center"
        align="start"
        px="16px"
        spacing={0}
      >
        <AppText size="body3" color={ocean_blue_50}>
          Updated By
        </AppText>
        <AppText size="h5Semibold" color={neutral_100}>
          {updatedBy}
        </AppText>
      </VStack>
      <VStack
        flex={2.5}
        h="full"
        bg={ocean_blue_500}
        borderRadius="8px"
        justify="center"
        align="start"
        px="16px"
        spacing={0}
      >
        <AppText size="body3" color={ocean_blue_50}>
          Updated Date & Time
        </AppText>
        <AppText size="h5Semibold" color={neutral_100}>
          {updatedDateTime}
        </AppText>
      </VStack>
    </HStack>
  );
};

export default UpdatedInfoSection;
