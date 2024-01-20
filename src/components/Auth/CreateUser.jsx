import SignUp from "./SignUp"
import SignUp_M from "./SignUp_M"



const CreateUser = () => {
	return (
		<>
			<div className="lg:block hidden">
				<SignUp />
			</div>
			<div className="block lg:hidden">
				<SignUp_M />
			</div>
		</>
	)
}

export default CreateUser;