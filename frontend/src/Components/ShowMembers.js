import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMembers } from "../utils/util";

const ShowMembers = () => {
  const { rooms, currentRoom } = useSelector((state) => state.message);
  const { socket } = useSelector((state) => state.message);
  const members = getMembers(rooms, currentRoom);
  const [admin, setAdmin] = useState("User loading...");

  useEffect(() => {
    if (socket) {
      socket.off("fetch-room-admin").on("fetch-room-admin", (payload) =>
      {
        setAdmin(payload);
      });
      socket.emit("fetch-room-admin", currentRoom);
    }
  }, [socket]);

  return (
    <div className="ml-auto">
      {/* The button to open modal */}
      <label htmlFor="my-modal-4" className="btn">
        Members
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Members</h3>
          <div className="py-4 flex flex-wrap gap-3">
            <button className="btn btn-success">{admin}</button>

            {members?.members.map((member) => (
              <button key={member._id} className="btn btn-info">
                {member.name}
              </button>
            ))}
          </div>
        </label>
      </label>
    </div>
  );
};

export default ShowMembers;
