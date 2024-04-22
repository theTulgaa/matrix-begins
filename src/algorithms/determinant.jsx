const deter = (matrix) => {

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
export default deter;