import React, { useState } from 'react';
import { MatrixCon } from './MatrixCon';
import "./NewCon.css";
import {multiplication} from './algorithms/matrixMultiply';
import {matrixSum} from './algorithms/matrixSum';
import {difference} from './algorithms/differenceMatrix';

export const NewCon = () => {
  const [matrixInfo, setMatrixInfo] = useState([]);
  const [finalrow, setFinalrow] = useState(3)
  const [finalcol, setFinalcol] = useState(3)

  const handleMatrixInfo = (index, row, column) => {
    setMatrixInfo(prevInfo => {
      const updatedInfo = [...prevInfo];
      updatedInfo[index] = { row, column };
      return updatedInfo;
    });
  };

  const logMatrixInfo = () => {
    console.log(matrixInfo[1]);
  };

  const getElements = (column, inputs) => {
    let final_matrix = [];
    let counter = 0;
    let inner = [];
    inputs.forEach(input => {
      let myval = parseFloat(input.value);
      inner.push(myval);
      counter += 1;
      if (counter === column) {
        final_matrix.push(inner);
        counter = 0;
        inner = [];
      }
    });
    return final_matrix.map(array => array);
  };
  
  const intoFinalData = (array) => {
    const final_matrix_inputs = document.querySelectorAll('.final-matrix');
    let index = 0;
    final_matrix_inputs.forEach(input => {
        const result = array[index];
        input.value = result;
        index++;
    });

  }

  const getMatrixes = () => {
    const inputA = document.querySelectorAll('.matrix1');
    const inputB = document.querySelectorAll('.matrix2');
    const matrixA = getElements(matrixInfo[0].column, inputA);
    const matrixB = getElements(matrixInfo[2].column, inputB);

    return [matrixA, matrixB];

  }


  const calculate_Multifly = () => {
    const [matrixA, matrixB] = getMatrixes();

    const answer = multiplication(matrixA,matrixB);
    if (answer === null) {
      alert('Error: Unable to calculate matrix multifly');
      return;
    }

    setFinalrow(answer.length);
    setFinalcol(answer[0].length);
    console.log(finalrow, finalcol);
    const intoData = answer.flat();
    intoFinalData(intoData);

  }

  const calculate_Sum_matrix = () => {

    const [matrixA, matrixB] = getMatrixes();

    if (matrixA === null || matrixB === null) {
        alert('Error: Unable to fetch matrix data');
        return;
    }

    const answer = matrixSum(matrixA, matrixB);

    if (answer === null) {
        alert('Error: Unable to calculate matrix sum');
        return;
    }
    const intoData = answer.flat();
    setFinalrow(answer.length);
    setFinalcol(answer[0].length);
    intoFinalData(intoData);
    console.log(answer);
}

const calculate_Difference = () => {

  const [matrixA, matrixB] = getMatrixes();

  if (matrixA === null || matrixB === null) {
      alert('Error: Unable to fetch matrix data');
      return;
  }

  const answer = difference(matrixA, matrixB);

  if (answer === null) {
      alert('Error: Unable to calculate matrix sum');
      return;
  }
  setFinalrow(answer.length);
  setFinalcol(answer[0].length);
  
  const intoData = answer.flat();
  intoFinalData(intoData);
  console.log(answer);
}


  const restartBtn = () => {
    const inputFields = document.querySelectorAll(".input-section");
    inputFields.forEach(inputField => {
      inputField.value = 0;
    });
  }
  return (
    <div style={{ height: "100vh", width: "100%" }} className='main-container'>
      <div className=""><MatrixCon title={"MATRIX A"} rows={3} cols={3} maxRow={9} maxCol={9} className={"matrix1"} showButtons={true} sendMatrixInfo={(row, column) => handleMatrixInfo(0, row, column)} /></div>
      <div>
        <MatrixCon title={"FINAL MATRIX"} rows={finalrow} cols={finalcol} maxRow={9} maxCol={9} className={"final-matrix"} showButtons={false} sendMatrixInfo={(row, column) => handleMatrixInfo(1, row, column)} />
        <div className='final-matrix-div'>
          <button onClick={calculate_Sum_matrix}>A + B</button>
          <button onClick={calculate_Difference}>A - B</button>
          <button onClick={calculate_Multifly}>A * B</button>
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
