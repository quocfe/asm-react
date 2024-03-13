import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import useListenMessage from '../../hooks/useListenMessage';
import { IFMessage } from '../../models/message';
import { RootState } from '../../redux/reducer';
import Message from './Message';
import { extractTime } from '../../utils/extractTime';

const Messages = () => {
	useListenMessage();
	const lastMsgRef = useRef<HTMLDivElement | null>(null);
	const messages = useSelector(
		(state: RootState) => state.conversation.messages
	);
	useEffect(() => {
		lastMsgRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const currentDate = new Date();
	const isWithin3Days = (messageDate: Date) => {
		const diffTime = Math.abs(currentDate.getTime() - messageDate.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays > 1;
	};

	return (
		<div className="flex-1 p-2 overflow-y-scroll">
			{messages?.map((message: IFMessage, index: number) => (
				<div key={index} ref={lastMsgRef}>
					{/* {isWithin3Days(new Date(message.createdAt)) && (
						<p className="font-semibold text-[12px] text-center my-2">
							{extractTime(message.createdAt)}
						</p>
					)} */}
					<Message message={message} />
				</div>
			))}
		</div>
	);
};

export default Messages;
