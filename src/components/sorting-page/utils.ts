import { ElementStates } from '../../types/element-states';


export const delay = (time: number = 0) => {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const swap = (arr: number[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];

  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const getRandomArr = (minLen: number, maxLen: number, minNum: number, maxNum: number): number[] => {
  const randomArrLength = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;

  const arr = Array.from({length: randomArrLength}, () => Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);

  return arr;
}

export const getCharStatus = (a: number | null, b: number | null, index: number, step: number[], typeOfSort: 'selection' | 'bubble' | null) => {
  const length = step.length;

  if ((a !== null) && (b !== null)) {
    if ((a === -1) || (b === -1)) return ElementStates.Modified;

    if (typeOfSort === 'selection') {
      if ((index < a)) return ElementStates.Modified;
      if ((index === a) || (index === b)) return ElementStates.Changing;
    }

    if (typeOfSort === 'bubble') {
      if ((index === a) || (index === a + 1)) return ElementStates.Changing;
      if (index > (length - b - 1)) return ElementStates.Modified;
    }
  }

  return ElementStates.Default;
}
