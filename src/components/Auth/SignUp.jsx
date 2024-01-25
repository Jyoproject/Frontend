import React, {  useEffect} from "react";
import {signInWithPopup,FacebookAuthProvider, OAuthProvider, setPersistence, browserSessionPersistence} from "firebase/auth";
import {auth, googleProvider, facebookProvider, appleProvider} from "../../firebase";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import { Link } from 'react-router-dom';
import PhoneSignIn from "./PhoneSignIn";
import EmailPasswordSignUp from "./EmailPasswordSignUp";

const Signin = () => {
	const navigate = useNavigate();
  	const location = useLocation();

  	useEffect(() => {
    		let authToken = sessionStorage.getItem("Auth Token");
		const search = location.search;
		
		const id=new URLSearchParams(search).get("code");
		sessionStorage.setItem("Auth Code",id);
		const code =    sessionStorage.getItem("Auth Code");
    		console.log(id);//12345

    		if (authToken) {
			navigate("/chat");
		}
		else{
			navigate("/signup");
		}
  	},[])

	
	const googleSignin =()=>{
		signInWithPopup(auth, googleProvider)
			.then((data)=>{
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = googleProvider.credentialFromResult(data);
				console.log(credential.accessToken)
				const token = credential.accessToken;
				// The signed-in user info.
				const user = data.user;
				console.log(data)
				let authToken = sessionStorage.setItem("Auth Token", data?._tokenResponse?.idToken);
				console.log(authToken);
				navigate('/chat'); 		
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.user?.email;
				console.log(errorMessage)
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
        			let authToken = sessionStorage.setItem("Auth Token", result?._tokenResponse?.idToken);
				navigate('/chat')
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
				console.log(errorMessage, email, credential, errorCode)

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
					<div className="flex flex-row items-center justify-center gap-5 mt-5">
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





