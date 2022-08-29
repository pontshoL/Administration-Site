import logo from './logo.svg';
import './App.css';
import Admin from './Components/admin';
import AddHotel from './Components/addHotel';
// import RoomList from './Components/roomList';
import UpdateHotel from './Components/update';
import {BrowserRouter , Routes , Route } from 'react-router-dom';
import Bookings from './Components/Bookings';
import Login from './Components/login';
import SignUp from './Components/signUp';
import AdminProfile from './Components/adminProfile';

function App() {
  return (
    <div className="App">
     
      <BrowserRouter>
         <Routes>
           <Route  exact path='/' element={<Login/>}></Route>
           <Route  exact path='/sign-up' element={<SignUp/>}></Route>
           <Route  exact path='/home' element={<Admin/>}></Route>
           <Route  path='/add-room' element={<AddHotel/>}></Route>
           <Route  path='/update/:id' element={<UpdateHotel/>}></Route>
           <Route  path='/Bookings' element={<Bookings/>}></Route>
           <Route  path='/profile' element={<AdminProfile/>}></Route>
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
