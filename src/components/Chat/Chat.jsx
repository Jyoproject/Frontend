import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';

import { db, auth } from "../../firebase";

const Chat = () => {
  const [chatInstances, setChatInstances] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  const createNewChat = () => {
    const newChatId = chatInstances.length + 1;
    const newChatInstance = (
      <div key={newChatId} onClick={() => handleChatClick(newChatId)} className={activeChatId === newChatId ? 'underline underline-offset-4' : ''}>
        Chat {newChatId}
      </div>
    );

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
	      {chatInstances.map((chatInstance, index) => (
                  <li
                    key={index}
                    onClick={() => handleChatClick(index + 1)}
                    className={activeChatId === index + 1 ? 'underline underline-offset-4' : ''}
                  >
                    Chat {index + 1}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='bottom-0 '>
            <div>
              {auth?.currentUser?.displayName}
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
