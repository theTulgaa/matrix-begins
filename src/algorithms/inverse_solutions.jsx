import inv from './inverse'
const inv_solution = (mat, coef) => {
    const row = mat.length;
    const column = mat[0].length;
    console.log("INVERSE");
    let matrix = inv(mat);
    let b = coef;
    if (row == column){
        const solutions = [];
        for (let i = 0; i < matrix.length; i++) {
            let Sum = 0;
            for (let j = 0; j < matrix[0].length; j++) {
                Sum += matrix[i][j] * b[j];
            }
            solutions.push(Sum.toFixed(2));
        }
        console.log(solutions)
        return solutions;
      
    }
    else{
        return null;
    }
}
export default inv_solution;