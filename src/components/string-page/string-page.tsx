import { useState, useEffect, FormEvent } from 'react';
import { useForm } from '../../hooks/useForm';
import { DELAY_IN_MS } from '../../constants/delays';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { reverseStringWithSteps } from './reverseStringWithSteps';
import { delay, getCharStatus } from './utils';
import styles from './string.module.css';


export const StringPage = () => {
  const controller = new AbortController();
  const signal = controller.signal;

  const maxLen = 11;

  const [steps, setSteps] = useState<string[][] | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const { values, handleChange } = useForm({
    string: ''
  });

  const [isValid, setIsValid] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    const currentInputLen = values.string.length;

    if (currentInputLen > 0 && currentInputLen <= maxLen) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [values]);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    setIsLoader(true);
    startAlgorithm();
  }

  const startAlgorithm = async () => {
    const newSteps = reverseStringWithSteps(values.string);

    setSteps(newSteps);
    setCurrentStepIndex(0);

    if (!newSteps.length) return;

    let index = 0;

    while (index < newSteps.length - 1) {
      await delay(DELAY_IN_MS, null, signal);

      index++;
      setCurrentStepIndex(index);
    }

    setIsLoader(false);
  }

  return (
    <SolutionLayout title='Строка'>
      <div className={styles.wrap}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            name='string'
            value={values.string}
            maxLength={maxLen}
            isLimitText={true}
            onChange={handleChange}
            disabled={isLoader}
            data-testid='charInput'
            data-cy='charInput'
          />

          <Button
            type='submit'
            text='Развернуть'
            isLoader={isLoader}
            disabled={!isValid}
            data-testid='btnSubmit'
            data-cy='btnSubmit'
          />
        </form>

        <ul className={styles.list} data-testid='solutionResult'>
          {
            steps?.[currentStepIndex].map((char, index) => {
              const status = getCharStatus(index, steps, currentStepIndex);

              return (
                <li key={index}>
                  <Circle
                    letter={char}
                    state={status}
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
