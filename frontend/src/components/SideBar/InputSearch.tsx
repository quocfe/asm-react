import { CiSearch } from 'react-icons/ci';

export default function InputSearch() {
	return (
		<form className="w-full p-2">
			<div className="flex items-center justify-between gap-2">
				<input
					type="text"
					placeholder="Search…"
					className="flex-1 border-none rounded-full outline-none input"
				/>
				<button
					type="submit"
					className="text-white border-none btn btn-circle bg-sky-500"
				>
					<CiSearch className="w-6 h-6 outline-none" />
				</button>
			</div>
		</form>
	);
}
