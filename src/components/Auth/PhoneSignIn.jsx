import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPhoneNumber } from 'firebase/auth';

const PhoneSignIn = () => {
	const [phoneNumber, setPhoneNumber] = useState('');
	const [verificationCode, setVerificationCode] = useState('');
	const [confirmationResult, setConfirmationResult] = useState(null);
	const navigate = useNavigate();

	const handlePhoneNumberSubmit = async (event) => {
		event.preventDefault();
		const auth = getAuth();
		try {
			const confirmation = await signInWithPhoneNumber(auth, phoneNumber);
			setConfirmationResult(confirmation);
		} catch (error) {
			console.error('Error sending SMS verification:', error);
		}
	};

	const handleVerificationCodeSubmit = async (event) => {
		event.preventDefault();
		try {
			await confirmationResult.confirm(verificationCode);
			navigate('/chat'); // Redirect to your desired page after successful authentication
		} catch (error) {
			console.error('Error confirming verification code:', error);
		}
	};

  	return (
		<div className='flex flex-col  gap-8'>
			<div className='text-xl font-semibold'>
				Phone Number Sign-In
			</div>
			{!confirmationResult ? (
				<form onSubmit={handlePhoneNumberSubmit} className='flex flex-col justify-center items-center gap-2'>
					<input
						type="text"
						placeholder="Enter your phone number"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
						className='flex-auto appearance-none rounded-md bg-transparent border  px-3 py-[calc(theme(spacing.2)-1px)] placeholder:text-black focus:outline-none'
					/>
					<button type="submit" className=' w-full border-2 cursor-pointer rounded-lg  flex flex-row items-center justify-center py-3 px-4 bg-white text-black dark:bg-black dark:text-white'>
						Send verification code
					</button>
				</form>
			) : (
				<form onSubmit={handleVerificationCodeSubmit}>
					<input
						type="text"
						placeholder="Enter verification code"
						value={verificationCode}
						onChange={(e) => setVerificationCode(e.target.value)}
					/>
					<button type="submit" className=' border-2 cursor-pointer rounded-lg  flex flex-row items-center justify-center py-3 px-4 bg-white text-black dark:bg-black dark:text-white'>
						Verify code
					</button>
				</form>
			)}
		</div>
  	);
};

export default PhoneSignIn;
