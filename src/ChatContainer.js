// ChatContainer.js

import React, { useState } from 'react';
import Chat_M from './components/Chat/Chat_M'
import Chat_Menu from './components/Modules/Chat_Menu';

const ChatContainer = () => {
	const [activeChatId, setActiveChatId] = useState(null);

	const handleChatClick = (chatId) => {
		setActiveChatId(chatId);
	};

	return (
		<div className='lg:hidden block'>
			<Chat_Menu onChatClick={handleChatClick} />
			<Chat_M activeChatId={activeChatId} />
		</div>
	);
};

export default ChatContainer;
