
import React from 'react'
import { IoHeartSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Card = (props) => {

  const id = props.id
 
  // console.log(props.img)

  return (
    <div className=' hover:shadow-2xl hover:shadow-[#252561] shadow-md duration-[600ms]  border rounded-md'>
      <Link to={`Photo/${id}`} >
      <div className=' flex flex-col' >
        <div >
          <img className=' h-[170px] rounded-t-md' src={props.img}  width={300} alt="" />
        </div>
        <div className=' pb-3 flex flex-col items-center'>
          <div className=' border-white rounded-full border-[4px] mt-[-15px]'>
            <img  className=' rounded-full' width={35} src={props.userImg} alt="" />
          </div>
          <div className=' flex flex-col items-center text-black font-semibold py-1'>
            <div>
              {props.user}
            </div>
            <div className='  text-[#403296] text-sm flex gap-2 items-center '>
            <IoHeartSharp className=' ' />
            <h1>{props.like}</h1>
            </div>
          </div>
        </div>
      </div>
      </Link>
    </div>
  )
}

export default Card
