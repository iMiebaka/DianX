import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="absolute flex h-full flex-col w-14 items-center bg-gray-100 text-cyan-50 border-slate-100">
      <div className="flex-1 flex flex-col justify-center">
        <Link to="/">
          <i title="" className="mdi mdi-home mdi-24px text-purple-700"></i>
        </Link>
        <Link to="/find">
          <i title="" className="mdi mdi-account-search mdi-24px text-purple-700"></i>
        </Link>
      </div>
      <div className="flex items-center">
        <i title="" className="mdi mdi-account-circle mdi-36px "></i>
        <div className="hidden hover:block">sos</div>
      </div>
    </div>
  );
};

export default Sidebar;
