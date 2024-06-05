import { Box, VStack } from '@chakra-ui/react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, userSliceSelector } from 'state/user/userState';
import ChatController from './ChatController/ChatController';
import ChatHeader from './ChatHeader/ChatHeader';
import MessageBox from './MessageBox/MessageBox';
import {
  IChatWithMayaSlice,
  chatWithMayaSliceSelector,
  getContextRequest
} from 'state/pages/chatWithMaya/chatWithMayaState';
import { clearSessionId, setSessionId } from 'utils/localStorage';

interface Props {}

const ChatWithMaya: FC<Props> = () => {
  const dispatch = useDispatch();
  const userState: IUser = useSelector(userSliceSelector);
  const mayaState: IChatWithMayaSlice = useSelector(chatWithMayaSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const chatHistory = mayaState.chatHistory;
  const enableContext = mayaState.enableContext;
  const chatInitiated = chatHistory && chatHistory?.length > 0;

  useEffect(() => {
    setSessionId();

    window.onbeforeunload = () => {
      clearSessionId();
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (selectedOrgKey) {
        dispatch(getContextRequest());
      }
      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('summary details fetching error ', error);
    }
  }, [selectedOrgKey]);

  const activityLogPageContent = useCallback(() => {
    return (
      <VStack mt="20px">
        {!chatInitiated && <ChatHeader />}
        {chatInitiated ? (
          <Box
            pos="absolute"
            w="640px"
            h="120px"
            zIndex={100}
            bg=" linear-gradient(180deg, #000F19 0%, rgba(0, 16, 25, 0.00) 100%)"
          ></Box>
        ) : (
          <Box></Box>
        )}
        <MessageBox />
        <ChatController />
      </VStack>
    );
  }, [chatInitiated]);

  return (
    <>
      <InsightsPageLayout children={activityLogPageContent()} />
    </>
  );
};

export default ChatWithMaya;
