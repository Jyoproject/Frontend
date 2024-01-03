import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';

import {db, auth} from "../../firebase";

const Chat = () => {
	const [chatInstances, setChatInstances] = useState([]);
	const [nextChatId, setNextChatId] = useState(1);

	const createNewChat = () => {
		const newChatId = nextChatId;
		setNextChatId(nextChatId + 1); // Increment for the next chat
	    
		const newChatInstances = [...chatInstances];
		newChatInstances.push(<Layout key={newChatId} id={newChatId} />);
		setChatInstances(newChatInstances);
	};
	return (
		<>
			<div className="text-white bg-black flex flex-row w-full h-screen ">
				<div className='w-80  py-4 px-6 h-screen md:flex hidden flex-col justify-between'>
					<div className='flex flex-row justify-between '>
						<div>
							<Link to='/'>
								Chat	
							</Link>
						</div>
						<div onClick={createNewChat}>
							
								new
						
						</div>
					</div>
					<div>
					<ul>
            {chatInstances.map((_, index) => (
              <li key={index}>Chat {index + 1}</li>
            ))}
          </ul>
					</div>
					<div className='bottom-0 '>
						<div>
							{auth.currentUser?.displayName}
						</div>
					</div>
				</div>
				<div className='w-full py-4 px-6 bg-zinc-700 justify-center flex '>
					{chatInstances.length > 0 && chatInstances[chatInstances.length - 1]}
				</div>
			</div>
		</>
	)
}

export default Chat