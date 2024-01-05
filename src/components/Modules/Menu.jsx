
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import {  signOut } from "firebase/auth";
import {  auth } from "../../firebase";
 
const Dropdown = () => {
	const currentUser = auth.currentUser;
	const navigate = useNavigate();
	const handleSignOut = () => {
		signOut(auth).then(() => {
			navigate('/'); 
			// Sign-out successful.
		}).catch((error) => {
		  console.log(error)
	  });
	}
	return (
		<div>
			<DropdownMenu.Root >
				<DropdownMenu.Trigger className=" cursor-pointer  flex flex-row  gap-2  pt-1.5 pb-1.5 focus:outline-none">
					{auth && 
						<div>
							{currentUser?.displayName}
						</div>
					}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content sideOffset={8} align="start" className="z-100  md:backdrop-blur-sm md:bg-gradient-to-br from-black/30 via-black/20 to-black/10  md:w-60 w-40   md:pt-2 pt-1 pb-1 md:pb-2 border-2 flex flex-col  rounded-lg  ">
					<DropdownMenu.Item  className='focus:outline-none cursor-pointer hover:underline-offset-2 hover:underline hover:bg-white/20 p-2'>
						Settings
					</DropdownMenu.Item>
					<DropdownMenu.Item onClick={(handleSignOut)}  className='focus:outline-none cursor-pointer hover:underline-offset-2 hover:underline hover:bg-white/20 p-2'>
						Sign Out
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	)
}

export default Dropdown