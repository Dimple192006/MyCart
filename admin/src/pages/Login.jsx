import react, { useContext } from "react";
import Logo from "../assets/logo.png"

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoCloudyNight, IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import axios from "axios"
import { authDataContext } from "../context/AuthContext.jsx";
import { adminDataContext } from "../context/AdminContext";
import { toast } from "react-toastify";
import Loading from "../component/Loading";

function Login(){
    let [show,setShow]=useState(false);
    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("");
    let {serverUrl}=useContext(authDataContext)
    let {adminData,getAdmin}=useContext(adminDataContext)
    const [loading,setLoading]=useState(false)
    
    let navigate=useNavigate();
    console.log(serverUrl)
    const AdminLogin=async(e)=>{
        setLoading(true)
        e.preventDefault()
        try {
            const result=await axios.post(serverUrl+"/api/auth/adminlogin",{email,password},{withCredentials:true})
            console.log(result.data)
            toast.success("Admin Login Successfull")
            getAdmin()
            navigate("/")
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error("Admin login failed")
        }
    }

    return(
        <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start">
            <div className="w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer" >
                <img className="w-[40px] " src={Logo} alt="" />
                <h1 className="text-[22px] font-sans">MyCart</h1>
            </div>
            <div className="w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]" >
                <span className="text-[25px] font-semibold" >Login page</span>
                <span className="text-[16px]">Welcome to MyCart, Apply to Admin Login</span>
            </div>
            <div className="max-w-[600px] w-[90%] h-[400px] bg-[#0000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center">
                <form action="" onSubmit={AdminLogin} className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px] ">
                    
                    
                    <div className="relative w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px]">
                        <input type="text" className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold" placeholder="Email" required onChange={(e)=>setEmail(e.target.value)} value={email}/>
                        <input type={show?"text":"password"} className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold" placeholder="Password" required  onChange={(e)=>setPassword(e.target.value)} value={password} />
                        {!show && <IoEyeOutline className="w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[50%]" onClick={()=>setShow(prev=>!prev)}/>}
                        {show && <IoEye className="w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[50%]" onClick={()=>setShow(prev=>!prev)}/>}
                        <button className="w-[100%] h-[50px] border-[2px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold">{loading ? <Loading/> : "Login"}</button>
                    </div>
                        
                </form>
            </div>
        </div>
    )
}

export default Login