import rank from './Rank';
const gauss = (matrix, b) => {
    console.log("gauss");
    let augmented_matrix = matrix.map(row => row.slice());
    for (let i = 0; i < matrix.length; i++) {
      augmented_matrix[i].push(b[i]);
    }

    const rows = augmented_matrix.length;
    const cols = augmented_matrix[0].length;
    
    if(rank(matrix) != rank(augmented_matrix)){
        console.log('Unsolution !!!. Because source matrix rank != augmented matrix rank ');
        return null;
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
                const outweigth = Math.floor(parseFloat(Math.random() * (10 - (-10)) + (-10)));
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
           
            console.log(solution);
            const formattedSol = solution.map((sol) => sol.toFixed(2) );
            return formattedSol;

        } else {
            for (let i = rows - 1; i >= 0; i--) {
                solution[i] = augmented_matrix[i][cols - 1];
                for (let j = i + 1; j < rows; j++) {
                    solution[i] -= augmented_matrix[i][j] * solution[j];
                }
            }
    
            console.log(solution);
            const formattedSol = solution.map((sol) => sol.toFixed(2) );
            return formattedSol;
            
        }
    }
    
}
export default gauss;
/* */