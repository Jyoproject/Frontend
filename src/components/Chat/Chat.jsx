import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import {  signOut } from "firebase/auth";
import { db, auth } from "../../firebase";
import { collection, getDocs, where, addDoc  } from "firebase/firestore";

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
	const createNewChat = async () => {
    try {
      const newChatRef = await addDoc(collection(db, 'chats'), {
        userId: currentUser?.uid,
        messages:[]
        // Add more properties as needed
        // For instance, messages: [],
        // participants: [],
      });

      const newChatInstance = {
        id: newChatRef.id,
        userId: currentUser?.uid,
        messages: []
        // Add more properties as needed
        // For instance, messages: [],
        // participants: [],
      };

      const newChatInstances = [...chatInstances, newChatInstance];
      setChatInstances(newChatInstances);

      if (!activeChatId) {
        setActiveChatId(newChatRef.id);
      }
    } catch (error) {
      console.error('Error creating new chat:', error);
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
                    {chatInstance.userId === currentUser.uid ? `Query ${chatInstance.id}` : `Chat ${chatInstance.id}`}
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
