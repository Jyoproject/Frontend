// import router from "next/router"
import React, {  useEffect, useState } from "react";
// import { signIn } from "next-auth/react"
import {signInWithPopup,FacebookAuthProvider, OAuthProvider} from "firebase/auth";
import {auth, googleProvider, facebookProvider, appleProvider} from "../../firebase";
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import PhoneSignIn from "./PhoneSignIn";
import EmailPasswordSignUp from "./EmailPasswordSignUp";

const Signin = () => {
	const navigate = useNavigate();
	const [value,setValue] = useState('')
	const googleSignin =()=>{
		signInWithPopup(auth, googleProvider)
		.then((data)=>{
			setValue(data.user.email)
			localStorage.setItem("email",data.user.email)
			navigate('/chat'); 
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.user?.email;
			console.log(errorMessage)
			// The AuthCredential type that was used.
			// const credential = FacebookAuthProvider.credentialFromError(error);

			// ...
		});
	}

	const facebookSignin =()=>{
		signInWithPopup(auth, facebookProvider)
			.then((result) => {
				// The signed-in user info.
				const user = result.user;

				// This gives you a Facebook Access Token. You can use it to access the Facebook API.
				const credential = FacebookAuthProvider.credentialFromResult(result);
				const accessToken = credential.accessToken;

				// IdP data available using getAdditionalUserInfo(result)
				// ...
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = FacebookAuthProvider.credentialFromError(error);
				console.log(errorMessage)

				// ...
			});
	}

	const appleSignin =()=>{
		signInWithPopup(auth, appleProvider)
			.then((result) => {
				// The signed-in user info.
				const user = result.user;

				// Apple credential
				const credential = OAuthProvider.credentialFromResult(result);
				const accessToken = credential.accessToken;
				const idToken = credential.idToken;

				// IdP data available using getAdditionalUserInfo(result)
				// ...
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				console.log(errorMessage)
				// The credential that was used.
				const credential = OAuthProvider.credentialFromError(error);

				// ...
			});
	}

	useEffect(()=>{
		setValue(localStorage.getItem('email'))
	})
	

	return (
		<div className="flex flex-row  w-full bg-[#111111] dark:bg-white text-white dark:text-black">
			<div className="bg-signin w-full bg-no-repeat lg:bg-[length:896px_1040px]  bg-blend-multiply bg-black/40 ">
				<div className="font-bold text-white text-[69px] flex flex-col h-screen  justify-center leading-tight pl-[5vh] ">
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
				<div className="flex flex-col justify-center gap-20 items-center h-screen">
					<div className="flex flex-col justify-center items-center gap-8">
						<div className="font-bold text-4xl">
							Welcome!
						</div>
						<div>
							<EmailPasswordSignUp />
						</div>
					</div>		
					<div className="flex flex-row items-center justify-center gap-10 mt-5">
						<div className="flex flex-col items-center gap-2 ">
							<div onClick={googleSignin}  className="bg-white dark:bg-black dark:text-white text-black border-2 cursor-pointer w-48 flex flex-row items-center justify-center pt-2 pb-2 rounded-lg">
								Sign In with Google
							</div>
							<div onClick={facebookSignin}  className="bg-white dark:bg-black dark:text-white text-black border-2 cursor-pointer w-48 flex flex-row items-center justify-center pt-2 pb-2 rounded-lg">
								Sign In with Facebook
							</div>
							<div onClick={appleSignin}  className="bg-white dark:bg-black dark:text-white text-black border-2 cursor-pointer w-48 flex flex-row items-center justify-center pt-2 pb-2 rounded-lg">
								Sign In with Apple
							</div>
						</div>
						<div>
							OR
						</div>
						<div>
							<PhoneSignIn />
						</div>
					</div>	
					<div className="flex flex-col items-center gap-3">
						Already have an account ?
						<button>
							<Link to="/signin" className=' border-2 cursor-pointer rounded-lg  flex flex-row items-center justify-center py-2 px-3 w-32 bg-white text-black dark:bg-black dark:text-white'>
								SignIn
							</Link>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Signin





