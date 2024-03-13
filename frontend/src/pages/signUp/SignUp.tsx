import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import useAuth from '../../hooks/useAuth';

type Inputs = {
	fullName: string;
	username: string;
	password: string;
	confirmPassword: string;
	gender: string;
};

const SignUp = () => {
	const { signUp } = useAuth();

	const validationSchema = Yup.object().shape({
		fullName: Yup.string().required('Full name is required'),
		username: Yup.string()
			.required('Username is required')
			.min(3, 'Username must be at least 3 characters long'),
		password: Yup.string()
			.required('Password is required')
			.min(6, 'Password must be at least 6 characters'),
		confirmPassword: Yup.string()
			.required('Confirm Password is required')
			.oneOf([Yup.ref('password')], 'Passwords must match'),
		gender: Yup.string().required('Gender is required'),
	});
	const formOptions = { resolver: yupResolver(validationSchema) };

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>(formOptions);

	const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
		await signUp(data);
		// console.log(data);
	};

	return (
		<div className="flex items-center justify-center h-screen p-4">
			<div className="flex flex-col items-center justify-center mx-auto w-[550px]">
				<div className="w-full p-6 bg-gray-400 bg-opacity-0 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg">
					<h1 className="text-3xl font-semibold text-center text-gray-300">
						Sign Up <span className="text-blue-500"> ChatApp</span>
					</h1>

					<form onSubmit={handleSubmit(onSubmit)}>
						<div>
							<label className="p-2 label">
								<span className="text-base text-white label-text">
									Full Name
								</span>
							</label>
							<input
								type="text"
								placeholder="John Doe"
								className="w-full h-10 text-white input input-bordered"
								{...register('fullName')}
							/>
							{errors.fullName && (
								<span className="text-sm text-red-500">
									{errors.fullName.message}
								</span>
							)}
						</div>

						<div>
							<label className="p-2 label ">
								<span className="text-base text-white label-text ">
									Username
								</span>
							</label>
							<input
								type="text"
								placeholder="johndoe"
								className="w-full h-10 text-white input input-bordered "
								{...register('username')}
							/>
							{errors.username && (
								<span className="text-sm text-red-500">
									{errors.username.message}
								</span>
							)}
						</div>

						<div>
							<label className="label">
								<span className="text-base text-white label-text">
									Password
								</span>
							</label>
							<input
								type="password"
								placeholder="Enter Password"
								className="w-full h-10 text-white input input-bordered"
								{...register('password')}
							/>
							{errors.password && (
								<span className="text-sm text-red-500">
									{errors.password.message}
								</span>
							)}
						</div>

						<div>
							<label className="label">
								<span className="text-base text-white label-text">
									Confirm Password
								</span>
							</label>
							<input
								type="password"
								placeholder="Confirm Password"
								className="w-full h-10 text-white input input-bordered"
								{...register('confirmPassword')}
							/>
							{errors.confirmPassword && (
								<span className="text-sm text-red-500">
									{errors.confirmPassword.message}
								</span>
							)}
						</div>

						<div>
							<label className="label">
								<span className="text-base text-white label-text">Gender</span>
							</label>
							<select
								className="w-full max-w select select-bordered"
								{...register('gender')}
								defaultValue="male"
							>
								<option disabled>Gender</option>
								<option value="male">Male</option>
								<option value="female">Female</option>
							</select>
							{errors.gender && (
								<span className="text-sm text-red-500">
									{errors.gender.message}
								</span>
							)}
						</div>

						<Link
							to={'/login'}
							className="inline-block mt-8 text-sm text-white hover:underline hover:text-blue-600"
						>
							Already have an account?
						</Link>

						<div>
							<button className="mt-2 border btn btn-block btn-xl border-slate-700">
								Sign Up
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
