import React from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { HamburgerMenuIcon, Cross2Icon } from '@radix-ui/react-icons';



const Dropdown_M = () => {
  const [open, setOpen] = React.useState(false);
  return (
	<Collapsible.Root className={open ? "w-full h-screen flex flex-col  bg-black/70 backdrop-blur-sm ": "w-full flex flex-row justify-end "} open={open} onOpenChange={setOpen}>
		<Collapsible.Trigger asChild>
			<button className="flex items-end justify-end z-10 right-0 pr-5 pt-8">{open ? <Cross2Icon className="h-7 w-7"/> : <HamburgerMenuIcon className="h-7 w-7"/>}</button>
		</Collapsible.Trigger>
		<div className="flex flex-col justify-around absolute  items-center w-full -z-10  mt-10 h-full">
			<Collapsible.Content className=" mt-8  flex flex-col justify-start gap-4 items-center">
				<div  className="bg-black/40 text-white hover:bg-black/60 border-2 cursor-pointer rounded-lg p-1 w-32 flex flex-row items-center justify-center">
					<span className="">Contact</span>
				</div>
				<div className="bg-black/40 text-white hover:bg-black/60 border-2 cursor-pointer rounded-lg p-1 w-32 flex flex-row items-center justify-center">
					<span className="">Chat</span>
				</div>
			</Collapsible.Content>
			<Collapsible.Content>
				{/* {!session ?  */}
					<div  className="border-2 bg-white text-black cursor-pointer rounded-lg w-32 flex flex-row items-center justify-center pt-1.5 pb-1.5">
						Signin
					</div>
				{/* // 	<Dropdown />
				// } */}
			</Collapsible.Content>
		</div>

	</Collapsible.Root>
  );
};

export default Dropdown_M;