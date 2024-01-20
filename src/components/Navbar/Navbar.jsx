import { useContext, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ColorMode, ThemeContext } from '../../modules/ThemeProvider';
import Dropdown_M from '../Modules/Dropdown_M';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";


const Navbar = () => {
	const navigate = useNavigate();

	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
		setUser(user);
		});

		return () => {
			unsubscribe();
			setUser(null);
		} // Cleanup the listener on unmount
	}, []);

	const handleSignOut = () => {
		signOut(auth).then(() => {
			navigate('/'); 
		// Sign-out successful.
		}).catch((error) => {
			console.log(error)
		});
	}

	const { colorMode, setColorMode } = useContext(ThemeContext);
	console.log(colorMode)
	const location = useLocation()
	const signin = location.pathname === '/signin'
	const signup = location.pathname === '/signup'

	const chat = location.pathname === '/chat'

	const anonymousSignin = async () => {
		try {
		  await signInAnonymously(auth);
			console.log('user signed in successfully')
		} catch (error) {
		  console.error('Error signing in anonymously:', error);
		}
	};
	return (
		<>

			{signin || chat || signup ? 
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
								{ user && user.isAnonymous ? (
									// If the user is signed in anonymously, only show "Get started" button
									<Link to='/signup'>
										Get started
									</Link>
									) 
									: 
									(
										user ? (
											// If the user is signed in with a provider, email, or SMS, show "Log Out" button
											<div onClick={handleSignOut}>
												Log Out
											</div>
										)
										: 
										(
											<Link to='/signup'>
												Get started
											</Link>
										) 
									)
								}
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