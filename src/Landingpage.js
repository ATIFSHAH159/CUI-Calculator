import React from 'react';
import './Assests/Landingpage.css';
import grading from './Images/gradingsystem.png';
import Footer from './Footer';
const LandingPage = () => {
  return (
    <>
  <div className='landingpagecontainer'> 
    <div className='containerleft'>
    <b>COMSATS Grading System</b>
    <br/>
Understanding the grading system of your university is crucial for tracking your academic progress and planning your studies effectively. For students at the COMSATS Institute of Information Technology, the GPA system is a key component in measuring academic performance. This blog provides a detailed explanation of the COMSATS GPA system, including the calculation methods and the grading scale.
<br/>
<b>Absolute Grading System</b>
<br/>
COMSATS employs an absolute grading system to assess student performance. Unlike relative grading systems, where grades are assigned based on a comparison with peers, the absolute grading system awards grades based on predetermined thresholds. This ensures that students are evaluated strictly on their individual performance.
    </div>
    <div className='containerright'>
    <img src={grading} alt=''></img>
    </div>
  </div>
  <Footer/>
  </>
  );
};

export default LandingPage;