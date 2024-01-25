import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  AuthErrorCodes, getAuth, signInWithEmailAndPassword } from "firebase/auth";

const EmailPasswordSignIn = () => {
	const navigate = useNavigate();
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  // initialised auth instance
  const auth = getAuth();

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    let email = input.email.toLowerCase().trim();
    let password = input.password;

    // sign in user
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential.user);
	      navigate('/chat')
        // ...
      })
      .catch((err) => {
        if (
        err.code === AuthErrorCodes.INVALID_PASSWORD ||
        err.code === AuthErrorCodes.USER_DELETED
      ) {
        setError("The email address or password is incorrect");
      } else {
        console.log(err.code);
        alert(err.code);
      }
      });
  };

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div >
      <form autoComplete="off" className="flex flex-col justify-center items-center gap-4"  onSubmit={handleSubmit}>
        <div className='flex flex-row lg:flex-col justify-center items-center gap-2'>
          <div className="">
            <input
              name="email"
              placeholder="Email"
              type="text"
              onChange={handleChange}
              value={input.email}
              required
              autoComplete="true"
              className="rounded-lg text-white border-2  border-[#C4C4C4] bg-[#D6D6D6] bg-opacity-25 lg:w-96 w-44 p-2 focus:outline-none" 
            />
          </div>
          <div className="">
            <input
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={input.password}
              type="password"
              required
              autoComplete="true"
              className="rounded-lg  border-2 border-[#C4C4C4] bg-[#D6D6D6] bg-opacity-25 lg:w-96 w-44 p-2 focus:outline-none" 
            />
          </div>
        </div>
        <div className="btn">
          {error ? <p className="login-error">{error}</p> : null}
          <button title="Login" aria-label="Login" type="submit" className=' border-2 cursor-pointer rounded-lg  flex flex-row items-center justify-center lg:py-3 py-2 lg:px-4 px-3 lg:w-40 w-28 bg-white text-black dark:bg-black dark:text-white'>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmailPasswordSignIn;