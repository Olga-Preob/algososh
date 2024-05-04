import { ElementStates } from '../../types/element-states';
import { LinkedList } from './LinkedList';


export const delay = (ms: number = 0, value: string | null, signal: AbortSignal) => {
  return new Promise((resolve, reject) => {
    const listener = () => {
      clearTimeout(timer);

      reject(new Error('Aborted'));
    }

    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', listener);

      resolve(value);
    }, ms);

    if (signal?.aborted) listener();

    signal?.addEventListener('abort', listener);
  });
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
