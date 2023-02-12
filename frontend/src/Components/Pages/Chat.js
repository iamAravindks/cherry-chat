/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { IoChatbubblesSharp } from "react-icons/io5";
import MessageForm from "../MessageForm";
import { useDispatch, useSelector } from "react-redux";
import { generateOrderId } from "../../utils/util";
import {
  setCurrentRoom,
  setPrivateMemberMsg,
} from "../../features/messageSlice";
import {  resetNotifications } from "../../features/userSlice";
import JoinRoom from "../JoinRoom";

const Chat = () => {
  const dispatch = useDispatch();
  const { members, rooms, currentRoom, privateMemberMsg } = useSelector(
    (state) => state.message
  );
  const user = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.message);

  const [open, setOpen] = useState(true);

  const joinRoom = (room, isPublic = true) => {
    if (!user._id || !socket || socket === undefined) return;
    socket.emit("join-room", room, currentRoom);
    dispatch(setCurrentRoom(room));
    if (isPublic) dispatch(setPrivateMemberMsg(null));


    // dispatch for notifications

    dispatch(resetNotifications(room));
  };

  const handlePrivateMember = (member) => {
    dispatch(setPrivateMemberMsg(member));
    const roomId = generateOrderId(user._id, member._id);
    joinRoom(roomId, false);
  };
  useEffect(() => {
    // handleFunction(dispatch, profileUserRooms);
    if (socket) {
      socket.emit("load-rooms", user._id);
    }
  }, [socket]);

  return (
    <div className="flex max-h-screen ">
      <div
        className={` ${
          open ? "w-[20rem]" : "w-24 "
        } bg-gray-800 max-h-screen p-5  pt-8 relative duration-300 overflow-y-scroll`}
      >
        <SlArrowLeft
          className={`absolute cursor-pointer right-2 top-9 w-7 h-7 p-1 text-lg bg-purple-600
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
          <JoinRoom />
          <h3 className="text-md font-bold text-white">
            Rooms({rooms.length})
          </h3>
          {rooms.map((room, index) => (
            <li
              key={index}
              className={`flex relative text-lg rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300  items-center gap-x-4 `}
              onClick={() => joinRoom(room._id)}
            >
              <span
                className={`${
                  !open && "hidden"
                } origin-left duration-200  btn w-full
                ${
                  room._id === currentRoom
                    ? "text-white bg-accent"
                    : "text-accent"
                }
                `}
              >
                {room?.name}
                {/* {user?.newMessages && user?.newMessages[room] && (
                  <div className="indicator absolute top-[50%] right-10">
                    <span className="indicator-item badge badge-accent">
                      {user?.newMessages[room]}
                    </span>
                  </div>
                )} */}
              </span>
            </li>
          ))}
          <h3 className="text-md font-bold text-white">
            Members ({members.length})
          </h3>
          {members.map((member, index) => {
            if (member._id !== user._id)
              return (
                <li
                  key={member._id}
                  className={`flex text-lg rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300  items-center justify-center  gap-x-4 px-4`}
                  onClick={() => handlePrivateMember(member)}
                >
                  <span
                    className={`${
                      !open && "hidden"
                    } origin-left duration-200 btn  w-full
                    ${
                      member?._id === privateMemberMsg?._id
                        ? "btn btn-secondary"
                        : "btn-outline btn-secondary"
                    }
                    `}
                  >
                    <div className={`avatar ${member.status} mx-4`}>
                      <div className="w-9 rounded-full">
                        <img src={member?.picture} alt={member.name} />
                      </div>
                    </div>
                    <p className="mr-auto">{member.name}</p>
                    {/* {user.newMessages &&
                      user?.newMessages[
                        generateOrderId(member._id, user._id)
                      ] && (
                        <div className="indicator ">
                          <span className="indicator-item badge badge-accent">
                            {
                              user.newMessages[
                                generateOrderId(member._id, user._id)
                              ]
                            }
                          </span>
                        </div>
                      )} */}
                  </span>
                </li>
              );
          })}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7 ">
        <MessageForm />
      </div>
    </div>
  );
};

export default Chat;
