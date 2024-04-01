import { ChangeEvent, FormEvent, useState } from 'react';
import { DELAY_IN_MS } from '../../constants/delays';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { reverseStringWithSteps } from './reverseStringWithSteps';
import { getCharStatus } from './utils';
import styles from './string.module.css';


export const StringComponent = () => {
  const maxLen = 11;

  const [steps, setSteps] = useState<string[][] | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const inputValueLen = evt.target.value.length;

    setInputValue(evt.target.value);

    if (inputValueLen > 0 && inputValueLen <= maxLen) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    setIsLoader(true);
    startAlgorithm();
  }

  const startAlgorithm = () => {
    const newSteps = reverseStringWithSteps(inputValue);

    setSteps(newSteps);
    setCurrentStepIndex(0);

    if (!newSteps.length) return;

    let index = 0;

    const intervald = setInterval(() => {
      if (index >= newSteps.length - 1) {
        clearInterval(intervald);
        setIsLoader(false);

        return;
      }

      setCurrentStepIndex(++index);
    }, DELAY_IN_MS);
  }

  return (
    <SolutionLayout title='Строка'>
      <div className={styles.wrap}>
        <form className={styles.form} onSubmit={onSubmit}>
          <Input
            maxLength={maxLen}
            isLimitText={true}
            onChange={onChange}
            disabled={isLoader}
          />

          <Button
            type='submit'
            text='Развернуть'
            isLoader={isLoader}
            disabled={!isValid}
          />
        </form>

        <ul className={styles.list}>
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
