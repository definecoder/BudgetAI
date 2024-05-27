function sortedSquares(nums: number[]): number[] {
  // -4, -1, 0, 3, 10

  const negatives: number[] = nums.filter((num) => {
    return num < 0;
  });

  const positives: number[] = nums.filter((num) => {
    return num >= 0;
  });

  const answer: number[] = [];

  let index = 0;
  let current = negatives[index++];

  for (let i = 0; i < positives.length; i++) {
    if (
      i + 1 < positives.length &&
      positives[i] > current &&
      positives[i + 1] < current
    ) {
      answer.push(current * current);
      current = negatives[index++];
      if (index === negatives.length) {
        break;
      }
    }
  }

  return answer;
}

console.log(sortedSquares([-4, -1, 0, 3, 10])); // [0, 1, 9, 16, 100]
