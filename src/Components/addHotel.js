import '../CSS/addHotel.css'
import { db, storage } from '../Config/firebase'
import React, { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, getDocs, doc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL, storageRef } from 'firebase/storage'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { async } from '@firebase/util';


function AddHotel() {
    const [hotelName, setHotelName] = useState("")
    const [hotelLocation, setHotelLocation] = useState("")
    const [hotelDescription, setHotelDescription] = useState("")
    const [altDesc, setAltDesc] = useState("")
    const [hotelAmount, setHotelAmount] = useState("")
    const addHotelRef = collection(db, 'hotel')
    const navigate = useNavigate()

    const [form, setForm] = useState({                                                                     
        image: "",
    });

    const handleImage = (e) => {
        setForm( {...form,image:e.target.files[0]})
     };

  
const addHotel = () => {
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
                const collectionRef = collection(db, "hotel");
                const hotel={                    
                    name: hotelName,
                    location: hotelLocation,
                    description: hotelDescription,
                    alternativeDesc: altDesc,
                     amount: hotelAmount,
                    image: url,

                     
                };
                addDoc(collectionRef, hotel)
                    .then(() => {
                        alert("Hotel added successfully", { type: "success" });

                    })
                    .catch((err) => {
                        alert("Error adding hotel", { type: "error" });
                    });
            });
        }
    );
};



    const [hotels, setHotels] = useState([])

    //getting hotels
    const getData = async () => {
        let data = await getDocs(collection(db, "hotel"))
        setHotels(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }


    useEffect(() => {
        getData()
    }, [])
    // console.log("hotels", hotels);

    //delete function
    function deleteHotel(id) {
        const getDoc = doc(db, 'hotel', id)
        deleteDoc(getDoc).then(() => {
            alert('deleted successfully')
        }).catch(err => {
            console.log(err)
        })

    }

    const handleUpdate= (id)=>{
        navigate(`/update/${id}`) 
    }


  
    return (
        <div>
            <div className='mainAdd'>
              <Navbar bg="dark" variant="dark">
                <Container className='container1'>
                  <Nav className="me-auto">
                    
                      <Nav.Link href="home">Home</Nav.Link>
                    
                    <Nav.Link href="#Bookings">Bookings</Nav.Link>
                    <div className='home'>
                    <Nav.Link href="#manage">Manage</Nav.Link>
                    </div>
                  </Nav>
                </Container>
              </Navbar>
            </div>
            <p className='heading'>HOTEL DETAILS</p>

            <div className='formAdd'>
                <div className='inputs'>
                <input className='hotelDetails' type="text" placeholder="Hotel Name" onChange={(e) => setHotelName(e.target.value)} /><br></br>
                <input className='hotelDetails' type="text" placeholder="Location" onChange={(e) => setHotelLocation(e.target.value)} /><br></br>
                <input className='hotelDetails' type="text" placeholder="Description" onChange={(e) => setHotelDescription(e.target.value)} /><br></br>
                <input className='hotelDetails' type="text" placeholder="Alternative Description" onChange={(e) => setAltDesc(e.target.value)} /><br></br>
                <input className='hotelDetails' type="number" placeholder="Amount" onChange={(e) => setHotelAmount(e.target.value)} /><br></br>
                <input type="file"  accept="image/*" onChange={(e)=> {handleImage(e)}}/>
                <button className='addButton' onClick={(e) => { addHotel() }}>ADD</button>
                </div>
                
            </div>
            {hotels.map((hotel,id) => (
                <div className='output' key={id}>
                    <div className='results'>
                        <div className='picture'>
                            <img className='hotelImage' src={hotel.image} alt="picture" />
                        </div>
                        <div className='Description'>
                            <h2>{hotel.name}<br></br>{hotel.location}<br></br>{hotel.description}<br></br>{hotel.amount}</h2>
                        </div>
                        <div className='Buttons'>
                            <button className='btn1' onClick={(e)=>handleUpdate(hotel.id)}>Update</button><br></br>
                            <button className='btn2' onClick={(e) => { deleteHotel(hotel.id) }}>Delete</button>
                        </div>


                    </div>
                </div>
            ))}

        </div>
    )
}

export default AddHotel;