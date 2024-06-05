import { FC, useCallback, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { useSelector } from 'react-redux';
import { IUser, userSliceSelector } from 'state/user/userState';
import { REACT_APP_OR_VL_LANDING_URL } from 'config/constants';
import { ocean_blue_700 } from 'theme/colors';
import { getFromLocal, storeInLocal } from 'utils/localStorage';

interface Props {
  title?: string;
  path?: string;
}

const VLPage: FC<Props> = ({ title = 'OR VL Integration', path }) => {
  const userState: IUser = useSelector(userSliceSelector);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const formattedNewUrl = REACT_APP_OR_VL_LANDING_URL.substring(
        0,
        REACT_APP_OR_VL_LANDING_URL.lastIndexOf('/')
      );

      if (event.origin === formattedNewUrl) {
        const messageParts = event.data.split('=');
        if (messageParts.length === 2 && messageParts[0] === 'csrfPreventionSalt') {
          storeInLocal('csrfPreventionSalt', messageParts[1]);
        }
      }
    };
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const vlPageContent = useCallback(() => {
    let url = '';
    const csrfMessage = getFromLocal('csrfPreventionSalt');
    if (userState && userState.keyCloakInfo)
      url =
        REACT_APP_OR_VL_LANDING_URL +
        '?token=' +
        userState.keyCloakInfo.idToken +
        '&emailId=' +
        userState.user.username +
        (path ? '&' + path : '') +
        (csrfMessage ? '&csrfPreventionSalt=' + csrfMessage : '');

    return (
      <Box w="full" px="0px" pt="0px" h="full" bg={ocean_blue_700}>
        <iframe
          title={title}
          width="100%"
          height="650"
          src={url}
          style={{ backgroundColor: ocean_blue_700, colorScheme: 'normal' }}
        />
      </Box>
    );
  }, [userState, path, title]);

  return (
    <>
      <InsightsPageLayout children={vlPageContent()} />
    </>
  );
};

export default VLPage;
