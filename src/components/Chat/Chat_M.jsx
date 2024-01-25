import React, {useState} from 'react';
import Layout from './Layout';
import Chat_Menu from '../Modules/Chat_Menu';

const Chat_M = () => {
  const [activeChatId, setActiveChatId] = useState(null);

  const handleChatClick = (chatId) => {
    setActiveChatId(chatId);
  };
  return (
    <>
      <div className="text-white bg-black flex flex-row w-full h-screen ">
        <div className='w-full    bg-zinc-700  '>
          <div className='absolute top-0 right-0  '>
            <Chat_Menu onChatClick={handleChatClick} />
          </div>
          <div>
          { activeChatId && <Layout id={activeChatId}  /> }
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat_M;
