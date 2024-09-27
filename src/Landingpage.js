import React from 'react';
import { Link } from 'react-router-dom';
import './Assests/Landingpage.css';
const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1>Welcome to the GPA Calculator</h1>
      <div className="button-group">
        <Link to="/3labsub">
          <button className="button color1">3 CH LAB+SUB</button>
        </Link>
        <Link to="/3labsubonly">
          <button className="button color2">3 CR LAB</button>
        </Link>
        <Link to="/3chsimple">
          <button className="button color3">3 CR SIMPLE SUBJECT</button>
        </Link>
        <Link to="/4labsubonly">
          <button className="button color4">4 CR LAB</button>
        </Link>
        <Link to="/4chlab">
          <button className="button color5">4 CH LAB+SUB</button>
        </Link>
        <Link to="/semester-gpa">
          <button className="button color6">SEMESTER GPA</button>
        </Link>
        <Link to="/cgpa">
          <button className="button color7">CGPA CALCULATE</button> 
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
