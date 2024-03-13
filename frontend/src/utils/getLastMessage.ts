import { IFUserInSideBar } from '../models/userInSideBar';
import { messageApi } from '../service/message/message';

async function getLastMessage(users: IFUserInSideBar[]) {
	try {
		const promises = users.map(async (user) => {
			const res = await messageApi.getMessageApi(user._id);
			return res.data[res.data.length - 1];
		});

		const lastMessages = await Promise.all(promises);

		return lastMessages;
	} catch (error) {
		console.log('error', error);
	}
}

export default getLastMessage;
