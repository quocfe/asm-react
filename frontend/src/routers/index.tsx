import { Navigate, Route, Routes } from 'react-router-dom';
import { Home, Login, SignUp } from '../pages';
import { RootState } from '../redux/reducer';
import { useSelector } from 'react-redux';

const RoutesMain = () => {
	const token = useSelector((state: RootState) => state.auth.user?.token);
	return (
		<Routes>
			<Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
			<Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
			<Route
				path="/signup"
				element={!token ? <SignUp /> : <Navigate to="/" />}
			/>
		</Routes>
	);
};

export default RoutesMain;
