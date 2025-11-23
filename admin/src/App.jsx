import React from "react";
import Add from "./pages/Add";
import Home from "./pages/Home";
import Lists from "./pages/Lists";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import {ToastContainer,toast} from "react-toastify"
import { adminDataContext } from "./context/AdminContext";
import "react-toastify/dist/ReactToastify.css";
function App(){
    let {adminData}=useContext(adminDataContext)
    return(
        <>
        {!adminData ? <Login/> : <>  
        {/* <ToastContainer/>          */}
        <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="dark" 
      />
         <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/add" element={<Add/>} />
                <Route path="/lists" element={<Lists/>} />
                <Route path="/orders" element={<Orders/>} />
                <Route path="/login" element={<Login/>} />
            </Routes>
        </> 
        }
        </>
    )
}


export default App;