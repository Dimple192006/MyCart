import React from "react"
import back2 from "../assets/back-2.jpeg"
import back3 from "../assets/back-3.webp"
import back4 from "../assets/back-4.jpg"
import back5 from "../assets/back-5.webp"
function Background({heroCount}){
   
        if(heroCount===0){
            return <img className="ml-auto w-[50%] h-[100%] rounded-lg float-right overflow:auto object-cover" src={back2} alt=""/>
        }else if(heroCount===1){
            return <img className="ml-auto w-[50%] h-[100%] float-right overflow:auto object-cover" src={back3} alt=""/>
        }else if(heroCount===2){
            return <img className="ml-auto w-[50%] h-[100%] float-right overflow:auto object-cover" src={back4} alt=""/>
        }else if(heroCount===3){
            return <img className="ml-auto w-[50%] h-[100%] float-right overflow:auto object-cover" src={back5} alt=""/>
        }
    
}

export default Background