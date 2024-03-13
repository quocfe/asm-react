import { userApi } from '../service';

const useUser = () => {
	const getUsersInSideBar = async () => {
		try {
			const data = await userApi.getUsers();
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const getUserById = async (id: string) => {
		try {
			const data = await userApi.getUserById(id);
			return data;
		} catch (error) {
			console.log(error);
		}
	};
	return { getUsersInSideBar, getUserById };
};

export default useUser;
