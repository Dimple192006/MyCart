import React from "react"

function Title({text1,text2}){
    return(
        <div className="flex flex-wrap gap-2 items-center text-center mb-3 text-[35px] md:text-[40px]">
            <span className="text-blue-100">{text1}</span><span className="text-[#a5faf7]">{text2}</span>
        </div>
    )
}

export default Title

