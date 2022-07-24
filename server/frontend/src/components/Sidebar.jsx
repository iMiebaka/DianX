import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const userDetail = useSelector(state => state.userDetail)

  return (
    <div className=" flex min-h-full  flex-col w-14 items-center bg-indigo-200 border border-blue-400 shadow backdrop-filter backdrop-blur-lg bg-opacity-70">
      <div className="flex-1 flex flex-col justify-center">
        <Link to="/">
          <i title="" className="mdi mdi-home mdi-24px text-indigo-700"></i>
        </Link>
        <a href="/find">
          <i title="" className="mdi mdi-account-search mdi-24px text-indigo-700"></i>
        </a>
      </div>
      <div className="flex relative items-center">
        <i title={userDetail.deviceName} className="mdi mdi-account-circle mdi-36px "></i>
        {/* <div className="absolute">sos</div> */}
      </div>
    </div>
  );
};

export default Sidebar;
