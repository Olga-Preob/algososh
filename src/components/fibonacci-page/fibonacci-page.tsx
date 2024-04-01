import { useState, ChangeEvent, FormEvent } from 'react';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { getFibonacciNumbers } from './getFibonacciNumbers';
import styles from './fibonacci-page.module.css';


export const FibonacciPage = () => {
  const minNum = 1;
  const maxNum = 19;

  const [steps, setSteps] = useState<number[]>([]);

  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const currentValue = Number(evt.target.value);

    setInputValue(evt.target.value);

    if (currentValue >= minNum && currentValue <= maxNum) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    setIsLoader(true);
    setSteps([]);

    startAlgorithm();
  }

  const startAlgorithm = () => {
    const sequenceLength = Number(inputValue);
    const fibonacciNumbers = getFibonacciNumbers(sequenceLength);

    for (let i = 0; i < fibonacciNumbers.length; i++) {
      setTimeout(() => {
        setSteps(prev => [...prev, fibonacciNumbers[i]]);

        i === fibonacciNumbers.length - 1 && setIsLoader(false);
      }, i * SHORT_DELAY_IN_MS);
    }
  }

  return (
    <SolutionLayout title='Последовательность Фибоначчи'>
      <div className={styles.wrap}>
        <form className={styles.form} onSubmit={onSubmit}>
          <Input
            placeholder='Введите число'
            type='number'
            max={maxNum}
            isLimitText={true}
            onChange={onChange}
            disabled={isLoader}
          />

          <Button
            text='Рассчитать'
            type='submit'
            isLoader={isLoader}
            disabled={!isValid}
          />
        </form>

        <ul className={styles.list}>
          {
            steps.map((number, index) => {
              return (
                <li key={index}>
                  <Circle
                    letter={String(number)}
                    index={index}
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
