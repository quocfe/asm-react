import { useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useMessage } from '../../hooks';
import { RootState } from '../../redux/reducer';

const MessageSend = ({ receiverId }: any) => {
	const [message, setMessage] = useState<string>('');
	const { loading } = useSelector((state: RootState) => state.conversation);
	const { sendMessage } = useMessage();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(receiverId, message);
		setMessage('');
	};

	return (
		<form className="px-4 my-3" onSubmit={handleSubmit}>
			<div className="flex items-center w-full gap-2">
				<input
					type="text"
					className="text-sm border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white border-none outline-none"
					placeholder="Aa"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button type="submit">
					{loading ? (
						<div className="loading loading-spinner "></div>
					) : (
						<IoIosSend size={24} className="hover:text-sky-500" />
					)}
				</button>
			</div>
		</form>
	);
};

export default MessageSend;
