import { createSlice } from '@reduxjs/toolkit';

const ConversationSlice = createSlice({
	name: 'conversation',
	initialState: {
		selectedConversation: null,
		messages: [],
		loading: false,
	},
	reducers: {
		setSelectedConversation: (state, action) => {
			state.selectedConversation = action.payload;
		},
		setMessages: (state, action) => {
			state.messages = action.payload;
			state.loading = false;
		},
		startSendMessage: (state) => {
			console.log('startSendMessage');
			state.loading = true;
		},
		successSendMessage: (state) => {
			console.log('successSendMessage');
			state.loading = false;
		},
	},
});

export const {
	setSelectedConversation,
	setMessages,
	startSendMessage,
	successSendMessage,
} = ConversationSlice.actions;

export default ConversationSlice.reducer;
