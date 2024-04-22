import deter from './determinant';
const crammer = (matrix, b) => {
   
    console.log(matrix);
    console.log(b);
    const src_matrix = matrix.map(row => row.slice());
    const rows = matrix.length;
    const cols = matrix[0].length;
    const detA = deter(matrix);

    if (detA === 0 || rows != cols) {
      console.log(detA)
      console.log(["No unique solution exists."]);
      return null;
      
    }
    else{
      const solutions = [];
      for (let i = 0; i < cols; i++) {
        const mat = src_matrix.map(rows => rows.slice());
        for (let j = 0; j < rows; j++) {
          mat[j][i] = b[j];
        }
        console.log(mat);

        const detMat = deter(mat);
        solutions.push((detMat / detA).toFixed(2));
      }
      return solutions;
    }
}
export default crammer;