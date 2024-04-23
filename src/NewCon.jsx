import React, { useState,useEffect } from 'react';
import { MatrixCon } from './MatrixCon';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./NewCon.css";
import {multiplication} from './algorithms/matrixMultiply';
import {matrixSum} from './algorithms/matrixSum';
import {difference} from './algorithms/differenceMatrix';

export const NewCon = () => {
  const [matrixInfo, setMatrixInfo] = useState([]);
  const [finalrow, setFinalrow] = useState(3)
  const [finalcol, setFinalcol] = useState(3)


  useEffect(() => {
    document.title = "MATRIX CALCULATOR";
  });

  const handleMatrixInfo = (index, row, column) => {
    setMatrixInfo(prevInfo => {
      const updatedInfo = [...prevInfo];
      updatedInfo[index] = { row, column };
      return updatedInfo;
    });
  };

  const getElements2 = (column, inputs) => {
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
    const matrixA = getElements2(matrixInfo[0].column, inputA);
    const matrixB = getElements2(matrixInfo[2].column, inputB);
    return [matrixA, matrixB];

  }


  const calculate_Multifly = () => {
    const [matrixA, matrixB] = getMatrixes();
    console.log(matrixA,matrixB);
    const answer = multiplication(matrixA,matrixB);
    if (answer === null) {
      alert('Error: Unable to calculate matrix multifly');
      return;
    }
    setFinalrow(answer.length);
    setFinalcol(answer[0].length);
    console.log(answer);
    const intoData = answer.flat();
    intoFinalData(intoData);
  }

  const calculate_Sum_matrix = () => {

    const [matrixA, matrixB] = getMatrixes();
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

  const answer = difference(matrixA, matrixB);

  if (answer === null) {
      alert('Error: Unable to calculate matrix difference');
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
    <div className=''>
       <div style={{ height: "150vh", width: "100%" }} className='main-container'>
      <div className=""><MatrixCon title={"MATRIX A"} rows={3} cols={3} maxRow={9} maxCol={9} className={"matrix1"} showButtons={true} sendMatrixInfo={(row, column) => handleMatrixInfo(0, row, column)} /></div>
      <div>
        <MatrixCon title={"FINAL MATRIX"} rows={3} cols={3} maxRow={9} maxCol={9} className={"final-matrix"} showButtons={false} sendMatrixInfo={(row, column) => handleMatrixInfo(1, row, column)} middle={true} myrow={finalrow} mycol={finalcol}/>
        <div className='final-matrix-div'>
          <button onClick={calculate_Sum_matrix}>A + B</button>
          <button onClick={calculate_Difference}>A - B</button>
          <button onClick={calculate_Multifly}>A * B</button>
          <button onClick={restartBtn}>RESTART</button>
        </div>
      </div>
      <div className=""><MatrixCon title={"MATRIX B"} rows={3} cols={3} maxRow={9} maxCol={9} className={"matrix2"} showButtons={true} sendMatrixInfo={(row, column) => handleMatrixInfo(2, row, column)} /></div>
    </div>
    </div>
   
  );
};