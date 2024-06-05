import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRootState } from 'state/rootState';
import { ChatActionTypes } from 'types/maya';
import { ChatContextI, ChatMessageI, LoadingI } from 'types/responses/maya';
import { generateShortId } from 'utils/utility';

export interface IChatWithMayaSlice {
  loading: LoadingI;
  chatContext: ChatContextI[] | null;
  chatHistory: ChatMessageI[] | null;
  selectedContextId: string;
  currentSequenceId: string;
  enableContext: boolean;
  userMessage: string;
  discoverBtnEnabled: boolean;
}

export const ChatWithMayaSlice = createSlice({
  name: 'chatWithMaya',
  initialState: {
    loading: {
      chatLoading: false
    },
    chatContext: [],
    chatHistory: [],
    selectedContextId: '',
    currentSequenceId: '',
    enableContext: true,
    userMessage: '',
    discoverBtnEnabled: false
  } as IChatWithMayaSlice,
  reducers: {
    getContextRequest: (state) => {},
    getContextSuccess: (state, action: PayloadAction<ChatContextI[]>) => {
      if (state.chatContext && state.chatContext.length === 0) {
        state.chatContext = action.payload;
      }
    },
    getContextFailure: (state) => {},

    conversationChatRequest: (
      state,
      action: PayloadAction<{ chatActionType: ChatActionTypes; message?: string }>
    ) => {
      const { message } = action.payload;
      const seqId = generateShortId();
      const currentTime = Date.now().toString();
      const conversationObj: ChatMessageI = {
        context_id: state.selectedContextId || '',
        seq_id: seqId,
        chat_session_id: null,
        chat: {
          role: 'user',
          content: message || '',
          content_type: 'text',
          time: currentTime
        }
      };
      state.enableContext = false;
      state.discoverBtnEnabled = false;
      state.currentSequenceId = seqId;
      state.chatHistory?.push(conversationObj!);
      state.loading.chatLoading = true;
    },
    conversationChatSuccess: (state, action: PayloadAction<ChatMessageI>) => {
      state.chatHistory?.push(action.payload);
      state.loading.chatLoading = false;
    },
    conversationChatFailure: (state) => {
      state.loading.chatLoading = false;
    },
    enableContextAction: (state) => {
      state.enableContext = !state.enableContext;
      state.discoverBtnEnabled = state.enableContext ? true : false;
    },
    setContextIdAction: (state, action: PayloadAction<{ contextId: string }>) => {
      const { contextId } = action.payload;
      state.selectedContextId = contextId;
    },
    setUserMessageAction: (state, action: PayloadAction<string>) => {
      const userMessage = action.payload;
      state.userMessage = userMessage;
    }
  }
});
export const chatWithMayaSliceSelector = (state: IRootState) => state.chatWithMaya;

export const {
  getContextRequest,
  getContextSuccess,
  getContextFailure,
  conversationChatRequest,
  conversationChatSuccess,
  conversationChatFailure,
  enableContextAction,
  setContextIdAction,
  setUserMessageAction
} = ChatWithMayaSlice.actions;

export default ChatWithMayaSlice.reducer;
