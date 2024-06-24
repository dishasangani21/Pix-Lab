import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../contectProvider/Context";

const NavBar = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  // console.log(logindata)

  const navigate = useNavigate();

  const goError = () => {
    navigate("*");
  };
  const goProfile = () => {
    navigate("/profile");
  };

  const logoutuser = async () => {
    let token = localStorage.getItem("userdataToken");


    const res = await fetch("http://localhost:8800/logout", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": token,
          accept: "application/json"
      }
  });

  const data = await res.json();
  console.log(data);

  if (data.status == 201) {
      console.log("use logout");
      localStorage.removeItem("userdataToken");
      setLoginData(false)
      navigate("/");
  } else {
      console.log("error");
  }

}

  return (
    <div className=" fixed top-0 z-20 w-full">
      <div className=" shadow-2xl bg-[#5942ef] h-12 flex justify-between items-center w-[100%] text-center">
        <Link to={"/"} className=" px-6 text-white">
          PixLab
        </Link>

        <div className="text-xl flex items-center gap-4 px-3 justify-center  text-white cursor-pointer">
          {logindata.ValidUserOne ? (
            <p onClick={goProfile} className="text-[16px]">
              Welcome {logindata ? logindata.ValidUserOne.name : ""}
            </p>
          ) : (
            <p onClick={goError} className=" ">
              <CgProfile />
            </p>
          )}

          <div className=" flex justify-center items-center gap-4 text-[16px]">
            {logindata.ValidUserOne ? (
              <p onClick={logoutuser}>Logout</p>
            ) : (
              <Link className=" text-" to={"/login"}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
