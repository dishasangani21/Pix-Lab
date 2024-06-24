import React, { useContext } from "react";
import { IoCamera } from "react-icons/io5";
import { PiVideoCameraFill } from "react-icons/pi";
import { TbPinnedFilled } from "react-icons/tb";
import { AiFillClockCircle } from "react-icons/ai";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { LoginContext } from "../contectProvider/Context";

const Menu = () => {

  const { logindata, setLoginData } = useContext(LoginContext);


  return (
    <div className=" fixed left-0 mt-[45px]   w-[12%] flex flex-col justify-between pb-12 h-screen  bg-white border-r-2 border">
      <div className=" text-[#353535] mt-4 items-start pl-6 flex flex-col gap-4">
        <div className="group hover:text-[#2f207c]  items-center flex gap-3">
          <IoCamera className=" group-hover:scale-105 duration-700 text-xl" />
          <Link to="/">Photos</Link>
        </div>
        <div className=" group hover:text-[#2f207c]  items-center  flex gap-3">
          <PiVideoCameraFill className=" group-hover:scale-105 duration-700 text-xl" />
          <Link to="/videos">Videos</Link>
        </div>

        {logindata.ValidUserOne ? (
          <>
          <div className=" group hover:text-[#2f207c]  items-center  flex gap-3">
          <TbPinnedFilled className=" group-hover:scale-105 duration-700 text-xl" />
          <Link to="/">Pinned</Link>
        </div>
        <div className=" group hover:text-[#2f207c]  items-center  flex gap-3">
          <AiFillClockCircle className=" group-hover:scale-105 duration-700 text-xl" />
          <Link to="/">Recents</Link>
        </div>
        <div className=" group hover:text-[#2f207c]  items-center  flex gap-3">
          <FaCloudUploadAlt className=" group-hover:scale-105 duration-700 text-xl" />
          <Link to="/">Uploads</Link>
        </div>

        </>
            
          ) : (
            ""
          )}

       
      </div>

      <div className=" group flex gap-2 text-white font-semibold text-sm items-center bg-[#5942ef] m-3 rounded-full px-3 py-1">
        <FaPlus className="group-hover:rotate-90 duration-500 " />
        <button className=" ">NEW ALBUM</button>
      </div>
    </div>
  );
};

export default Menu;
