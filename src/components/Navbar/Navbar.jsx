
import { useContext } from 'react';
// import { useSession } from 'next-auth/react';
// import { useEffect, useState } from "react"
import { Link, useLocation } from 'react-router-dom';
import { ColorMode, ThemeContext } from '../../modules/ThemeProvider';



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
			<div className="flex text-black dark:text-white flex-row  w-full pt-5 justify-evenly fixed  z-20 items-center">
				<div className="text-3xl font-medium  cursor-pointer flex items-center "  >
					<Link to="/">
						Name
					</Link>	
				</div>
				<div className="md:flex hidden flex-row gap-10   ">		
					<div className="cursor-pointer"  >
						<Link to="/chat">
							Chat	

						</Link>
					</div>
					<div className="cursor-pointer" > 
						Contact Us
					</div>
				</div>
				<div className="flex flex-row items-center justify-center gap-4">
					{/* {!session ?  */}
						<div className='flex flex-row items-center gap-10'>
							{/* <div onClick={() => navigate('/app/signin')} className='cursor-pointer '>
								Signin
							</div> */}
							<div  className='flex flex-row items-center justify-center gap-2 border-2 border-black dark:border-white cursor-pointer rounded-lg py-2 px-4  '>
								<Link to='/signin'>
									Get started
								</Link>

								
								{/* <img src="/images/arrow-right.svg" draggable="false" /> */}
							</div>
							<button className='font-medium' onClick={() => {
                setColorMode(colorMode === ColorMode.dark ? ColorMode.light : ColorMode.dark)
                }}>{colorMode === ColorMode.dark ? 'Light' : 'Dark'}
								
							</button>
							
						</div>
					{/* // 	:
					// 	<>
					// 		<div onClick={() => navigate('/app/dashboard')}  className='flex flex-row items-center justify-center gap-2 border-2 cursor-pointer rounded-lg p-2 '>
					// 			<div>
					// 				Dashboard
					// 			</div>
					// 			<img src="/images/arrow-right.svg" draggable="false" />
					// 		</div>
					// 	</>
					// }		 */}
				</div>
			</div>
			}
		</>
	)
}

export default Navbar