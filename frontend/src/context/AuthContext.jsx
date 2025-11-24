// import React, { createContext } from "react";
// export const authDataContext=createContext();
// function AuthContext({children}){
//     let serverUrl="https://mycart-4.onrender.com"
//     let value={
//         serverUrl
//     }
//     return(
        
//             <authDataContext.Provider value={value}>
//                 {children}
//             </authDataContext.Provider>
   
//     )
// }

// export default AuthContext;

import React, { createContext } from "react";

export const authDataContext = createContext(); // ✅ Yeh sahi hai

function AuthProvider({ children }) {
  const serverUrl = "https://mycart-4.onrender.com";
  

  return (
    <authDataContext.Provider value={{serverUrl}}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthProvider;
