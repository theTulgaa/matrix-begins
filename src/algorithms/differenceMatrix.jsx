
export const difference = (matrixA, matrixB) => {
    const rowA = matrixA.length;
    const rowB = matrixB.length;
    const colA = matrixA[0].length;
    const colB = matrixB[0].length;
    if(rowA != rowB && colA != colB){
        return null;
    }
    
    const final = Array.from({ length: rowA }, () => Array(rowA).fill(0));
    for(let i=0;i<rowA;i++){
        for(let j=0;j<colA;j++){
            final[i][j] = matrixA[i][j] - matrixB[i][j];
        }
    }

    return final
}