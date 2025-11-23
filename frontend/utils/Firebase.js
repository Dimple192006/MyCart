import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginmycart.firebaseapp.com",
  projectId: "loginmycart",
  storageBucket: "loginmycart.firebasestorage.app",
  messagingSenderId: "40891644780",
  appId: "1:40891644780:web:287f847bdbfe6ab06d5149"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider=new GoogleAuthProvider()

export{auth,provider}