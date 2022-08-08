import '../CSS/addHotel.css'
import '../CSS/admin.css'
import { db, storage } from '../Config/firebase'
import React, { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



function UpdateHotel() {
    const [hotelName, setHotelName] = useState("")
    const [hotelLocation, setHotelLocation] = useState("")
    const [hotelDescription, setHotelDescription] = useState("")
    const [hotelAmount, setHotelAmount] = useState("")
    const addHotelRef = collection(db, 'hotel')
    const navigate = useNavigate()
    
    let param=useParams();
    let hotID=''
    hotID=JSON.stringify(param.id);

    const hID=hotID.substring(1,21)
    const [form, setForm] = useState({
      
        image: "",

    });



const handleImage = (e) => {
    setForm( {...form,image:e.target.files[0]});
  };


const updateHotel = () => {
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
                const hotelDoc = doc(db, "hotel", param.id);
                const hotel={                    
                    name: hotelName,
                    location: hotelLocation,
                    description: hotelDescription,
                     amount: hotelAmount,
                    image: url
                     
                };
                updateDoc(hotelDoc, hotel)
                    .then(() => {
                        alert("Hotel updated successfully", { type: "success" });

                    })
                    .catch((err) => {
                        alert("Error updating hotel", { type: "error" });
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
    return (
        <div>
            <div className='main'>
            <Navbar bg="dark" variant="dark">
                <Container className='container1'>
                  <Nav className="me-auto">
                    
                      <Nav.Link href="home">Home</Nav.Link>
                    
                    <Nav.Link href="#Bookings">Bookings</Nav.Link>
                    <Nav.Link href="#Contact">Contact</Nav.Link>
                    <div className='home'>
                    <Nav.Link href="#manage">Manage</Nav.Link>
                    </div>
                  </Nav>
                </Container>
              </Navbar>
              </div>
            <p className='heading'>HOTEL DETAILS</p>

            <div className='form'>
                <input className='hotelDetails' type="text" placeholder="Hotel Name" onChange={(e) => setHotelName(e.target.value)} /><br></br>
                <input className='hotelDetails' type="text" placeholder="Location" onChange={(e) => setHotelLocation(e.target.value)} /><br></br>
                <input className='hotelDetails' type="text" placeholder="Description" onChange={(e) => setHotelDescription(e.target.value)} /><br></br>
                <input className='hotelDetails' type="number" placeholder="Amount" onChange={(e) => setHotelAmount(e.target.value)} /><br></br>
                <input type="file"  accept="image/*" onChange={handleImage}/>
                <button className='btnAdd' onClick={(e) => { updateHotel() }}>UPDATE</button>
            </div>
            
        </div>
    )
}

export default UpdateHotel;