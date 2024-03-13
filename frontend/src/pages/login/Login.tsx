import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

type Inputs = {
	username: string;
	password: string;
};

const Login = () => {
	const { logIn } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		await logIn(data);
	};

	return (
		<div className="flex items-center justify-center h-screen p-4">
			<div className="flex flex-col items-center justify-center mx-auto w-[550px] ">
				<div className="w-full p-6 bg-gray-400 bg-opacity-0 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg">
					<h1 className="text-3xl font-semibold text-center text-gray-300">
						Login
						<span className="text-blue-500"> ChatApp</span>
					</h1>

					<form onSubmit={handleSubmit(onSubmit)}>
						<div>
							<label className="p-2 label">
								<span className="text-base label-text">Username</span>
							</label>
							<input
								type="text"
								placeholder="Enter username"
								className="w-full h-10 input input-bordered"
								{...register('username', {
									required: 'Username is required',
								})}
							/>
							{errors.username && (
								<span className="text-red-500">{errors.username.message}</span>
							)}
						</div>

						<div>
							<label className="label">
								<span className="text-base label-text">Password</span>
							</label>
							<input
								type="password"
								placeholder="Enter Password"
								className="w-full h-10 input input-bordered"
								{...register('password', {
									required: 'Password is required',
									minLength: {
										value: 6,
										message: 'Password should be at least 6 characters',
									},
								})}
							/>
							{errors.password && (
								<span className="text-red-500">{errors.password.message}</span>
							)}
						</div>
						<Link
							to={'/signup'}
							className="inline-block mt-2 text-sm hover:underline hover:text-blue-600"
						>
							{"Don't"} have an account?
						</Link>

						<div>
							<button className="mt-2 btn btn-block btn-xl">Login</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
export default Login;
