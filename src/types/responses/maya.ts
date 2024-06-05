export interface ChatContextI {
  title: string;
  description: string;
  id: string;
  icon: string;
}

export interface ChatMessageI {
  context_id: string;
  message_id?: string;
  seq_id: string;
  chat_session_id: string | null;
  chat: {
    role: 'assistant' | 'user' | 'system';
    content: string;
    content_type: 'text';
    time: string;
  };
}

export interface LoadingI {
  chatLoading: boolean;
}
