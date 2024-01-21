import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { db, auth } from "../../firebase";
import { collection, getDocs, where, addDoc, orderBy, doc, deleteDoc, query  } from "firebase/firestore";
import { isEmpty } from "lodash";
import Chat_Menu from '../Modules/Chat_Menu';

const Chat = () => {
  const currentUser = auth.currentUser;
  
  const [chatInstances, setChatInstances] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [counter, setCounter] = useState(0);
  

  useEffect(() => {
    console.log('Current User ID:', currentUser?.uid);
    const fetchChatInstances = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, 'chats'),
         
          orderBy('createdAt', 'desc')
        );
        console.log('Current User ID:', currentUser?.uid);
        console.log('Fetched Chat Instances:', querySnapshot.docs.map(doc => doc.data()));

        const fetchedChatInstances = querySnapshot.docs
          .filter(doc => doc.data().userId === currentUser?.uid)
            .map(doc => ({
              id: doc.id,
              chatNumber: doc.data().chatNumber,
              ...doc.data(),
            }));

        // Order the chat instances in descending order based on 'createdAt'
      const orderedChatInstances = fetchedChatInstances.sort((a, b) => b.createdAt - a.createdAt);

        setChatInstances(orderedChatInstances);
        console.log(orderedChatInstances);

        if (orderedChatInstances.length === 0) {
          createNewChat();
        } else {
          setActiveChatId(orderedChatInstances[0].id);
        }
      } catch (error) {
        console.error('Error fetching chat instances:', error);
      }
    };

    if (currentUser ) {
      fetchChatInstances();
    }
  }, [currentUser]);
  
  const createNewChat = async () => {
    try {
      const userChatsQuery = query(collection(db, 'chats'), orderBy('createdAt', 'desc'));
      const userChatsSnapshot = await getDocs(userChatsQuery);
  
      let nextChatNumber = 1;
      if (!isEmpty(userChatsSnapshot.docs)) {
        const userChats = userChatsSnapshot.docs
          .filter(doc => doc.data().userId === currentUser?.uid);
  
        if (!isEmpty(userChats)) {
          const lastChatInstance = userChats[0].data();
          nextChatNumber = lastChatInstance.chatNumber + 1;
        }
      }

      const newChatRef = await addDoc(collection(db, 'chats'), {
        chatNumber: nextChatNumber,
        userId: currentUser?.uid,
        createdAt: new Date(),
      });

      // Create a new 'messages' collection within the chat instance
      const messagesCollectionRef = collection(db, `chats/${newChatRef.id}/messages`);
      
      // Add an initial message (if needed)
      await addDoc(messagesCollectionRef, {
        message: 'Welcome to the chat!',
        who: 'bot',
        timestamp: new Date(),
      });

      const newChatInstance = {
        id: newChatRef.id,
        chatNumber: nextChatNumber,
        userId: currentUser?.uid,
        createdAt: new Date(),
      };

      setChatInstances([newChatInstance, ...chatInstances]);
      
      setActiveChatId(newChatRef.id);
      console.log(activeChatId);
      
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  const deleteChatInstance = async (chatId) => {
    try {
      await deleteDoc(doc(db, 'chats', chatId));
      setChatInstances(chatInstances.filter(chat => chat.id !== chatId));

      // If the deleted chat was the active one, clear the active chat
      if (activeChatId === chatId) {
        setActiveChatId(null);
      }
    } catch (error) {
      console.error('Error deleting chat instance:', error);
    }
  };

  const handleChatClick = (chatId) => {
    setActiveChatId(chatId);
  };

  const getChatInstanceName = (chatInstance) => {
    const chatNumber = chatInstance.chatNumber;
    const userInitials = currentUser?.displayName
      ? currentUser.displayName
        .split(' ')
        .map(word => word[0])
        .join('')
      : 'Guest';

    return `Chat ${chatNumber} - ${userInitials}`;
  };

  return (
    <>
      <div className="text-white bg-black flex flex-row w-full h-screen ">
        {/* <div className='w-80  py-4 px-6 h-screen md:flex hidden flex-col justify-between'>
          <div>
            <div className='flex flex-row justify-between items-end '>
              <div className='text-3xl font-semibold'>
                <Link to='/'>
                  Name
                </Link>
              </div>
              <div onClick={createNewChat} className='cursor-pointer'>
                New +
              </div>
            </div>
            <div className='mt-10'>
              <ul>
                {chatInstances.map((chatInstance) => (
                  <li
                    key={chatInstance.id}
                    onClick={() => handleChatClick(chatInstance.id)}
                    className={activeChatId === chatInstance.id ? ' mt-3 flex flex-row gap-4 items-center justify-between border p-2 rounded-lg cursor-pointer' : 'mt-3 flex flex-row gap-4 items-center justify-between cursor-pointer p-2'}
                  >
                    <div>
                      {getChatInstanceName(chatInstance)}
                    </div>
                    <button onClick={() => deleteChatInstance(chatInstance.id)}>
                      <img src="/images/delete.svg" alt="delete" draggable="false" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='bottom-0 '>
            <Chat_Menu />
          </div>
        </div> */}
        <div className='w-full    bg-zinc-700  '>
          <div className='absolute top-0 right-0  '>
            <Chat_Menu />
          </div>
          <div>
          { activeChatId && <Layout id={activeChatId}  /> }
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat;
