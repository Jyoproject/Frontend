import SignIn from "./SignIn"
import SignIn_M from "./SignIn_M"



const Auth = () => {
	return (
		<>
			<div className="lg:block hidden">
				<SignIn />
			</div>
			<div className="block lg:hidden">
				<SignIn_M />
			</div>
		</>
	)
}

export default Auth