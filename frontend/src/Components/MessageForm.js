import { useEffect, useRef, useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setMessages, socket } from "../features/messageSlice";
import { getFormattedDate, getTime, getUser } from "../utils/util";
import LeaveRoom from "./LeaveRoom";

const MessageForm = () => {
  const dispatch = useDispatch();

  const scrollToBottom = (ref) =>
    ref.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    socket.off("room-messages").on("room-messages", async (roomMessages) => {
      console.log(roomMessages);
      if (roomMessages) dispatch(setMessages(roomMessages));
    });
  }, []);

  const user = useSelector((state) => state.user);
  const { currentRoom, messages, privateMemberMsg } = useSelector(
    (state) => state.message
  );
  const [currentMessage, setCurrentMessage] = useState("");
  const lastMsgRef = useRef();
  const formRef = useRef(null)
  const todayDate = getFormattedDate();
  useEffect(() => {
    scrollToBottom(lastMsgRef);
    scrollToBottom(formRef)
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentTime = getTime();
    const roomId = currentRoom;
    const currentUser = getUser(user);
    socket.emit(
      "message-room",
      roomId,
      currentMessage,
      currentUser,
      currentTime,
      todayDate
    );
    setCurrentMessage("");
  };
  return (
    <>
      <div className="bg-gray-700 w-full min-h-[95%] flex flex-col rounded-md">
        <div className="w-full h-[90vh]  flex-grow p-3 overflow-y-scroll">
          {user._id && privateMemberMsg?._id && (
            <>
              <div className="w-full min-h-[100px] flex items-center justify-center flex-col  mx-auto mb-3 ">
                <p className="m-2">
                  Chat between {privateMemberMsg?.name} & You
                </p>
                <div className="w-full h-full flex items-center justify-center gap-4">
                  <div className={`avatar ${privateMemberMsg?.status}`}>
                    <div className="w-16 rounded-full  ring ring-secondary ring-offset-base-100 ring-offset-2">
                      <img
                        src={privateMemberMsg?.picture}
                        alt={privateMemberMsg?.name}
                      />
                    </div>
                  </div>
                  <div className="avatar online">
                    <div className="w-16 rounded-full  ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={user.picture} alt="You" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {
            currentRoom && <LeaveRoom/>
          }
          {user._id &&
            currentRoom != null &&
            messages.map(({ _id: date, messageByDate }, idx) => (
              <>
                <p className="w-full  h-4 text-center" key={idx}>
                  {date}
                </p>
                {messageByDate?.map(
                  ({ content, time, from: sender, notification }, msgIdx) => {
                    if (notification) {
                      return (
                        <div className="alert alert-info shadow-lg my-5 mx-auto w-[80%] h-[60px]">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              className="stroke-current flex-shrink-0 w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                            <span className="flex justify-center items-center gap-2">
                              {" "}
                              <div class="chat-image avatar">
                                <div class="w-10 rounded-full">
                                  <img src={sender.picture} alt={sender.name} />
                                </div>
                              </div>
                              {content}
                            </span>
                          </div>
                        </div>
                      );
                    }

                   return( <div
                      class={`chat ${
                        sender._id === user._id ? "chat-end" : "chat-start"
                      }`}
                    >
                      <div class="chat-image avatar">
                        <div class="w-10 rounded-full">
                          <img src={sender.picture} alt={sender.name} />
                        </div>
                      </div>
                      <div class="chat-header">
                        {sender._id === user._id ? "You" : sender.name}
                        <time class="text-xs opacity-50 mx-1">{time}</time>
                      </div>
                      <div
                        class={`chat-bubble ${
                          sender._id === user._id
                            ? "chat-bubble-primary"
                            : "chat-bubble-secondary"
                        }`}
                      >
                        {content}
                      </div>
                    </div>)
                  }
                )}
              </>
            ))}
          <div ref={lastMsgRef}></div>
        </div>
        <form className="w-full  flex gap-1 " onSubmit={handleSubmit} ref={formRef}>
          <input
            type="text"
            placeholder="Type Your Message here.."
            className="input input-bordered input-primary w-[90%] "
            required
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <button type="submit" className="btn btn-primary min-w-[10%]">
            <FaTelegramPlane className="text-lg" />
          </button>
        </form>
      </div>
    </>
  );
};

export default MessageForm;
