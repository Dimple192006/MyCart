import React, { useContext, useState,useEffect } from "react"
import Title from "./Title"
import { ShopDataContext } from "../context/ShopContext"
import Card from "./Card"

function BestSeller(){
    let {products}=useContext(ShopDataContext)
    let [bestSeller,setBestSeller]=useState([])
    useEffect(()=>{
        let filteredProduct=products.filter((item)=>item.bestseller)
        setBestSeller(filteredProduct.slice(0,4))
    },[products])
    return(
        <div>
            <div className="h-[8%] w-[100%] text-center md:mt-[50px]">
                <Title text1="BEST" text2="SELLER"/>
                <p className="w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100">Tries, Tested, Loved - Discover Our All-Time Best Sellers.</p>
            </div>
            <div className="w-[100%] h-[50%] mt-[30px] flex items-center flex-wrap gap-[50px] ">
                {
                    bestSeller.map((item,index)=>{
                        <Card key={index} name={item.name} id={item._id} price={item.price} image={item.image1}/>
                    })
                }
            </div>
        </div>
    )
}

export default BestSeller