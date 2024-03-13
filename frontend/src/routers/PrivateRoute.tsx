import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../redux/store';

const PrivateRoute: FunctionComponent<any> = () => {
	const user = useSelector((state: RootState) => state.auth.user);

	return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
