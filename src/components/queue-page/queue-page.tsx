import { useState, useEffect, ChangeEvent } from 'react';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { ElementStates } from '../../types/element-states';
import { Element } from '../../types/index';
import { Queue } from './Queue';
import styles from './queue-page.module.css';


export const QueuePage = () => {
  const maxLen = 4;
  const queueSize = 7;
  const initArr: Element[] = new Array(queueSize).fill({
    value: '',
    state: ElementStates.Default
  });

  const [queue] = useState(new Queue<Element>(queueSize));
  const [queueElemArr, setQueueElemArr] = useState<Element[]>(initArr);

  const [inputValue, setInputValue] = useState('');

  const [IsLoaderAddBtn, setIsLoaderAddBtn] = useState(false);
  const [isDisabledAddBtn, setIsDisabledAddBtn] = useState(true);

  const [IsLoaderRemoveBtn, setIsLoaderRemoveBtn] = useState(false);
  const [isDisabledBtnRemove, setIsDisabledRemoveBtn] = useState(true);

  const [IsLoaderClearBtn, setIsLoaderClearBtn] = useState(false);
  const [isDisabledClearBtn, setIsDisabledClearBtn] = useState(true);

  useEffect(() => {
    const isEmpty = queue.isEmpty();
    const head = queue.getHead();

    if (!isEmpty) {
      setIsDisabledRemoveBtn(false);
      setIsDisabledClearBtn(false);
    } else {
      setIsDisabledRemoveBtn(true);
      head > 0 ?
        setIsDisabledClearBtn(false) :
        setIsDisabledClearBtn(true);
    }
  }, [queue, queueElemArr]);

  const fillTempArr = () => {
    return [...queue.getElements()].map((elem) => {
      return elem ?
        elem
        :
        {
          value: '',
          state: ElementStates.Default
        }
    });
  }

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
    if (queue.getTail() >= queueSize) return;

    setIsLoaderAddBtn(true);
    setInputValue('');

    let tempArr = fillTempArr();

    tempArr[queue.getTail()].state = ElementStates.Changing;
    setQueueElemArr([...tempArr]);

    setTimeout(() => {
      queue.enqueue({
        value: inputValue,
        state: ElementStates.Default
      });

      tempArr = fillTempArr();

      tempArr[queue.getTail() - 1].state = ElementStates.Default;
      setQueueElemArr([...tempArr]);

      setIsLoaderAddBtn(false);
      setIsDisabledAddBtn(true);
    }, SHORT_DELAY_IN_MS);
  }

  const removeElem = () => {
    if (
      (queue.getHead() >= queueSize) ||
      (queue.isEmpty())
    ) return;

    setIsLoaderRemoveBtn(true);

    let tempArr = fillTempArr();

    tempArr[queue.getHead()].state = ElementStates.Changing;
    setQueueElemArr([...tempArr]);

    setTimeout(() => {
      queue.dequeue();

      tempArr = fillTempArr();

      tempArr[queue.getTail() - 1].state = ElementStates.Default;
      setQueueElemArr([...tempArr]);

      setIsLoaderRemoveBtn(false);
    }, SHORT_DELAY_IN_MS);
  }

  const clearQueue = () => {
    setIsLoaderClearBtn(true);

    queue.clear();

    setQueueElemArr([...fillTempArr()]);

    setTimeout(() => {
      setIsLoaderClearBtn(false);
    }, SHORT_DELAY_IN_MS);
  }

  return (
    <SolutionLayout title='Очередь'>
      <div className={styles.wrap}>
        <form className={styles.form} onSubmit={(evt) => evt.preventDefault()}>
          <fieldset className={styles.fieldset}>
            <Input
              placeholder='Введите значение'
              type='text'
              value={inputValue}
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
            onClick={clearQueue}
            isLoader={IsLoaderClearBtn}
            disabled={IsLoaderAddBtn || isDisabledClearBtn || IsLoaderRemoveBtn}
          />
        </form>

        <ul className={styles.list}>
          {
            queueElemArr.map((elem, index) => {
              let head = null;
              let tail = null;

              if (
                ((index === queue.getHead()) && (queue.getTail() !== 0)) ||
                ((index === queueSize - 1) && (index === (queue.getTail() - 1)) && (queue.isEmpty()))
              ) head = 'head';

              if (
                (!queue.isEmpty()) && (index === (queue.getTail() - 1))
              ) tail = 'tail';

              return (
                <li key={index}>
                  <Circle
                    letter={elem.value}
                    state={elem.state}
                    index={index}
                    head={head}
                    tail={tail}
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
