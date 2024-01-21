import Chat from "./Chat"
import Chat_M from "./Chat_M"



const ChatMain = () => {
	return (
		<>
			<div className="lg:block hidden">
				<Chat />
			</div>
			<div className="block lg:hidden">
				<Chat_M />
			</div>
		</>
	)
}

export default ChatMain