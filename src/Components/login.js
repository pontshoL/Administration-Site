import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Config/firebase'
import '../CSS/login.css'



function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    
    const login = () => {
        signInWithEmailAndPassword(auth, email, password).then(() => {
            navigate("/home");
            console.log('signed in')
        }).catch((error) => {
             console.log(error)
            
        })

    }
    return (
        <div className='mainLogin'>
                    <div className='formLogin'>
                        <div className='loginImge'></div>
                        <h1 style={{color:"white", paddingBottom:100}}>Sign In</h1>
                            <input type={'email'} placeholder="Email" className='input' onChange={((e) => setEmail(e.target.value))} /><br></br>
                            <input type={'password'} placeholder="Password" className='input' onChange={((e) => setPassword(e.target.value))} /><br></br>
                            <button id='btn' onClick={login}>Sign In</button>
                            <span className='createAcc'>Dont have an Account?<br></br>
                                <Link to="/sign-up">Create Account Here</Link>
                            </span>
                    </div>
        </div>
            

    )
}

export default Login;