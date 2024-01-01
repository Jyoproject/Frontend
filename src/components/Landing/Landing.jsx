
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<>
			<div className="py-20">
				<div className=" justify-center gap-8 flex flex-col items-center text-black  dark:text-white">
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
			</div>	
		</>
	)
}

export default Home