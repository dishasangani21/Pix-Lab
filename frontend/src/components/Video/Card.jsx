import React from "react";
import HoverVideoPlayer from "react-hover-video-player";
import { IoHeartSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Loading from "../Loading";

const Card = (props) => {
  const id = props.id;

  // console.log(props.img)

  return (
    <div className=" hover:shadow-2xl hover:shadow-[#252561] shadow-md  duration-[600ms] m-5 border rounded-md">
      <Link to={`video/${id}`}>
        <div className=" flex flex-col">
          <div>

            <HoverVideoPlayer
             loop
              videoSrc={props.img}
              preload="metadata"
              loadingOverlay={
                <div className="  hover:bg-opacity-30 bg-black h-full mt-0  ">
                  <Loading />
                </div>
              }
            />
          </div>
          <div className=" pb-3 flex flex-col items-center">
            <div className=" z-10 border-white rounded-full border-[4px] mt-[-15px]">
              <img
                className=" rounded-full"
                width={35}
                src={props.userImg}
                alt=""
              />
            </div>
            <div className=" flex flex-col items-center text-black font-semibold py-1">
              <div>{props.user}</div>
              <div className="  text-[#403296] text-sm flex gap-2 items-center ">
                <IoHeartSharp className=" " />
                <h1>{props.like}</h1>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
