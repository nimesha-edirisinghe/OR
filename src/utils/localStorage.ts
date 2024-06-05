import { v4 as uuidv4 } from 'uuid';
import { SESSION_STORAGE_KEY } from './constants';
export const storeInLocal = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    console.error('unable to store item in local ', error);
  }
};

export const getFromLocal = (key: string) => {
  try {
    const item = window.localStorage.getItem(key) || '';
    return item;
  } catch (error) {
    console.error('unable to fetch item from local ', error);
  }
};

export const setSessionId = (): string => {
  let sessionId = localStorage.getItem(SESSION_STORAGE_KEY);

  if (!sessionId) {
    sessionId = uuidv4().substring(0, 8);
    localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  }

  return sessionId;
};

export const getSessionId = (): string | null => {
  return localStorage.getItem(SESSION_STORAGE_KEY);
};

export const clearSessionId = (): void => {
  localStorage.removeItem(SESSION_STORAGE_KEY);
};
