import { ApiEndPoint } from '../../constant/ApiEndPoint';
import axiosRoute from '../config';

export const messageApi = {
	async getMessageApi(id: string) {
		try {
			const res = await axiosRoute.get(`${ApiEndPoint.message}/${id}`);
			return res;
		} catch (error: any) {
			return error.response;
		}
	},
	async sendMessageApi(id: string, message: string) {
		try {
			const res = await axiosRoute.post(`${ApiEndPoint.message}/send/${id}`, {
				message,
			});
			return res;
		} catch (error: any) {
			return error.response;
		}
	},
};
