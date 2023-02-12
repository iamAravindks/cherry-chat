import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../services/appApi";
import Alert from "./Alert";

const ProfileAvatar = ({ url, logout }) => {
  const { socket } = useSelector((state) => state.message);
  const { _id } = useSelector((state) => state.user);

  const handleLogout = () => {
    if (socket) {
      socket.emit("set-status", _id, "offline");
    }
    logout();
  };
  return (
    <div className="flex gap-3  max-h-[50px] items-center ">
      <div className="avatar w-14  online">
        <div className="w-24 border-blue-600 border rounded-full">
          <img src={url} alt="profile" />
        </div>
      </div>
      <button className="btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

const Navbar = () => {
  const { _id, picture } = useSelector((state) => state.user);
  const [logout, { error }] = useLogoutMutation();

  return (
    <>
      {error && <Alert>{error}</Alert>}
      <div className="navbar bg-purple-700 ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52 bg-purple-700"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/chat">Chat</Link>
              </li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl ml-4">
            Cherry Chat
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {_id ? (
            <ProfileAvatar url={picture} logout={logout} />
          ) : (
            <Link to="/login" className="btn">
              Log in
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
