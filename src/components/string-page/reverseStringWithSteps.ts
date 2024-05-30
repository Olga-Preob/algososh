export function reverseStringWithSteps(input: string): string[][] {
  const middle = Math.floor(input.length / 2);
  const letters = input.split('');
  const steps: string[][] = [[...letters]];

  steps.push([...letters]);

  if (input.length <= 1) {
    steps.push([...letters]);

    return steps;
  }

  for (let left = 0; left < middle; left++) {
    const right = input.length - 1 - left;

    [letters[left], letters[right]] = [letters[right], letters[left]];

    steps.push([...letters]);
  }

  steps.push([...letters]);

  return steps;
}
