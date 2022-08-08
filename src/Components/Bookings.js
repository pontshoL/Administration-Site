import '../CSS/booking.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Bookings(){
    return(
        <div>
             <div className='main'>
           <Navbar bg="dark" variant="dark">
                <Container className='container1'>
                  <Nav className="me-auto">
                    
                      <Nav.Link href="/">Home</Nav.Link>
                      <div className='home'>
                    <Nav.Link href="#Bookings">Bookings</Nav.Link>
                    </div>
                    <Nav.Link href="#Contact">Contact</Nav.Link>
                    <Nav.Link href="#add-room">Manage</Nav.Link>
                    
                  </Nav>
                </Container>
              </Navbar>
              </div>

              <div className='mainContainer'>
                <div className='bkTitle'>LIST OF BOOKINGS</div>
                  <div className='formBook'>
                    <h2>hotel: Bliss Hotel<br></br></h2>
                     <h2>User: Pontsho Ramodipa</h2>
                     <h2>ReservationDate: 12-08-2022 to 15-08-2022</h2>
                     <h2>Amount: R1600</h2>
                     <div className='button'><button>Accept</button></div>
                  </div>
              </div>
        </div>
    )
}
export default Bookings;