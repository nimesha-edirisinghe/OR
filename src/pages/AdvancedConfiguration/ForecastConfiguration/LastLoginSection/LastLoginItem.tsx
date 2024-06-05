import { HStack } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { ocean_blue_50 } from 'theme/colors';
import { timeStampToDateString } from 'utils/utility';

interface Props {
  label: string;
  value?: string;
}

const LastLoginItem: FC<Props> = ({ label, value }) => {
  const timeStamp = value ? new Date(value).getTime() : null;
  return (
    <HStack justify="start">
      <AppText size="caption" color={ocean_blue_50}>
        {label}
      </AppText>
      <AppText size="caption" color={ocean_blue_50}>
        {value ? `(${timeStampToDateString(timeStamp, 'd-MMM-yy')})` : ''}
      </AppText>
    </HStack>
  );
};

export default LastLoginItem;
