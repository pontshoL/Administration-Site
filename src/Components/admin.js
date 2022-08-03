import '../CSS/admin.css'
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Admin(){
    const navigate = useNavigate();
    
    const handleRoom = ()=>{
        navigate("/add-room")
       }
    return(
        <div className='main'>
           <Navbar bg="dark" variant="dark">
           <Container className='container1'>
           <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
         

           <div className='content'>
            <button className='btn1' onClick={handleRoom}>ADD ROOM</button>
           {/* <img src='logo.jfif' alt='pic' className='img'/> */}
           </div>
        </div>
    )
}

export default Admin;