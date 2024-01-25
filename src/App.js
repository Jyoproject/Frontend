import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth.jsx';
import CreateUser from './components/Auth/CreateUser.jsx';
import ChatMain from './components/Chat/ChatMain';
import Footer from './components/Footer/Footer';
import { auth } from './firebase'; // Make sure to import your Firebase authentication object
import { onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged

function App() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserSignedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const AuthRoute = ({ element }) => {
    // Redirect to chat if the user is signed in, otherwise allow access to Auth
    return isUserSignedIn ? <Navigate to="/chat" /> : element;
  };

  const SignUpRoute = ({ element }) => {
    // Redirect to chat if the user is signed in, otherwise allow access to CreateUser
    return isUserSignedIn ? <Navigate to="/chat" /> : element;
  };

  return (
    <div className='bg-white dark:bg-black '>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path='/signin' element={<AuthRoute element={<Auth />} />} />
          <Route path='/signup' element={<SignUpRoute element={<CreateUser />} />} />
          <Route path='/chat' element={<ChatMain />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
