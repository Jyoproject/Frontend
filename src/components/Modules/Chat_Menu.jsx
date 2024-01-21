import React from 'react';
import { useContext, useState, useEffect } from 'react';

import * as Collapsible from '@radix-ui/react-collapsible';
import { HamburgerMenuIcon, Cross2Icon } from '@radix-ui/react-icons';
import { Link, useNavigate } from 'react-router-dom';
import { db, auth } from "../../firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { isEmpty } from "lodash";
import { collection, getDocs, signOut, addDoc, orderBy, doc, deleteDoc, query  } from "firebase/firestore";



const Chat_Menu = () => {
	const [open, setOpen] = React.useState(false);
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
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

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
		setUser(user);
		});

		return () => {
			unsubscribe();
			setUser(null);
		} // Cleanup the listener on unmount
	}, []);

	const handleSignOut = () => {
		signOut(auth).then(() => {
			navigate('/'); 
		// Sign-out successful.
		}).catch((error) => {
			console.log(error)
		});
	}

	return (
		<Collapsible.Root className={open ? "h-screen w-screen flex flex-col  bg-black/30 backdrop-blur-sm ": "w-full flex flex-row justify-end "} open={open} onOpenChange={setOpen}>
			<Collapsible.Trigger asChild >
				<button className="flex items-end justify-end z-10 right-0 pr-5 pt-8">{open ? <Cross2Icon className="h-7 w-7"/> : <HamburgerMenuIcon className="h-7 w-7"/>}</button>
			</Collapsible.Trigger>
			<div className="flex flex-col justify-around absolute  items-center w-full -z-10  h-full">
				<Collapsible.Content className="   flex flex-col justify-start gap-4 items-center">
					<ul className='overflow-y-auto h-96'>
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
					
				</Collapsible.Content>
				<Collapsible.Content>
				<div className="flex flex-col justify-between items-center gap-5">
					<div  className="border-2 bg-white text-black cursor-pointer rounded-lg w-32 flex flex-row items-center justify-center pt-1.5 pb-1.5">
						{ user && user.isAnonymous ? (
								// If the user is signed in anonymously, only show "Get started" button
								<Link to='/signup'>
									Get started
								</Link>
							) 
							: 
							(
								user ? (
									// If the user is signed in with a provider, email, or SMS, show "Log Out" button
									<div onClick={handleSignOut}>
										Log Out
									</div>
								)
								: 
								(
									<Link to='/signup'>
										Get started
									</Link>
								) 
							)
						}
					</div>
					<div onClick={createNewChat} className="bg-black/40 text-white hover:bg-black/60 border-2 cursor-pointer rounded-lg p-1 w-32 flex flex-row items-center justify-center">
						New +
					</div>
				</div>	
				</Collapsible.Content>
			</div>
		</Collapsible.Root>
	);
};

export default Chat_Menu;