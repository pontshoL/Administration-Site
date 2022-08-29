import '../CSS/profile.css'
import React,{useState, useEffect} from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Config/firebase';
import userEvent from '@testing-library/user-event';


function AdminProfile(){
    const [admin, setAdmin] = useState("");
    useEffect(()=>{
     const getData = async()=>{
        let data=await getDocs(collection(db,"users"))
        setAdmin(
            data.docs.map((doc)=>(
                doc.data
            ))
        )
     }
     getData()
    },[])
    console.log("admin",admin);
    return(
        <div className='adminProf'>
            <div className='mainDiv'>
                <div>
                    <img src='admin.png' alt='image' />
                </div>
                <div>
                    <>
                  {/* {
                    // admin.map((data)=>(
                    //  <h1>{data.name}</h1>
                     
                    ))
                  } */}
                  </>
                </div>
           </div>
        </div>
        
        
    )
}
export default AdminProfile;