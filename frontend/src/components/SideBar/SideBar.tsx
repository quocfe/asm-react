import { useEffect, useState } from 'react';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useSocketContext } from '../../context/SocketContext';
import { useAuth, useUser } from '../../hooks';
import { IFUserInSideBar } from '../../models/userInSideBar';
import { setSelectedConversation } from '../../redux/slice/ConversationSlice';
import getLastMessage from '../../utils/getLastMessage';
import InputSearch from './InputSearch';
import UserSideBar from './UserSideBar';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';

const SideBar = ({ isSidebarOpen }: any) => {
	const { logOut } = useAuth();
	const dispatch = useDispatch();
	const { getUsersInSideBar } = useUser();
	const [users, setUsers] = useState<IFUserInSideBar[]>([]);
	const [lastMessages, setLastMessages] = useState([]);
	const { socket } = useSocketContext();
	const { loading } = useSelector((state: RootState) => state.conversation);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await getUsersInSideBar();
				const arrLastMessage = await getLastMessage(res.data);
				setLastMessages(arrLastMessage);
				setUsers(res.data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [socket, loading]);

	// console.log('setMessages', setMessages);

	const handleClick = (user: IFUserInSideBar) => {
		dispatch(setSelectedConversation(user));
	};

	return (
		<div
			className={`md:flex md:flex-col md:items-center md:justify-between flex flex-col items-center justify-between h-full gap-2 border-r-2 border-borderColor md:w-[350px] md:static fixed  left-0 top-0 z-10 overflow-auto transition-all duration-300  ${
				isSidebarOpen ? 'w-96 bg-primary ' : 'w-0'
			}`}
		>
			<InputSearch />
			<div className="flex-1 w-full overflow-y-scroll ">
				<div className="flex flex-col gap-2 ">
					{users &&
						lastMessages &&
						users.map((user: IFUserInSideBar, index: number) => (
							<UserSideBar
								handleClick={() => handleClick(user)}
								key={user._id}
								user={user}
								msg={lastMessages[index]}
							/>
						))}
				</div>
			</div>
			<div
				className="p-3 mt-2 mr-auto rounded-full cursor-pointer bg-secondary "
				onClick={() => logOut()}
			>
				<RiLogoutBoxLine size={24} color="white" width="100%" />
			</div>
		</div>
	);
};

export default SideBar;
