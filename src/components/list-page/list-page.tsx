import { useState, useEffect, ChangeEvent } from 'react';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { ElementStates } from '../../types/element-states';
import { LinkedListTempElement } from '../../types/index';
import { getArrWithElementStates, getRandomLinkedList } from './utils';
import styles from './list-page.module.css';


export const ListPage = () => {
  const minLenLinkedList = 5;
  const maxLenLinkedList = 5;

  const minValueInLinkedList = 0;
  const maxValueInLinkedList = 101;

  const maxLenInput = 4;

  const [linkedList] = useState(
    getRandomLinkedList(minLenLinkedList, maxLenLinkedList, minValueInLinkedList, maxValueInLinkedList)
  );
  const [linkedListArr, setLinkedListArr] = useState(
    getArrWithElementStates(linkedList.toArray())
  );

  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState('');

  const [isLoaderAddToHeadBtn, setIsLoaderAddToHeadBtn] = useState(false);
  const [isDisabledAddToHeadBtn, setIsDisabledAddToHeadBtn] = useState(false);

  const [isLoaderAddToTailBtn, setIsLoaderAddToTailBtn] = useState(false);
  const [isDisabledAddToTailBtn, setIsDisabledAddToTailBtn] = useState(false);

  const [isLoaderDeleteFromHeadBtn, setIsLoaderDeleteFromHeadBtn] = useState(false);
  const [isDisabledDeleteFromHeadBtn, setIsDisabledDeleteFromHeadBtn] = useState(false);

  const [isLoaderDeleteFromTailBtn, setIsLoaderDeleteFromTailBtn] = useState(false);
  const [isDisabledDeleteFromTailBtn, setIsDisabledDeleteFromTailBtn] = useState(false);

  const [isLoaderAddByIndexBtn, setIsLoaderAddByIndexBtn] = useState(false);
  const [isDisabledAddByIndexBtn, setIsDisabledAddByIndexBtn] = useState(false);

  const [isLoaderDeleteByIndexBtn, setIsLoaderDeleteByIndexBtn] = useState(false);
  const [isDisabledDeleteByIndexBtn, setIsDisabledDeleteByIndexBtn] = useState(false);

  useEffect(() => {
    const linkedListSize = linkedList.getSize();

    if (
      (inputValue.length > 0) &&
      (inputValue.length <= maxLenInput)
    ) {
      setIsDisabledAddToHeadBtn(false);
      setIsDisabledAddToTailBtn(false);
    } else {
      setIsDisabledAddToHeadBtn(true);
      setIsDisabledAddToTailBtn(true);
    }

    if (
      (linkedListArr.length > 0) &&
      (linkedListSize > 0)
    ) {
      setIsDisabledDeleteFromHeadBtn(false);
      setIsDisabledDeleteFromTailBtn(false);
    } else {
      setIsDisabledDeleteFromHeadBtn(true);
      setIsDisabledDeleteFromTailBtn(true);
    }

    if (
      (inputValue.length <= maxLenInput) &&
      (inputValue.length > 0) &&
      (inputIndex.length > 0) &&
      (Number(inputIndex) < linkedListSize) &&
      (Number(inputIndex) >= 0)
    ) {
      setIsDisabledAddByIndexBtn(false);
    } else {
      setIsDisabledAddByIndexBtn(true);
    }

    if (
      (inputIndex.length > 0) &&
      (Number(inputIndex) < linkedListSize) &&
      (Number(inputIndex) >= 0)
    ) {
      setIsDisabledDeleteByIndexBtn(false);
    } else {
      setIsDisabledDeleteByIndexBtn(true);
    }
  }, [linkedList, inputValue, inputIndex, linkedListArr.length]);

  const changeInputValue = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  }

  const changeInputIndex = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputIndex(evt.target.value);
  }

  const addToHead = () => {
    setIsLoaderAddToHeadBtn(true);

    let tempArr = getArrWithElementStates(linkedList.toArray());

    if (tempArr[0]) {
      tempArr[0].headOrTailValue = inputValue;
      tempArr[0].hasHead = true;
    }

    setLinkedListArr([...tempArr]);
    linkedList.prepend(inputValue);

    setTimeout(() => {
      tempArr = getArrWithElementStates(linkedList.toArray());
      tempArr[0].state = ElementStates.Modified;

      setLinkedListArr([...tempArr]);

      setTimeout(() => {
        tempArr[0].state = ElementStates.Default;
        setLinkedListArr([...tempArr]);

        setInputValue('');
        setIsLoaderAddToHeadBtn(false);
      }, SHORT_DELAY_IN_MS);
    }, SHORT_DELAY_IN_MS);
  }

  const addToTail = () => {
    setIsLoaderAddToTailBtn(true);

    let lastElement = linkedList.getSize() - 1;
    let tempArr = getArrWithElementStates(linkedList.toArray());

    if (tempArr[lastElement]) {
      tempArr[lastElement].headOrTailValue = inputValue;
      tempArr[lastElement].hasHead = true;
    }

    setLinkedListArr([...tempArr]);

    setTimeout(() => {
      linkedList.append(inputValue);

      tempArr = getArrWithElementStates(linkedList.toArray());
      lastElement = linkedList.getSize() - 1;

      tempArr[lastElement].state = ElementStates.Modified;
      setLinkedListArr([...tempArr]);

      setTimeout(() => {
        tempArr[lastElement].state = ElementStates.Default;
        setLinkedListArr([...tempArr]);

        setInputValue('');
        setIsLoaderAddToTailBtn(false);
      }, SHORT_DELAY_IN_MS);
    }, SHORT_DELAY_IN_MS);
  }

  const deleteFromHead = () => {
    setIsLoaderDeleteFromHeadBtn(true);

    let tempArr = getArrWithElementStates(linkedList.toArray());

    tempArr[0].headOrTailValue = tempArr[0].value;
    tempArr[0].hasTail = true;
    tempArr[0].value = '';

    setLinkedListArr([...tempArr]);

    setTimeout(() => {
      linkedList.deleteHead();

      tempArr = getArrWithElementStates(linkedList.toArray());
      setLinkedListArr([...tempArr]);

      setIsLoaderDeleteFromHeadBtn(false);
    }, SHORT_DELAY_IN_MS);
  }

  const deleteFromTail = () => {
    setIsLoaderDeleteFromTailBtn(true);

    let lastElement = linkedList.getSize() - 1;
    let tempArr = getArrWithElementStates(linkedList.toArray());

    tempArr[lastElement].headOrTailValue = tempArr[lastElement].value;
    tempArr[lastElement].hasTail = true;
    tempArr[lastElement].value = '';

    setLinkedListArr([...tempArr]);

    setTimeout(() => {
      linkedList.deleteTail();

      tempArr = getArrWithElementStates(linkedList.toArray());
      setLinkedListArr([...tempArr]);

      setIsLoaderDeleteFromTailBtn(false);
    }, SHORT_DELAY_IN_MS);
  }

  const addByIndex = () => {
    setIsLoaderAddByIndexBtn(true);

    let tempArr = getArrWithElementStates(linkedList.toArray());

    const position = Number(inputIndex);

    tempArr.forEach((elem, index) => {
      setTimeout(() => {
        if (index === position) {
          linkedList.addByIndex(inputValue, Number(inputIndex));

          setTimeout(() => {
            tempArr = getArrWithElementStates(linkedList.toArray());

            tempArr[position].state = ElementStates.Modified;

            setLinkedListArr([...tempArr]);

            setTimeout(() => {
              tempArr = getArrWithElementStates(linkedList.toArray());
              elem.state = ElementStates.Default;

              setLinkedListArr([...tempArr]);

              setInputValue('');
              setInputIndex('');
              setIsLoaderAddByIndexBtn(false);
            }, SHORT_DELAY_IN_MS);
          }, SHORT_DELAY_IN_MS);
        }

        if (index > position) return;

        elem.headOrTailValue = inputValue;
        elem.hasHead = true;

        setLinkedListArr([...tempArr]);

        elem.hasHead = false;
        elem.state = ElementStates.Changing;
      }, SHORT_DELAY_IN_MS * index);
    });
  }

  const deleteByIndex = () => {
    setIsLoaderDeleteByIndexBtn(true);

    let tempArr = getArrWithElementStates(linkedList.toArray());

    const position = Number(inputIndex);

    tempArr.forEach((elem, index) => {
      setTimeout(() => {
        if (index === position) {
          setTimeout(() => {
            elem.state = ElementStates.Default;
            elem.headOrTailValue = tempArr[position].value;
            elem.hasTail = true;
            elem.value = '';

            setLinkedListArr([...tempArr]);

            setTimeout(() => {
              linkedList.deleteByIndex(position);

              tempArr = getArrWithElementStates(linkedList.toArray());
              setLinkedListArr([...tempArr]);

              setInputIndex('');
              setIsLoaderDeleteByIndexBtn(false);
            }, SHORT_DELAY_IN_MS);
          }, SHORT_DELAY_IN_MS);
        }

        if (index > position) return;

        elem.state = ElementStates.Changing;
        setLinkedListArr([...tempArr]);
      }, SHORT_DELAY_IN_MS * index);
    });
  }

  const getHeadValue = (elem: LinkedListTempElement, index: number) => {
    if (elem.hasHead) {
      return (
        <Circle
          letter={elem.headOrTailValue}
          state={ElementStates.Changing}
          isSmall={true}
        />
      );
    }

    return (index === 0) ? 'head' : null;
  }

  const getTailValue = (elem: LinkedListTempElement, index: number) => {
    if (elem.hasTail) {
      return (
        <Circle
          letter={elem.headOrTailValue}
          state={ElementStates.Changing}
          isSmall={true}
        />
      );
    }

    return (index === (linkedList.getSize() - 1)) ? 'tail' : null;
  }

  return (
    <SolutionLayout title='Связный список'>
      <div className={styles.wrap}>
        <form className={styles.form} onSubmit={(evt) => evt.preventDefault()}>
          <fieldset className={styles.fieldset}>
            <Input
              placeholder='Введите значение'
              type='text'
              value={inputValue}
              maxLength={maxLenInput}
              isLimitText={true}
              onChange={changeInputValue}
              disabled={
                isLoaderAddToHeadBtn ||
                isLoaderAddToTailBtn ||
                isLoaderDeleteFromHeadBtn ||
                isLoaderDeleteFromTailBtn ||
                isLoaderAddByIndexBtn ||
                isLoaderDeleteByIndexBtn
              }
              extraClass={styles.input}
            />

            <Button
              name='addToHead'
              type='button'
              text='Добавить в head'
              onClick={addToHead}
              isLoader={isLoaderAddToHeadBtn}
              disabled={
                isDisabledAddToHeadBtn ||
                isLoaderAddToTailBtn ||
                isLoaderDeleteFromHeadBtn ||
                isLoaderDeleteFromTailBtn ||
                isLoaderAddByIndexBtn ||
                isLoaderDeleteByIndexBtn
              }
              extraClass={styles.smallBtn}
            />

            <Button
              name='addToTail'
              type='button'
              text='Добавить в tail'
              onClick={addToTail}
              isLoader={isLoaderAddToTailBtn}
              disabled={
                isDisabledAddToTailBtn ||
                isLoaderAddToHeadBtn ||
                isLoaderDeleteFromHeadBtn ||
                isLoaderDeleteFromTailBtn ||
                isLoaderAddByIndexBtn ||
                isLoaderDeleteByIndexBtn
              }
              extraClass={styles.smallBtn}
            />

            <Button
              name='deleteFromHead'
              type='button'
              text='Удалить из head'
              onClick={deleteFromHead}
              isLoader={isLoaderDeleteFromHeadBtn}
              disabled={
                isDisabledDeleteFromHeadBtn ||
                isLoaderAddToHeadBtn ||
                isLoaderAddToTailBtn ||
                isLoaderDeleteFromTailBtn ||
                isLoaderAddByIndexBtn ||
                isLoaderDeleteByIndexBtn
              }
              extraClass={styles.smallBtn}
            />

            <Button
              name='deleteFromTail'
              type='button'
              text='Удалить из tail'
              onClick={deleteFromTail}
              isLoader={isLoaderDeleteFromTailBtn}
              disabled={
                isDisabledDeleteFromTailBtn ||
                isLoaderAddToHeadBtn ||
                isLoaderAddToTailBtn ||
                isLoaderDeleteFromHeadBtn ||
                isLoaderAddByIndexBtn ||
                isLoaderDeleteByIndexBtn
              }
              extraClass={styles.smallBtn}
            />
          </fieldset>

          <fieldset className={styles.fieldset}>
            <Input
              placeholder='Введите индекс'
              type='number'
              value={inputIndex}
              onChange={changeInputIndex}
              disabled={
                isLoaderAddToHeadBtn ||
                isLoaderAddToTailBtn ||
                isLoaderDeleteFromHeadBtn ||
                isLoaderDeleteFromTailBtn ||
                isLoaderAddByIndexBtn ||
                isLoaderDeleteByIndexBtn
              }
              extraClass={styles.input}
            />

            <Button
              name='addByIndex'
              type='button'
              text='Добавить по индексу'
              onClick={addByIndex}
              isLoader={isLoaderAddByIndexBtn}
              disabled={
                isDisabledAddByIndexBtn ||
                isLoaderAddToHeadBtn ||
                isLoaderAddToTailBtn ||
                isLoaderDeleteFromHeadBtn ||
                isLoaderDeleteFromTailBtn ||
                isLoaderDeleteByIndexBtn
              }
              extraClass={styles.largeBtn}
            />

            <Button
              name='deleteByIndex'
              type='button'
              text='Удалить по индексу'
              onClick={deleteByIndex}
              isLoader={isLoaderDeleteByIndexBtn}
              disabled={
                isDisabledDeleteByIndexBtn ||
                isLoaderAddToHeadBtn ||
                isLoaderAddToTailBtn ||
                isLoaderDeleteFromHeadBtn ||
                isLoaderDeleteFromTailBtn ||
                isLoaderAddByIndexBtn
              }
              extraClass={styles.largeBtn}
            />
          </fieldset>
        </form>

        <ul className={styles.list}>
          {
            linkedListArr.map((elem, index) => {
              return (
                <li key={index} className={styles.element}>
                  <Circle
                    letter={elem.value}
                    state={elem.state}
                    index={index}
                    head={getHeadValue(elem, index)}
                    tail={getTailValue(elem, index)}
                  />

                  {(index !== linkedListArr.length - 1) && (
                    <ArrowIcon />
                  )}
                </li>
              );
            })
          }
        </ul>
      </div>
    </SolutionLayout>
  );
};
