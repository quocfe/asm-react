import { useState } from 'react';
import { SideBar, ContainerMessage } from '../../components';
import { CiMenuBurger, CiMenuFries } from 'react-icons/ci';

export default function Home() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};
	return (
		<div className="h-screen ">
			<div className="w-full h-full p-3 mx-auto overflow-hidden md:items-center md:justify-center md:flex">
				{!isSidebarOpen ? (
					<CiMenuBurger
						className="fixed font-bold cursor-pointer right-10 top-9 md:hidden"
						size={20}
						color="white"
						onClick={toggleSidebar}
					/>
				) : (
					<CiMenuFries
						className="fixed font-bold cursor-pointer right-10 top-9 md:hidden"
						size={20}
						color="white"
						onClick={toggleSidebar}
					/>
				)}

				<SideBar isSidebarOpen={isSidebarOpen} />
				<ContainerMessage />
			</div>
		</div>
	);
}
