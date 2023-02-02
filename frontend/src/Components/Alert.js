import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearError } from "../features/userSlice";

const Alert = ({ severity, children }) => {
  console.log(children);
  const errClass = `alert-${severity}`
  const dispatch = useDispatch()
  useEffect(() => {
    let timer;
    if (severity === "error") {
      
      timer = setTimeout(() => dispatch(clearError()), 3000);
    }
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className={`alert ${errClass} shadow-lg absolute min-w-[30%] max-w-[600px] top-0 right-0 mt-4 md:mr-4 animate-slide`}>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{children}</span>
      </div>
    </div>
  );
};

Alert.defaultProps = {
  severity: "error",
};

export default Alert;
