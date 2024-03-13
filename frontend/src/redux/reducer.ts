import { combineReducers } from '@reduxjs/toolkit';
import AuthSlice from './slice/AuthSlice';
import ConversationSlice from './slice/ConversationSlice';

export const rootReducer = combineReducers({
	auth: AuthSlice,
	conversation: ConversationSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
