import React, {useEffect, useState} from 'react'
import "./MatrixCon.css"
import rank from "./algorithms/Rank";


export const MatrixCon = ({ title, rows, cols, maxRow, maxCol, className, showButtons}) => {
  const [row, setRow] = useState(rows)
  const [column, setColumn] = useState(cols)
  const drawMatrix = (row, column) => {
    const inputs = [];
      for (let i = 0; i < row; i++) {
          const columnDiv = [];
          for (let j = 0; j < column; j++) {
              columnDiv.push(
                  <input
                      key={`${i}-${j}`}
                      type="text"
                      placeholder={`${0}`}
                      className={`input-section text-center ${className}`}
                  />
              );
          }
          inputs.push(<div key={`column-${i}`} style={{display: "grid", gridTemplateColumns: `repeat(${column}, 1fr)`}} className='column-div'>{columnDiv}</div>);
      }
      return inputs;
  }
  const handleRowAdd = () => {
    if (row < maxRow) {
      setRow(row + 1)
    }
    else {
      return;
    }
  }
  const handleColumnAdd = () => {
    if(column < maxCol) {
      setColumn(column + 1)
    }
    else {
      return;
    }
  }
  const handleRowMinus = () => {
    if (row > 1) {
      setRow(row - 1)
    }
    else {
      return;
    }
  }
  const handleColumnMinus = () => {
    if( column > 1) {
      setColumn(column - 1)
    }
    else {
      return;
    }
  }
  const addRandomNumbers = () => {
    const inputFields = document.querySelectorAll(`.${className}`);
    inputFields.forEach(inputField => {
      const randomNumber = Math.floor(Math.random() * 21) - 10;
      inputField.value = randomNumber;
    });
  }
  const  clearRandomNumbers = () => {
    const inputFields = document.querySelectorAll(`.${className}`);
    inputFields.forEach(inputField => {
      inputField.value = 0;
    });
  }
  const getCoef = (row, column) => {
    const inputs = document.querySelectorAll(`.${className}`);
    const coef = [];
    inputs.forEach(val => {
      let myval = parseFloat(val.value)
      coef.push(myval);
    })
    let count = column - 1;
    let ar = [];
    for (let i = 0; i < row; i++)
    {
        ar.push(coef[count]);
        count += parseInt(column);
    }
    return ar

  }
  const getElements1 = (column) => {
    const inputs = document.querySelectorAll(`.${className}`);
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
  const calculateRank = () => {
    const matrix = getElements1(column);
    const answer = rank(matrix);
    alert(answer);
    console.log(matrix)
    console.log(column)

  }
  
  return (
    <div className='bg-danger mat-con'>
      <h3 className='text-center'>{title}</h3>
      {drawMatrix(row, column)}
      {showButtons ? (
        <div className='btns-container'>
        <button className="" onClick={addRandomNumbers}>CELLS</button>
        <button className="" onClick={handleRowAdd}>ROW+</button>
        <button className="" onClick={handleColumnAdd}>COL+</button>
        <button className="" onClick={clearRandomNumbers}>CLEAR</button>
        <button className="" onClick={handleRowMinus}>ROW-</button>
        <button className="" onClick={handleColumnMinus}>COL-</button>
        <button className="" onClick={calculateRank}>RANK</button>
        <button className="">DET</button>
        <button className="">INV</button>
      </div>
      ) : null}
    </div>
  )
}