
import { useContext } from 'react';
// import { useSession } from 'next-auth/react';
// import { useEffect, useState } from "react"
import { Link, useLocation } from 'react-router-dom';
import { ColorMode, ThemeContext } from '../../modules/ThemeProvider';
import Dropdown_M from '../Modules/Dropdown_M'



const Navbar = () => {
	const { colorMode, setColorMode } = useContext(ThemeContext);
	console.log(colorMode)
	// const {data: session} = useSession()
	// const [scroll, setScroll] = useState(false);

	// const handleScroll = () => {
	// 	if(window.scrollY >= 50){
	// 		setScroll(true);
	// 	}
	// 	else{
	// 		setScroll(false);
	// 	}
			
	// }
	// useEffect(() => {
	// 	window.addEventListener('scroll', handleScroll);
	// }) 
	const location = useLocation()
	const signin = location.pathname === '/signin'

	const chat = location.pathname === '/chat'

	return (
		<>

			{signin || chat ? 
				<></>
			:
			<div className="flex  text-black dark:text-white flex-row  w-full md:py-10 md:justify-around  z-20 md:items-center pl-5 md:pl-0">
				
				<div className="md:flex hidden flex-row gap-10">		
					<div className="cursor-pointer"  >
						<Link to="/chat">
							Chat	

						</Link>
					</div>
					<div className="cursor-pointer" > 
						Contact Us
					</div>
				</div>
				<div className="text-2xl font-medium pt-5 md:pt-0  cursor-pointer flex items-center "  >
					<Link to="/">
						Name
					</Link>	
				</div>
				
				<div className="flex flex-row items-center justify-center gap-4">
						<div className='flex flex-row items-center gap-10'>
							<div  className='md:flex hidden flex-row items-center justify-center gap-2 border-2 border-black dark:border-white cursor-pointer rounded-lg py-2 px-4  '>
								<Link to='/signin'>
									Get started
								</Link>
							</div>
							
							<button className='font-medium md:block hidden' onClick={() => {setColorMode(colorMode === ColorMode.dark ? ColorMode.light : ColorMode.dark)}}>
								{colorMode === ColorMode.dark ? 'Light' : 'Dark'}
							</button>		
						</div>
				</div>

				{/* <button className='font-medium md:hidden block right-0 absol' onClick={() => {setColorMode(colorMode === ColorMode.dark ? ColorMode.light : ColorMode.dark)}}>
					{colorMode === ColorMode.dark ? 'Light' : 'Dark'}
				</button> */}
				<div className='flex md:hidden w-full  absolute right-0'>
					<Dropdown_M />
				</div>

		
				
			</div>
			
		
			}
		</>
	)
}

export default Navbar