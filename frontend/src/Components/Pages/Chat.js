import { useState } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { IoChatbubblesSharp } from "react-icons/io5";
import MessageForm from "../MessageForm";
const Chat = () => {
  const [open, setOpen] = useState(true);

  const rooms = ["crypto", "web3", "linux", "finance"];
  const members = ["John", "Dane", "Jane", "Rose"];

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-24 "
        } bg-gray-800 h-screen p-5  pt-8 relative duration-300`}
      >
        <SlArrowLeft
          className={`absolute cursor-pointer -right-3 top-9 w-7 h-7 p-1 text-lg bg-purple-600
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="tooltip tooltip-right tooltip-primary" data-tip="Chat">
          <div className="flex gap-x-4 items-center ">
            <IoChatbubblesSharp
              className={`cursor-pointer duration-500 text-3xl text-purple-700 ${
                open && "rotate-[360deg]"
              }`}
            />
          </div>
        </div>
        <ul className="pt-6">
                  <h3 className="text-md font-bold text-white">Rooms({ rooms.length})</h3>
          {rooms.map((room, index) => (
            <li
              key={index}
              className={`flex text-lg rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300  items-center gap-x-4 `}
            >
              <span
                className={`${
                  !open && "hidden"
                } origin-left duration-200 text-accent btn w-full`}
              >
                {room}
              </span>
            </li>
          ))}
          <h3 className="text-md font-bold text-white">
            Members ({members.length})
          </h3>
          {members.map((member, index) => (
            <li
              key={index}
              className={`flex text-lg rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300  items-center gap-x-4 `}
            >
              <span
                className={`${
                  !open && "hidden"
                } origin-left duration-200 btn btn-outline btn-secondary w-full`}
              >
                {member}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7 ">
        <MessageForm/>
      </div>
    </div>
  );
};
export default Chat;
