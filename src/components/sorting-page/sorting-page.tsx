import { useState, useRef, FormEvent } from 'react';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Button } from '../ui/button/button';
import { Column } from '../ui/column/column';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Direction } from '../../types/direction';
import { delay, getRandomArr, getCharStatus } from './utils';
import { selectionSortWithSteps } from './selectionSortWithSteps';
import { bubbleSortWithSteps } from './bubbleSortWithSteps';
import styles from './sorting-page.module.css';


type Props = {
  initArr?: number[][];
}

export const SortingPage = ({ initArr }: Props) => {
  const controller = new AbortController();
  const signal = controller.signal;

  const minLen = 3;
  const maxLen = 17;

  const minNum = 0;
  const maxNum = 101;

  const [steps, setSteps] = useState<number[][]>(
    initArr ? initArr : [getRandomArr(minLen, maxLen, minNum, maxNum)]
  );
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [allIndexes, setAllIndexes] = useState<{
    aIndex: number | null;
    bIndex: number | null;
  }[]>([{
    aIndex: null,
    bIndex: null
  }]);

  const [isLoaderASC, setIsLoaderASC] = useState(false);
  const [isLoaderDESC, setIsLoaderDESC] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const typeOfSortRef = useRef<'selection' | 'bubble' | null>(null);
  const directionRef = useRef<'ascending' | 'descending'>('ascending');

  const getNewRandomArr = () => {
    setCurrentStepIndex(0);

    setAllIndexes([{
      aIndex: null,
      bIndex: null
    }]);

    setSteps([getRandomArr(minLen, maxLen, minNum, maxNum)]);
  }

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    const tempTypeOfSort = (document.querySelector('input[name="typeOfSort"]:checked') as HTMLInputElement).value;

    const tempDirection = document.activeElement?.getAttribute('name');

    if ((tempTypeOfSort === 'selection') || (tempTypeOfSort === 'bubble')) {
      typeOfSortRef.current = tempTypeOfSort;
    }

    if ((tempDirection === 'ascending') || (tempDirection === 'descending')) {
      directionRef.current = tempDirection;
    }

    setIsDisabled(true);

    directionRef.current === 'ascending' && setIsLoaderASC(true);
    directionRef.current === 'descending' && setIsLoaderDESC(true);

    startAlgorithm();
  }

  const startAlgorithm = async () => {
    let newSteps: [number[], number, number][] = [];

    if (typeOfSortRef.current === 'selection') {
      newSteps = selectionSortWithSteps(steps[currentStepIndex], directionRef.current);
    } else {
      newSteps = bubbleSortWithSteps(steps[currentStepIndex], directionRef.current)
    }

    newSteps.forEach((step, index) => {
      const [currentState, aIndex, bIndex] = step;

      if (index === 0) {
        setSteps([currentState]);
        setAllIndexes([{
          aIndex,
          bIndex
        }]);
      } else {
        setSteps(prev => [...prev, currentState]);
        setAllIndexes(prev => [...prev, {
          aIndex,
          bIndex
        }]);
      }
    });

    setCurrentStepIndex(0);

    if (!newSteps.length) return;

    let index = 0;

    while (index < newSteps.length - 1) {
      await delay(SHORT_DELAY_IN_MS, null, signal);

      index++;
      setCurrentStepIndex(index);
    }

    setIsDisabled(false);
    setIsLoaderASC(false);
    setIsLoaderDESC(false);
  }

  return (
    <SolutionLayout title='Сортировка массива'>
      <div className={styles.wrap}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <fieldset className={styles.radioBtns}>
            <RadioInput
              name='typeOfSort'
              label='Выбор'
              value='selection'
              defaultChecked={true}
              disabled={isDisabled}
              data-testid='radioSelection'
            />
            <RadioInput
              name='typeOfSort'
              label='Пузырёк'
              value='bubble'
              disabled={isDisabled}
              data-testid='radioBubble'
            />
          </fieldset>

          <fieldset className={styles.sortBtns}>
            <Button
              name='ascending'
              type='submit'
              text='По возрастанию'
              sorting={Direction.Ascending}
              isLoader={isLoaderASC}
              disabled={isDisabled}
              extraClass={styles.btn}
              data-testid='btnAsc'
            />
            <Button
              name='descending'
              type='submit'
              text='По убыванию'
              sorting={Direction.Descending}
              isLoader={isLoaderDESC}
              disabled={isDisabled}
              extraClass={styles.btn}
              data-testid='btnDesc'
            />
          </fieldset>

          <Button
            type='button'
            text='Новый массив'
            onClick={getNewRandomArr}
            disabled={isDisabled}
          />
        </form>

        <ul className={styles.list} data-testid='solutionResult'>
          {
            steps?.[currentStepIndex].map((number, index) => {
              const a = allIndexes[currentStepIndex].aIndex;
              const b = allIndexes[currentStepIndex].bIndex;

              const status = getCharStatus(a, b, index, steps[currentStepIndex], typeOfSortRef.current);

              return (
                <li key={index}>
                  <Column
                    state={status}
                    index={number}
                  />
                </li>
              );
            })
          }
        </ul>
      </div>
    </SolutionLayout>
  );
};
