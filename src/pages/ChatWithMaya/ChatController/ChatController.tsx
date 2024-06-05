import { HStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppButton from 'components/newTheme/AppButton/AppButton';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import AppInput from 'components/newTheme/AppInput/AppInput';
import AppText from 'components/newTheme/AppText/AppText';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IChatWithMayaSlice,
  chatWithMayaSliceSelector,
  conversationChatRequest,
  enableContextAction,
  setUserMessageAction
} from 'state/pages/chatWithMaya/chatWithMayaState';
import { blue_600, ocean_blue_600 } from 'theme/colors';

interface Props {}

const ChatController: FC<Props> = () => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const mayaState: IChatWithMayaSlice = useSelector(chatWithMayaSliceSelector);
  const isLoading = mayaState.loading.chatLoading;
  const userMessage = mayaState.userMessage;
  const enableContext = mayaState.enableContext;
  const chatHistory = mayaState.chatHistory;
  const discoverBtnEnabled = mayaState.discoverBtnEnabled;
  const chatInitiated = chatHistory && chatHistory?.length > 0;

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
    } else {
    }

    return () => {};
  }, [isFirstLoad]);

  const onChangeMessageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserMessageAction(event.target.value));
  };

  const onMessageSubmitHandler = () => {
    const currentMessage = userMessage.trim();

    if (currentMessage !== '') {
      dispatch(
        conversationChatRequest({
          chatActionType: 'ask',
          message: userMessage
        })
      );
      dispatch(setUserMessageAction(''));
    }
  };

  const onDiscoverBtnHandler = () => {
    dispatch(enableContextAction());
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.defaultPrevented) {
      event.preventDefault();

      const currentMessage = userMessage.trim();

      if (currentMessage !== '') {
        dispatch(
          conversationChatRequest({
            chatActionType: 'ask',
            message: currentMessage
          })
        );

        dispatch(setUserMessageAction(''));
      }
    }
  };

  useEffect(() => {
    setIsHovered(false);
  }, [enableContext]);

  return (
    <HStack spacing="10px" justify="space-between" w="640px">
      <AppButton
        variant="secondary"
        size="medium"
        onClick={onDiscoverBtnHandler}
        px="8px"
        _leftIcon={
          <AppIcon
            name="discover"
            width="20px"
            height="20px"
            fill={blue_600}
            ml={!isHovered && !discoverBtnEnabled ? '8px' : 'none'}
          />
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => !discoverBtnEnabled && setIsHovered(false)}
        w={isHovered || discoverBtnEnabled ? 'auto' : '36px'}
      >
        {(isHovered || discoverBtnEnabled) && (
          <AppText size="body2" color="#fff">
            Discover
          </AppText>
        )}
      </AppButton>
      <AppInput
        w="full"
        onChange={onChangeMessageHandler}
        value={userMessage}
        variant="primary"
        size="small"
        fontSize="14px"
        placeholder="Text"
        onKeyDown={!isLoading ? handleKeyPress : undefined}
      />
      <AppIconButton
        aria-label="send"
        icon={<AppIcon name="send" width="20px" height="20px" fill={blue_600} />}
        variant="iconPrimary"
        size="iconMedium"
        onClick={onMessageSubmitHandler}
        bg={ocean_blue_600}
        minW="36px"
        isDisabled={isLoading}
      />
    </HStack>
  );
};

export default ChatController;
