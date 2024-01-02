
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
						<div className="">
							Name is an AI Assistant for lawyers, that turns into a personalized Tutor.
						</div>
						<div  className='flex flex-row items-center justify-center gap-2 border-2 border-black dark:border-white cursor-pointer rounded-lg py-2 px-4  '>
							<Link to='/signin'>
								Get started
							</Link>			
							{/* <img src="/images/arrow-right.svg" draggable="false" /> */}
						</div>
					</div>
					<div className='flex flex-col justify-center items-start w-4/5'>
						<div className='text-5xl font-semibold'>
							Made for Lawyers
						</div>
						<div className='mt-12 text-xl font-semibold dark:text-slate-500 text-slate-700 '>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, autem deserunt quisquam ullam alias amet perspiciatis ea? Hic reprehenderit culpa aperiam quos voluptates nostrum, nobis eum ut consequatur officiis delectus!
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
				</div>
			</div>	
		</>
	)
}

export default Home