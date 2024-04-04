import { ElementStates } from '../../types/element-states';
import { LinkedList } from './LinkedList';


export const delay = (time: number = 0) => {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const getRandomLinkedList = (minLen: number, maxLen: number, minNum: number, maxNum: number) => {
  const newLinkedList = new LinkedList<string>();
  const randomLinkedListLength = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;

  let count = 0;

  while (count <= randomLinkedListLength) {
    newLinkedList.append(String(Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum));

    count++;
  }

  return newLinkedList;
}

export const getArrWithElementStates = (arr: string[]) => {
  return arr.map((elem) => {
    return {
      value: elem,
      headOrTailValue: '',
      hasHead: false,
      hasTail: false,
      state: ElementStates.Default
    }
  });
}
