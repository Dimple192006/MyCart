import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { ShopDataContext } from "../context/ShopContext";
import RelatedProduct from "../component/RelatedProduct";
import Loading from "../component/Loading";

function ProductDetails() {
    let { productId } = useParams();
    let { products, currency ,addToCart,} = useContext(ShopDataContext);

    let [productData, setProductData] = useState(null);
    let [image, setImage] = useState("");
    let [image1, setImage1] = useState("");
    let [image2, setImage2] = useState("");
    let [image3, setImage3] = useState("");
    let [image4, setImage4] = useState("");
    const [loading,setLoading]=useState(false)
    let [size, setSize] = useState("");


    
    useEffect(() => {
    if (products.length === 0) return;

    const foundProduct = products.find(
        (item) => String(item._id) === String(productId)
    );

    if (foundProduct) {
        setProductData(foundProduct);

        // Set default images only once, not on every render
        setImage(foundProduct.image1);
        setImage1(foundProduct.image1);
        setImage2(foundProduct.image2);
        setImage3(foundProduct.image3);
        setImage4(foundProduct.image4);
    }
}, [productId, products]);


    return productData ? (
        <div>
         
        <div className="w-[99vw] h-[130vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-start flex-col lg:flex-row gap-[20px] lg:pt-[0px] ">
            <div className="lg:w-[50vw] w-[100vw] h-[130vh] md:h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-start flex-col lg:flex-row gap-[20px]">
                 <div className="lg:w-[50vw] md:w-[90vw] lg:h-[90vh] h-[50vh] flex items-center justify-center md:gap-[10px] gap-[30px] flex-col-reverse lg:flex-row ">
                     <div className="lg:w-[20%] md:w-[80%] h-[10%] lg:h-[80%] flex itmes-center justify-center gap-[50px] lg:gap-[20px] lg:flex-col flex-wrap ">
                         <div className="md:w-[100%] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] rounded-md ">
                             <img src={image1} alt="" className="w-[100%] h-[100%] cursor-pointer rounded-md"  onClick={()=>{console.log("image1");setImage(image1)} }/>    
                         </div>
                         <div className="md:w-[100%] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] rounded-md ">
                             <img src={image2} alt="" className="w-[100%] h-[100%] cursor-pointer rounded-md" onClick={()=>{console.log("image2");setImage(image2)}}/>
                         
                         </div>
                         <div className="md:w-[100%] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] rounded-md ">
                             <img src={image3} alt="" className="w-[100%] h-[100%] cursor-pointer rounded-md" onClick={()=>{console.log("image3");setImage(image3)}}/>
                         </div>
                         <div className="md:w-[100%] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] rounded-md ">
                             <img src={image4} alt="" className="w-[100%] h-[100%] cursor-pointer rounded-md" onClick={()=>{console.log("image4");setImage(image4)}}/>
                         </div>
                     </div>
                     <div className="lg:w-[60%] w-[80%] lg:h-[78%] h-[70%] border-[1px] border-[#80808049] rounded-md overflow-hidden ">
                         <img src={image} className="w-[100%] lg:h-[100%] h-[100%] text-[30px] text-white text-center rounded-md object-fill" alt="" />
                    </div>
                 </div>
             </div>


             <div className="lg:w-[50vw] w-[100vw] lg:h-[75vh] lg:pt-[0px] h-[40vh] lg:mt-[0px] flex items-start justify-start flex-col py-[20px] px-[20px] md:pb-[20px] md:pl-[20px] lg:pl-[0px] lg:py-[0px] gap-[10px]">
                <h1 className="text-[40px] font-semibold text-[aliceblue] ">{productData.name.toUpperCase()}</h1>
                <div className="flex items-center gap-1">
                    <FaStar className="text-[20px] fill-[#FFD700]"/>
                    <FaStar className="text-[20px] fill-[#FFD700]"/>
                    <FaStar className="text-[20px] fill-[#FFD700]"/>
                    <FaStar className="text-[20px] fill-[#FFD700]"/>
                    <FaRegStarHalfStroke  className="text-[20px] fill-[#FFD700]"/>
                    <p className="text-[18px] font-semibold pl-[5px] text-[white]">(124)</p>
                </div>
                <p className="text-[30px] font-semibold pl-[5px] text-[white]">{currency} {productData.price}</p>
                <p className="w-[80%] md:w-[60%] text-[20px] font-semibold pl-[5px] text-[white]">{productData.description}</p>
                <div className="flex flex-col gap-[10px] my-[10px]">
                    <p className="text-[25px] font-semibold pl-[5px] text-[white]">Select Size</p>
                    <div className="flex gap-2">
                        {productData.sizes.map((item,index)=>(
                            <button key={index} className={`border py-2 px-4 bg-slate-300 rounded-md
                                ${item===size ? 'bg-black text-[#2f97f1] text-[20px]' : ''}`} onClick={()=>setSize(item)}>{item}</button>
                        ))}
                    </div>
                    <button className="text-[16px] active:bg-slate-500 cursor-pointer bg-[#495b61c9] py-[10px] px-[20px] rounded-2xl mt-[10px] border-[1px] border-[#80808049] text-white shadow-md shadow-black" onClick={()=>{setLoading(true);addToCart(productData._id,size);setSize("");setLoading(false)}}>{loading ? <Loading/> : "Add To Cart" }</button>
                </div>
                <div className="w-[90%] h-[1px] bg-slate-700"></div>
                <div className="w-[80%] text-[16px] text-white">
                    <p>100% Original Product</p>
                    <p>Cash On Delivery is available on this Prodc</p>
                    <p>Easy Return and Exchange Policy within 7 days</p>
                </div>
             </div>
             
        </div>
        <div className="w-[100%] min-h-[70vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-start justify-start flex-col overflow-x-hidden">
            <div className="flex px-[20px] mt-[90px] lg:ml-[80px] ml-[0px] lg:mt-[0px]">
                <p className="border px-5  py-3 text-sm text-white">Description</p>
                <p className="border px-5  py-3 text-sm text-white">Reviews(124)</p>
            </div>
            <div className="w-[42%] bg-[#3336397c] border text-white text-[13px] md:text-[15px] lg:text-[20px] px-[10px] py-[15px] md:px-[10px] lg:ml-[100px] ml-[20px]">
                        <p className="w-[95%] leading-relaxed">
                            Ugrade your wardrobe with this stylish,slim-fit attire, available now on MyCart. Crafted from breathable, high-quality fabric, it offeres all-day comfort and effortless style. Easy to maintain and prefect for any setting, this shirt is a must have essential for those who value both fashion and function.
                        </p>
            </div>
            <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id} />
        </div>
        </div>
    ) : (
        <div className="opacity-0"></div>
    );
}

export default ProductDetails;
