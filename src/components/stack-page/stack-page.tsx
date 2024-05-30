import { useState, useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { ElementStates } from '../../types/element-states';
import { Element } from '../../types/index';
import { delay } from './utils';
import { Stack } from './Stack';
import styles from './stack-page.module.css';


export const StackPage = () => {
  const controller = new AbortController();
  const signal = controller.signal;

  const maxLen = 4;

  const [stack] = useState(new Stack<Element>());
  const [stackElemArr, setStackElemArr] = useState<Element[]>([]);

  const { values, setValues, handleChange } = useForm({
    char: ''
  });

  const [IsLoaderAddBtn, setIsLoaderAddBtn] = useState(false);
  const [isDisabledAddBtn, setIsDisabledAddBtn] = useState(true);

  const [IsLoaderRemoveBtn, setIsLoaderRemoveBtn] = useState(false);
  const [isDisabledBtnRemove, setIsDisabledRemoveBtn] = useState(true);

  const [IsLoaderClearBtn, setIsLoaderClearBtn] = useState(false);
  const [isDisabledClearBtn, setIsDisabledClearBtn] = useState(true);

  useEffect(() => {
    const currentCharLen = values.char.length;

    if ((currentCharLen > 0) && (currentCharLen <= maxLen)) {
      setIsDisabledAddBtn(false);
    } else {
      setIsDisabledAddBtn(true);
    }
  }, [values]);

  useEffect(() => {
    if (stackElemArr.length > 0) {
      setIsDisabledRemoveBtn(false);
      setIsDisabledClearBtn(false);
    } else {
      setIsDisabledRemoveBtn(true);
      setIsDisabledClearBtn(true);
    }
  }, [stackElemArr.length]);

  const addElem = async () => {
    setIsLoaderAddBtn(true);
    setValues({ ...values, char: '' });

    stack.push({
      value: values.char,
      state: ElementStates.Default
    });

    const tempArr = stack.getElements();

    tempArr[tempArr.length - 1].state = ElementStates.Changing;
    setStackElemArr([...tempArr]);

    await delay(SHORT_DELAY_IN_MS, null, signal);

    tempArr[tempArr.length - 1].state = ElementStates.Default;
    setStackElemArr([...tempArr]);

    setIsLoaderAddBtn(false);
    setIsDisabledAddBtn(true);
  }

  const removeElem = async () => {
    setIsLoaderRemoveBtn(true);

    const tempArr = stack.getElements();

    tempArr[tempArr.length - 1].state = ElementStates.Changing;
    setStackElemArr([...tempArr]);

    await delay(SHORT_DELAY_IN_MS, null, signal);

    stack.pop();
    setStackElemArr([...stack.getElements()]);

    setIsLoaderRemoveBtn(false);
  }

  const clearStack = async () => {
    setIsLoaderClearBtn(true);

    stack.clear();
    setStackElemArr([...stack.getElements()]);

    await delay(SHORT_DELAY_IN_MS, null, signal);

    setIsLoaderClearBtn(false);
  }

  return (
    <SolutionLayout title='Стек'>
      <div className={styles.wrap}>
        <form className={styles.form} onSubmit={(evt) => evt.preventDefault()}>
          <fieldset className={styles.fieldset}>
            <Input
              name='char'
              placeholder='Введите значение'
              type='text'
              value={values.char}
              maxLength={maxLen}
              isLimitText={true}
              onChange={handleChange}
              disabled={IsLoaderAddBtn}
              extraClass={styles.input}
              data-cy='inputValue'
            />

            <Button
              name='add'
              type='button'
              text='Добавить'
              onClick={addElem}
              isLoader={IsLoaderAddBtn}
              disabled={isDisabledAddBtn || IsLoaderRemoveBtn || IsLoaderClearBtn}
              data-cy='btnAdd'
            />

            <Button
              name='remove'
              type='button'
              text='Удалить'
              onClick={removeElem}
              isLoader={IsLoaderRemoveBtn}
              disabled={IsLoaderAddBtn || isDisabledBtnRemove || IsLoaderClearBtn}
              data-cy='btnRemove'
            />
          </fieldset>

          <Button
            name='clear'
            type='button'
            text='Очистить'
            onClick={clearStack}
            isLoader={IsLoaderClearBtn}
            disabled={IsLoaderAddBtn || isDisabledClearBtn || IsLoaderRemoveBtn}
            data-cy='btnClear'
          />
        </form>

        <ul className={styles.list}>
          {
            stackElemArr.map((elem, index) => {
              const length = stackElemArr.length - 1;
              const head = index === length ? 'top' : null;

              return (
                <li key={index}>
                  <Circle
                    letter={elem.value}
                    state={elem.state}
                    index={index}
                    head={head}
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
