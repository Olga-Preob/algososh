import { HashRouter as Router } from 'react-router-dom';
import {
  render,
  getByTestId,
  fireEvent,
  waitFor
} from '@testing-library/react';
import { SortingPage } from './sorting-page';


describe('Тестирование алгоритмов сортировки выбором и пузырьком', function() {
  const testInputValue = [[[]], [[34]], [[7, 66, 0, 4]]];

  const expectedResultsAsc = [[], [34], [0, 4, 7, 66]];
  const expectedResultsDesc = [[], [34], [66, 7, 4, 0]];

  const waitTime = 5000;

  it('корректно сортирует пустой массив по возрастанию методом сортировки выбором', async () => {
    const { container } = render(
      <Router>
        <SortingPage initArr={testInputValue[0]} />
      </Router>
    );

    const radioSelection = getByTestId(container, 'radioSelection');
    const btnAsc = getByTestId(container, 'btnAsc');
    const solutionResult = getByTestId(container, 'solutionResult');

    fireEvent.click(radioSelection);

    btnAsc.focus();
    fireEvent.click(btnAsc);

    await waitFor(() => expect(radioSelection).not.toBeDisabled(), {
      timeout: waitTime
    });

    const testResult = Array.from(solutionResult.childNodes).map((element) => Number(element.textContent));

    expect(testResult).toEqual(expectedResultsAsc[0]);
  }, waitTime);

  it('корректно сортирует пустой массив по убыванию методом сортировки выбором', async () => {
    const { container } = render(
      <Router>
        <SortingPage initArr={testInputValue[0]} />
      </Router>
    );

    const radioSelection = getByTestId(container, 'radioSelection');
    const btnDesc = getByTestId(container, 'btnDesc');
    const solutionResult = getByTestId(container, 'solutionResult');

    fireEvent.click(radioSelection);

    btnDesc.focus();
    fireEvent.click(btnDesc);

    await waitFor(() => expect(radioSelection).not.toBeDisabled(), {
      timeout: waitTime
    });

    const testResult = Array.from(solutionResult.childNodes).map((element) => Number(element.textContent));

    expect(testResult).toEqual(expectedResultsDesc[0]);
  }, waitTime);

  it('корректно сортирует пустой массив по возрастанию методом пузырька', async () => {
    const { container } = render(
      <Router>
        <SortingPage initArr={testInputValue[0]} />
      </Router>
    );

    const radioBubble = getByTestId(container, 'radioBubble');
    const btnAsc = getByTestId(container, 'btnAsc');
    const solutionResult = getByTestId(container, 'solutionResult');

    fireEvent.click(radioBubble);

    btnAsc.focus();
    fireEvent.click(btnAsc);

    await waitFor(() => expect(radioBubble).not.toBeDisabled(), {
      timeout: waitTime
    });

    const testResult = Array.from(solutionResult.childNodes).map((element) => Number(element.textContent));

    expect(testResult).toEqual(expectedResultsAsc[0]);
  }, waitTime);

  it('корректно сортирует пустой массив по убыванию методом пузырька', async () => {
    const { container } = render(
      <Router>
        <SortingPage initArr={testInputValue[0]} />
      </Router>
    );

    const radioBubble = getByTestId(container, 'radioBubble');
    const btnDesc = getByTestId(container, 'btnDesc');
    const solutionResult = getByTestId(container, 'solutionResult');

    fireEvent.click(radioBubble);

    btnDesc.focus();
    fireEvent.click(btnDesc);

    await waitFor(() => expect(radioBubble).not.toBeDisabled(), {
      timeout: waitTime
    });

    const testResult = Array.from(solutionResult.childNodes).map((element) => Number(element.textContent));

    expect(testResult).toEqual(expectedResultsDesc[0]);
  }, waitTime);

  it('корректно сортирует массив из одного элемента по возрастанию методом сортировки выбором', async () => {
    const { container } = render(
      <Router>
        <SortingPage initArr={testInputValue[1]} />
      </Router>
    );

    const radioSelection = getByTestId(container, 'radioSelection');
    const btnAsc = getByTestId(container, 'btnAsc');
    const solutionResult = getByTestId(container, 'solutionResult');

    fireEvent.click(radioSelection);

    btnAsc.focus();
    fireEvent.click(btnAsc);

    await waitFor(() => expect(radioSelection).not.toBeDisabled(), {
      timeout: waitTime
    });

    const testResult = Array.from(solutionResult.childNodes).map((element) => Number(element.textContent));

    expect(testResult).toEqual(expectedResultsAsc[1]);
  }, waitTime);

  it('корректно сортирует массив из одного элемента по убыванию методом сортировки выбором', async () => {
    const { container } = render(
      <Router>
        <SortingPage initArr={testInputValue[1]} />
      </Router>
    );

    const radioSelection = getByTestId(container, 'radioSelection');
    const btnDesc = getByTestId(container, 'btnDesc');
    const solutionResult = getByTestId(container, 'solutionResult');

    fireEvent.click(radioSelection);

    btnDesc.focus();
    fireEvent.click(btnDesc);

    await waitFor(() => expect(radioSelection).not.toBeDisabled(), {
      timeout: waitTime
    });

    const testResult = Array.from(solutionResult.childNodes).map((element) => Number(element.textContent));

    expect(testResult).toEqual(expectedResultsDesc[1]);
  }, waitTime);

  it('корректно сортирует массив из одного элемента по возрастанию методом пузырька', async () => {
    const { container } = render(
      <Router>
        <SortingPage initArr={testInputValue[1]} />
      </Router>
    );

    const radioBubble = getByTestId(container, 'radioBubble');
    const btnAsc = getByTestId(container, 'btnAsc');
    const solutionResult = getByTestId(container, 'solutionResult');

    fireEvent.click(radioBubble);

    btnAsc.focus();
    fireEvent.click(btnAsc);

    await waitFor(() => expect(radioBubble).not.toBeDisabled(), {
      timeout: waitTime
    });

    const testResult = Array.from(solutionResult.childNodes).map((element) => Number(element.textContent));

    expect(testResult).toEqual(expectedResultsAsc[1]);
  }, waitTime);

  it('корректно сортирует массив из одного элемента по убыванию методом пузырька', async () => {
    const { container } = render(
      <Router>
        <SortingPage initArr={testInputValue[1]} />
      </Router>
    );

    const radioBubble = getByTestId(container, 'radioBubble');
    const btnDesc = getByTestId(container, 'btnDesc');
    const solutionResult = getByTestId(container, 'solutionResult');

    fireEvent.click(radioBubble);

    btnDesc.focus();
    fireEvent.click(btnDesc);

    await waitFor(() => expect(radioBubble).not.toBeDisabled(), {
      timeout: waitTime
    });

    const testResult = Array.from(solutionResult.childNodes).map((element) => Number(element.textContent));

    expect(testResult).toEqual(expectedResultsDesc[1]);
  });

  it('корректно сортирует массив из нескольких элементов по возрастанию методом сортировки выбором', async () => {
    const { container } = render(
      <Router>
        <SortingPage initArr={testInputValue[2]} />
      </Router>
    );

    const radioSelection = getByTestId(container, 'radioSelection');
    const btnAsc = getByTestId(container, 'btnAsc');
    const solutionResult = getByTestId(container, 'solutionResult');

    fireEvent.click(radioSelection);

    btnAsc.focus();
    fireEvent.click(btnAsc);

    await waitFor(() => expect(radioSelection).not.toBeDisabled(), {
      timeout: waitTime
    });

    const testResult = Array.from(solutionResult.childNodes).map((element) => Number(element.textContent));

    expect(testResult).toEqual(expectedResultsAsc[2]);
  });

  it('корректно сортирует массив из нескольких элементов по убыванию методом сортировки выбором', async () => {
    const { container } = render(
      <Router>
        <SortingPage initArr={testInputValue[2]} />
      </Router>
    );

    const radioSelection = getByTestId(container, 'radioSelection');
    const btnDesc = getByTestId(container, 'btnDesc');
    const solutionResult = getByTestId(container, 'solutionResult');

    fireEvent.click(radioSelection);

    btnDesc.focus();
    fireEvent.click(btnDesc);

    await waitFor(() => expect(radioSelection).not.toBeDisabled(), {
      timeout: waitTime
    });

    const testResult = Array.from(solutionResult.childNodes).map((element) => Number(element.textContent));

    expect(testResult).toEqual(expectedResultsDesc[2]);
  });

  it('корректно сортирует массив из нескольких элементов по возрастанию методом пузырька', async () => {
    const { container } = render(
      <Router>
        <SortingPage initArr={testInputValue[2]} />
      </Router>
    );

    const radioBubble = getByTestId(container, 'radioBubble');
    const btnAsc = getByTestId(container, 'btnAsc');
    const solutionResult = getByTestId(container, 'solutionResult');

    fireEvent.click(radioBubble);

    btnAsc.focus();
    fireEvent.click(btnAsc);

    await waitFor(() => expect(radioBubble).not.toBeDisabled(), {
      timeout: waitTime
    });

    const testResult = Array.from(solutionResult.childNodes).map((element) => Number(element.textContent));

    expect(testResult).toEqual(expectedResultsAsc[2]);
  });

  it('корректно сортирует массив из нескольких элементов по убыванию методом пузырька', async () => {
    const { container } = render(
      <Router>
        <SortingPage initArr={testInputValue[2]} />
      </Router>
    );

    const radioBubble = getByTestId(container, 'radioBubble');
    const btnDesc = getByTestId(container, 'btnDesc');
    const solutionResult = getByTestId(container, 'solutionResult');

    fireEvent.click(radioBubble);

    btnDesc.focus();
    fireEvent.click(btnDesc);

    await waitFor(() => expect(radioBubble).not.toBeDisabled(), {
      timeout: waitTime
    });

    const testResult = Array.from(solutionResult.childNodes).map((element) => Number(element.textContent));

    expect(testResult).toEqual(expectedResultsDesc[2]);
  });
});
