import NavBar from "./components/NavBar"
import Menu from "./components/Menu"
import MainPage from "./pages/MainPage";
import CardDetail from "./pages/Img/CardDetail"
import { Route, Routes, useNavigate } from "react-router-dom";

import CardList from "./components/Video/VidCardList";
import VidDetail from "./pages/Vid/VidDetail";
import Login from "./pages/Auth/Login";
import { Signup } from "./pages/Auth/Signup";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import Loading from "./components/Loading";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "./contectProvider/Context";
const App =() =>{
  const [data , setData] = useState(false)

  const {logindata , setLoginData} = useContext(LoginContext)

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
      // navigate("*")
    }else{
      // console.log("user verify");
      setLoginData(data)
      navigate("/")
    }
}
useEffect(()=>{
  setTimeout(()=>{
    ProfileValid()
    setData(true)
  },1000)
},[])

  return (
    <>
   { 
    data ? (
    
    <div>
      <NavBar/>
      <div className=" flex ">
      <Menu />
      <Routes>
        
        <Route path="/" element={<MainPage/>} />
        <Route exact path="/Photo/:id" element={<CardDetail/>} />
        <Route  path="/videos/video/:id" element={<VidDetail/>} />
        <Route path="/videos" element={<CardList/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="*" element={<Error/>} />
      </Routes>
      </div>
     
    </div>
    ) : <div  className=" mt-[22%]"><Loading/></div> 
    }
    </>
  );
}

export default App;
