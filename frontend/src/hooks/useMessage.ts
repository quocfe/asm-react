import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/reducer';
import {
	setMessages,
	startSendMessage,
	successSendMessage,
} from '../redux/slice/ConversationSlice';
import { messageApi } from '../service/message/message';

const useMessage = () => {
	const dispatch = useDispatch();
	const { messages } = useSelector((state: RootState) => state.conversation);
	// const auth = useSelector((state: RootState) => state.auth.user);
	const getMessage = async (id: string) => {
		try {
			const res = await messageApi.getMessageApi(id);
			if (res.status === 200) {
				dispatch(setMessages(res.data));
			}
		} catch (error) {
			console.log('error', error);
		}
	};

	const sendMessage = async (id: string, message: string) => {
		try {
			dispatch(startSendMessage());
			const res = await messageApi.sendMessageApi(id, message);
			if (res.status === 200) {
				dispatch(setMessages([...messages, res.data]));
			}
			dispatch(successSendMessage());
		} catch (error) {
			console.log('error', error);
		}
	};

	return { getMessage, sendMessage };
};

export default useMessage;
