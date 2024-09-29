import React, { useState } from 'react';
import './Assests/ThreeLabsub.css';

const ThreeLabsubLabOnly = () => {
  const [labAssignmentCount, setLabAssignmentCount] = useState(0);
  const [labAssignmentScores, setLabAssignmentScores] = useState([]);
  const [labMidterm, setLabMidterm] = useState({ obtained: '', total: '' });
  const [labFinal, setLabFinal] = useState({ obtained: '', total: '' });
  const [percentage, setPercentage] = useState(null);
  const [isBeforeMid, setIsBeforeMid] = useState(true);

  const handleLabAssignmentCountChange = (count) => {
    const newCount = Math.max(0, count);
    setLabAssignmentCount(newCount);

    // Adjust labAssignmentScores based on the new count
    const newScores = [...labAssignmentScores];

    // If increasing count, fill new entries with default values
    if (newCount > newScores.length) {
      for (let i = newScores.length; i < newCount; i++) {
        newScores[i] = { obtained: '', total: '' };
      }
    } else {
      // If decreasing count, slice the array to the new length
      newScores.length = newCount;
    }
    
    setLabAssignmentScores(newScores);
  };

  const handleLabAssignmentChange = (index, name, value) => {
    const newScores = [...labAssignmentScores];
    newScores[index] = { ...newScores[index], [name]: value };
    setLabAssignmentScores(newScores);
  };

  const calculatePercentage = () => {
    // Total obtained and total marks for lab assignments
    let totalObtained = 0;
    let totalPossible = 0;

    labAssignmentScores.forEach(labAssignment => {
        totalObtained += labAssignment.obtained || 0; // Ensure value is not NaN
        totalPossible += labAssignment.total || 0; // Ensure value is not NaN
    });

    // Calculate the lab assignment percentage
    const labAssignmentPercentage = (totalObtained / totalPossible) * 25; // 25% contribution
    console.log(`Lab Assignment Total Percentage: ${labAssignmentPercentage}%`);

    // Lab Midterm Score Calculation
    const labMidtermScore = (labMidterm.obtained / labMidterm.total) * 25; // 25% contribution
    console.log(`Lab Midterm Percentage: ${labMidtermScore}%`);

    // Lab Final Score Calculation (only if "After Mid")
    let labFinalScore = 0;
    if (!isBeforeMid) {
        labFinalScore = (labFinal.obtained / labFinal.total) * 50; // 50% contribution
    }
    console.log(`Lab Final Percentage: ${labFinalScore}%`);

    // Final Score Calculation
    let totalScore = labAssignmentPercentage + labMidtermScore + labFinalScore;

    // Calculate Total Weight
    let totalWeight = 0;

    if (isBeforeMid) {
        totalWeight = 50; // Before Mid: Assignments + Midterm = 50%
    } else {
        totalWeight = 100; // After Mid: Assignments + Midterm + Final = 100%
    }

    // Adjust the final percentage calculation
    const finalPercentage = (totalScore / totalWeight) * (isBeforeMid ? 12.50 : 25.00);
    setPercentage(finalPercentage.toFixed(2));

    console.log(`Total Score: ${totalScore}, Total Weight: ${totalWeight}, Final Percentage: ${finalPercentage}%`);
};


  return (
    <div className="container mt-5">
      <h2>4 CR LAB</h2>

      <div className="form-group mt-4">
        <h4>Lab Portion</h4>

        <label>Number of Lab Assignments</label>
        <input
          type="number"
          value={labAssignmentCount}
          onChange={(e) => handleLabAssignmentCountChange(parseInt(e.target.value) || 0)}
          className="form-control"
          min="0"
        />

        {Array.from({ length: labAssignmentCount }, (_, index) => (
          <div key={index} className="mt-3">
            <h5>Lab Assignment {index + 1}</h5>
            <input
              type="number"
              placeholder="Obtained"
              name="obtained"
              value={labAssignmentScores[index]?.obtained || ''}
              onChange={(e) => handleLabAssignmentChange(index, 'obtained', parseFloat(e.target.value) || 0)}
              className="form-control"
              min="0"
            />
            <input
              type="number"
              placeholder="Total"
              name="total"
              value={labAssignmentScores[index]?.total || ''}
              onChange={(e) => handleLabAssignmentChange(index, 'total', parseFloat(e.target.value) || 0)}
              className="form-control mt-2"
              min="0"
            />
          </div>
        ))}

        <div className="mt-4">
          <h5>Lab Midterm</h5>
          <input
            type="number"
            placeholder="Obtained"
            name="obtained"
            value={labMidterm.obtained}
            onChange={(e) => setLabMidterm({ ...labMidterm, obtained: parseFloat(e.target.value) || 0 })}
            className="form-control"
            min="0"
          />
          <input
            type="number"
            placeholder="Total"
            name="total"
            value={labMidterm.total}
            onChange={(e) => setLabMidterm({ ...labMidterm, total: parseFloat(e.target.value) || 0 })}
            className="form-control mt-2"
            min="0"
          />
        </div>

        <div className="form-check form-switch mt-4">
          <input
            className="form-check-input"
            type="checkbox"
            id="toggleCalculation"
            checked={!isBeforeMid}
            onChange={() => setIsBeforeMid(!isBeforeMid)}
          />
          <label className="form-check-label" htmlFor="toggleCalculation">
            {isBeforeMid ? 'Before Mid' : 'After Mid'}
          </label>
        </div>

        {!isBeforeMid && (
          <div className="mt-4">
            <h5>Lab Final</h5>
            <input
              type="number"
              placeholder="Obtained"
              name="obtained"
              value={labFinal.obtained}
              onChange={(e) => setLabFinal({ ...labFinal, obtained: parseFloat(e.target.value) || 0 })}
              className="form-control"
              min="0"
            />
            <input
              type="number"
              placeholder="Total"
              name="total"
              value={labFinal.total}
              onChange={(e) => setLabFinal({ ...labFinal, total: parseFloat(e.target.value) || 0 })}
              className="form-control mt-2"
              min="0"
            />
          </div>
        )}
      </div>

      <button onClick={calculatePercentage} className="btn btn-primary mt-4">
        Calculate Percentage
      </button>

      {percentage && (
        <div className="mt-4">
          <h3>Your Percentage: {percentage}%</h3>
        </div>
      )}
    </div>
  );
};

export default ThreeLabsubLabOnly;
