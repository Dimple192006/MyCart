// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'

// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
    

// )

// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import App from './App.jsx';
// import { BrowserRouter } from 'react-router-dom';
// import AuthContext from './context/authContext.jsx';


// createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <AuthContext>
//     <BrowserRouter>
      
//         <App />
      
//     </BrowserRouter>
//     </AuthContext>
//   </React.StrictMode>
// );


// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import App from './App.jsx';
// import { BrowserRouter } from 'react-router-dom';
// import AuthProvider from './context/AuthContext.jsx';
// import UserContext from './context/UserContext.jsx';
// createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <AuthProvider>
//       <UserContext>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//       </UserContext>
//     </AuthProvider>
//   </React.StrictMode>
// );
// UserContext

import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthContext.jsx'; // default export = provider
import UserProvider from './context/UserContext.jsx'; // assume default export is provider
import ShopContext from './context/ShopContext.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <ShopContext>
          <App />
          </ShopContext>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
