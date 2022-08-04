import '../CSS/addHotel.css'
import { db } from '../Config/firebase'
import React, { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, Firestore, getDocs, doc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { async } from '@firebase/util';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

function AddHotel() {
    const [hotelName, setHotelName] = useState("")
    const [hotelLocation, setHotelLocation] = useState("")
    const [hotelDescription, setHotelDescription] = useState("")
    const [hotelAmount, setHotelAmount] = useState("")
    const addHotelRef = collection(db, 'hotel')
    const navigate = useNavigate()


    const [img, setImg] = React.useState()
    // const collectionRef = collection(Firestore, 'hotels')

    const addHotel = async () => {
        const storageRef = ref(Storage, `/IMAGES/${img.name}`)
        await uploadBytesResumable(storageRef, img).then((uploadTask) => {
            getDownloadURL(uploadTask.ref).then((url) => {
                console.log(url);
                // const addHotel = () =>{
                const hotel = {
                    name: hotelName,
                    location: hotelLocation,
                    description: hotelDescription,
                    amount: hotelAmount,
                    image: url
                }

                //push to firestore
                addDoc(addHotelRef, hotel).then(() => {
                    console.log('added')
                    alert('added successfully')
                    navigate("/room-list")
                }).catch((err) => {
                    console.log(err)
                })
                // }

            })
        }).then(() => {
            alert("hotel added successfully")
        }).catch((err)=>{console.log(err);})
    }




    const [hotels, setHotels] = useState([])

    //getting hotels
    const getData = async () => {
        let data = await getDocs(collection(db, "hotel"))
        setHotels(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }


    useEffect(() => {



        getData()


    }, [])
    console.log("hotels", hotels);

    //delete function
    function deleteHotel(id) {
        const getDoc = doc(db, 'hotel', id)
        deleteDoc(getDoc).then(() => {
            alert('deleted successfully')
        }).catch(err => {
            console.log(err)
        })

    }

    const [form, setForm] = useState({image: ""});

    const handleImage = (e) => {
        setForm({...form,image:e.target.files[0]});
    };

    return (
        <div>
            <p className='heading'>HOTEL DETAILS</p>

            <div className='form'>
                <input className='hotelDetails' type="text" placeholder="Hotel Name" onChange={(e) => setHotelName(e.target.value)} /><br></br>
                <input className='hotelDetails' type="text" placeholder="Location" onChange={(e) => setHotelLocation(e.target.value)} /><br></br>
                <input className='hotelDetails' type="text" placeholder="Description" onChange={(e) => setHotelDescription(e.target.value)} /><br></br>
                <input className='hotelDetails' type="number" placeholder="Amount" onChange={(e) => setHotelAmount(e.target.value)} /><br></br>
                <input type="file" placeholder="Choose File" accept='image/*' onchange={handleImage}/>
                <button className='btnAdd' onClick={(e) => { addHotel() }}>ADD</button>
            </div>
            {hotels.map((hotel) => (
                <div className='output'>
                    <div className='results'>
                        <div className='picture'></div>
                        <div className='Description'>
                            <h2>{hotel.name}<br></br>{hotel.location}<br></br>{hotel.description}<br></br>{hotel.amount}</h2>
                        </div>
                        <div className='Buttons'>
                            <button className='btn1'>Update</button><br></br>
                            <button className='btn2' onClick={(e) => { deleteHotel(hotel.id) }}>Delete</button>
                        </div>


                    </div>
                </div>
            ))}

        </div>
    )
}

export default AddHotel;