import React, { useState } from 'react';
import { MatrixCon } from './MatrixCon';
import "./NewCon.css";

export const NewCon = () => {
  const [matrixInfo, setMatrixInfo] = useState([]);
  const handleMatrixInfo = (index, row, column) => {
    setMatrixInfo(prevInfo => {
      const updatedInfo = [...prevInfo];
      updatedInfo[index] = { row, column };
      return updatedInfo;
    });
  };

  const logMatrixInfo = () => {
    console.log(matrixInfo);
  };

  const restartBtn = () => {
    const inputFields = document.querySelectorAll(".input-section");
    inputFields.forEach(inputField => {
      inputField.value = 0;
    });
  };

  return (
    <div style={{ height: "100vh", width: "100%" }} className='main-container'>
      <div className=""><MatrixCon title={"MATRIX A"} rows={3} cols={3} maxRow={9} maxCol={9} className={"matrix1"} showButtons={true} sendMatrixInfo={(row, column) => handleMatrixInfo(0, row, column)} /></div>
      <div>
        <MatrixCon title={"FINAL MATRIX"} rows={3} cols={3} maxRow={9} maxCol={9} className={"final-matrix"} showButtons={false} sendMatrixInfo={(row, column) => handleMatrixInfo(1, row, column)} />
        <div className='final-matrix-div'>
          <button>A + B</button>
          <button>A - B</button>
          <button>A * B</button>
          <button onClick={restartBtn}>RESTART</button>
        </div>
      </div>
      <div className=""><MatrixCon title={"MATRIX B"} rows={3} cols={3} maxRow={9} maxCol={9} className={"matrix2"} showButtons={true} sendMatrixInfo={(row, column) => handleMatrixInfo(2, row, column)} /></div>
      <div>
        <button onClick={logMatrixInfo}>Get Row and Column Info</button>
      </div>
    </div>
  );
};
