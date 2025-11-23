import React, { createContext,useContext,useState ,useEffect} from "react"
import { authDataContext } from "./authContext"
import axios from "axios"
import { toast } from "react-toastify"
import { userDataContext } from "./userContext"
export const ShopDataContext=createContext()
function ShopContext({children}){
    let [products,setProducts]=useState([])
    let [search,setSearch]=useState("")
    let userData=useContext(userDataContext)
    let [showSearch,setShowSearch]=useState(false)
    let {serverUrl}=useContext(authDataContext)
    const [loading,setLoading]=useState(false);
    let currency="₹"
    let delivery_fee=40;
    let [cartItem,setCartItem]=useState({})
    let[category,setCategory]=useState([])
    let {getCurrentUser}=useContext(userDataContext)
    let[subCategory,setSubCategory]=useState([])

    const getProducts=async()=>{
        try {
            let result=await axios.get(`${serverUrl}/api/product/list`)
          
            setProducts(result.data)
        } catch (error) {
            console.log(error)
        }
    }
    
     const toggleCategory = (e) => {
            const value = e.target.value;
            setCategory((prev) =>
            prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
            );
        };

    const toggleSubCategory=(e)=>{
        const value=e.target.value;
        setSubCategory((prev)=>
            prev.includes(value)? prev.filter((c)=>c!==value):[...prev,value]
        )
    }

    const handleLogOut=async()=>{
        try {
            const result=await axios.get(serverUrl+"/api/auth/logOut",{withCredentials:true})
            console.log(result.data)
            getCurrentUser()
        } catch (error) {
            console.log(error)
        }
    }


    const addToCart=async(itemId,size)=>{
        if(!size){
            alert("Select Product size")
            return;
        }
        let cartData=structuredClone(cartItem);

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1
            }else{
                cartData[itemId][size]=1
            }
        }else{
            cartData[itemId]={}
            cartData[itemId][size]=1;
        }


        setCartItem(cartData)
        

        if(userData){
            setLoading(true)
            try {
                let result=await axios.post(`${serverUrl}/api/cart/add`,{itemId,size},{withCredentials:true})
                console.log(result.data)
                toast.success("Product Added")
            } catch (error) {
                console.log(error)
                toast.error("Product Cannot be Added")
                setLoading(false)
                
            }
        }else{
            console.log("Add error");
            toast.error("User cannot be found");
        }
    }

    const getUserCart=async()=>{
        try {
            const result=await axios.post(`${serverUrl}+/api/cart/get`,{},{withCredentials:true})
            setCartItem(result.data)
        } catch (error) {
            
        }
    }

    const updateQuantity=async(itemId,size,quantity)=>{
        try {
            let cartData=structuredClone(cartItem)
            cartData[itemId][size]=quantity
            setCartItem(cartData)

            if(userData){
                try{
                    await axios.post(serverUrl+"/api/cart/update",{itemId,size,quantity},{withCredentials:true})
                }catch(error){
                    console.log(error)
                    toast.error(error.message)
                }
            }
        } catch (error) {
            
        }
    }

    const getCardCount=()=>{
        let totalCount=0;
        for(const items in cartItem){
            for(const item in cartItem[items]){
                try{
                    if(cartItem[items][item]>0){
                        totalCount+=cartItem[items][item]
                    }
                }catch(error){

                }
            }
        }
        return totalCount;
    }


    const getCartAmount=()=>{
        let totalAmount=0;
        try {
            for(const items in cartItem){
                let itemInfo=products.find((product)=>product._id===items);
                for(const item in cartItem[items]){
                    try {
                        if(cartItem[items][item]>0){
                            totalAmount+=itemInfo.price*cartItem[items][item]
                        }
                    } catch (error) {
                        
                    }
                }
            }
        } catch (error) {
            
        }
        return totalAmount
    }

    useEffect(()=>{
        getProducts()
    },[])

    useEffect(()=>{
        getUserCart()
    },[])


    let value={
        products,currency,delivery_fee,getProducts,search,setSearch,showSearch,setShowSearch,cartItem,addToCart,getCardCount,setCartItem,updateQuantity,getCartAmount,toggleCategory,category,setCategory,toggleSubCategory,subCategory,setSubCategory,handleLogOut
    }
    return(
        <div>
            <ShopDataContext.Provider value={value}>
            {children}
            </ShopDataContext.Provider>
        </div>
    )
}

export default ShopContext