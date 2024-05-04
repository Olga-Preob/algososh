export function getFibonacciNumbers(sequenceLength: number): number[] {
  if (sequenceLength < 0) {
    throw new Error('sequence length cannot be less than 0');
  }

  const fibonacciNumbers: number[] = [1, 1];

  for (let i = 2; i <= sequenceLength; i++) {
    fibonacciNumbers.push(fibonacciNumbers[i - 2] + fibonacciNumbers[i - 1]);
  }

  return fibonacciNumbers;
}
