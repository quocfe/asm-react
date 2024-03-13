import { ApiEndPoint } from '../../constant/ApiEndPoint';
import axiosRoute from '../config';

export const userApi = {
	async getUsers() {
		try {
			const res = await axiosRoute.get(`${ApiEndPoint.users}`);
			if (res.status === 200) {
				return res;
			}
		} catch (error: any) {
			return error.response;
		}
	},
	async getUserById(id: string) {
		try {
			const res = await axiosRoute.get(`${ApiEndPoint.users}/${id}`);
			if (res.status === 200) {
				return res;
			}
		} catch (error: any) {
			return error.response;
		}
	},
};
