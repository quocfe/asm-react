import axios from 'axios';

const axiosRoute = axios.create({
	baseURL: 'http://localhost:3000/api/',
});

axiosRoute.interceptors.request.use(
	(config) => {
		const tokenInLocal: string | null = localStorage.getItem('token');
		if (tokenInLocal !== null) {
			const accessToken: string = JSON.parse(tokenInLocal);
			config.headers.Authorization = `Bearer ${accessToken}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// axiosRoute.interceptors.response.use(
// 	(response) => {
// 		return response;
// 	},
// 	async (error) => {
// 		const originalRequest = error.config;

// 		if (error.response.status === 403 && !originalRequest._retry) {
// 			originalRequest._retry = true;

// 			const user = JSON.parse(localStorage.getItem('user'));
// 			const { data } = await userApi.getUser(user.id);
// 			const refreshToken = data[0].refreshToken;
// 			const idUser = data[0].idUser;
// 			const decoded = jwtDecode(refreshToken);

// 			if (decoded.exp < Date.now() / 1000) {
// 				alert('Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại');
// 				window.location.href = '/signin';
// 				localStorage.removeItem('accessToken');
// 				localStorage.removeItem('user');
// 				return;
// 			} else {
// 				const dataRefreshToken = {
// 					refreshToken: refreshToken,
// 					idUser: idUser,
// 				};

// 				try {
// 					const refreshResponse = await authApi.refreshToken(dataRefreshToken);
// 					const newAccessToken = refreshResponse.data.accessToken;
// 					localStorage.setItem('accessToken', newAccessToken);
// 					originalRequest.headers.token = 'Bearer ' + newAccessToken;
// 					return axios(originalRequest);
// 				} catch (error) {
// 					console.error('Refresh token error:', error.response.data);
// 				}
// 			}
// 		}

// 		return Promise.reject(error);
// 	}
// );

export default axiosRoute;
