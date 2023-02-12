import { useRef, useState } from "react";
import SelectMembers from "./SelectMembers";

import { useSelector } from "react-redux";


const JoinRoom = () => {
  const [newRoomName, setNewRoomName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectMembersID, setSelectMembersID] = useState([]);

  const closeRef = useRef(null);
  const user = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.message);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.userId = user._id;
    socket.emit("create-room", newRoomName, user._id, selectedMembers);
    closeRef.current.click();
    setSelectedMembers((prev) => []);
    setNewRoomName("");
    setSelectMembersID([]);
    
  };
  return (
    <div className="w-full  flex items-center justify-center mb-3">
      {/* The button to open modal */}
      <label htmlFor="my-modal-3" className="btn btn-info" ref={closeRef}>
        Create New Room
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold mb-3">Enter the Name</h3>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-info w-full max-w-xs"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              required
            />

            <button type="submit" className="btn btn-outline btn-info">
              Create
            </button>
          </form>
          <SelectMembers
            selectedMembers={selectedMembers}
            setSelectedMembers={setSelectedMembers}
            selectMembersID={selectMembersID}
            setSelectMembersID={setSelectMembersID}
          />
          <div className="modal-action"></div>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
