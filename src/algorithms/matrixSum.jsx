
export const matrixSum = (matrixA, matrixB) => {
    const rowA = matrixA.length;
    const rowB = matrixB.length;
    const colA = matrixA[0].length;
    const colB = matrixB[0].length;
    console.log(rowA,rowB,colA,colB)
    if(rowA !== rowB || colA !== colB){
        return null;
    }
    
    const sumMatrix = Array.from({ length: rowA }, () => Array(rowA).fill(0));
    for(let i=0;i<rowA;i++){
        for(let j=0;j<colA;j++){
            sumMatrix[i][j] = matrixA[i][j] + matrixB[i][j];
        }
    }

    return sumMatrix
}