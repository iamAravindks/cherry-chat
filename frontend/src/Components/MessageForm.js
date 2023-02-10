import { useEffect, useRef, useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setMessages, socket } from "../features/messageSlice";
import { getFormattedDate, getTime, getUser } from "../utils/util";

const MessageForm = () => {
  const dispatch = useDispatch();

  const scrollToBottom = () =>
    lastMsgRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    socket.off("room-messages").on("room-messages", async (roomMessages) => {
      if (roomMessages) dispatch(setMessages(roomMessages));
    });
     
  }, []);



  const user = useSelector((state) => state.user);
  const { currentRoom, messages, privateMemberMsg } = useSelector(
    (state) => state.message
  );
  const [currentMessage, setCurrentMessage] = useState("");
  const lastMsgRef = useRef();
  const todayDate = getFormattedDate();
  useEffect(() => {
    scrollToBottom();
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
                <p className="m-2">Chat between {privateMemberMsg?.name} & You</p>
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
          {user._id &&
            currentRoom != null &&
            messages.map(({ _id: date, messageByDate }, idx) => (
              <>
                <p className="w-full  h-4 text-center" key={idx}>
                  {date}
                </p>
                {messageByDate?.map(
                  ({ content, time, from: sender }, msgIdx) => (
                    <div
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
                    </div>
                  )
                )}
              </>
            ))}
          <div ref={lastMsgRef}></div>
        </div>
        <form className="w-full  flex gap-1 " onSubmit={handleSubmit}>
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
