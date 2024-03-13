import { BsThreeDotsVertical } from 'react-icons/bs';

const IconHover = () => {
	return (
		<div className="absolute flex items-center justify-around top-[50%] -translate-y-2/4">
			<div className="p-2 bg-transparent rounded-full cursor-pointer hover:bg-hover">
				<BsThreeDotsVertical />
			</div>
			<div className="p-2 bg-transparent rounded-full cursor-pointer hover:bg-hover">
				<BsThreeDotsVertical />
			</div>
			<div className="p-2 bg-transparent rounded-full cursor-pointer hover:bg-hover">
				<BsThreeDotsVertical />
			</div>
		</div>
	);
};

export default IconHover;
