import '../CSS/admin.css'
// import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Config/firebase';


function Admin(){
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
        <div className='cover'>
            <div className='mainAdmin'>
              <Navbar bg="dark" variant="dark">
                <Container className='container1'>
                  <Nav className="me-auto">
                    <div className='home'>
                      <Nav.Link href="home">Home</Nav.Link>
                    </div>
                    <Nav.Link href="Bookings">Bookings</Nav.Link>
                    <Nav.Link href="add-room">Manage</Nav.Link>
                    {/* <Nav.Link href="profile">Profile</Nav.Link> */}
                  </Nav>
                </Container>
              </Navbar>
            </div>
            <div className='div-cards'>
            {
              hotels.map((hotel)=>(
                
              
                <div className='cards'>
                <img src={hotel.image} alt='hotel1' className='img' />
                <span>{hotel.name}</span><br></br>
                <span>{hotel.location}</span><br></br>
                <span>{hotel.description}</span>
                <span>{hotel.amount}</span>
              </div>
              
              ))
            }
             </div>
        </div>
    )
}

export default Admin;