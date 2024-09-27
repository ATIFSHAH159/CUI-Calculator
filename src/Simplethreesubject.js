import React, { useState } from 'react';
import { Form } from 'react-bootstrap'; // Import from react-bootstrap
import './Assests/ThreeLabsub.css';

const Simplethreesubject = () => {
  const [quizCount, setQuizCount] = useState(0);
  const [assignmentCount, setAssignmentCount] = useState(0);
  const [quizScores, setQuizScores] = useState([]);
  const [assignmentScores, setAssignmentScores] = useState([]);
  const [midterm, setMidterm] = useState({ obtained: '', total: '' });
  const [final, setFinal] = useState({ obtained: '', total: '' });
  const [gpa, setGpa] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [toggleMidFinal, setToggleMidFinal] = useState(false); // Toggle for before/after midterm

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

  const calculateGPA = () => {
    const quizTotal = quizScores.reduce((sum, quiz) => {
      return quiz.total > 0 ? sum + (quiz.obtained / quiz.total) * 15 : sum;
    }, 0);

    const assignmentTotal = assignmentScores.reduce((sum, assignment) => {
      return assignment.total > 0 ? sum + (assignment.obtained / assignment.total) * 10 : sum;
    }, 0);

    const midtermScore = midterm.total > 0 ? (midterm.obtained / midterm.total) * 25 : 0;
    let totalPercentage = quizTotal + assignmentTotal + midtermScore;

    if (toggleMidFinal) {
      const finalScore = final.total > 0 ? (final.obtained / final.total) * 50 : 0;
      totalPercentage += finalScore; // Adjust for 100% weight
    }

    totalPercentage = Math.max(0, Math.min(totalPercentage, 100));

    const gpaMapping = [
      { min: 85, max: 100, gpa: 4.00, grade: 'A' },
      { min: 80, max: 84.9, gpa: 3.66, grade: 'A-' },
      { min: 75, max: 79.9, gpa: 3.33, grade: 'B+' },
      { min: 71, max: 74.9, gpa: 3.00, grade: 'B' },
      { min: 68, max: 70.9, gpa: 2.66, grade: 'B-' },
      { min: 64, max: 67.9, gpa: 2.33, grade: 'C+' },
      { min: 61, max: 63.9, gpa: 2.00, grade: 'C' },
      { min: 58, max: 60.9, gpa: 1.66, grade: 'C-' },
      { min: 54, max: 57.9, gpa: 1.30, grade: 'D+' },
      { min: 50, max: 53.9, gpa: 1.00, grade: 'D' },
      { min: 0, max: 49.9, gpa: 0.00, grade: 'F' }
    ];

    const gpaEntry = gpaMapping.find((range) => totalPercentage >= range.min && totalPercentage <= range.max);
    const calculatedGPA = gpaEntry ? gpaEntry.gpa : 0;

    setGpa(calculatedGPA.toFixed(2));
    setPercentage(totalPercentage.toFixed(2));
  };

  return (
    <div className="container mt-5">
      <h2>3 C-H GPA Calculator</h2>

      <div className="form-group">
        <h4>{toggleMidFinal ? 'After Midterm' : 'Before Midterm'} Portion</h4>

        <label>Number of Quizzes</label>
        <input
          type="number"
          value={quizCount}
          onChange={(e) => setQuizCount(parseInt(e.target.value) || 0)}
          className="form-control"
          min="0"
        />

        {Array.from({ length: quizCount }, (_, index) => (
          <div key={index} className="mt-3">
            <h5>Quiz {index + 1}</h5>
            <input
              type="number"
              placeholder="Obtained"
              name="obtained"
              onChange={(e) => handleQuizChange(index, e.target.name, parseFloat(e.target.value) || 0)}
              className="form-control"
              min="0"
            />
            <input
              type="number"
              placeholder="Total"
              name="total"
              onChange={(e) => handleQuizChange(index, e.target.name, parseFloat(e.target.value) || 0)}
              className="form-control mt-2"
              min="0"
            />
          </div>
        ))}

        <label className="mt-4">Number of Assignments</label>
        <input
          type="number"
          value={assignmentCount}
          onChange={(e) => setAssignmentCount(parseInt(e.target.value) || 0)}
          className="form-control"
          min="0"
        />

        {Array.from({ length: assignmentCount }, (_, index) => (
          <div key={index} className="mt-3">
            <h5>Assignment {index + 1}</h5>
            <input
              type="number"
              placeholder="Obtained"
              name="obtained"
              onChange={(e) => handleAssignmentChange(index, e.target.name, parseFloat(e.target.value) || 0)}
              className="form-control"
              min="0"
            />
            <input
              type="number"
              placeholder="Total"
              name="total"
              onChange={(e) => handleAssignmentChange(index, e.target.name, parseFloat(e.target.value) || 0)}
              className="form-control mt-2"
              min="0"
            />
          </div>
        ))}

        <div className="mt-4">
          <h5>Midterm</h5>
          <input
            type="number"
            placeholder="Obtained"
            name="obtained"
            value={midterm.obtained}
            onChange={(e) => setMidterm({ ...midterm, obtained: parseFloat(e.target.value) || 0 })}
            className="form-control"
            min="0"
          />
          <input
            type="number"
            placeholder="Total"
            name="total"
            value={midterm.total}
            onChange={(e) => setMidterm({ ...midterm, total: parseFloat(e.target.value) || 0 })}
            className="form-control mt-2"
            min="0"
          />
        </div>

        {toggleMidFinal && (
          <div className="mt-4">
            <h5>Final</h5>
            <input
              type="number"
              placeholder="Obtained"
              name="obtained"
              value={final.obtained}
              onChange={(e) => setFinal({ ...final, obtained: parseFloat(e.target.value) || 0 })}
              className="form-control"
              min="0"
            />
            <input
              type="number"
              placeholder="Total"
              name="total"
              value={final.total}
              onChange={(e) => setFinal({ ...final, total: parseFloat(e.target.value) || 0 })}
              className="form-control mt-2"
              min="0"
            />
          </div>
        )}
      </div>

      {/* Toggle between before/after midterm using a switch */}
      <Form.Check
        type="switch"
        id="midterm-toggle"
        label={toggleMidFinal ? 'After Midterm' : 'Before Midterm'}
        checked={toggleMidFinal}
        onChange={() => setToggleMidFinal(!toggleMidFinal)}
        className="mt-4"
      />

      <button onClick={calculateGPA} className="btn btn-primary mt-4">
        Calculate GPA
      </button>

      {gpa && (
        <div className="mt-4">
          <h5>GPA: {gpa}</h5>
          <h5>Percentage: {percentage}%</h5>
        </div>
      )}
    </div>
  );
};

export default Simplethreesubject;
