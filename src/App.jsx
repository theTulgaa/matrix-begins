import { useState, useEffect } from 'react'
import './App.css'
import Alert from 'react-bootstrap/Alert';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    const [row, setRow] = useState("");
    const [column, setColumn] = useState("");
    const [answer, setAnswer] = useState([]);
    const [found, setFound] = useState(false);
    const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

    const handleRowChange = (event) => {
      const newRow = event.target.value;
      setRow(newRow);
    };

    const handleColumnChange = (event) => {
      const newColumn = event.target.value;
      setColumn(newColumn);
    };
    
    useEffect(() => {
      document.title = "MATRIX CALCULATOR";
    });
    
    
    const getElements = (column) => {
      const inputs = document.querySelectorAll('.input-section');
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
    const getCoef = (row, column) => {
      const inputs = document.querySelectorAll('.input-section');
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
    const generateInputs = (row, column) => {
      const inputs = [];
      for (let i = 0; i < row; i++) {
          const columnDiv = [];
          for (let j = 0; j < column; j++) {
              columnDiv.push(
                  <input
                      key={`${i}-${j}`}
                      type="text"
                      placeholder="..."
                      className='input-section text-center'
                  />
              );
          }
          inputs.push(<div key={`column-${i}`} style={{display: "grid", gridTemplateColumns: `repeat(${column}, 1fr)`}} className='column-div'>{columnDiv}</div>); // Wrap inputs for each column in a div
      }
      return inputs;
  };

  const detMatrix = (matrix) => {

    const n = matrix.length;
    const m = matrix[0].length;
    let det = 1;

    for (let k = 0; k < n; k++) {
        const pivot = matrix[k][k];
        if (pivot === 0) {
            return 0;
        }
        det *= pivot;

        for (let i = k + 1; i < n; i++) {
            const factor = matrix[i][k] / pivot;
            for (let j = k; j < m; j++) {
                matrix[i][j] -= factor * matrix[k][j];
            }
        }
    }

    return det;
  }

  const inverseHelper = (A) => {
    const n = A.length;
    const augmented = [];
    for (let i = 0; i < n; i++) {
        augmented.push([...A[i], ...(new Array(n).fill(0).map((_, index) => index === i ? 1 : 0))]);
    }
    for (let i = 0; i < n; i++) {
        augmented[i] = augmented[i].map(val => val / augmented[i][i]);
        for (let j = i + 1; j < n; j++) {
            const factor = augmented[j][i];
            augmented[j] = augmented[j].map((val, index) => val - factor * augmented[i][index]);
        }
    }
    for (let i = n - 1; i > 0; i--) {
        for (let j = i - 1; j >= 0; j--) {
            const factor = augmented[j][i];
            augmented[j] = augmented[j].map((val, index) => val - factor * augmented[i][index]);
        }
    }
    const inverse = augmented.map(row => row.slice(n));
    return inverse;
  }
  const rank = (matrix) => {
    const n = matrix.length;
    const m = matrix[0].length;
    
    for (let k = 0; k < n; k++) {
        const a = matrix[k][k];
        for (let i = k + 1; i < n; i++) {
            const f = -matrix[i][k] / a;
            for (let j = k; j < m; j++) {
                matrix[i][j] += f * matrix[k][j];
            }
        }
    }
    
    let rank = 0;
    for (let i = 0; i < n; i++) {
      var checker = false;
      for(let j = 0;j < m; j++){
        if (matrix[i][j] !== 0) {
          checker = true
        }
      }
      if(checker === true){
        rank++;
      }
        
    }
    
    return rank;
  }

  const gauss = () => {
    console.log("gauss");
    let matrix = getElements(column);
    let b = getCoef(row, column);
    let augmented_matrix = matrix.map(row => row.slice()); // Make a copy of the matrix
    for (let i = 0; i < matrix.length; i++) {
        augmented_matrix[i].push(b[i]);
    }

    const rows = augmented_matrix.length;
    const cols = augmented_matrix[0].length;
    
    if(rank(matrix) != rank(augmented_matrix)){
      setFound(true)
      setAnswer(["SOMETHING WENT WRONG"]);
        console.log('Unsolution !!!. Because source matrix rank != augmented matrix rank ');
    }
    else{
        for (let i = 0; i < rows; i++) {
            let max_row = i;
            for (let j = i + 1; j < rows; j++) {
                if (Math.abs(augmented_matrix[j][i]) > Math.abs(augmented_matrix[max_row][i])) {
                    max_row = j;
                }
            }
    
            [augmented_matrix[i], augmented_matrix[max_row]] = [augmented_matrix[max_row], augmented_matrix[i]];
    
            const pivot = augmented_matrix[i][i];
            for (let j = i; j < cols; j++) {
                augmented_matrix[i][j] /= pivot;
            }
    
            for (let j = i + 1; j < rows; j++) {
                const factor = augmented_matrix[j][i];
                for (let k = i; k < cols; k++) {
                    augmented_matrix[j][k] -= factor * augmented_matrix[i][k];
                }
            }
        }
        
        const solution = new Array(cols - 1).fill(0);
        let weaks = [];
        if (matrix.length !== matrix[0].length) {
            const different = cols - rows;
            for (let i = cols - 2; i >= cols - different; i--) {
                const outweigth = parseFloat(Math.random() * (10 - (-10)) + (-10));
                weaks.push(outweigth);
            }
    
            for (let i = cols - 2; i >= 0; i--) {
                if (weaks.length > 0) {
                    solution[i] = weaks.shift();
                } else {
                    solution[i] = augmented_matrix[i][cols - 1];
                    for (let j = cols - 2; j >= 0; j--) {
                        if (j === i) break;
                        solution[i] -= augmented_matrix[i][j] * solution[j];
                    }
                }
            }
            setFound(true)
            setAnswer(solution);
            console.log(solution);

        } else {
            for (let i = rows - 1; i >= 0; i--) {
                solution[i] = augmented_matrix[i][cols - 1];
                for (let j = i + 1; j < rows; j++) {
                    solution[i] -= augmented_matrix[i][j] * solution[j];
                }
            }
    
            setFound(true)
            setAnswer(solution);
            console.log(solution);
        }
    }
    
  }
  const cramer = () => {
    let matrix = getElements(column);
    let b = getCoef(row, column);
    console.log(matrix);
    console.log(b);
    const src_matrix = matrix.map(row => row.slice());
    const rows = matrix.length;
    const cols = matrix[0].length;
    const detA = detMatrix(matrix);

    if (detA === 0 || rows != cols -2) {
      setFound(true);
      setAnswer(["NO SOLUTION!"]);
      console.log(["No unique solution exists."]);
      
    }
    else{
      const solutions = [];
      for (let i = 0; i < cols; i++) {
        const mat = src_matrix.map(row => row.slice());
        for (let j = 0; j < rows; j++) {
          mat[j][i] = b[j];
        }
        console.log(mat);

        const detMat = detMatrix(mat);
        solutions.push((detMat / detA).toFixed(2));
      }
      setFound(true);
      setAnswer(solutions);
      console.log(solutions);
    }
  }
  const inverse = () => {
    console.log("INVERSE");
    let matrix1 = getElements(column);
    let matrix = inverseHelper(matrix1);
    let b = getCoef(row, column);
    const solutions = [];
    for (let i = 0; i < matrix.length; i++) {
        let Sum = 0;
        for (let j = 0; j < matrix[0].length; j++) {
            Sum += matrix[i][j] * b[j];
        }
        solutions.push(Sum.toFixed(2));
    }
    setFound(true)
    setAnswer(solutions);
    console.log(solutions);
  }
  const restart = () => {
    setAnswer(false);
    setFound(false);
    setColumn("")
    setRow("")

  }
  return (
    <>
    <div className='outter-container'>
      {screenSize > 576 ? (
        <Alert className='text-center bg-black text-white alert'>
        Mathematics is not just about dealing with a bunch of numbers and complex equations, but about 
        dancing with numbers up to infinity.<a href="https://youtu.be/hlos8imBu7E" className='my-link' target='_blank'> Can you hear the music ?</a>
        </Alert>
      ) : (
        <Alert className='text-center bg-black text-white alert'>
          <a href="https://youtu.be/hlos8imBu7E" className='my-link' target='_blank'>Can you hear the music ?</a>
        </Alert>
      )}
      
      <div className=''>
        <FloatingLabel
          controlId="floatingInput"
          label="Enter row: "
          className="mb-3"
        >
          <Form.Control type="number" placeholder="Enter row: " value={row} onChange={handleRowChange}/>
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Enter column: ">
          <Form.Control type="number" placeholder="Enter column: " value={column} onChange={handleColumnChange}/>
        </FloatingLabel>
      </div>
      <div className='matrix-container'>
        {generateInputs(row, column)}
      </div>
      {found ? <div className='bg-primary mt-4 border rounded p-3'><h1 className='text-center'>Answer: {answer.map(item => String(item)).join(' : ')}</h1></div>: null}
      <div className='mt-5 btn-container'>
        <button onClick={cramer}>CRAMER</button>
        <button onClick={gauss}>GAUSS</button>
        <button onClick={inverse}>INVERSE</button>
      </div>
      <div className='d-flex justify-content-center align-items-center mt-5'>
        <button className='border rounded p-3' onClick={restart}>RESTART</button>
      </div>
    </div>
    </>
  )
}

export default App