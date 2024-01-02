import './App.css';
import { Route,Routes } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Navbar from './components/Navbar/Navbar';
import SignIn from './components/Auth/SignIn';
import Chat from './components/Chat/Chat';
import Footer from './components/Footer/Footer';



function App() {
  return (
    <div className='bg-white dark:bg-black '>
      <Navbar />
      <div>
        <Routes>        
          <Route path="/"  element={<Landing />} />
          <Route path="/signin"  element={<SignIn />}/>
          <Route path="/chat"  element={<Chat />}/>
          {/* <Route path="/car"  element={<Cart/>}/> */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
