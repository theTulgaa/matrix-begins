import React from 'react'
import { MatrixCon } from './MatrixCon'
import "./NewCon.css"
import matrixSum from "./algorithms/matrixSum"

export const NewCon = () => {
  const restartBtn = () => {
    const inputFields = document.querySelectorAll(".input-section");
    inputFields.forEach(inputField => {
      inputField.value = 0;
    });
  }
  const getElements = (column,matrix) => {
    const inputs = matrix;
    let final_matrix = [];
    let counter = 0;
    let inner = [];
    inputs.forEach(input => {
      let myval = parseFloat(input.value);
      inner.push(myval);
      counter += 1;
      if (counter == column){
          final_matrix.push(inner)
          counter = 0;
          inner = [];
      }
    });
    return final_matrix.map(array => array.slice(0, -1));
  }
  const calculate_Sum_matrix = () => {
    const inputFields = document.querySelectorAll(".final-matrix");
    const matrixA = document.querySelectorAll(".matrix1")
    const matrixB = document.querySelectorAll(".matrix2")
    // const matrix1 = getElements(column,matrixA);
    // const matrix2 = getElements(column,matrixB);
    // inputFields.forEach(inputField => {
    //   inputField.value = matrixSum();
    // });
  }
  return (
    <div style={{height: "100vh", width: "100%"}} className='main-container'>
      <div className=""><MatrixCon title={"MATRIX A"} rows={3} cols={3} maxRow={9} maxCol={9} className={"matrix1"} showButtons={true}/></div>
      <div>
        <MatrixCon title={"FINAL MATRIX"} rows={3} cols={3} maxRow={9} maxCol={9} className={"final-matrix"} showButtons={false}/>
        <div className='final-matrix-div'>
          <button onClick={calculate_Sum_matrix}>A + B</button>
          <button>A - B</button>
          <button>A * B</button>
          <button onClick={restartBtn}>RESTART</button>
        </div>
      </div>
      <div className=""><MatrixCon title={"MATRIX B"} rows={3} cols={3} maxRow={9} maxCol={9} className={"matrix2"} showButtons={true}/></div>
    </div>
  )
}
