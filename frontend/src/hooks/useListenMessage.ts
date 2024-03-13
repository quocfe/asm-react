import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocketContext } from '../context/SocketContext';
import { RootState } from '../redux/reducer';
import { setMessages } from '../redux/slice/ConversationSlice';
import { Socket } from 'socket.io-client';
import { useMessage } from '.';

const useListenMessage = () => {
	const dispatch = useDispatch();
	const { sendMessage } = useMessage();

	const { messages } = useSelector((state: RootState) => state.conversation);
	const { socket } = useSocketContext();

	useEffect(() => {
		(socket as Socket | null)?.on('newMessage', (newMessage: any) => {
			dispatch(setMessages([...messages, newMessage]));
		});

		return () => {
			(socket as Socket | null)?.off('newMessage');
		};
	}, [socket, messages, sendMessage]);
};

export default useListenMessage;
