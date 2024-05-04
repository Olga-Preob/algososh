import { ElementStates } from '../../types/element-states';


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

export const getCharStatus = (index: number, steps: string[][], currentStepIndex: number) => {
  const maxIndex = steps[currentStepIndex].length - 1;

  if (
    (index < currentStepIndex) ||
    (index > maxIndex - currentStepIndex) ||
    (currentStepIndex === steps.length - 1)
  ) {
    return ElementStates.Modified;
  }

  if (index === currentStepIndex || index === maxIndex - currentStepIndex) {
    return ElementStates.Changing;
  }

  return ElementStates.Default;
}
