import React, { useEffect, useState } from 'react';
import "./MatrixCon.css";
import rank from "./algorithms/Rank";
import deter from "./algorithms/determinant";
import inv from "./algorithms/inverse";
import inv_solution from "./algorithms/inverse_solutions";
import crammer from "./algorithms/crammer_rule";
import gauss from "./algorithms/gauss_solutions";

export const MatrixCon = ({ title, rows, cols, maxRow, maxCol, className, showButtons, sendMatrixInfo, middle, myrow, mycol }) => {

  const [answer, setAnswer] = useState([]);
  const [found, setFound] = useState(false);

  useEffect(() => {
    if (middle) {
      console.log('Row:', myrow, 'Col:', mycol);
      setRow(myrow)
      setColumn(mycol)
    }
  }, [myrow, mycol]);
  const [row, setRow] = useState(rows);
  const [column, setColumn] = useState(cols);
  useEffect(() => {
    sendMatrixInfo(row, column);
  }, [row, column]);

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
      inputs.push(<div key={`column-${i}`} style={{ display: "grid", gridTemplateColumns: `repeat(${column}, 1fr)` }} className='column-div'>{columnDiv}</div>);
    }
    return inputs;
  };

  const handleRowAdd = () => {
    if (row < maxRow) {
      setRow(row + 1);
    } else {
      return;
    }
  };

  const handleColumnAdd = () => {
    if (column < maxCol) {
      setColumn(column + 1);
    } else {
      return;
    }
  };

  const handleRowMinus = () => {
    if (row > 1) {
      setRow(row - 1);
    } else {
      return;
    }
  };

  const handleColumnMinus = () => {
    if (column > 1) {
      setColumn(column - 1);
    } else {
      return;
    }
  };

  const addRandomNumbers = () => {
    const inputFields = document.querySelectorAll(`.${className}`);
    inputFields.forEach(inputField => {
      const randomNumber = Math.floor(Math.random() * 21) - 10;
      inputField.value = randomNumber;
    });
  };

  const clearRandomNumbers = () => {
    const inputFields = document.querySelectorAll(`.${className}`);
    inputFields.forEach(inputField => {
      inputField.value = 0;
    });
  };

  const getElements1 = (column) => {
    const inputs = document.querySelectorAll(`.${className}`);
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
    return final_matrix.map(array => array.slice(0, -1));
  };

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
  const calculateRank = () => {
    const matrix = getElements1(column);
    const answer = rank(matrix);
    alert(answer);
    console.log(matrix);
    console.log(column);
  };
  const calculateDet = () => {
    const matrix = getElements1(column);
    const answer = deter(matrix);
    console.log(matrix)
    if(row != column -1){
      alert('Since the last column is a weak member, it is not used for determinant !');
    }
    else{
      alert(['Determinant :',answer]);
    }
    
  };
  const calculateInv = () => {
    const matrix = getElements1(column);
    const answer = inv(matrix);
    const array = answer.flat();
    if(row != column -1){
      alert('Since the last column is a weak member, it is not used for inversion !');
    }
    else{
      const formatedArray = array.map((sol) => sol.toFixed(2));
      setFound(true);
      setAnswer(formatedArray);
    }  
  };
  const calculateInv_solution = () => {
    const matrix = getElements1(column);
    const coef = getCoef(row,column);
    const answer = inv_solution(matrix,coef);
    if(answer === null){
      setFound(true);
      setAnswer(["NO SOLUTION!"]);
    }
    else{
      console.log(matrix)
      setFound(true);
      setAnswer(answer);
    }
    
  };
  const calculate_Crammer = () => {
    const matrix = getElements1(column);
    const coef = getCoef(row,column);
    const answer = crammer(matrix,coef);
    if(answer === null){
      setFound(true);
      setAnswer(["NO SOLUTION!"]);
    }
    else{
      console.log(matrix)
      setFound(true);
      setAnswer(answer);
    }
    
  };
  const calculate_Gauss = () => {
    const matrix = getElements1(column);
    const coef = getCoef(row,column);
    const answer = gauss(matrix,coef);
    if(answer === null){
      setFound(true);
      setAnswer(["Error : Basic and augmented matrix ranks are not equal!!!\nSOMETHING WENT WRONG"]);
    }
    else{
      console.log(matrix)
      setFound(true);
      setAnswer(answer);
      
    }
    
  };

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
          <button className="" onClick={calculateDet}>DET</button>
          <button className="" onClick={calculateInv}>INV</button>
          <button className="" onClick={calculateInv_solution}>INVERSE SOLUTION</button>
          <button className="" onClick={calculate_Gauss}>GAUSS</button>
          <button className="" onClick={calculate_Crammer}>CRAMMER</button>
        </div>
      ) : null}
      <div>
        {found ? <div className='bg-primary mt-4 border rounded p-3'><h1 className='text-center'>Answer: {answer.map(item => String(item)).join(' : ')}</h1></div>: null}
      </div>
    </div>
  );
};

