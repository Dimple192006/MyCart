import React from "react";
import Logo from "../assets/logo.png"
import google from "../assets/google.png"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import axios from "axios"

import { authDataContext } from "../context/authContext";
import { useContext } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { userDataContext } from "../context/userContext";
import Loading from "../component/Loading";
function Registration(){
    let [show,setShow]=useState(false);
    let {serverUrl}=useContext(authDataContext)
    console.log("Serverurl:",serverUrl)
    let navigate=useNavigate();
    let [name,setName]=useState("");
    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("");
    const [loading,setLoading]=useState();
    const context = useContext(authDataContext);
    let {getCurrentUser}=useContext(userDataContext)
console.log("context:", context);


    const handleSignup= async (e)=>{
        setLoading(true)
        e.preventDefault()
        try {
            const result=await axios.post(serverUrl+'/api/auth/registration',
                {name,email,password},{withCredentials:true})
                console.log(result.data)
                
                getCurrentUser()
                navigate("/")
                 
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const googleSignup=async()=>{
        try {
            const response=await signInWithPopup(auth,provider)
            let user=response.user
            let name=user.displayName;
            let email=user.email

            const result=await axios.post(serverUrl+"/api/auth/googlelogin",{name,email},{withCredentials:true})
            console.log(result.data)
            getCurrentUser()
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start">
            <div className="w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer" onClick={()=>navigate("/")}>
                <img className="w-[40px] " src={Logo} alt="" />
                <h1 className="text-[22px] font-sans">MyCart</h1>
            </div>
            <div className="w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]">
                <span className="text-[25px] font-semibold">Register page</span>
                <span className="text-[16px]">Welcome to MyCart, Place your order</span>
            </div>
            <div className="max-w-[600px] w-[90%] h-[500px] bg-[#0000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center">
                <form action="" onSubmit={handleSignup} className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px] ">
                    <div className="w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer" onClick={googleSignup}>
                        <img className="w-[20px]" src={google} alt=""/> Registration with google
                    </div>
                    <div className="w-[100%] h-[20px] flex items-center justify-center gap-[10px]">
                        <div className="w-[40%] h-[1px] bg-[#96969635]"></div>Or<div className="w-[40%] h-[1px] bg-[#96969635]"></div>
                    </div>
                    <div className="relative w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px]">
                        <input type="text" className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold" placeholder="UserName" required onChange={(e)=>setName(e.target.value)} value={name}/>
                        <input type="text" className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold" placeholder="Email" required onChange={(e)=>setEmail(e.target.value)} value={email}/>
                        <input type={show?"text":"password"} className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)} value={password}/>
                        {!show && <IoEyeOutline className="w-[20px] h-[20px] cursor-pointer absolute right-[5%]" onClick={()=>setShow(prev=>!prev)}/>}
                        {show && <IoEye className="w-[20px] h-[20px] cursor-pointer absolute right-[5%]" onClick={()=>setShow(prev=>!prev)}/>}
                        <button className="w-[100%] h-[50px] border-[2px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold">{loading ? <Loading/> : "Create Account"}</button>
                        <p className="flex gap-[10px]">Already have an account?<span className="text-[17px] font-semibold text-[#5555f6cf] cursor-pointer" onClick={()=>navigate("/login")}>Login</span></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registration