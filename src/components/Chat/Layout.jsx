import { useEffect, useState } from 'react'
import {  ChatLine, LoadingChatLine } from './ChatLine'
import { useCookies } from 'react-cookie'
import { addDoc, collection} from "firebase/firestore";
import {db, auth} from "../firebase-config";

const COOKIE_NAME = 'copilot-for-lawyers'


// default first message to display in UI (not necessary to define the prompt)
export const initialMessages = [
	{
	  who: 'bot',
	  message: 'Yo! Ready to step out!',
	},
]

const InputMessage = ({ input, setInput, sendMessage }) => (
  <div className="mt-6 flex  clear-both">
    <input
      type="text"
      aria-label="chat input"
      required
      className=" flex-auto appearance-none rounded-md border border-white bg-black px-3 py-[calc(theme(spacing.2)-1px)] placeholder:text-white focus:outline-none"
      value={input}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          sendMessage(input)
          setInput('')
        }
      }}
      onChange={(e) => {
        setInput(e.target.value)
      }}
    />
    <button
      type="submit"
      className="ml-4 border-2 cursor-pointer rounded-lg w-32 flex flex-row items-center justify-center pt-1.5 pb-1.5" 
      onClick={() => {
        sendMessage(input)
        setInput('')
      }}
    >
      Ask
    </button>
  </div>
)

const Layout = () => {
	const [messages, setMessages] = useState(initialMessages)
	const [input, setInput] = useState('')
	const [loading, setLoading] = useState(false)
	const [cookie, setCookie] = useCookies([COOKIE_NAME])

	useEffect(() => {
		if (!cookie[COOKIE_NAME]) {
		// generate a semi random short id
		const randomId = Math.random().toString(36).substring(7)
			setCookie(COOKIE_NAME, randomId)
		}
	}, [cookie, setCookie])

	const chatsCollectionRef = collection(db, 'chats')

  	// send message to API /api/chat endpoint
	const sendMessage = async (message) => {
		setLoading(true)
		const newMessages = [
			...messages,
			{ message: message, who: 'user' },
		]
		setMessages(newMessages)
		const last10mesages = newMessages.slice(-10)

		const response = await fetch('/api/assistant/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				messages: last10mesages,
				user: cookie[COOKIE_NAME],
			}),
		})
		const data = await response.json()

		// strip out white spaces from the bot message
		const botNewMessage = data.text.trim()

		setMessages([
			...newMessages,
			{ message: botNewMessage, who: 'bot' },
		])
		setLoading(false)
	}

	return (
		<div className="rounded-2xl  lg:w-[40%] md:w-[80%] w-[90%] mt-10 sm:mt-0  h-[80%] overflow-auto flex flex-col justify-between  border-zinc-100 border p-6">
			<div>
				{messages.map(({ message, who }, index) => (
					<ChatLine key={index} who={who} message={message} />
				))}

				{loading && <LoadingChatLine />}
			</div>
			<div className="  ">	
				{messages.length < 2 && (
					<span className="mx-auto text-gray-600 clear-both">
						Type a message to start the conversation
					</span>
				)}
				<InputMessage
					input={input}
					setInput={setInput}
					sendMessage={sendMessage}
				/>
			</div>	
		</div>
	)
}

export default Layout