import React, { useState } from 'react';
import './Assests/ThreeLabsub.css';

const ThreeLabsubLabOnly = () => {
  const [labAssignmentCount, setLabAssignmentCount] = useState();
  const [labAssignmentScores, setLabAssignmentScores] = useState([]);
  const [labMidterm, setLabMidterm] = useState({ obtained: '', total: '' });
  const [labFinal, setLabFinal] = useState({ obtained: '', total: '' });
  const [percentage, setPercentage] = useState(null);
  const [isBeforeMid, setIsBeforeMid] = useState(true);

  const handleLabAssignmentChange = (index, name, value) => {
    const newScores = [...labAssignmentScores];
    newScores[index] = { ...newScores[index], [name]: value };
    setLabAssignmentScores(newScores);
  };

  const calculatePercentage = () => {
    // Lab Assignment Total Calculation
    const labAssignmentTotal = labAssignmentScores.reduce(
      (sum, labAssignment) => sum + (labAssignment.obtained / labAssignment.total) * 25,
      0
    );

    // Lab Midterm Score Calculation
    const labMidtermScore = (labMidterm.obtained / labMidterm.total) * 25;

    // Lab Final Score Calculation (only if "After Mid")
    let labFinalScore = 0;
    if (!isBeforeMid) {
      labFinalScore = (labFinal.obtained / labFinal.total) * 50;
    }

    // Final Score Calculation
    let totalScore = labAssignmentTotal + labMidtermScore;
    let totalWeight = 50; // 25 (Assignments) + 25 (Midterm)

    if (!isBeforeMid) {
      totalScore += labFinalScore;
      totalWeight += 50; // Add Final's 50% weight
    }

    const finalPercentage = (totalScore / totalWeight) * (isBeforeMid ? 16.665 : 33.33);
    setPercentage(finalPercentage.toFixed(2));
  };

  return (
    <div className="container mt-5">
      <h2>3 CR LAB</h2>

      <div className="form-group mt-4">
        <h4>Lab Portion</h4>

        <label>Number of Lab Assignments</label>
        <input
          type="number"
          value={labAssignmentCount}
          onChange={(e) => setLabAssignmentCount(parseInt(e.target.value) || 0)}
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
              onChange={(e) => handleLabAssignmentChange(index, e.target.name, parseFloat(e.target.value) || 0)}
              className="form-control"
              min="0"
            />
            <input
              type="number"
              placeholder="Total"
              name="total"
              onChange={(e) => handleLabAssignmentChange(index, e.target.name, parseFloat(e.target.value) || 0)}
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
