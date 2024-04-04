import { useState, useEffect, FormEvent } from 'react';
import { useForm } from '../../hooks/useForm';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { getFibonacciNumbers } from './getFibonacciNumbers';
import { delay } from '../string/utils';
import styles from './fibonacci-page.module.css';


export const FibonacciPage = () => {
  const minNum = 1;
  const maxNum = 19;

  const [steps, setSteps] = useState<number[]>([]);

  const { values, handleChange } = useForm({
    count: ''
  });

  const [isValid, setIsValid] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    const currentInputCount = Number(values.count);

    if (currentInputCount >= minNum && currentInputCount <= maxNum) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [values]);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    setIsLoader(true);
    setSteps([]);

    startAlgorithm();
  }

  const startAlgorithm = async () => {
    const sequenceLength = Number(values.count);
    const fibonacciNumbers = getFibonacciNumbers(sequenceLength);

    for (let i = 0; i < fibonacciNumbers.length; i++) {
      await delay(SHORT_DELAY_IN_MS);

      setSteps(prev => [...prev, fibonacciNumbers[i]]);

      i === fibonacciNumbers.length - 1 && setIsLoader(false);
    }
  }

  return (
    <SolutionLayout title='Последовательность Фибоначчи'>
      <div className={styles.wrap}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            name='count'
            placeholder='Введите число'
            type='number'
            value={values.count}
            max={maxNum}
            isLimitText={true}
            onChange={handleChange}
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
