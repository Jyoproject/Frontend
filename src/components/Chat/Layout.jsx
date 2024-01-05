import { useEffect, useState } from 'react'
import {  ChatLine, LoadingChatLine } from './ChatLine'
import { useCookies } from 'react-cookie'
import { collection, addDoc, serverTimestamp, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import {db, auth} from "../../firebase";

const COOKIE_NAME = 'copilot-for-lawyers'


// default first message to display in UI (not necessary to define the prompt)
export const initialMessages = [
	{
	  who: 'bot',
	  message: '',
	},
]
const InputMessage = ({ sendMessage }) => {
	const [voiceInput, setVoiceInput] = useState('');
	const [recognition, setRecognition] = useState(null);
	const [listening, setListening] = useState(false);
      
	useEffect(() => {
	  if (!recognition) {
	    const newRecognition = new window.webkitSpeechRecognition();
	    newRecognition.lang = 'en-US';
      
	    newRecognition.onresult = (event) => {
	      const transcript = event.results[0][0].transcript;
	      setVoiceInput(transcript);
	    };
      
	    newRecognition.onend = () => {
	      setListening(false);
	    };
      
	    setRecognition(newRecognition);
	  }
	}, [recognition]);
      
	const startRecognition = () => {
	  if (recognition && !listening) {
	    recognition.start();
	    setListening(true);
	  }
	};
      
	const stopRecognition = () => {
	  if (recognition && listening) {
	    recognition.stop();
	    setListening(false);
	  }
	};
      
	const handleVoiceRecognition = () => {
	  if (listening) {
	    stopRecognition();
	  } else {
	    startRecognition();
	  }
	};
      
	const handleSendMessage = () => {
	  if (voiceInput.trim() !== '') {
	    sendMessage(voiceInput);
	    setVoiceInput('');
	  }
	};
      
	return (
	  <div className="mt-6 flex  clear-both">
	    <input
	      type="text"
	      aria-label="chat input"
	      required
	      className=" flex-auto appearance-none rounded-md bg-transparent border  px-3 py-[calc(theme(spacing.2)-1px)] placeholder:text-black focus:outline-none"
	      value={voiceInput}
	      onChange={(e) => setVoiceInput(e.target.value)}
	    />
	    <button
	      type="submit"
	      className="ml-4 border-2 cursor-pointer rounded-lg w-32 flex flex-row items-center justify-center pt-1.5 pb-1.5"
	      onClick={handleSendMessage}
	    >
	      Ask
	    </button>
	    <button
	      type="button"
	      className="ml-4 border-2 cursor-pointer rounded-lg w-32 flex flex-row items-center justify-center pt-1.5 pb-1.5"
	      onClick={handleVoiceRecognition}
	    >
	      {listening ? 'Stop Voice' : 'Voice'}
	    </button>
	  </div>
	);
      };

const Layout = ({id}) => {
	const [messages, setMessages] = useState(initialMessages)
	const [loading, setLoading] = useState(false)
	const [cookie, setCookie] = useCookies([COOKIE_NAME])

	useEffect(() => {
		if (!cookie[COOKIE_NAME]) {
		// generate a semi random short id
		const randomId = Math.random().toString(36).substring(7)
			setCookie(COOKIE_NAME, randomId)
		}
	}, [cookie, setCookie])

	const chatsCollectionRef = collection(db, 'chats');

	


  	// send message to API endpoint
	  const sendMessage = async (userMessage) => {
		setLoading(true);
		const newMessages = [
			...messages,
			{ message: userMessage, who: 'user' },
		]
		setMessages(newMessages)
	    
		try {
		  // Send user message to API and get bot response
		  const response = await fetch('https://backend.advocateally.com/chat', {
		    method: 'POST',
		    headers: {
		      'Content-Type': 'application/json',
		    },
		    body: JSON.stringify({ message: userMessage, user: auth.currentUser.uid }),
		  });
		  const data = await response.json()

		// strip out white spaces from the bot message
		const botResponse = data.message.trim()
		  console.log(botResponse)
		  setMessages([
			...newMessages,
			{ message: botResponse, who: 'bot' },
		])

		  // Save user message and bot response to Firestore
		  const chatMessagesRef = collection(db, `chats/chat-${id}/messages`); // Assuming 'id' is the chat instance ID
	      
		  await addDoc(chatMessagesRef, {
			message: userMessage,
			who: 'user',
			timestamp: new Date(), // Use local timestamp for each message
			authorId: auth.currentUser.uid,
		      });
		
		      // Save bot response to Firestore as a separate document
		      await addDoc(chatMessagesRef, {
			message: botResponse,
			who: 'bot',
			timestamp: new Date(), // Use local timestamp for each message
			// Assuming there's a common field (e.g., 'parentId') to associate user and bot messages
			parentId: chatMessagesRef.id, // Use a common identifier to group messages
		      });
		} catch (error) {
		  console.error('Error sending message:', error);
		}
	    
		setLoading(false);
	      };
	    
	      useEffect(() => {
		const chatMessagesRef = collection(db, `chats/chat-${id}/messages`);
	      
		const unsubscribe = onSnapshot(
		  query(chatMessagesRef, orderBy('timestamp')), // Order by timestamp or any relevant field
		  (snapshot) => {
		    const allMessages = [];
	      
		    snapshot.forEach((doc) => {
		      const messageData = doc.data();
		      allMessages.push(messageData);
		    });
	      
		    // Filter messages for user and bot
		    const userMessages = allMessages.filter((message) => message.who === 'user');
		    const botMessages = allMessages.filter((message) => message.who === 'bot');
	      
		    console.log('User Messages:', userMessages);
		    console.log('Bot Messages:', botMessages);
	      
		    // Handle the filtered messages as needed (e.g., update state variables)
		    setMessages(allMessages); // Set all messages
		    // setUserMessages(userMessages); // Optionally, set user messages
		    // setBotMessages(botMessages); // Optionally, set bot messages
		  }
		);
	      
		return () => unsubscribe();
	      }, [id]);
	// const createChat = async () => {
	// 	await addDoc(chatsCollectionRef, {
	// 		sendMessage,
	// 		messages,
	// 		author: {
	// 			name: auth.currentUser.displayName,
	// 			id: auth.currentUser.uid
	// 		}
	// 	})
	// }

	return (
		<div className="  overflow-auto flex flex-col justify-between w-[70%]  p-6">
			<div>
				{messages.map(({ message, who }, index) => (
					<ChatLine key={index} who={who} message={message} />
				))}

				{loading && <LoadingChatLine />}
			</div>
			<div className="  ">	
				{messages.length < 2 && (
					<span className="mx-auto text-white clear-both">
						Type a message to start the conversation
					</span>
				)}
				<InputMessage
					
					
					sendMessage={sendMessage}
				/>
			</div>	
		</div>
	)
}

export default Layout