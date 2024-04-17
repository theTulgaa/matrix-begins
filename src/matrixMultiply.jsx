// can multiply if matrixA_cols = matrixB_rows
// final matrix will be [matrixA_rows x matrixB_cols]
export const multiplication = (matrixA, matrixB) => {
    const numRowsA = matrixA.length;
    const numColsA = matrixA[0].length;
    const numRowsB = matrixB.length;
    const numColsB = matrixB[0].length;
    
    if(numColsA != numRowsB){
        return null;
    }

    const multiply_matrix = Array.from({ length: numRowsA }, () => Array(numColsB).fill(0));
    for (let i = 0; i < numRowsA; i++) {
        for (let j = 0; j < numColsB; j++) {
            for (let k = 0; k < numColsA; k++) {
                multiply_matrix[i][j] += matrixA[i][k] * matrixB[k][j];
            }
        }
    }

    return multiply_matrix;
}
