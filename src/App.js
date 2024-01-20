import './App.css';
import { Route, Routes, Navigate,  } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth.jsx';
import CreateUser from './components/Auth/CreateUser.jsx';
import Chat from './components/Chat/Chat';
import Footer from './components/Footer/Footer';
import { useAuth } from './AuthProvider';

const AuthenticatedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ?  children : <Navigate to="/" />;
};


function App() {
  return (
    <div className='bg-white dark:bg-black '>
      <Navbar />
      <div>
        <Routes>        
          <Route path="/"  element={<Landing />} />
          <Route path='/signin' element={<Auth />}/>
          <Route path='/signup' element={<CreateUser />}/>
          <Route path='/chat' element={<Chat />}/>
            {/* <Route exact path='/chat' element={
              <AuthenticatedRoute>
                <Chat />
              </AuthenticatedRoute>
            }/> */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
