import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { AuthErrorCodes, createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const EmailPasswordSignUp = () => {
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

    // creating a new user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        console.log(userCredential.user);
	navigate('/chat')
        // ...
      })
      .catch((err) => {
        if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
        setError("The password is too weak.");
      } else if (err.code === AuthErrorCodes.EMAIL_EXISTS) {
        setError("The email address is already in use.");
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
    <div className="form-body">
      <form autoComplete="off" className='flex flex-col justify-center items-center gap-5' onSubmit={handleSubmit}>
        <div className="">
          <input
            name="email"
            placeholder="Email"
            type="text"
            onChange={handleChange}
            value={input.email}
            required
            autoComplete="true"
	    className="rounded-lg border-2 border-[#C4C4C4] bg-[#D6D6D6] bg-opacity-25 w-96 p-2 focus:outline-none" 
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
	    className="rounded-lg border-2 border-[#C4C4C4] bg-[#D6D6D6] bg-opacity-25 w-96 p-2 focus:outline-none" 
          />
        </div>
        <div className="btn">
          {error ? <p className="login-error">{error}</p> : null}
          <button title="Sign up"  className=' border-2 cursor-pointer rounded-lg  flex flex-row items-center justify-center py-3 px-4 w-40 bg-white text-black dark:bg-black dark:text-white' aria-label="Signup" type="submit">
            Create account
          </button>
        </div>
      </form>
    </div>
  );
}
export default EmailPasswordSignUp;