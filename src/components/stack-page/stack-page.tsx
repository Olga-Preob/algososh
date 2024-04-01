import { useState, useEffect, ChangeEvent } from 'react';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { ElementStates } from '../../types/element-states';
import { Element } from '../../types/index';
import { Stack } from './Stack';
import styles from './stack-page.module.css';


export const StackPage = () => {
  const maxLen = 4;

  const [stack] = useState(new Stack<Element>());
  const [stackElemArr, setStackElemArr] = useState<Element[]>([]);

  const [inputValue, setInputValue] = useState('');

  const [IsLoaderAddBtn, setIsLoaderAddBtn] = useState(false);
  const [isDisabledAddBtn, setIsDisabledAddBtn] = useState(true);

  const [IsLoaderRemoveBtn, setIsLoaderRemoveBtn] = useState(false);
  const [isDisabledBtnRemove, setIsDisabledRemoveBtn] = useState(true);

  const [IsLoaderClearBtn, setIsLoaderClearBtn] = useState(false);
  const [isDisabledClearBtn, setIsDisabledClearBtn] = useState(true);

  useEffect(() => {
    if (stackElemArr.length > 0) {
      setIsDisabledRemoveBtn(false);
      setIsDisabledClearBtn(false);
    } else {
      setIsDisabledRemoveBtn(true);
      setIsDisabledClearBtn(true);
    }
  }, [stackElemArr.length]);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const curValueLen = evt.target.value.length;

    setInputValue(evt.target.value);

    if ((curValueLen > 0) && (curValueLen <= maxLen)) {
      setIsDisabledAddBtn(false);
    } else {
      setIsDisabledAddBtn(true);
    }
  }

  const addElem = () => {
    setIsLoaderAddBtn(true);
    setInputValue('');

    stack.push({
      value: inputValue,
      state: ElementStates.Default
    });

    const tempArr = stack.getElements();

    tempArr[tempArr.length - 1].state = ElementStates.Changing;
    setStackElemArr([...tempArr]);

    setTimeout(() => {
      tempArr[tempArr.length - 1].state = ElementStates.Default;
      setStackElemArr([...tempArr]);

      setIsLoaderAddBtn(false);
      setIsDisabledAddBtn(true);
    }, SHORT_DELAY_IN_MS);
  }

  const removeElem = () => {
    setIsLoaderRemoveBtn(true);

    const tempArr = stack.getElements();

    tempArr[tempArr.length - 1].state = ElementStates.Changing;
    setStackElemArr([...tempArr]);

    setTimeout(() => {
      stack.pop();

      setStackElemArr([...stack.getElements()]);

      setIsLoaderRemoveBtn(false);
    }, SHORT_DELAY_IN_MS);
  }

  const clearStack = () => {
    setIsLoaderClearBtn(true);

    stack.clear();

    setStackElemArr([...stack.getElements()]);

    setTimeout(() => {
      setIsLoaderClearBtn(false);
    }, SHORT_DELAY_IN_MS);
  }

  return (
    <SolutionLayout title='Стек'>
      <div className={styles.wrap}>
        <form className={styles.form} onSubmit={(evt) => evt.preventDefault()}>
          <fieldset className={styles.fieldset}>
            <Input
              value={inputValue}
              placeholder='Введите значение'
              type='text'
              maxLength={maxLen}
              isLimitText={true}
              onChange={onChange}
              disabled={IsLoaderAddBtn}
              extraClass={styles.input}
            />

            <Button
              name='add'
              type='button'
              text='Добавить'
              onClick={addElem}
              isLoader={IsLoaderAddBtn}
              disabled={isDisabledAddBtn || IsLoaderRemoveBtn || IsLoaderClearBtn}
            />

            <Button
              name='remove'
              type='button'
              text='Удалить'
              onClick={removeElem}
              isLoader={IsLoaderRemoveBtn}
              disabled={IsLoaderAddBtn || isDisabledBtnRemove || IsLoaderClearBtn}
            />
          </fieldset>

          <Button
            name='clear'
            type='button'
            text='Очистить'
            onClick={clearStack}
            isLoader={IsLoaderClearBtn}
            disabled={IsLoaderAddBtn || isDisabledClearBtn || IsLoaderRemoveBtn}
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
