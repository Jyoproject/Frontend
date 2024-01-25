import React, { useState, useRef } from 'react';
import firebase from '../../firebase';
import { useNavigate } from 'react-router-dom';

const PhoneSignIn = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const recaptchaVerifierRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    name === 'mobile' ? setMobile(value) : setOtp(value);
  };

  const configureCaptcha = () => {
    recaptchaVerifierRef.current = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        onSignInSubmit();
        console.log('reCAPTCHA verified');
      },
    });
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();
    configureCaptcha();
    const phoneNumber = '+' + mobile;
    console.log(phoneNumber);
    const appVerifier = recaptchaVerifierRef.current;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log('OTP Sent....!!');
        
      })
      .catch((error) => {
        console.log('SMS NOT SENT ERROR....!!');
      });
  };

  const onOTPSubmit = (e) => {
    e.preventDefault();
    const code = otp;
    window.confirmationResult.confirm(code)
      .then((result) => {
        const user = result.user;
        console.log(JSON.stringify(user));
        navigate('/chat')
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  return (
    <div className='flex flex-col justify-center items-center gap-3'>
      <form onSubmit={onSignInSubmit} className='flex flex-row justify-center items-center gap-5 '>
        <div id='sign-in-button'></div>
          <input
            type='number'
            name='mobile'
            placeholder='Mobile number'
            required
            value={mobile}
            onChange={handleChange}
            className="rounded-lg border-2 border-[#C4C4C4] bg-[#D6D6D6] bg-opacity-25 w-46 p-2 focus:outline-none"   
          />
        <button type='submit' className=' border-2 cursor-pointer rounded-lg  flex flex-row items-center justify-center py-2 px-3 w-32 bg-white text-black dark:bg-black dark:text-white'>
          Submit
        </button>
      </form>
      <form onSubmit={onOTPSubmit} className='flex flex-row justify-center items-center gap-5 '>
      <div id='sign-in-button'></div>
        <input
          type='number'
          name='otp'
          placeholder='OTP number'
          required
          value={otp}
          onChange={handleChange}
          className="rounded-lg border-2 border-[#C4C4C4] bg-[#D6D6D6] bg-opacity-25 w-46 p-2 focus:outline-none"   
        />
        <button type='submit' className=' border-2 cursor-pointer rounded-lg  flex flex-row items-center justify-center py-2 px-3 w-32 bg-white text-black dark:bg-black dark:text-white'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default PhoneSignIn;
