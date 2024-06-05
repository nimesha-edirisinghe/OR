import { ChatActionTypes } from 'types/maya';

export interface ChatContextRequestQueryParamI {}

export interface ChatContextRequestBodyI {}

export interface ChatRequestQueryParamI {}

export interface ChatRequestBodyI {
  context_id: string;
  action: ChatActionTypes;
  seq_id: string;
  chat_session_id: string | null;
  chat: {
    role: 'user';
    content: string;
    time: string;
  };
}
