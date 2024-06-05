import { Box, HStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppPopover from 'components/AppPopover/AppPopover';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { IUser, userSliceSelector } from 'state/user/userState';
import { ocean_blue_350, ocean_blue_600 } from 'theme/colors';
import { timeStampToDateString } from 'utils/utility';
import LastLoginPopoverContent, { lastLoginPopoverStyles } from './LastLoginPopoverContent';
import { ICommon, commonSliceSelector } from 'state/pages/common/commonState';

interface Props {}

const LastLoginSection: FC<Props> = () => {
  const userState: IUser = useSelector(userSliceSelector);
  const commonState: ICommon = useSelector(commonSliceSelector);
  const lastLoginDateObj = commonState.lastLoginData!;
  const lastLoginDateTime = userState.user.last_login;
  const formattedLoginDateTime =
    (lastLoginDateTime && timeStampToDateString(lastLoginDateTime, 'yyyy-MM-dd hh:mm a')) || '';
  return (
    <HStack
      minH="48px"
      w="full"
      bg={ocean_blue_600}
      borderRadius="8px"
      px="20px"
      py="14px"
      justify="space-between"
    >
      <Box minW="220px" w="auto">
        <AppText color="#57809A" size="body2" noOfLines={1} style={{ wordBreak: 'break-all' }}>
          Last login : {formattedLoginDateTime}
        </AppText>
      </Box>
      <HStack w="140px" spacing="7px">
        <AppText color="#57809A" size="body2">
          Data updated till :
        </AppText>
        {lastLoginDateObj && (
          <Box pb="3px">
            <AppPopover
              contentStyles={lastLoginPopoverStyles}
              trigger="hover"
              children={<AppIcon fill={ocean_blue_350} name="info" w="14px" h="14px" />}
              content={<LastLoginPopoverContent lastLoginDateObj={lastLoginDateObj} />}
            />
          </Box>
        )}
      </HStack>
    </HStack>
  );
};

export default LastLoginSection;
