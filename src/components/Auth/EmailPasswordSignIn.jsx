import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const EmailPasswordSignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSignIn = async (event) => {
		event.preventDefault();
		const auth = getAuth();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate('/chat'); // Redirect to your desired page after successful authentication
		} catch (error) {
			console.error('Error signing in with email and password:', error);
		}
	};

	return (
		<div className=''>
			<form onSubmit={handleSignIn} className='flex flex-col justify-center items-center gap-5'>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="rounded-lg border-2 border-[#C4C4C4] bg-[#D6D6D6] bg-opacity-25 w-96 p-2 focus:outline-none" 
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="rounded-lg border-2 border-[#C4C4C4] bg-[#D6D6D6] bg-opacity-25 w-96 p-2 focus:outline-none" 
				/>
				<button type="submit" className=' border-2 cursor-pointer rounded-lg  flex flex-row items-center justify-center py-3 px-4 w-32 bg-white text-black dark:bg-black dark:text-white'>
					Sign In
				</button>
			</form>
		</div>
	);
};

export default EmailPasswordSignIn;
