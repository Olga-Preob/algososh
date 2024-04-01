import { swap } from './utils';


export function bubbleSortWithSteps(initialArr: number[], direction: 'ascending' | 'descending'): [number[], number, number][] {
  const arr = [...initialArr];
  const steps: [number[], number, number][] = [];
  const length = arr.length;

  for (let i = 0; i < length; i++) {
    let swapped = false;

    for (let j = 0; j < length - i - 1; j++) {
      steps.push([[...arr], j, i]);

      if (
        (direction === 'ascending' && arr[j] > arr[j + 1]) ||
        (direction === 'descending' && arr[j] < arr[j + 1])
      ) {
        swapped = true;

        swap(arr, j, j + 1);
      }
    }

    if (swapped !== true) break;
  }

  steps.push([[...arr], -1, -1]);

  return steps;
}
