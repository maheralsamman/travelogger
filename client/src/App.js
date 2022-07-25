import { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAlltrips, postTrip, updateTrip, deleteTrip } from './redux/tripSlice';
import { useDispatch, useSelector } from "react-redux";

import Homepage from './pages/Homepage';
import Trip from './pages/Trip';
import Login from "./pages/Login"
import Create from './pages/Create';
import AllTrips from './pages/AllTrips';
import UserTrips from './pages/UserTrips';
import NavWrapper from './components/NavWrapper';
import Edit from './pages/Edit'

function App() {

//  const dummy = {
//   "userId": "Maheriscool4",
//   "country": "sweden",
//   "stops": [{
//       "city": "umeå",
//       "sublocation": "notnewasublocation",
//       "imageUrl": "notnewaurl",
//       "description": "notnewadescription"
//   }]
// }
//   const trips = useSelector(state => state.trips)

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/view" element={<NavWrapper/>}>
            <Route path="all" element={<AllTrips/>}/>
            <Route path="mytrips" element={<UserTrips/>}/>
          </Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/create" element={<Create/>}/>
          <Route path="/edit/:tripId" element={<Edit/>}/>
          <Route path="/trip/:tripId" element={<Trip/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
