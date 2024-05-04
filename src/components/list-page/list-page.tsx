import { useState, useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { ElementStates } from '../../types/element-states';
import { LinkedListTempElement } from '../../types/index';
import { delay, getArrWithElementStates, getRandomLinkedList } from './utils';
import styles from './list-page.module.css';


export const ListPage = () => {
  const controller = new AbortController();
  const signal = controller.signal;

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

  const { values, setValues, handleChange } = useForm({
    char: '',
    index: ''
  });

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
      (values.char.length > 0) &&
      (values.char.length <= maxLenInput)
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
      (values.char.length <= maxLenInput) &&
      (values.char.length > 0) &&
      (values.index.length > 0) &&
      (Number(values.index) < linkedListSize) &&
      (Number(values.index) >= 0)
    ) {
      setIsDisabledAddByIndexBtn(false);
    } else {
      setIsDisabledAddByIndexBtn(true);
    }

    if (
      (values.index.length > 0) &&
      (Number(values.index) < linkedListSize) &&
      (Number(values.index) >= 0)
    ) {
      setIsDisabledDeleteByIndexBtn(false);
    } else {
      setIsDisabledDeleteByIndexBtn(true);
    }
  }, [linkedList, values, linkedListArr.length]);

  const addToHead = async () => {
    setIsLoaderAddToHeadBtn(true);

    let tempArr = getArrWithElementStates(linkedList.toArray());

    if (tempArr[0]) {
      tempArr[0].headOrTailValue = values.char;
      tempArr[0].hasHead = true;
    }

    setLinkedListArr([...tempArr]);
    linkedList.prepend(values.char);

    await delay(SHORT_DELAY_IN_MS, null, signal);
    tempArr = getArrWithElementStates(linkedList.toArray());
    tempArr[0].state = ElementStates.Modified;

    setLinkedListArr([...tempArr]);

    await delay(SHORT_DELAY_IN_MS, null, signal);
    tempArr[0].state = ElementStates.Default;
    setLinkedListArr([...tempArr]);

    setValues({ ...values, char: '' });
    setIsLoaderAddToHeadBtn(false);
  }

  const addToTail = async () => {
    setIsLoaderAddToTailBtn(true);

    let lastElement = linkedList.getSize() - 1;
    let tempArr = getArrWithElementStates(linkedList.toArray());

    if (tempArr[lastElement]) {
      tempArr[lastElement].headOrTailValue = values.char;
      tempArr[lastElement].hasHead = true;
    }

    setLinkedListArr([...tempArr]);

    await delay(SHORT_DELAY_IN_MS, null, signal);
    linkedList.append(values.char);

    tempArr = getArrWithElementStates(linkedList.toArray());
    lastElement = linkedList.getSize() - 1;

    tempArr[lastElement].state = ElementStates.Modified;
    setLinkedListArr([...tempArr]);

    await delay(SHORT_DELAY_IN_MS, null, signal);
    tempArr[lastElement].state = ElementStates.Default;
    setLinkedListArr([...tempArr]);

    setValues({ ...values, char: '' });
    setIsLoaderAddToTailBtn(false);
  }

  const deleteFromHead = async () => {
    setIsLoaderDeleteFromHeadBtn(true);

    let tempArr = getArrWithElementStates(linkedList.toArray());

    tempArr[0].headOrTailValue = tempArr[0].value;
    tempArr[0].hasTail = true;
    tempArr[0].value = '';

    setLinkedListArr([...tempArr]);

    await delay(SHORT_DELAY_IN_MS, null, signal);
    linkedList.deleteHead();

    tempArr = getArrWithElementStates(linkedList.toArray());
    setLinkedListArr([...tempArr]);

    setIsLoaderDeleteFromHeadBtn(false);
  }

  const deleteFromTail = async () => {
    setIsLoaderDeleteFromTailBtn(true);

    let lastElement = linkedList.getSize() - 1;
    let tempArr = getArrWithElementStates(linkedList.toArray());

    tempArr[lastElement].headOrTailValue = tempArr[lastElement].value;
    tempArr[lastElement].hasTail = true;
    tempArr[lastElement].value = '';

    setLinkedListArr([...tempArr]);

    await delay(SHORT_DELAY_IN_MS, null, signal);
    linkedList.deleteTail();

    tempArr = getArrWithElementStates(linkedList.toArray());
    setLinkedListArr([...tempArr]);

    setIsLoaderDeleteFromTailBtn(false);
  }

  const addByIndex = async () => {
    setIsLoaderAddByIndexBtn(true);

    let tempArr = getArrWithElementStates(linkedList.toArray());

    const position = Number(values.index);

    for (let index = 0; index < tempArr.length; index++) {
      if (index > position) return;

      await delay(SHORT_DELAY_IN_MS, null, signal);

      tempArr[index].headOrTailValue = values.char;
      tempArr[index].hasHead = true;

      setLinkedListArr([...tempArr]);

      tempArr[index].hasHead = false;
      tempArr[index].state = ElementStates.Changing;

      if (index === position) {
        linkedList.addByIndex(values.char, Number(values.index));

        await delay(SHORT_DELAY_IN_MS, null, signal);
        tempArr = getArrWithElementStates(linkedList.toArray());
        tempArr[position].state = ElementStates.Modified;
        setLinkedListArr([...tempArr]);

        await delay(SHORT_DELAY_IN_MS, null, signal);
        tempArr = getArrWithElementStates(linkedList.toArray());
        tempArr[index].state = ElementStates.Default;
        setLinkedListArr([...tempArr]);

        setValues({ ...values, char: '', index: '' });
        setIsLoaderAddByIndexBtn(false);
      }
    }
  }

  const deleteByIndex = async () => {
    setIsLoaderDeleteByIndexBtn(true);

    let tempArr = getArrWithElementStates(linkedList.toArray());

    const position = Number(values.index);

    for (let index = 0; index < tempArr.length; index++) {
      if (index > position) return;

      await delay(SHORT_DELAY_IN_MS, null, signal);

      tempArr[index].state = ElementStates.Changing;
      setLinkedListArr([...tempArr]);

      if (index === position) {
        await delay(SHORT_DELAY_IN_MS, null, signal);
        tempArr[index].state = ElementStates.Default;
        tempArr[index].headOrTailValue = tempArr[position].value;
        tempArr[index].hasTail = true;
        tempArr[index].value = '';
        setLinkedListArr([...tempArr]);

        await delay(SHORT_DELAY_IN_MS, null, signal);
        linkedList.deleteByIndex(position);

        tempArr = getArrWithElementStates(linkedList.toArray());
        setLinkedListArr([...tempArr]);

        setValues({ ...values, index: '' });
        setIsLoaderDeleteByIndexBtn(false);
      }
    }
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
              name='char'
              placeholder='Введите значение'
              type='text'
              value={values.char}
              maxLength={maxLenInput}
              isLimitText={true}
              onChange={handleChange}
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
              name='index'
              placeholder='Введите индекс'
              type='number'
              value={values.index}
              onChange={handleChange}
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
