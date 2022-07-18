import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Trip from './pages/Trip';
import Login from "./components/Login"
// import ImageUpload from "./components/ImageUpload"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<p>Homepage</p>}/>
          {/* <Route path="/" element={<Homepage/>}/>
          <Route path="/view" element={<NavWrapper/>}>
            <Route path="/all" element={<AllTrips/>}/>
            <Route path="/user" element={<UserTrips/>}/>
          </Route> */}
          <Route path="/login" element={<Login/>}/>
          {/* <Route path="/create" element={<Create/>}/>
          <Route path="/edit/:tripId" element={<Edit/>}/> */}
          <Route path="/trip/:tripId" element={<Trip/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
