import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Assests/Dropdown.css';

function Dropdown() {
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState('');

  // Set the selected option based on the current location when the component mounts
  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case '/3labsub':
        setSelectedOption('/3labsub');
        break;
      case '/3labsubonly':
        setSelectedOption('/3labsubonly');
        break;
      case '/3chsimple':
        setSelectedOption('/3chsimple');
        break;
      case '/4labsubonly':
        setSelectedOption('/4labsubonly');
        break;
      case '/4chlab':
        setSelectedOption('/4chlab');
        break;
      case '/semester-gpa':
        setSelectedOption('/semester-gpa');
        break;
      case '/cgpa':
        setSelectedOption('/cgpa');
        break;
      default:
        setSelectedOption('');
    }
  }, [location.pathname]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value); // Update the selected option
    window.location.href = value; // Navigate to the selected route
  };

  return (
    <div className="dropdown-container">
      <b>Select Calculator:</b>
      <select className="custom-select" onChange={handleChange} value={selectedOption}>
        <option value="" disabled>Select</option>
        <option value="/">home</option>
        <option value="/3labsub">3 CH LAB+SUB</option>
        <option value="/3labsubonly">3 CR LAB</option>
        <option value="/3chsimple">3 CR SIMPLE SUBJECT</option>
        <option value="/4labsubonly">4 CR LAB</option>
        <option value="/4chlab">4 CH LAB+SUB</option>
        <option value="/semester-gpa">SEMESTER GPA</option>
        <option value="/cgpa">CGPA CALCULATE</option>
      </select>
    </div>
  );
}

export default Dropdown;
