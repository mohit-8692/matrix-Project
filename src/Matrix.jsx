import React, { useState } from 'react';
import './Matrix.css';

const Matrix = () => {
  const [grid, setGrid] = useState(Array(3).fill().map(() => Array(3).fill('white')));
  const [clickSequence, setClickSequence] = useState([]);

  const handleBoxClick = (row, col) => {
    const updatedGrid = grid.map((r, rowIndex) => 
      r.map((color, colIndex) => {
        if (rowIndex === row && colIndex === col) {
             return 'green';
          }
          return color;
      })
    );

    setGrid(updatedGrid);
    setClickSequence([...clickSequence, { row, col }]);    
    if (row === 2 && col === 2) {
      changingColorOrangeInSequence(updatedGrid, clickSequence.concat({ row, col }));
    }
  };

  const changingColorOrangeInSequence = (currentGrid, order) => {
    order.forEach(({ row, col }, index) => {
      setTimeout(() => {
      const updatedGrid = currentGrid.map((r, rowIndex) => 
        r.map((color, colIndex) => {
          if (rowIndex === row && colIndex === col) {
              return 'orange';
          }
            return color;
          })
        );
        setGrid(updatedGrid);
      }, index * 500);
    });
  };

  const resetGrid = () => {
    setGrid(Array(3).fill().map(() => Array(3).fill('white')));
    setClickSequence([]);
  };

  return (
    <div className="matrix-container">
      <button onClick={resetGrid}>Reset</button>
      <div className="matrix">
         {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((color, colIndex) => (
              <div
                key={colIndex} className="box" style={{ backgroundColor: color }}
                onClick={() => handleBoxClick(rowIndex, colIndex)}
              />
            ))}
        </div>
      ))}
      </div>
  </div>
  );
};
export default Matrix;
