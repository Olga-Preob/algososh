import { swap } from './utils';


export function selectionSortWithSteps(initialArr: number[], direction: 'ascending' | 'descending'): [number[], number, number][] {
  const arr = [...initialArr];
  const steps: [number[], number, number][] = [];
  const length = arr.length;

  for (let i = 0; i < length - 1; i++) {
    let maxInd = i;

    for (let j = i + 1; j < length; j++) {
      steps.push([[...arr], i, j]);

      if (direction === 'ascending' && arr[j] < arr[maxInd]) maxInd = j;

      if (direction === 'descending' && arr[j] > arr[maxInd]) maxInd = j;
    }

    if (maxInd !== i) {
      swap(arr, maxInd, i);
    }
  }

  steps.push([[...arr], -1, -1]);

  return steps;
}
