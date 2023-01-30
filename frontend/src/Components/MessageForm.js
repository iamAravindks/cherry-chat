import { FaTelegramPlane } from "react-icons/fa";

const MessageForm = () => {
  return (
    <>
      <div className="bg-gray-700 w-full min-h-[85vh] flex flex-col rounded-md">
        <div className="w-full min-h-[90%]  flex-grow">hello</div>
        <form className="w-full flex gap-1">
          <input
            type="text"
            placeholder="Type Your Message here.."
            className="input input-bordered input-primary w-[90%] "
            required
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
