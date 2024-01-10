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
        alert('OTP Sent! Please check your mobile phone!');
        navigate('/chat')
      })
      .catch((error) => {
        console.log('SMS NOT SENT ERROR....!!');
        alert('Error!!! OTP Not Sent! Please add country code as well!');
      });
  };

  const onOTPSubmit = (e) => {
    e.preventDefault();
    const code = otp;
    window.confirmationResult.confirm(code)
      .then((result) => {
        const user = result.user;
        console.log(JSON.stringify(user));
        alert('User Verified Successfully!!');
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={onSignInSubmit}>
        <div id='sign-in-button'></div>
        <input
          type='number'
          name='mobile'
          placeholder='Mobile number'
          required
          value={mobile}
          onChange={handleChange}
          className="text-black"
        />
        <button type='submit'>Submit</button>
      </form>
      <h2>Enter Form</h2>
      <form onSubmit={onOTPSubmit}>
        <input
          type='number'
          name='otp'
          placeholder='OTP number'
          required
          value={otp}
          onChange={handleChange}
          className='text-black'
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default PhoneSignIn;
