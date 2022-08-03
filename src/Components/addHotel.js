import '../CSS/addHotel.css'
import {db} from '../Config/firebase'
import React,{useState} from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

function AddHotel(){
    const [hotelName, setHotelName] = useState("")
    const [hotelLocation, setHotelLocation] = useState("")
    const [hotelDescription, setHotelDescription] = useState("")
    const [hotelAmount, setHotelAmount] = useState("")
    const addHotelRef = collection(db,'hotel')
    const navigate = useNavigate()


    const addHotel = () =>{
        const hotel ={
            name: hotelName,
            location: hotelLocation,
            description: hotelDescription,
            amount: hotelAmount,
        }

        //push to firestore
        addDoc(addHotelRef,hotel).then(()=>{
            console.log('added')
            alert('added successfully')
            navigate("/room-list")
        }).catch((err)=>{
            console.log(err)
        })
    }

    return(
        <div>
            <p className='heading'>HOTEL DETAILS</p>

         <div  className='form'>
           <input className='hotelDetails' type="text" placeholder="Hotel Name" onChange={(e)=>setHotelName(e.target.value)}/><br></br>
           <input className='hotelDetails' type="text" placeholder="Location" onChange={(e)=>setHotelLocation(e.target.value)}/><br></br>
           <input className='hotelDetails' type="text" placeholder="Description" onChange={(e)=>setHotelDescription(e.target.value)}/><br></br>
           <input className='hotelDetails' type="number" placeholder="Amount" onChange={(e)=>setHotelAmount(e.target.value)}/><br></br>
           <button className='btnAdd' onClick={(e)=>{addHotel()}}>ADD</button> 

        </div>
        </div>
    )
}

export default AddHotel;