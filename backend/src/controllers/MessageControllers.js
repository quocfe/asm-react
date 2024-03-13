import Message from './../models/message.js';
import Conversation from './../models/conversation.js';
import {
	getReceiverSocketId,
	getSenderSocketId,
	io,
} from '../socket/socket.js';

const MessageControllers = {
	async sendMessage(req, res, next) {
		try {
			const { message } = req.body;
			const { id: receiverId } = req.params;
			const senderId = req.user._id;

			let conversation = await Conversation.findOne({
				participants: { $all: [senderId, receiverId] },
			});

			if (!conversation) {
				conversation = await Conversation.create({
					participants: [senderId, receiverId],
				});
			}

			const newMessage = new Message({
				senderId,
				receiverId,
				message,
			});

			if (newMessage) {
				conversation.messages.push(newMessage._id);
			}
			await Promise.all([conversation.save(), newMessage.save()]);

			// io.emit('newMessage', newMessage);
			const receiverSocketId = getReceiverSocketId(receiverId);
			if (receiverSocketId) {
				io.to(receiverSocketId).emit('newMessage', newMessage);
			}

			const senderSocketId = getSenderSocketId(senderId);
			if (senderSocketId) {
				io.to(senderSocketId).emit('newMessage', newMessage);
			}

			res.status(201).json(newMessage);
		} catch (error) {
			console.log('Error in message controller', error.message);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	},

	async getMessage(req, res, next) {
		try {
			const { id: userToChatId } = req.params;
			const senderId = req.user._id;

			const conversation = await Conversation.findOne({
				participants: { $all: [senderId, userToChatId] },
			}).populate('messages'); // NOT REFERENCE BUT ACTUAL MESSAGES

			if (!conversation) return res.status(200).json([]);

			const messages = conversation.messages;

			res.status(200).json(messages);
		} catch (error) {
			console.log('Error in getMessages controller: ', error.message);
			res.status(500).json({ error: 'Internal server error' });
		}
	},
};

export default MessageControllers;
