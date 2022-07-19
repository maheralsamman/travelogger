import { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAlltrips, postTrip } from './redux/tripSlice';
import { useDispatch, useSelector } from "react-redux";

import Homepage from './pages/Homepage';
import Trip from './pages/Trip';
import Login from "./components/Login"
import Create from './pages/Create';
// import ImageUpload from "./components/ImageUpload"


function App() {
const dispatch = useDispatch();

/* const dummy = {
  "userId": "daoudiscool4",
  "country": "newTestnewacountry",
  "stops": [{
      "city": "notnewacity",
      "sublocation": "notnewasublocation",
      "imageUrl": "notnewaurl",
      "description": "notnewadescription"
  }]
}
  const trips = useSelector(state => state.trips)
  useEffect(() => {
    const addTrips = () => {
      // dispatch(getAlltrips())
     dispatch(postTrip(dummy))
    };
    addTrips()
    console.log(trips)
  }, []); */



  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          {/* <Route path="/view" element={<NavWrapper/>}>
            <Route path="/all" element={<AllTrips/>}/>
            <Route path="/user" element={<UserTrips/>}/>
          </Route> */}
          <Route path="/login" element={<Login/>}/>
          <Route path="/create" element={<Create/>}/>
          {/* <Route path="/edit/:tripId" element={<Edit/>}/> */}
          <Route path="/trip/:tripId" element={<Trip/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
