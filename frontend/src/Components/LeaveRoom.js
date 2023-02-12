import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { checkRoomAdmin } from "../utils/util"
import {setCurrentRoom, setMessages} from '../features/messageSlice'

const LeaveRoom = () =>
{
  const dispatch = useDispatch()
  const { rooms, currentRoom } = useSelector(state => state.message)
  const { socket } = useSelector((state) => state.message);
  
  const {_id} = useSelector(state=>state.user)
  const isAdmin = checkRoomAdmin(rooms, currentRoom, _id);
  const leaveRoom = async (currentRoom, _id) =>
  {
    socket.emit("leave-room", currentRoom, _id)
    socket.emit("load-rooms",_id);
    dispatch(setCurrentRoom(null))
    dispatch(setMessages([]))
  }
  return (
    <>
      <button className="btn btn-active" onClick={()=>leaveRoom(currentRoom,_id)}>{isAdmin ? "delete group" : "leave group"}</button>
    </>
  );
}

export default LeaveRoom