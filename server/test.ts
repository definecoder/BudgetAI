function maxProfit(prices: number[]): number {
  return prices.reduce((prev, cur, idx) => {
    if (idx == 0) return 0;
    return prev + Math.max(0, prices[idx] - prices[idx - 1]);
  }, 0);
}

console.log(maxProfit([1, 2, 2]));
