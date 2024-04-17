const matrixSum = (matrixA, matrixB) => {
    const rowA = matrixA.length;
    const sumMatrix = Array.from({ length: rowA }, () => Array(rowA).fill(0));
    for(let i=0;i<rowA;i++){
        for(let j=0;j<rowA;j++){
            sumMatrix[i][j] = matrixA[i][j] + matrixB[i][j];
        }
    }

    return sumMatrix
}
export default matrixSum;