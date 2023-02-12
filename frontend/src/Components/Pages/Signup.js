import { useEffect, useState } from "react";
import { BiLogInCircle, BiImageAdd } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useSignUpUserMutation } from "../../services/appApi";
import Img2 from "../../assets/img2.svg";
import avatar from "../../assets/default.svg";
import { uploadImg } from "../../utils/util";
import Alert from "../Alert";
import { setLoading } from "../../features/userSlice";
import { setSocket } from "../../features/messageSlice";

const Signup = () => {
  const user = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) {
      dispatch(setSocket());
      if (socket) {
        socket.emit("new-user");
        socket.emit("load-rooms", user._id);
      }
      navigate("/chat");
    }
  }, [user?._id, socket]);

  const initialState = {
    name: "",
    email: "",
    password: "",
    img: null,
  };

  const [formDetails, setFormDetails] = useState(initialState);
  const [imgUpload, setImgUpload] = useState(null);
  const [signUpUser, { isLoading, error }] = useSignUpUserMutation();

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
    let user = {
      name: formDetails.name,
      email: formDetails.email,
      password: formDetails.password,
    };
    if (imgUpload) {
      dispatch(setLoading(true));
      const img = await uploadImg(imgUpload);
      console.log(img);
      setFormDetails((prev) => {
        return { ...prev, img };
      });
      user = { ...user, picture: img };
      setImgUpload(null);
    }
    const res = await signUpUser(user);
    console.log(res);
    dispatch(setLoading(false));
  };

  const validateImg = (e) => {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Max file size if 1mb");
    }
    setFormDetails((prev) => {
      return {
        ...prev,
        img: URL.createObjectURL(file),
      };
    });

    setImgUpload(file);
  };

  return (
    <>
      {user.error && <Alert>{user.error}</Alert>}

      <section className="min-w-full min-h-screen p-2 flex flex-col justify-center items-center lg:flex-row">
        <div className="w-full min-h-[45vh] flex flex-col  justify-center items-center p-8">
          <img
            src={Img2}
            alt="chat at anywhere"
            className="max-w-[60%] mb-4 md:max-w-[50%]"
          />
          <h3 className="font-roboto text-xl font-bold">
            Sign up to chat with the world!
          </h3>
        </div>
        <div className="w-full min-h-[45vh] flex flex-col justify-center items-center gap-3">
          <form
            className="w-full flex flex-col justify-center items-center gap-4 "
            onSubmit={onSubmitHandler}
          >
            <div>
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={formDetails.img ? formDetails.img : avatar}
                    alt="profile "
                  />
                </div>
              </div>
              <div className="tooltip" data-tip="Add Profile Image">
                <label htmlFor="image-upload">
                  <BiImageAdd className="text-green-400 text-lg cursor-pointer" />
                </label>
              </div>
              <input
                type="file"
                id="image-upload"
                hidden
                accept="image/png,image/jpeg,image/jpeg"
                onChange={validateImg}
              />
            </div>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered input-primary w-full max-w-xs "
              value={formDetails.name}
              onChange={(e) => onChangeHandler("name", e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered input-primary w-full max-w-xs "
              value={formDetails.email}
              onChange={(e) => onChangeHandler("email", e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered input-primary w-full max-w-xs"
              value={formDetails.password}
              onChange={(e) => onChangeHandler("password", e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">
              Sign up
              <BiLogInCircle className="text-xl" />
            </button>
          </form>
          <h3 className="text-lg font-roboto font-semibold">
            Already have an account ? &nbsp;{" "}
            <Link to="/login" className="text-blue-500">
              Login here
            </Link>
          </h3>
        </div>
      </section>
    </>
  );
};

export default Signup;
