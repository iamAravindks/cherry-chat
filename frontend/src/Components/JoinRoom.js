import { useState } from "react";

const JoinRoom = () => {
    const [newRoomName, setNewRoomName] = useState("");
    
    const handleSubmit = (e =>
    {
        e.preventDefault()
    })
  return (
    <div className="w-full  flex items-center justify-center mb-3">
      {/* The button to open modal */}
      <label htmlFor="my-modal-3" className="btn btn-info">
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
            />
            <button type="submit" className="btn btn-outline btn-info">Create</button>
          </form>
          <div className="modal-action"></div>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
