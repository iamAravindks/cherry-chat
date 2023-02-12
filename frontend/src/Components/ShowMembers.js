import React from 'react'
import { useSelector } from "react-redux";
import { getMembers } from "../utils/util";

const ShowMembers = () =>
{

    const {rooms,currentRoom} = useSelector(state=>state.message)
    
    const members = getMembers(rooms, currentRoom);
  return (
    <div className="ml-auto">
      {/* The button to open modal */}
      <label htmlFor="my-modal-4" className="btn">
        open modal
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">
            Members
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
        </label>
      </label>
    </div>
  );
}

export default ShowMembers