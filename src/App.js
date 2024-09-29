import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Landingpage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from './Dropdown'; // Import the Dropdown component
import ThreeLabsubLabOnly from './ThreeLabsubLabOnly';
import FourLabsubLabOnly from './FourLabsubLabOnly';
import ThreeLabsub from './ThreeLabsub';
import Simplethreesubject from './Simplethreesubject';
import FourLabsub from './Fourlabsub';
import Menubar from './Menubar';

function App() {
  return (
    <>
    <Menubar/>
      <Dropdown /> {/* Use the Dropdown component here */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/3labsub" element={<ThreeLabsub />} />
        <Route path="/3labsubonly" element={<ThreeLabsubLabOnly />} />
        <Route path="/4labsubonly" element={<FourLabsubLabOnly />} />
        <Route path="/3chsimple" element={<Simplethreesubject />} />
        <Route path="/4chlab" element={<FourLabsub />} />
        <Route path="/semester-gpa" element={<div>SEMESTER GPA Component</div>} />
        <Route path="/cgpa" element={<div>CGPA CALCULATE Component</div>} />
      </Routes>
    </>
  );
}

export default App;
