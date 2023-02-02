import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouteWrapper = () => {
  const user = useSelector(state=>state.user);
  return user?._id ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRouteWrapper;
