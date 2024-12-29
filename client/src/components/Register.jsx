import React, { useState } from "react";
import axios from "axios";
import storage from "../config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import {v4 as uuidv4} from 'uuid'
const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);
  const [userMail, setUserMail] = useState(null);
  const [userDob, setUserDob] = useState(null);
  const [userGender, setUserGender] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userProof, setUserProof] = useState(null);
  const [showImg, seShowImg] = useState(null);
  const [showPdf, setShowPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const getUrl = async (file) => {
    if (!file) return;
    const imageName = `${uuidv4()}_${file.name}`;
    const storageRef = ref(storage, `images/${imageName}`);
    var url;
    try {
      await uploadBytes(storageRef, file);
      url = await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed: " + error.message);
    }
    return url;
  };

  const base64converter1 = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      seShowImg(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const base64converter2 = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setShowPdf(url);
  };
  const submitHandler = async () => {
    setLoading(true);
    if (
      !userName ||
      !userMail ||
      !userDob ||
      !userGender ||
      !userProfile ||
      !userProof
    ) {
      alert("All Fields are Required");
      setLoading(false);
      return;
    }
    try {
      const imgUrl=await getUrl(userProfile);
      const pdfUrl=await getUrl(userProof);
      const res = await axios.post(
        "http://localhost:9600/users/register",
        {userProfile:imgUrl,userResume:pdfUrl,userName,userDob,userGender,userMail}
      );
      alert(res.data.msg);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      alert(error.data);
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="register">
      <div className="form">
        <center>
          <h3 style={{ padding: "10px" }}> Student Registration</h3>
        </center>
        <div className="field">
          <p className="field-title"> Student Name</p>
          <input
            type="text"
            placeholder="Enter name"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="field">
          <p className="field-title"> Student Mail-Id</p>
          <input
            type="gmail"
            placeholder="Enter Mail"
            onChange={(e) => setUserMail(e.target.value)}
          />
        </div>
        <div className="field">
          <p className="field-title">Select Gender</p>
          <div className="field1">
            <input
              type="radio"
              id="male"
              value={"male"}
              checked={userGender == "male"}
              placeholder=""
              onChange={(e) => setUserGender(e.target.value)}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div className="field2">
            <input
              type="radio"
              id="female"
              value={"female"}
              checked={userGender == "female"}
              placeholder=""
              onChange={(e) => setUserGender(e.target.value)}
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <div className="field">
          <p className="field-title">Student Date of Birth</p>
          <input type="date" onChange={(e) => setUserDob(e.target.value)} />
        </div>
        <div className="field">
          <p className="field-title">Profile Upload</p>
          <label htmlFor="primary">
            <div className="chooseFile">
              {userProfile ? (
                <img src={showImg} alt="" />
              ) : (
                <p className="field-title">Upload Profile</p>
              )}
            </div>
          </label>
          <input
            type="file"
            id="primary"
            onChange={(e) => {
              setUserProfile(e.target.files[0]);
              base64converter1(e);
            }}
            accept=".jpeg,.png,.jpg"
          />
        </div>
        <div className="field">
          <p className="field-title">Resume Upload</p>
          <label htmlFor="secondary">
            <div className="chooseFile">
              {userProof ? (
                <iframe src={showPdf} ></iframe>
              ) : (
                <p className="field-title">Upload Resume(PDF)</p>
              )}
            </div>
          </label>
          <input
            type="file"
            id="secondary"
            onChange={(e) => {
              setUserProof(e.target.files[0]);
              base64converter2(e);
            }}
            accept=".pdf"
          />
        </div>
        <div className="field ">
          <center style={{ color: "blue" }}>
           <Link to={'/login'}> <p>Already I have Account.?</p></Link>
          </center>
        </div>
        {!loading ? (
          <button onClick={submitHandler}>Submit</button>
        ) : (
          <button>Loading</button>
        )}
      </div>
    </div>
  );
};

export default Register;
