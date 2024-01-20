import React from 'react';
import { useContext, useState, useEffect } from 'react';

import * as Collapsible from '@radix-ui/react-collapsible';
import { HamburgerMenuIcon, Cross2Icon } from '@radix-ui/react-icons';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { onAuthStateChanged } from 'firebase/auth';



const Dropdown_M = () => {
  const [open, setOpen] = React.useState(false);
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

  return (
	<Collapsible.Root className={open ? "w-full h-screen flex flex-col  bg-black/70 backdrop-blur-sm ": "w-full flex flex-row justify-end "} open={open} onOpenChange={setOpen}>
		<Collapsible.Trigger asChild>
			<button className="flex items-end justify-end z-10 right-0 pr-5 pt-8">{open ? <Cross2Icon className="h-7 w-7"/> : <HamburgerMenuIcon className="h-7 w-7"/>}</button>
		</Collapsible.Trigger>
		<div className="flex flex-col justify-around absolute  items-center w-full -z-10  mt-10 h-full">
			<Collapsible.Content className=" mt-8  flex flex-col justify-start gap-4 items-center">
				<div  className="bg-black/40 text-white hover:bg-black/60 border-2 cursor-pointer rounded-lg p-1 w-32 flex flex-row items-center justify-center">
					<Link to="/">
						Contact
					</Link>
				</div>
				<Link to="/chat">
					<div className="bg-black/40 text-white hover:bg-black/60 border-2 cursor-pointer rounded-lg p-1 w-32 flex flex-row items-center justify-center">
						Chat
					</div>
				</Link>
			</Collapsible.Content>
			<Collapsible.Content>
				<div  className="border-2 bg-white text-black cursor-pointer rounded-lg w-32 flex flex-row items-center justify-center pt-1.5 pb-1.5">
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
				
			</Collapsible.Content>
		</div>

	</Collapsible.Root>
  );
};

export default Dropdown_M;