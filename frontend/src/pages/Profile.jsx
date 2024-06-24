import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from '../contectProvider/Context'
import Loading from '../components/Loading'

const Profile = () => {

  const {logindata , setLoginData} = useContext(LoginContext)

  const [data , setData] = useState(false)

    // console.log();

  const navigate = useNavigate()

  const ProfileValid = async()=>{
      let token = localStorage.getItem("userdataToken")
      // console.log(token)

      const res = await fetch("http://localhost:8800/validuser" , {
       
        method : "GET",
        headers :{
          "Content-Type":"application/json",
          "Authorization": token
        }
      })

      const data = await res.json()
      // console.log(data);

      if(data.status === 401 || !data){
        navigate("*")
      }else{
        // console.log("user verify");
        setLoginData(data)
        navigate("/profile")
      }
  }

  // useEffect(()=>{
  //   ProfileValid()
  // },[])


  useEffect(()=>{
    setTimeout(()=>{
      ProfileValid()
      setData(true)
    },1000)
  },[])


  return (
    
    <>
      {data ? (
            <div className=' ml-[20%] mt-[10%] text-[30px]'>
 Profile
<p>{logindata ? logindata.ValidUserOne.name : ""}</p>
<p>{logindata ? logindata.ValidUserOne.email : ""}</p>
            </div>
          ) : (
            <div  className=" text-center ml-[45%] mt-[22%]"><Loading/></div> 
          )}

     
    </>
  )
}

export default Profile
