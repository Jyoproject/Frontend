import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { db, auth } from "../../firebase";
import { collection, getDocs, where, addDoc  } from "firebase/firestore";
import Dropdown from '../Modules/Menu';

const Chat = () => {
	const currentUser = auth.currentUser;
  const [chatInstances, setChatInstances] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [counter, setCounter] = useState(0);
  
	const createNewChat = async () => {
    const newChatId = counter + 1; // Increment the counter
    setCounter(newChatId);
    try {
      const newChatRef = await addDoc(collection(db, 'chats'), {
        userId: currentUser?.uid,
      });

      const newChatInstance = {
        id: newChatRef.id,
        userId: currentUser?.uid,
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
  useEffect(() => {
    const fetchChatInstances = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, 'chats'),
          where('userId', '==', currentUser?.uid)
        );
        const fetchedChatInstances = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChatInstances(fetchedChatInstances);
      } catch (error) {
        console.error('Error fetching chat instances:', error);
      }
    };

    if (currentUser) {
      fetchChatInstances();
    }
  }, [currentUser]);
	    
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
                    className={activeChatId === chatInstance.id ? 'underline underline-offset-4 mt-3' : 'mt-3'}
                  >
                    {chatInstance.userId === currentUser.uid ? `Chats` : ``}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='bottom-0 '>
            <Dropdown />
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
