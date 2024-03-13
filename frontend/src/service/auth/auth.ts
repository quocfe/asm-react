import { ApiEndPoint } from '../../constant/ApiEndPoint';
import axiosRoute from '../config';

export const authApi = {
	async Login(params: any) {
		try {
			const res = await axiosRoute.post(`${ApiEndPoint.auth}/login`, {
				username: params.username,
				password: params.password,
			});
			if (res.status === 200) {
				return res;
			}
		} catch (error: any) {
			return error.response;
		}
	},
	async Signup(params: any) {
		try {
			const res = await axiosRoute.post(`${ApiEndPoint.auth}/signup`, {
				fullName: params.fullName,
				username: params.username,
				password: params.password,
				confirmPassword: params.confirmPassword,
				gender: params.gender,
			});
			return res.data;
		} catch (error) {
			return error;
		}
	},
};
