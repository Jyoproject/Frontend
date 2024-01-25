
import React, {  useEffect, useState } from "react";
// import { signIn } from "next-auth/react"
import {signInWithPopup,FacebookAuthProvider, OAuthProvider} from "firebase/auth";
import {auth, googleProvider, facebookProvider, appleProvider} from "../../firebase";
import { useNavigate } from 'react-router-dom';
import PhoneSignIn from "./PhoneSignIn";
import { Link } from 'react-router-dom';
import EmailPasswordSignUp from "./EmailPasswordSignUp";


const SignUp_M = () => {
	const navigate = useNavigate();



	// const handleSignIn = () => {
	// 	signIn('google', {callbackUrl: '/app/dashboard'})
	// }
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
		<div className="flex flex-row bg-signin h-screen justify-center bg-no-repeat bg-cover bg-center  bg-blend-multiply bg-black/40  w-full ">
				<div  className="text-3xl text-white font-bold cursor-pointer absolute right-0 pt-10 pr-[5vh]">
					<Link to="/">
						Name
					</Link>	
				</div>
				<div className="font-medium text-white absolute flex flex-col h-screen justify-end leading-tight pl-5 bottom-0 left-0 pb-5 ">
					<span>
						Copilot,
					</span>
					<span>
						For Lawyers.
					</span>
				</div>
				<div className="flex flex-col justify-center gap-2 mt-5 items-center lg:h-screen h-full">
					<div className="font-bold lg:text-3xl text-xl text-white">
						Welcome!
					</div>
					<div>
						<EmailPasswordSignUp />
					</div>
					<div className="text-white">
						OR
					</div>
					<div className="flex flex-col justify-center items-center gap-4">
						<div className="flex flex-row items-center gap-2 ">
							<div onClick={googleSignin}  className="bg-white text-black border-2 cursor-pointer lg:w-48 px-2 lg:px-0 flex flex-row items-center justify-center pt-2 pb-2 rounded-lg">
								Sign In with Google
							</div>
							<div onClick={facebookSignin}  className="bg-white text-black border-2 cursor-pointer lg:w-48 px-2 lg:px-0 flex flex-row items-center justify-center pt-2 pb-2 rounded-lg">
								Sign In with Facebook
							</div>	
						</div>
						<div onClick={appleSignin}  className="bg-white text-black border-2 cursor-pointer lg:w-48 px-2 lg:px-0 flex flex-row items-center justify-center pt-2 pb-2 rounded-lg">
							Sign In with Apple
						</div>
					</div>
					
					<div className="text-white">
						OR
					</div>
					<div>
						<PhoneSignIn />
					</div>
					<div className="flex flex-col items-center gap-3 mt-5">
						<div className="text-white">
							Already have an account ?
						</div>
						<button>
							<Link to="/signin" className=' border-2 cursor-pointer rounded-lg  flex flex-row items-center justify-center py-2 px-3 w-32 bg-white text-black dark:bg-black dark:text-white'>
								SignIn
							</Link>
						</button>
					</div>
				</div>
		</div>
	)
}

export default SignUp_M





