
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<>
			<div className="md:py-20 py-10">
				<div className=" md:p-20 p-10 md:space-y-[15rem] space-y-[10rem] max-w-7xl flex flex-col justify-center items-center mx-auto  text-black  dark:text-white">
					<div className='justify-center gap-8 flex flex-col items-center text-center'>
						<div>
							AI Copilot for Lawyers
						</div>
						<div className="md:text-8xl text-7xl text-center font-bold">
							AI Copilot for Lawyers
						</div>
						<div className="text-xl">
							Name is an AI Assistant for lawyers, that turns into a personalized Tutor.
						</div>
						<div  className='flex flex-row items-center text-white dark:text-black font-medium  justify-center gap-2 border-2 dark:border-black border-white bg-black dark:bg-white cursor-pointer rounded-lg py-3 px-6  '>
							<Link to='/signin'>
								Get started
							</Link>			
							{/* <img src="/images/arrow-right.svg" draggable="false" /> */}
						</div>
					</div>
					<div className='flex flex-col justify-center items-start md:w-4/5'>
						<div className='md:text-5xl text-4xl font-semibold'>
							Made For Lawyers
						</div>
						<div className='md:mt-12 md:text-xl mt-5 font-semibold dark:text-slate-500 text-slate-700 '>
							Handle routine documentation and administrative tasks, allowing them to refocus on the more strategic, high-level and interpersonal requirements of their role.
						</div>
						<div className='mt-5 space-y-5'>
							<div className='flex flex-row items-center gap-5 '>
								<img src="/images/1.svg" alt="1" className='rounded-2xl w-16' />
								<span className='font-medium text-lg'>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
								</span>
							</div>
							<div className='flex flex-row items-center gap-5'>
								<img src="/images/2.svg" alt="1" className='rounded-2xl w-16' />
								<span className='font-medium text-lg'>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
								</span>
							</div>
							<div className='flex flex-row items-center gap-5'>
								<img src="/images/3.svg" alt="1" className='rounded-2xl w-16' />
								<span className='font-medium text-lg'>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
								</span>
							</div>
						</div>
					</div>
					<div className='flex flex-col justify-center items-start md:w-4/5 '>
						<div className='text-right'>
							<div className='md:text-5xl text-4xl font-semibold text-left md:w-[45%] leading-tight '>
								Multiple Features <span className='text-footer'>To Rely On!</span> 
							</div>
							<div className='mt-5 text-lg font-semibold dark:text-slate-500 text-slate-700 md:w-2/3 float-right  '>
								Handle routine documentation and administrative tasks, allowing them to refocus on the more strategic.
							</div>
						</div>
						<div className='mt-16 md:grid-cols-3 grid-rows-3 grid gap-5'>
							<div className='flex flex-col justify-center w-full gap-3 py-10 px-5 rounded-lg dark:bg-neutral-900 bg-gray-200   '>
								<div className='font-medium text-lg dark:text-white'>
									Multiple Chat Sessions
								</div>
								<div className=' dark:text-white'>
									Get as many sessions as you wish for your queries.
								</div>
							</div>
							<div className='flex flex-col justify-center w-full gap-3 py-10 px-5 rounded-lg dark:bg-neutral-900 bg-gray-200   '>
								<div className='font-medium text-lg dark:text-white'>
									Text & Voice - Chat
								</div>
								<div className=' dark:text-white'>
									Interact with the chatbot with both text and speech.
								</div>
							</div>
							<div className='flex flex-col justify-center w-full gap-3 py-10 px-5 rounded-lg dark:bg-neutral-900 bg-gray-200   '>
								<div className='font-medium text-lg dark:text-white'>
									Legal Consultancy
								</div>
								<div className=' dark:text-white'>
									Get the most curated and specialized answers to your legal questions.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>	
		</>
	)
}

export default Home