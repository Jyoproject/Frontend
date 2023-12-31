
import { Link } from 'react-router-dom';
import Layout from './Layout';

import {db, auth} from "../../firebase";

const Chat = () => {
	return (
		<>
			<div className="text-white bg-black flex flex-row w-full ">
				<div className='w-80 border-r-2 py-4 px-6 h-screen flex flex-col justify-between'>
					<div className='flex flex-row justify-between '>
						<div>
							<Link to='/'>
								Chat	
							</Link>
						</div>
						<div>
							new
						</div>
					</div>
					<div className='bottom-0 '>
						<div>
							{auth.currentUser.displayName}
						</div>
					</div>
				</div>
				<div className='w-full py-4 px-6 bg-zinc-700 justify-center flex '>
					<Layout />
				</div>
			</div>
		</>
	)
}

export default Chat