import logo from './logo.svg';
import './App.css';
import Admin from './Components/admin';
import AddHotel from './Components/addHotel';
import RoomList from './Components/roomList';
import {BrowserRouter , Routes , Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      {/* <Admin />
      <AddHotel /> */}
      <BrowserRouter>
         <Routes>
           <Route  path='/' element={<Admin/>}></Route>
           <Route  path='/add-room' element={<AddHotel/>}></Route>
           <Route  path='/room-list' element={<RoomList/>}></Route>
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
