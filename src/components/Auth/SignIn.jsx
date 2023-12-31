// import router from "next/router"
import React, {  useEffect, useState } from "react";
// import { signIn } from "next-auth/react"
import {signInWithPopup} from "firebase/auth";
import {auth, googleProvider} from "../../firebase";
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

const Signin = () => {
	const navigate = useNavigate();



	// const handleSignIn = () => {
	// 	signIn('google', {callbackUrl: '/app/dashboard'})
	// }
	const [value,setValue] = useState('')
	const handleClick =()=>{
		signInWithPopup(auth, googleProvider).then((data)=>{
			setValue(data.user.email)
			localStorage.setItem("email",data.user.email)
			navigate('/chat'); 
		})
	}

	useEffect(()=>{
		setValue(localStorage.getItem('email'))
	})
	

	return (
		<div className="flex flex-row  w-full bg-[#111111] text-white">
			<div className="bg-signin w-full bg-no-repeat lg:bg-[length:896px_1040px]  bg-blend-multiply bg-black/40 ">
				<div className="font-bold text-[69px] flex flex-col h-screen  justify-center leading-tight pl-[5vh] ">
					<span>
						Copilot,
					</span>
					<span>
						For Lawyers.
					</span>
				</div>
			</div>
			<div className="w-full">
				<div  className="text-3xl font-medium cursor-pointer absolute top-0 right-0 pt-10 pr-[5vh]">
					<Link to="/">
						Name
					</Link>	
				</div>
				<div className="flex flex-col justify-center gap-8 items-center h-screen">
					<div className="font-bold text-4xl">
						Good to see you again!
					</div>
					{/* <div className="flex flex-col gap-6">
						<input 
							type="email"
							placeholder="Email"
							className="rounded-lg border-2 border-[#C4C4C4] bg-[#D6D6D6] bg-opacity-25 w-96 p-2 focus:outline-none" 
						/>
						<input 
							type="password"
							placeholder="Password"
							className="rounded-lg border-2 border-[#C4C4C4] bg-[#D6D6D6] bg-opacity-25 w-96 p-2 focus:outline-none" 
						/>
					</div> */}
					<div className="flex flex-row items-center gap-2 ">
						<div onClick={handleClick}  className="bg-white text-black border-2 cursor-pointer w-48 flex flex-row items-center justify-center pt-2 pb-2 rounded-lg">
							Sign In with Google
						</div>
						{/* onClick={() => handleSignIn()} */}
						{/* <div onClick={() => handleSignOut()} className="border-2 cursor-pointer rounded-lg w-48 flex flex-row items-center justify-center pt-2 pb-2">
							Sign Up
						</div> */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Signin





