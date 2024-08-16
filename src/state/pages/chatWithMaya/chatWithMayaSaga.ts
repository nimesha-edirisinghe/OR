import { call, put, select, takeEvery } from 'redux-saga/effects';
import { genAiApi } from 'api';
import { IUser, userSliceSelector } from 'state/user/userState';
import { ChatRequestBodyI } from 'types/requests/maya';
import { responseValidator } from 'state/helpers/validateHelper';
import { ApiResponse } from 'types/api';
import { ChatContextI, ChatMessageI } from 'types/responses/maya';
import {
  IChatWithMayaSlice,
  chatWithMayaSliceSelector,
  conversationChatFailure,
  conversationChatSuccess,
  getContextFailure,
  getContextSuccess
} from './chatWithMayaState';
import { PayloadAction } from '@reduxjs/toolkit';
import { ChatActionTypes } from 'types/maya';
import { getSessionId } from 'utils/localStorage';

function* getContextRequestSaga() {
  try {
    let userState: IUser = yield select(userSliceSelector);
    let selectedOrgId = userState.selectedOrg.orgKey;
    if (userState && userState.keyCloakInfo && selectedOrgId) {
      const response: ApiResponse<ChatContextI[]> = yield call(() => genAiApi.getContextRequest());

      if (!responseValidator(response, true)) {
        yield put(getContextFailure());
        return;
      }
      if (response) {
        yield put(getContextSuccess(response.data));
      } else {
        yield put(getContextFailure());
      }
    }
  } catch (error) {
    yield put(getContextFailure());
  }
}
function* conversationChatRequestSaga(
  action: PayloadAction<{ chatActionType: ChatActionTypes; message?: string }>
) {
  try {
    const { message, chatActionType } = action.payload;
    let userState: IUser = yield select(userSliceSelector);
    const mayaState: IChatWithMayaSlice = yield select(chatWithMayaSliceSelector);
    const currentSequenceId = mayaState.currentSequenceId;
    const selectedContextId = mayaState.selectedContextId;
    const currentTime = Date.now().toString();
    const sessionId = getSessionId();
    const requestBody: ChatRequestBodyI = {
      context_id: selectedContextId || '',
      action: chatActionType,
      seq_id: currentSequenceId,
      chat_session_id: sessionId,
      chat: {
        role: 'user',
        content: chatActionType === 'set-context' ? '' : message || '',
        time: currentTime
      }
    };

    if (userState && userState.keyCloakInfo) {
      const response: ApiResponse<ChatMessageI> = yield call(() =>
        genAiApi.conversationChatRequest(requestBody)
      );
      if (!responseValidator(response, true)) {
        yield put(conversationChatFailure());
        return;
      }
      if (response) {
        yield put(conversationChatSuccess(response.data));
      } else {
        yield put(conversationChatFailure());
      }
    }
  } catch (error) {
    yield put(conversationChatFailure());
  }
}

function* chatWithMayaSaga() {
  yield takeEvery('chatWithMaya/getContextRequest', getContextRequestSaga);
  yield takeEvery('chatWithMaya/conversationChatRequest', conversationChatRequestSaga);
}

export default chatWithMayaSaga;
