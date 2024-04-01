import { ElementStates } from '../../types/element-states';


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
