import React from 'react'

const Footer = () => {
  return (
    <div className="  flex text-right justify-end items-center gap-1 mr-2 ml-2 my-1">
      {" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-info flex-shrink-0 w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      If you encounter any issues,please refresh the page
    </div>
  );
}

export default Footer