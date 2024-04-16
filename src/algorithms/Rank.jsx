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
    // hahaha
    return rank;
}
export default rank;