import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { useSocketContext } from '../../context/SocketContext';
import useMessage from '../../hooks/useMessage';
import { IFMessage } from '../../models/message';
import { IFUserInSideBar } from '../../models/userInSideBar';
import { RootState } from '../../redux/reducer';
import { useUser } from '../../hooks';

interface Props {
	user: IFUserInSideBar;
	handleClick: () => void;
	msg: IFMessage;
}

const UserSideBar: React.FC<Props> = ({ user, handleClick, msg }) => {
	const { getMessage } = useMessage();
	const { getUserById } = useUser();
	const { onlineUsers, socket } = useSocketContext();
	const [lastMessage, setLastMessage] = useState<string>('');
	const userSelected = useSelector(
		(state: RootState) => state.conversation.selectedConversation
	) as IFUserInSideBar | null;

	const isSelect = user?._id === userSelected?._id;
	const userOnline = onlineUsers.includes(user?._id);

	useEffect(() => {
		const fetchData = async () => {
			if (userSelected?._id) {
				await getMessage(userSelected?._id);
			}
		};
		fetchData();
	}, [userSelected, socket]);

	useEffect(() => {
		const formatMessage = () => {
			const data =
				msg?.senderId === user?._id
					? `${user.fullName.split(' ').pop()}: ${msg.message} `
					: `Bạn: ${msg?.message}`;
			setLastMessage(data);
		};
		formatMessage();
	}, [msg, user]);

	useEffect(() => {
		const handleNewMessage = async (newMessage: IFMessage) => {
			if (user._id === newMessage.senderId) {
				const response = await getUserById(newMessage.receiverId);
				const userReceiver = response.data;
				const data =
					newMessage?.senderId === user?._id
						? `${userReceiver.fullName.split(' ').pop()}: ${newMessage.message}`
						: `Bạn: ${newMessage?.message}`;
				setLastMessage(data);
			}
		};

		(socket as Socket | null)?.on('newMessage', handleNewMessage);

		return () => {
			(socket as Socket | null)?.off('newMessage', handleNewMessage);
		};
	}, [socket, getUserById, user]);

	return (
		<div
			className={`flex flex-row-reverse items-center justify-end gap-4 p-2 rounded-lg cursor-pointer hover:bg-hover ${
				isSelect ? 'bg-active' : ''
			} `}
			onClick={handleClick}
		>
			<div className="flex flex-col">
				<p className="text-white text-[16px] font-semibold">{user.fullName}</p>
				<span className="text-[14px] overflow-hidden line-clamp-1 break-words">
					{lastMessage}
				</span>
			</div>
			<div className={`avatar ${userOnline ? 'online' : ''}`}>
				<div className="rounded-full w-14">
					<img src={user.profilePic} alt={user.fullName} />
				</div>
			</div>
		</div>
	);
};

export default UserSideBar;
