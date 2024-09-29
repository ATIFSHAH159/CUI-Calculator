import React, { useState } from 'react';


const FourLabsub = () => {
  const [quizCount, setQuizCount] = useState();
  const [assignmentCount, setAssignmentCount] = useState();
  const [labAssignmentCount, setLabAssignmentCount] = useState();
  const [quizScores, setQuizScores] = useState([]);
  const [assignmentScores, setAssignmentScores] = useState([]);
  const [labAssignmentScores, setLabAssignmentScores] = useState([]);
  const [midterm, setMidterm] = useState({ obtained: '', total: '' });
  const [final, setFinal] = useState({ obtained: '', total: '' });
  const [labMidterm, setLabMidterm] = useState({ obtained: '', total: '' });
  const [labFinal, setLabFinal] = useState({ obtained: '', total: '' });
  const [gpa, setGpa] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [isAfterMid, setIsAfterMid] = useState(false); // Toggle for midterm phase

  // Handlers for quiz, assignment, lab assignment changes
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

  // Update input fields dynamically and keep old values
  const handleQuizCountChange = (count) => {
    const updatedQuizzes = [...quizScores];
    for (let i = quizScores.length; i < count; i++) {
      updatedQuizzes.push({ obtained: '', total: '' });
    }
    setQuizScores(updatedQuizzes);
    setQuizCount(count);
  };

  const handleAssignmentCountChange = (count) => {
    const updatedAssignments = [...assignmentScores];
    for (let i = assignmentScores.length; i < count; i++) {
      updatedAssignments.push({ obtained: '', total: '' });
    }
    setAssignmentScores(updatedAssignments);
    setAssignmentCount(count);
  };

  const handleLabAssignmentCountChange = (count) => {
    const updatedLabAssignments = [...labAssignmentScores];
    for (let i = labAssignmentScores.length; i < count; i++) {
      updatedLabAssignments.push({ obtained: '', total: '' });
    }
    setLabAssignmentScores(updatedLabAssignments);
    setLabAssignmentCount(count);
  };

  const calculateGPA = () => {
    // Quiz calculation
    const totalQuizObtained = quizScores.reduce((sum, quiz) => sum + quiz.obtained, 0);
    const totalQuizMarks = quizScores.reduce((sum, quiz) => sum + quiz.total, 0);
    const quizPercentage = totalQuizObtained / totalQuizMarks * 15;

    // Assignment calculation
    const totalAssignmentObtained = assignmentScores.reduce((sum, assignment) => sum + assignment.obtained, 0);
    const totalAssignmentMarks = assignmentScores.reduce((sum, assignment) => sum + assignment.total, 0);
    const assignmentPercentage = totalAssignmentObtained / totalAssignmentMarks * 10;

    // Midterm calculation
    const midtermPercentage = (midterm.obtained / midterm.total) * 25;

    // Final calculation (only if after midterm)
    const finalPercentage = isAfterMid ? (final.obtained / final.total) * 50 : 0;

    // Theory total and weight (75%)
    const theoryTotal = quizPercentage + assignmentPercentage + midtermPercentage + finalPercentage;
    const weightedTheory = theoryTotal * 0.7500;

    // Lab assignment calculation
    const totalLabAssignmentObtained = labAssignmentScores.reduce((sum, labAssignment) => sum + labAssignment.obtained, 0);
    const totalLabAssignmentMarks = labAssignmentScores.reduce((sum, labAssignment) => sum + labAssignment.total, 0);
    const labAssignmentPercentage = totalLabAssignmentObtained / totalLabAssignmentMarks * 25;

    // Lab midterm calculation
    const labMidtermPercentage = (labMidterm.obtained / labMidterm.total) * 25;

    // Lab final calculation (only if after midterm)
    const labFinalPercentage = isAfterMid ? (labFinal.obtained / labFinal.total) * 50 : 0;

    // Lab total and weight (25%)
    const labTotal = labAssignmentPercentage + labMidtermPercentage + labFinalPercentage;
    const weightedLab = labTotal * 0.2500;

    // Final percentage
    const totalPercentage = weightedTheory + weightedLab;

    // GPA mapping
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
      <h2>3 C-R GPA Calculator</h2>

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
        <input type="number" value={quizCount} onChange={(e) => handleQuizCountChange(parseInt(e.target.value) || 0)} className="form-control" min="0" />

        {Array.from({ length: quizCount }, (_, index) => (
          <div key={index} className="mt-3">
            <h5>Quiz {index + 1}</h5>
            <input type="number" placeholder="Obtained" name="obtained" value={quizScores[index]?.obtained || ''} onChange={(e) => handleQuizChange(index, e.target.name, parseFloat(e.target.value) || 0)} className="form-control" min="0" />
            <input type="number" placeholder="Total" name="total" value={quizScores[index]?.total || ''} onChange={(e) => handleQuizChange(index, e.target.name, parseFloat(e.target.value) || 0)} className="form-control mt-2" min="0" />
          </div>
        ))}

        <label className="mt-4">Number of Assignments</label>
        <input type="number" value={assignmentCount} onChange={(e) => handleAssignmentCountChange(parseInt(e.target.value) || 0)} className="form-control" min="0" />

        {Array.from({ length: assignmentCount }, (_, index) => (
          <div key={index} className="mt-3">
            <h5>Assignment {index + 1}</h5>
            <input type="number" placeholder="Obtained" name="obtained" value={assignmentScores[index]?.obtained || ''} onChange={(e) => handleAssignmentChange(index, e.target.name, parseFloat(e.target.value) || 0)} className="form-control" min="0" />
            <input type="number" placeholder="Total" name="total" value={assignmentScores[index]?.total || ''} onChange={(e) => handleAssignmentChange(index, e.target.name, parseFloat(e.target.value) || 0)} className="form-control mt-2" min="0" />
          </div>
        ))}

        {/* Midterm and Final for theory */}
        <label className="mt-4">Midterm</label>
        <input type="number" placeholder="Obtained" value={midterm.obtained} onChange={(e) => setMidterm({ ...midterm, obtained: parseFloat(e.target.value) || 0 })} className="form-control" min="0" />
        <input type="number" placeholder="Total" value={midterm.total} onChange={(e) => setMidterm({ ...midterm, total: parseFloat(e.target.value) || 0 })} className="form-control mt-2" min="0" />

        {isAfterMid && (
          <>
            <label className="mt-4">Final</label>
            <input type="number" placeholder="Obtained" value={final.obtained} onChange={(e) => setFinal({ ...final, obtained: parseFloat(e.target.value) || 0 })} className="form-control" min="0" />
            <input type="number" placeholder="Total" value={final.total} onChange={(e) => setFinal({ ...final, total: parseFloat(e.target.value) || 0 })} className="form-control mt-2" min="0" />
          </>
        )}
      </div>

      <div className="form-group mt-4">
        <h4>Lab Portion</h4>

        <label>Number of Lab Assignments</label>
        <input type="number" value={labAssignmentCount} onChange={(e) => handleLabAssignmentCountChange(parseInt(e.target.value) || 0)} className="form-control" min="0" />

        {Array.from({ length: labAssignmentCount }, (_, index) => (
          <div key={index} className="mt-3">
            <h5>Lab Assignment {index + 1}</h5>
            <input type="number" placeholder="Obtained" name="obtained" value={labAssignmentScores[index]?.obtained || ''} onChange={(e) => handleLabAssignmentChange(index, e.target.name, parseFloat(e.target.value) || 0)} className="form-control" min="0" />
            <input type="number" placeholder="Total" name="total" value={labAssignmentScores[index]?.total || ''} onChange={(e) => handleLabAssignmentChange(index, e.target.name, parseFloat(e.target.value) || 0)} className="form-control mt-2" min="0" />
          </div>
        ))}

        <label className="mt-4">Lab Midterm</label>
        <input type="number" placeholder="Obtained" value={labMidterm.obtained} onChange={(e) => setLabMidterm({ ...labMidterm, obtained: parseFloat(e.target.value) || 0 })} className="form-control" min="0" />
        <input type="number" placeholder="Total" value={labMidterm.total} onChange={(e) => setLabMidterm({ ...labMidterm, total: parseFloat(e.target.value) || 0 })} className="form-control mt-2" min="0" />

        {isAfterMid && (
          <>
            <label className="mt-4">Lab Final</label>
            <input type="number" placeholder="Obtained" value={labFinal.obtained} onChange={(e) => setLabFinal({ ...labFinal, obtained: parseFloat(e.target.value) || 0 })} className="form-control" min="0" />
            <input type="number" placeholder="Total" value={labFinal.total} onChange={(e) => setLabFinal({ ...labFinal, total: parseFloat(e.target.value) || 0 })} className="form-control mt-2" min="0" />
          </>
        )}
      </div>

      <button className="btn btn-primary mt-4" onClick={calculateGPA}>Calculate GPA</button>

      {gpa && (
        <div className="mt-4">
          <h4>GPA: {gpa}</h4>
          <h4>Percentage: {percentage}%</h4>
        </div>
      )}
    </div>
  );
};

export default FourLabsub;
