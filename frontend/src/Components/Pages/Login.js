/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { BiLogInCircle } from "react-icons/bi";
import { useLoginUserMutation } from "../../services/appApi";
import Alert from "../Alert";
import Img1 from "../../assets/img1.svg";
import { setSocket } from "../../features/messageSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.message);

  useEffect(() => {
    if (user?._id) {
      dispatch(setSocket());
      if (socket)
      {
        socket.emit("new-user")
        socket.emit("set-status",user._id,"online")
      socket.emit("load-rooms",user._id)
      };
      navigate("/chat");
    }
  }, [user?._id,socket]);

  const initialState = {
    email: "",
    password: "",
  };
  const [formDetails, setFormDetails] = useState(initialState);
  const [loginUser] = useLoginUserMutation();

  const onChangeHandler = (prop, val) => {
    setFormDetails((prev) => {
      return {
        ...prev,
        [prop]: val,
      };
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const res = await loginUser(formDetails);
    if (!res.error) navigate("/");
  };

  return (
    <>
      {user.error && <Alert>{user.error}</Alert>}
      <section className="min-w-full min-h-screen p-2 flex flex-col justify-center items-center lg:flex-row">
        <div className="w-full min-h-[45vh] flex flex-col  justify-center items-center p-8">
          <img
            src={Img1}
            alt="chat at anywhere"
            className="max-w-[60%] mb-4 md:max-w-[50%]"
          />
          <h3 className="font-roboto text-xl font-bold">
            Login to continue where you left!
          </h3>
        </div>
        <div className="w-full min-h-[45vh] flex flex-col justify-center items-center gap-3">
          <form
            className="w-full flex flex-col justify-center items-center gap-4 "
            onSubmit={onSubmitHandler}
          >
            <input
              type="email"
              placeholder="email"
              className="input input-bordered input-primary w-full max-w-xs "
              value={formDetails.email}
              onChange={(e) => onChangeHandler("email", e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="password"
              className="input input-bordered input-primary w-full max-w-xs"
              value={formDetails.password}
              onChange={(e) => onChangeHandler("password", e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">
              Login
              <BiLogInCircle className="text-xl" />
            </button>
          </form>
          <h3 className="text-lg font-roboto font-semibold">
            New here ? &nbsp;{" "}
            <Link to="/signup" className="text-blue-500">
              Signup to start
            </Link>
          </h3>
        </div>
      </section>
    </>
  );
};

export default Login;
