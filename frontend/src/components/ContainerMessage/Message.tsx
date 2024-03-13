import { useSelector } from 'react-redux';
import { IFMessage } from '../../models/message';
import { IFUserInSideBar } from '../../models/userInSideBar';
import { RootState } from '../../redux/reducer';
import { extractTime } from '../../utils/extractTime';
import ReactToolTip from '../ReactToolTip/ReactToolTip';
import { useEffect, useRef, useState } from 'react';
import IconHover from '../IconHover/IconHover';

interface MessageProps {
	message: IFMessage;
}

const Message = ({ message }: MessageProps) => {
	const auth: IFUserInSideBar = useSelector(
		(state: RootState) => state.auth.user
	);
	const selectedConversation = useSelector(
		(state: RootState) => state.conversation.selectedConversation
	) as IFUserInSideBar | null;
	const [messageWidth, setMessageWidth] = useState<number | null>(null);
	const fromMe = message.senderId === auth._id;

	const chatClassName = fromMe ? 'chat-end' : 'chat-start';
	const positonClassName = fromMe ? 'left' : 'right';
	const profilePic = fromMe
		? auth.profilePic
		: selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? 'bg-blue-500' : '';
	const formattedTime = extractTime(message.createdAt);
	const messageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (messageRef.current) {
			const width = messageRef.current.offsetWidth;
			setMessageWidth(width);
		}
	}, [messageRef]);

	return (
		<div className={`chat ${chatClassName}`}>
			<div className="chat-image avatar">
				<div className="w-10 rounded-full">
					<img alt="Tailwind CSS chat bubble component" src={profilePic} />
				</div>
			</div>
			<ReactToolTip
				theme="dark"
				position={positonClassName}
				title={formattedTime}
				widthRef={messageWidth}
			>
				<p
					className={`text-white max-w-[100%]  chat-bubble chat-bubble-info text-justify ${bubbleBgColor}`}
					ref={messageRef}
				>
					{message.message}
				</p>
				<IconHover />
			</ReactToolTip>

			{/* <div className="opacity-50 chat-footer">Delivered</div> */}
		</div>
	);
};

export default Message;
