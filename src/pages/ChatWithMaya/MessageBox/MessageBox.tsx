import { Box, Flex, VStack } from '@chakra-ui/react';
import React, { FC, useEffect, useMemo, useRef } from 'react';
import PrimaryMessage from './Messages/PrimaryMessage';
import UserMessage from './Messages/UserMessage';
import MayaReply from './Messages/MayaReply';
import { scrollbarYStyles } from 'theme/styles';
import ContextBox from './Messages/ContextMessages';
import {
  IChatWithMayaSlice,
  chatWithMayaSliceSelector,
  conversationChatRequest,
  enableContextAction,
  setContextIdAction,
  setUserMessageAction
} from 'state/pages/chatWithMaya/chatWithMayaState';
import { useDispatch, useSelector } from 'react-redux';
import ContextMessages from './Messages/ContextMessages';

interface Props {}

const MessageBox: FC<Props> = () => {
  const dispatch = useDispatch();
  const mayaState: IChatWithMayaSlice = useSelector(chatWithMayaSliceSelector);
  const contextList = mayaState.chatContext;
  const chatHistory = mayaState.chatHistory;
  const enableContext = mayaState.enableContext;
  const chatInitiated = chatHistory && chatHistory?.length > 0;
  const isLoading = mayaState.loading.chatLoading;
  const pageBottomRef = useRef<any>();

  const onSelectContextHandler = (id: string, message: string) => {
    dispatch(
      setContextIdAction({
        contextId: id
      })
    );

    dispatch(
      conversationChatRequest({
        chatActionType: 'set-context',
        message: ''
      })
    );
  };

  const onCloseContextHandler = () => {
    dispatch(enableContextAction());
  };

  const reversedChatHistory = useMemo(() => [...(chatHistory || [])].reverse(), [chatHistory]);
  const [lastTwoMessages, ...otherMessages] = reversedChatHistory;

  const onUserMessageClickHandler = (id: string) => {
    const selectedMessage = chatHistory?.find(
      (chat) => chat.seq_id === id && chat.chat.role === 'user'
    )?.chat.content;
    dispatch(setUserMessageAction(selectedMessage!));
  };

  useEffect(() => {
    pageBottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [reversedChatHistory, enableContext]);

  return (
    <VStack
      h={chatInitiated ? 'calc(100vh - 167px)' : 'calc(100vh - 220px)'}
      w="full"
      overflow="hidden"
      overflowY="scroll"
      __css={{
        ...scrollbarYStyles
      }}
      display="flex"
      flexDirection="column-reverse"
    >
      <Box ref={pageBottomRef}></Box>
      <Box h="auto" w="640px" display="flex" flexDirection="column-reverse">
        {enableContext && (
          <ContextMessages
            messages={contextList!}
            onCloseHandler={onCloseContextHandler}
            onSelectHandler={onSelectContextHandler}
          />
        )}

        {lastTwoMessages && (
          <>
            {isLoading && (
              <Flex justifyContent="flex-start" mt="12px">
                <MayaReply message={lastTwoMessages.chat.content} loadingReply={isLoading} />
              </Flex>
            )}
            {lastTwoMessages.chat.role === 'assistant' && (
              <Flex justifyContent="flex-start" mt="12px">
                <MayaReply message={lastTwoMessages.chat.content} loadingReply={isLoading} />
              </Flex>
            )}
            {lastTwoMessages.chat.role === 'user' && (
              <Flex justifyContent="flex-end" mt="12px">
                <UserMessage
                  message={lastTwoMessages.chat.content}
                  id={lastTwoMessages.seq_id}
                  onClickHandler={onUserMessageClickHandler}
                />
              </Flex>
            )}
          </>
        )}

        {otherMessages.map((chat, index) => {
          const reversedIndex = reversedChatHistory.length - 1 - index - 2;
          return (
            <React.Fragment key={reversedIndex}>
              {chat.chat.role === 'assistant' && (
                <Flex justifyContent="flex-start" mt="12px">
                  <MayaReply message={chat.chat.content} />
                </Flex>
              )}
              {chat.chat.role === 'user' && (
                <Flex justifyContent="flex-end" mt="12px">
                  <UserMessage
                    message={chat.chat.content}
                    id={chat.seq_id!}
                    onClickHandler={onUserMessageClickHandler}
                  />
                </Flex>
              )}
            </React.Fragment>
          );
        })}

        <PrimaryMessage />
      </Box>
    </VStack>
  );
};

export default MessageBox;
