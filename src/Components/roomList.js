import '../CSS/roomList.css'
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Config/firebase';


function RoomList(){
  const [hotels,setHotels]=useState([])
  useEffect(()=>{
    const getData= async ()=>{
     let data=await getDocs(collection(db,"hotel"))
      setHotels(
        data.docs.map((doc)=>(
          doc.data()
        )
      )
      )
    }
    getData()
  },[])
  console.log("hotels",hotels);
    return(
        <div>
          {hotels.map((hotel)=>(
            <div className='roomStyle'>
            <h1>{hotel.name}</h1>
            
           </div>
          ))}
          
        </div>
    )
}

export default RoomList;