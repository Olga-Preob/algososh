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

  if (currentStepIndex === 0) return ElementStates.Default;

  if ((currentStepIndex - 1) * 2 > maxIndex) return ElementStates.Modified;

  if (index === currentStepIndex - 1 || index === maxIndex - currentStepIndex + 1) {
    return ElementStates.Changing;
  }

  if (
    (index < currentStepIndex) ||
    (index > maxIndex - currentStepIndex) ||
    (currentStepIndex === steps.length)
  ) {
    return ElementStates.Modified;
  }

  return ElementStates.Default;
}
