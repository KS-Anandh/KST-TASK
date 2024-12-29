import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const Profile = () => {

  const [userData,setUserData]=useState([])

  const navigation=useNavigate()

  useEffect(() => {
    const fetch=async()=>{
      const token =localStorage.getItem("token");
      if(token){
        try{
          const res=await axios.post("http://localhost:9600/users/verifyToken",{token})
          setUserData(res.data)
        }
        catch(err){
          alert(err.msg);
        }
      }
      else{
        navigation("/login")
      }
    }
    fetch()
   
  },[]);

  const logoutHandler=()=>{
     localStorage.removeItem("token");
     navigation("/login")
  }
  return (
    <div className="profile-container">
      <div className="header">
      <h3>Welocome to {userData.userName}</h3>
      <p className="profile-logout" onClick={logoutHandler}>Logout</p>
      </div>
      <div className="profile">
        <img
          src={userData.userProfile}
          loading="lazy"
        />
           <iframe src={userData.userResume} loading="lazy"></iframe>
        <div className="profile-info">
        <p>UserName: <b>{userData.userName}</b></p>
        <p>userDob: <b>{userData.userDob}</b></p>
        <p>userMail: <b>{userData.userMail}</b></p>
        <p>userGender: <b> {userData.userGender}</b></p>
        <p id="resume-dow-btn"> <a href={userData.userResume}>View Resume</a></p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
