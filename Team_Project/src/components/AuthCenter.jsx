import "./AuthCenter.css"; 
import Login from "./Login"; 
import SignUp from "./SignUp"; 
import ChangePassWord from "./ChangePassWord"; 
import { useState } from "react";

const AuthCenter = ()=>{
    // login, register, revise-pw
    const [view, setView] = useState("login"); 

    return (
        <div className="auth-container" key={view}>
            {view === "login" && <Login setView={setView}></Login>}
            {view === "register" && <SignUp setView={setView}></SignUp>}
            {view === "revise-pw" && <ChangePassWord setView={setView}></ChangePassWord>}
           
        </div>
        
    ); 
}

export default AuthCenter; 