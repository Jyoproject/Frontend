
import { Container } from '../Lib/Container'
// import { Logo } from '../comp/Logo'
import { NavLink } from '../Lib/NavLink'
import { Link, useLocation } from 'react-router-dom';


const Footer = () => {
	const location = useLocation()
	const signin = location.pathname === '/signin'

	const chat = location.pathname === '/chat'
	return (
		<>
			{ signin || chat ? 
				<></>
				:
				<footer className="bg-footer">
					<Container className={undefined}>
						<div className="pt-16 flex flex-col items-center">
							<div className="mx-auto h-10 w-auto flex items-center justify-center font-bold text-2xl text-white" >
								Name
							</div>
							<nav className="mt-10 text-sm flex flex-row md:flex-col items-start md:items-center justify-around" aria-label="quick links">
								<div className="md:-my-1 flex md:flex-row flex-col  justify-center gap-x-6 text-white">
									<NavLink className={""} href="#demo">Contact Us</NavLink>
									<NavLink className={""} href="#demo">Legal</NavLink>
									<NavLink className={""} href="#demo">Careers</NavLink>
								</div>
							</nav>
							<div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
								<p className="mt-6 text-sm text-white sm:mt-0">
									Copyright &copy; {new Date().getFullYear()} Name. All rights
									reserved.
								</p>
							</div>
						</div>
					</Container>
				</footer>
			}
		</>
	)
}


export default Footer
