const inv = (A) => {
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
  export default inv;