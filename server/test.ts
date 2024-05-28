function sortedSquares(nums: number[]): number[] {
  const squares: number[] = [];
  const negs = nums.filter((num) => num < 0).map((num) => -num);
  console.log(negs);
  return squares;
}

sortedSquares([-4, -1, 0, 3, 10]);
