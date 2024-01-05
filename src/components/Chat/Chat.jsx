import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import {  signOut } from "firebase/auth";
import { db, auth } from "../../firebase";
import { useNavigate } from 'react-router-dom';

const Chat = () => {
	const currentUser = auth.currentUser;
	const navigate = useNavigate();
  	const [chatInstances, setChatInstances] = useState([]);
  	const [activeChatId, setActiveChatId] = useState(null);
  
	const handleSignOut = () => {
		signOut(auth).then(() => {
			navigate('/'); 
			// Sign-out successful.
		      }).catch((error) => {
			console.log(error)
		      });
	}
	const createNewChat = () => {
		const newChatId = chatInstances.length + 1;
	    
		const newChatInstance = {
		  id: newChatId,
		  userId: currentUser?.uid,
		  // You can add more properties as needed for each chat instance
		  // For instance, you might have messages, participants, etc.
		  // messages: [],
		  // participants: [],
		};
	    
		const newChatInstances = [...chatInstances, newChatInstance];
		setChatInstances(newChatInstances);
	    
		if (!activeChatId) {
		  setActiveChatId(newChatId);
		}
	      };
	    
	      const handleChatClick = (chatId) => {
		setActiveChatId(chatId);
	      };
  

  return (
    <>
      <div className="text-white bg-black flex flex-row w-full h-screen ">
        <div className='w-80  py-4 px-6 h-screen md:flex hidden flex-col justify-between'>
          <div>
            <div className='flex flex-row justify-between items-end '>
              <div className='text-3xl font-semibold'>
                <Link to='/'>
                  Name
                </Link>
              </div>
              <div onClick={createNewChat} className=''>
                New +
              </div>
            </div>
            <div className='mt-10'>
              <ul>
	      {chatInstances.map((chatInstance) => (
                  <li
                    key={chatInstance.id}
                    onClick={() => handleChatClick(chatInstance.id)}
                    className={activeChatId === chatInstance.id ? 'underline underline-offset-4' : ''}
                  >
                    {chatInstance.userId === currentUser.uid ? `Your Chat ${chatInstance.id}` : `Chat ${chatInstance.id}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='bottom-0 '>
            <div className='' onClick={handleSignOut}>
	    {currentUser?.displayName}
            </div>
          </div>
        </div>
        <div className='w-full py-4 px-6 bg-zinc-700 justify-center flex '>
          {activeChatId && <Layout id={activeChatId} />}
        </div>
      </div>
    </>
  )
}

export default Chat;
