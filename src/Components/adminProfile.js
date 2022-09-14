import '../CSS/profile.css'
import React,{useState, useEffect} from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../Config/firebase';
import userEvent from '@testing-library/user-event';






function AdminProfile(){
    

    //get user profile
   const getProfile = async() =>{
    const userID = auth?.currentUser?.uid;
   
        const CollectionRef = collection(db, 'users')
        const q = query(CollectionRef, where('userID', '==', userID))
        const querySnapshot = await getDocs(q);
        console.log('raw data:', q)

     
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(" => ", doc.data());
              })
     
            console.log('something went wrong!')
            console.log('id', userID)
      }
    const [admin, setAdmin] = useState("");




    useEffect(()=>{
        //getting user profile 
        getProfile()
     
     const getData = async()=>{
        let data=await getDocs(collection(db,"users"))
        setAdmin(
            data.docs.map((doc)=>(
                doc.data()
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
                     admin.map((data)=>(
                     <h1>{data.name}</h1>
                    ))
                  } */}
                  </>
                </div>
           </div>
        </div>
        
        
    )
}
export default AdminProfile;