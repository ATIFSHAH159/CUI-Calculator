import React, { useState } from 'react';
import './Assests/ThreeLabsub.css'; 

const FourLabsub = () => {
  const [quizCount, setQuizCount] = useState(0);
  const [assignmentCount, setAssignmentCount] = useState(0);
  const [labAssignmentCount, setLabAssignmentCount] = useState(0);
  const [quizScores, setQuizScores] = useState([]);
  const [assignmentScores, setAssignmentScores] = useState([]);
  const [labAssignmentScores, setLabAssignmentScores] = useState([]);
  const [midterm, setMidterm] = useState({ obtained: '', total: '' });
  const [final, setFinal] = useState({ obtained: '', total: '' });
  const [labMidterm, setLabMidterm] = useState({ obtained: '', total: '' });
  const [labFinal, setLabFinal] = useState({ obtained: '', total: '' });
  const [gpa, setGpa] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [isAfterMid, setIsAfterMid] = useState(false); // New state for toggle

  const handleQuizChange = (index, name, value) => {
    const newScores = [...quizScores];
    newScores[index] = { ...newScores[index], [name]: value };
    setQuizScores(newScores);
  };

  const handleAssignmentChange = (index, name, value) => {
    const newScores = [...assignmentScores];
    newScores[index] = { ...newScores[index], [name]: value };
    setAssignmentScores(newScores);
  };

  const handleLabAssignmentChange = (index, name, value) => {
    const newScores = [...labAssignmentScores];
    newScores[index] = { ...newScores[index], [name]: value };
    setLabAssignmentScores(newScores);
  };

  const calculateGPA = () => {
    // Theory calculations
    const quizTotal = quizScores.reduce((sum, quiz) => sum + (quiz.obtained / quiz.total) * 15, 0);
    const assignmentTotal = assignmentScores.reduce((sum, assignment) => sum + (assignment.obtained / assignment.total) * 10, 0);
    const midtermScore = (midterm.obtained / midterm.total) * 25;
    const finalScore = isAfterMid ? (final.obtained / final.total) * 50 : 0; // Conditional score based on phase
    const theoryTotal = isAfterMid 
      ? (quizTotal + assignmentTotal + midtermScore + finalScore) * 0.7500 
      : (quizTotal + assignmentTotal + midtermScore) * 0.3750 * 2; // Before Midterm
      console.log(theoryTotal);

    // Lab calculations
    const labAssignmentTotal = labAssignmentScores.reduce((sum, labAssignment) => sum + (labAssignment.obtained / labAssignment.total) * 25, 0);
    const labMidtermScore = (labMidterm.obtained / labMidterm.total) * 25;
    const labFinalScore = isAfterMid ? (labFinal.obtained / labFinal.total) * 50 : 0; // Conditional score based on phase
    const labTotal = isAfterMid 
      ? (labAssignmentTotal + labMidtermScore + labFinalScore) * 0.2500 
      : (labAssignmentTotal + labMidtermScore) * 0.1250 * 2; // Before Midterm
console.log(labTotal);

    // Final percentage
    const totalPercentage = theoryTotal + labTotal;

    // Map percentage to GPA
    const gpaMapping = [
      { min: 85, max: 100, gpa: 4.00 },
      { min: 80, max: 84.9, gpa: 3.66 },
      { min: 75, max: 79.9, gpa: 3.33 },
      { min: 71, max: 74.9, gpa: 3.00 },
      { min: 68, max: 70.9, gpa: 2.66 },
      { min: 64, max: 67.9, gpa: 2.33 },
      { min: 61, max: 63.9, gpa: 2.00 },
      { min: 58, max: 60.9, gpa: 1.66 },
      { min: 54, max: 57.9, gpa: 1.30 },
      { min: 50, max: 53.9, gpa: 1.00 },
      { min: 0, max: 49.9, gpa: 0.00 }
    ];
    
    const gpaEntry = gpaMapping.find(range => totalPercentage >= range.min && totalPercentage <= range.max);
    const calculatedGPA = gpaEntry ? gpaEntry.gpa : 0;
    
    setGpa(calculatedGPA.toFixed(2));
    setPercentage(totalPercentage.toFixed(2));
  };

  return (
    <div className="container mt-5">
      <h2>4 C-H GPA Calculator</h2>

      <div className="form-group">
        <h4>Theory Portion</h4>

        <label>Toggle for Midterm Phase</label>
        <div className="form-check form-switch mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isAfterMid}
            onChange={() => setIsAfterMid(!isAfterMid)}
          />
          <label className="form-check-label">
            {isAfterMid ? "After Midterm" : "Before Midterm"}
          </label>
        </div>

        <label>Number of Quizzes</label>
        <input type="number" value={quizCount} onChange={(e) => setQuizCount(parseInt(e.target.value) || 0)} className="form-control" min="0" />
        
        {Array.from({ length: quizCount }, (_, index) => (
          <div key={index} className="mt-3">
            <h5>Quiz {index + 1}</h5>
            <input type="number" placeholder="Obtained" name="obtained" onChange={(e) => handleQuizChange(index, e.target.name, parseFloat(e.target.value) || 0)} className="form-control" min="0" />
            <input type="number" placeholder="Total" name="total" onChange={(e) => handleQuizChange(index, e.target.name, parseFloat(e.target.value) || 0)} className="form-control mt-2" min="0" />
          </div>
        ))}

        <label className="mt-4">Number of Assignments</label>
        <input type="number" value={assignmentCount} onChange={(e) => setAssignmentCount(parseInt(e.target.value) || 0)} className="form-control" min="0" />

        {Array.from({ length: assignmentCount }, (_, index) => (
          <div key={index} className="mt-3">
            <h5>Assignment {index + 1}</h5>
            <input type="number" placeholder="Obtained" name="obtained" onChange={(e) => handleAssignmentChange(index, e.target.name, parseFloat(e.target.value) || 0)} className="form-control" min="0" />
            <input type="number" placeholder="Total" name="total" onChange={(e) => handleAssignmentChange(index, e.target.name, parseFloat(e.target.value) || 0)} className="form-control mt-2" min="0" />
          </div>
        ))}

        <div className="mt-4">
          <h5>Midterm</h5>
          <input type="number" placeholder="Obtained" name="obtained" value={midterm.obtained} onChange={(e) => setMidterm({ ...midterm, obtained: parseFloat(e.target.value) || 0 })} className="form-control" min="0" />
          <input type="number" placeholder="Total" name="total" value={midterm.total} onChange={(e) => setMidterm({ ...midterm, total: parseFloat(e.target.value) || 0 })} className="form-control mt-2" min="0" />
        </div>

        {isAfterMid && (
          <div className="mt-4">
            <h5>Final</h5>
            <input type="number" placeholder="Obtained" name="obtained" value={final.obtained} onChange={(e) => setFinal({ ...final, obtained: parseFloat(e.target.value) || 0 })} className="form-control" min="0" />
            <input type="number" placeholder="Total" name="total" value={final.total} onChange={(e) => setFinal({ ...final, total: parseFloat(e.target.value) || 0 })} className="form-control mt-2" min="0" />
          </div>
        )}
      </div>

      <div className="form-group mt-5">
        <h4>Lab Portion</h4>
        <label>Number of Lab Assignments</label>
        <input type="number" value={labAssignmentCount} onChange={(e) => setLabAssignmentCount(parseInt(e.target.value) || 0)} className="form-control" min="0" />
        
        {Array.from({ length: labAssignmentCount }, (_, index) => (
          <div key={index} className="mt-3">
            <h5>Lab Assignment {index + 1}</h5>
            <input type="number" placeholder="Obtained" name="obtained" onChange={(e) => handleLabAssignmentChange(index, e.target.name, parseFloat(e.target.value) || 0)} className="form-control" min="0" />
            <input type="number" placeholder="Total" name="total" onChange={(e) => handleLabAssignmentChange(index, e.target.name, parseFloat(e.target.value) || 0)} className="form-control mt-2" min="0" />
          </div>
        ))}

        <div className="mt-4">
          <h5>Lab Midterm</h5>
          <input type="number" placeholder="Obtained" name="obtained" value={labMidterm.obtained} onChange={(e) => setLabMidterm({ ...labMidterm, obtained: parseFloat(e.target.value) || 0 })} className="form-control" min="0" />
          <input type="number" placeholder="Total" name="total" value={labMidterm.total} onChange={(e) => setLabMidterm({ ...labMidterm, total: parseFloat(e.target.value) || 0 })} className="form-control mt-2" min="0" />
        </div>

        {isAfterMid && (
          <div className="mt-4">
            <h5>Lab Final</h5>
            <input type="number" placeholder="Obtained" name="obtained" value={labFinal.obtained} onChange={(e) => setLabFinal({ ...labFinal, obtained: parseFloat(e.target.value) || 0 })} className="form-control" min="0" />
            <input type="number" placeholder="Total" name="total" value={labFinal.total} onChange={(e) => setLabFinal({ ...labFinal, total: parseFloat(e.target.value) || 0 })} className="form-control mt-2" min="0" />
          </div>
        )}
      </div>

      <button className="btn btn-primary mt-4" onClick={calculateGPA}>Calculate GPA</button>

      {gpa !== null && (
        <div className="mt-4">
          <h3>Your GPA: {gpa}</h3>
          <h3>Your Percentage: {percentage}%</h3>
        </div>
      )}
    </div>
  );
};

export default FourLabsub;
