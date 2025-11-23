import React, { useContext,useState } from "react"

import airobot from "../assets/aiuncle.png";
import { ShopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import open from "../assets/audio1.mp3"
import { signInWithPopup } from "firebase/auth";
import { authDataContext } from "../context/authContext";
import { userDataContext } from "../context/userContext";
import { auth, provider } from "../../utils/Firebase";
import axios from "axios";


function Ai(){
    let {showSearch,setShowSearch,toggleCategory,addToCart,handleLogOut}=useContext(ShopDataContext)
    let navigate=useNavigate()
    let [activeAi,setActiveAi]=useState(false)
    let {serverUrl}=useContext(authDataContext);
    const {getCurrentUser}=useContext(userDataContext);
    const googleLogin=async()=>{
        try {
            const response=await  signInWithPopup(auth,provider)
            let user=response.user
            let name=user.displayName
            let email=user.email
            const result=await axios.post(serverUrl+"/api/auth/googlelogin",{name,email},{withCredentials:true});
            console.log(result.data)
            getCurrentUser()
            navigate("/")
            toast.success("Login successfull")
        } catch (error) {
            console.log(error)
            toast.error("Login Error")
            
        }
    }
    let openingSound=new Audio(open)
    openingSound.playbackRate=3.0
    function speak(message){
        let utterence =new SpeechSynthesisUtterance(message)
        window.speechSynthesis.speak(utterence)

    }

    const speechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition=new speechRecognition()
    if(!recognition){
        console.log("Not Supported")
    }
    //console.log(recognition)
    recognition.onresult=(e)=>{
        const transcript=e.results[0][0].transcript.trim();
        console.log(transcript)
        if(transcript.toLowerCase().includes("search")&& transcript.toLowerCase().includes("open") && !showSearch){
            speak("opening search")
            setShowSearch(true)
            navigate("/collections")
        }else if(transcript.toLowerCase().includes("search")&&transcript.toLowerCase().includes("close") && showSearch){
            speak("closing search")
            setShowSearch(false)
        }else if(transcript.toLowerCase().includes("collection") || transcript.toLowerCase().includes("collections") || transcript.toLowerCase().includes("product") || transcript.toLowerCase().includes("products")){
            speak("opening collection page")
            navigate("/collections")
        }else if(transcript.toLowerCase().includes("about") ||  transcript.toLowerCase().includes("aboutpage")){
            speak("opening about page")
            navigate("/about")
            setShowSearch(false);
        }else if(transcript.toLowerCase().includes("home")|| transcript.toLowerCase().includes("homepage")){
            speak("Opening home page")
            navigate("/")
            setShowSearch(false)
        }else if(location.pathname.startsWith("/productdetail")){
            if(transcript.toLowerCase().includes("add to cart")||transcript.toLowerCase().includes("add")||transcript.toLowerCase().includes("add this")){
                addToCart(productData._id,size);
                speak("Added to Cart");
                setShowSearch(false)
            }
        }else if(transcript.toLowerCase().includes("cart") || transcript.toLowerCase().includes("kaat") || transcript.toLowerCase().includes("caat")){
            speak("opening cart")
            navigate("/cart")
            setShowSearch(false)
        }else if(transcript.toLowerCase().includes("contact") || transcript.toLowerCase().includes("sampark")){
            speak("opening contact page")
            navigate("/contact")
            setShowSearch(false)
        }else if(transcript.toLowerCase().includes("order") || transcript.toLowerCase().includes("orders") || transcript.toLowerCase().includes("myorders") || transcript.toLowerCase().includes("my order")){
            speak("opening your orders page")
            navigate("/order")
            setShowSearch(false)
        }
        else if(transcript.toLowerCase().includes("google login") || transcript.toLowerCase().includes("login with google")) {
            speak("logging with google")
            googleLogin()
            setShowSearch(false)
        }else if(transcript.toLowerCase().includes("logout")){
            handleLogOut()
            speak("Logged Out Successfully")
            setShowSearch(false)
        }else if(location.pathname=="/collections"){
            // Normalize helper
             const normalize = str => String(str).toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');

             const words = transcript.toLowerCase().split(/\s+/);
                const checkboxes = document.querySelectorAll('input[type="checkbox"]');

                const categoryValues=["men","women","kids"];
                let categoryBox=Array.from(checkboxes).filter(cb=>categoryValues.includes(cb.value.toLowerCase()))
                const subCategoryValues=["topwear","bottomwear","winterwear"];
                const subCategoryBox=Array.from(checkboxes).filter(cb=>subCategoryValues.includes(cb.value.toLowerCase()))
                
                const normalizedTranscript=normalize(transcript)
                const allBoxes=[...categoryBox,...subCategoryBox]
                allBoxes.forEach(cb=>{
                    if(cb.checked) cb.click();
                })

                let selectedCategory=null;
                categoryBox.forEach(cb => {
                    const cbValue = normalize(cb.value);
                    if (normalizedTranscript.includes(cbValue)) {
                        if(!cb.checked) cb.click(); // triggers toggleCategory or toggleSubCategory
                        speak(`Showing ${cb.value} category`);
                        selectedCategory=cb.value
                    }
                });
                subCategoryBox.forEach(cb => {
                const cbValue = normalize(cb.value); 
                if (normalizedTranscript.includes(cbValue)) {
                    if (!cb.checked) cb.click();
                    if (selectedCategory) {
                        speak(`Showing ${selectedCategory}'s ${cb.value}`);
                    } else {
                        speak(`Showing ${cb.value} sub category`);
                    }
             }
            });
        }
        else{
            speak("Try Speaking Again")
            toast.error("Try Again")
        }
    }
    recognition.onend=()=>{
        setActiveAi(false)
    }
    return(
        <div className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]" onClick={()=>{recognition.start();openingSound.play();setActiveAi(true)}}>
            <img src={airobot} alt="" className={`w-[100px] cursor-pointer ${activeAi ? "translate-x-[10%] translate-y-[10%] scale-125" : "translate-x-[0] translate-y-[0] scale-100"} transition:transform`} style={{filter:`${activeAi?"drop-shadow(0px 0px 30px #002dfc":"drop-shadow(0px 0px 20px black)"}`}}/>
        </div>
    )

}

export default Ai;