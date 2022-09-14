import '../CSS/booking.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Config/firebase';
import React, { useEffect, useState } from 'react';



function Bookings(){
  const [bookings,setBookings]=useState([])
  useEffect(()=>{
    const getData= async ()=>{
     let data=await getDocs(collection(db,"bookings"))
   
      setBookings(
        data.docs.map((doc)=>(
          doc.data()
        )
      )
      )
      console.log(data)
    }
    getData()
  },[])
  console.log("bookings", bookings)
    return(
        <div>
           
           <div className='navbar'>
           <Navbar bg="dark" variant="dark">
                <Container className='container1'>
                  <Nav className="me-auto">
                    
                      <Nav.Link href="home">Home</Nav.Link>
                      <div className='home'>
                    <Nav.Link href="Bookings">Bookings</Nav.Link>
                    </div>
                    <Nav.Link href="add-room">Manage</Nav.Link>
                    
                  </Nav>
                </Container>
              </Navbar>
           </div>
           
              <div className='bkTitle'>LIST OF BOOKINGS</div>
              {bookings.map((hotel)=>(
                <>
                 
                 <div className='mainContainer'>
                   <div className='formBook'>
                     <h2>HotelName: {hotel.name} <br></br></h2>
                      <h2>ClientName: {hotel.clientName}</h2>
                      <h2>ClientSurname: {hotel.clienSurname}</h2>
                      <h2>ClientContact: {hotel.clienContact}</h2>
                      <h2>TotalDays: {hotel.days}</h2>
                      <h2>Amount: {hotel.amount}</h2>
                      
                   </div>
               </div>
               </>
              ))}
              
        </div>
        
    )
}
export default Bookings;