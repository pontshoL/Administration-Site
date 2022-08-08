import logo from './logo.svg';
import './App.css';
import Admin from './Components/admin';
import AddHotel from './Components/addHotel';
// import RoomList from './Components/roomList';
import UpdateHotel from './Components/update';
import {BrowserRouter , Routes , Route } from 'react-router-dom';
import Bookings from './Components/Bookings';


function App() {
  return (
    <div className="App">
      {/* <Admin />
      <AddHotel /> */}
      <BrowserRouter>
         <Routes>
           <Route  exact path='/' element={<Admin/>}></Route>
           <Route  path='/add-room' element={<AddHotel/>}></Route>
           <Route  path='/update/:id' element={<UpdateHotel/>}></Route>
           <Route  path='/Bookings' element={<Bookings/>}></Route>
           
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
