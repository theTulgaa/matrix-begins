import React from 'react'
import { MatrixCon } from './MatrixCon'
import "./NewCon.css"

export const NewCon = () => {
  const restartBtn = () => {
    const inputFields = document.querySelectorAll(".input-section");
    inputFields.forEach(inputField => {
      inputField.value = 0;
    });
  }
  return (
    <div style={{height: "100vh", width: "100%"}} className='main-container'>
      <div className=""><MatrixCon title={"MATRIX A"} rows={3} cols={3} maxRow={9} maxCol={9} className={"matrix1"} showButtons={true}/></div>
      <div>
        <MatrixCon title={"FINAL MATRIX"} rows={3} cols={3} maxRow={9} maxCol={9} className={"final-matrix"} showButtons={false}/>
        <div className='final-matrix-div'>
          <button>A + B</button>
          <button>A - B</button>
          <button>A * B</button>
          <button onClick={restartBtn}>RESTART</button>
        </div>
      </div>
      <div className=""><MatrixCon title={"MATRIX B"} rows={3} cols={3} maxRow={9} maxCol={9} className={"matrix2"} showButtons={true}/></div>
    </div>
  )
}
