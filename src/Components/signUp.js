import {createUserWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import {auth, storage} from '../Config/firebase'
import React,{useState} from 'react'
import '../CSS/signUp.css'
import {db} from '../Config/firebase'
import { Link } from 'react-router-dom'
import {addDoc, collection} from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL, storageRef } from 'firebase/storage'


function SignUp(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const navigate = useNavigate();
    
    const [form, setForm] = useState({
        image: "",
    });

    const handleImage = (e) => {
        setForm( {...form,image:e.target.files[0]})
    };

    const Register = (()=>{
        createUserWithEmailAndPassword(auth, email, password).then(()=>{
            const storageRef = ref(
                storage,
                `/images/${Date.now()}${form.image.name}`
            );
            const uploadImage = uploadBytesResumable(storageRef, form.image);
            uploadImage.on(
                "state_changed",
                (snapshot) => {
                    const progressPercent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    setForm({         
                        image: "",
                    });
                    getDownloadURL(uploadImage.snapshot.ref).then((url) => {
                        console.log(url)
                        const collectionRef = collection(db, "users");
                        const user={                    
                            name: name,
                            surname:surname,
                            image: url,
        
                             
                        };
        
                        addDoc(collectionRef, user)
                            .then(() => {
                                alert("Registered successfully", { type: "success" });
        
                            })
                            .catch((err) => {
                                alert("Error Registering", { type: "error" });
                            });
                    });
                }
            );
            navigate("/home");
        })
       

    
    
        // createUserWithEmailAndPassword(auth, email, password).then(()=>{
        //     const collectionRef = collection(db,"users")
        //     const user = {
        //         name: name,
        //         surname:surname,
        //     };
        //     addDoc(collectionRef,user)
        //     }).catch((error)=>{
        //         console.log(error)
        //     })
        //     navigate("/home");
    })

    return(
        <div className='mainSignUp'>
        <div className='formSignUp' >
            <div className='signImge'>
                {/* <img src='logo.jfif' alt='image'/> */}
            </div>
            <h1 style={{color:"white", paddingBottom:100}}>Sign Up</h1>
                <input type="text" placeholder="Name" className='input' onChange={((e) => setName(e.target.value))}/>
                <input type="text" placeholder="Surname" className='input' onChange={((e) => setSurname(e.target.value))}/>
                <input type="email" placeholder="Email" className='input' onChange={((e) => setEmail(e.target.value))} />
                <input type="password" placeholder="Password" className='input' onChange={((e) => setPassword(e.target.value))} />
                {/* <input type="file"  accept="image/*" onChange={(e)=> {handleImage(e)}}/> */}
                <button id='btn' onClick={Register}>Sign Up</button>
                <span className='createAcc'>Already have an Account?<Link to="/">SignIn</Link></span>
                
        </div>

</div>

    )
}

export default SignUp;