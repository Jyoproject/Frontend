
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<>
			<div className="py-20">
				<div className=" p-20 space-y-[15rem] max-w-7xl flex flex-col justify-center items-center mx-auto  text-black  dark:text-white">
					<div className='justify-center gap-8 flex flex-col items-center'>
						<div>
							AI Copilot for Lawyers
						</div>
						<div className="text-8xl font-bold">
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
					<div className='flex flex-col justify-center items-start w-4/5'>
						<div className='text-5xl font-semibold'>
							Made For Lawyers
						</div>
						<div className='mt-12 text-xl font-semibold dark:text-slate-500 text-slate-700 '>
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
					<div className='flex flex-col justify-center items-start w-4/5 '>
						<div className='text-right'>
							<div className='text-5xl font-semibold text-left '>
								Multplie Features To Rely On!
							</div>
							<div className='mt-12 text-lg font-semibold dark:text-slate-500 text-slate-700 w-2/3 float-right  '>
								Handle routine documentation and administrative tasks, allowing them to refocus on the more strategic.
							</div>
						</div>
						<div className='mt-5 space-x-5 flex flex-row items-center justify-center'>
							<div className='flex flex-row items-center gap-5 py-3 px-4 bg-'>
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
				</div>
			</div>	
		</>
	)
}

export default Home