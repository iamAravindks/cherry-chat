import React from "react";
import { useSelector } from "react-redux";

const Loader = () => {
  const { loading } = useSelector((state) => state.user || {});

  if (loading) {
    return (
      <div className="absolute bg-gray-800 top-0 left-0 min-h-[110vh] min-w-full flex flex-col gap-2 items-center justify-center z-20 overflow-x-hidden">
        <svg
          xml="true"
          n="true"
          s="http://www.w3.org/2000/svg"
          fill="none"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 animate-ping scale-105"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
          />
        </svg>
        <h3 className="text-2xl font-semibold">Loading..</h3>
      </div>
    );
  }
  return <></>;
};

export default Loader;
