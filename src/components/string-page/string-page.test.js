import { HashRouter as Router } from 'react-router-dom';
import {
  render,
  getByTestId,
  screen,
  fireEvent,
  waitFor
} from '@testing-library/react';
import { StringPage } from './string-page';


describe('Тестирование алгоритма разворота строки', function() {
  const testInputArr = ['абвг', 'абв', 'я', ''];
  const expectedResults = ['гвба', 'вба', 'я', ''];

  const waitTime = 5000;

  it('корректно разворачивает строку с чётным количеством символов', async () => {
    const { container } = render(
      <Router>
        <StringPage />
      </Router>
    );

    const inputValue = getByTestId(container, 'inputValue');
    const btnSubmit = getByTestId(container, 'btnSubmit');
    const solutionResult = getByTestId(container, 'solutionResult');

    fireEvent.change(inputValue, {
      target: { value: testInputArr[0] }
    });

    fireEvent.click(btnSubmit);

    await waitFor(() => expect(screen.getByTestId('inputValue')).not.toBeDisabled(), {
      timeout: waitTime
    });

    const testResult = Array.from(solutionResult.childNodes).map((item) => item.textContent).join('');

    expect(testResult).toEqual(expectedResults[0]);
  });

  it('корректно разворачивает строку с нечетным количеством символов', async () => {
    const { container } = render(
      <Router>
        <StringPage />
      </Router>
    );

    const inputValue = getByTestId(container, 'inputValue');
    const btnSubmit = getByTestId(container, 'btnSubmit');
    const solutionResult = getByTestId(container, 'solutionResult');

    fireEvent.change(inputValue, {
      target: { value: testInputArr[1] }
    });

    fireEvent.click(btnSubmit);

    await waitFor(() => expect(screen.getByTestId('inputValue')).not.toBeDisabled(), {
      timeout: waitTime
    });

    const testResult = Array.from(solutionResult.childNodes).map((item) => item.textContent).join('');

    expect(testResult).toEqual(expectedResults[1]);
  });

  it('корректно разворачивает строку с одним символом', async () => {
    const { container } = render(
      <Router>
        <StringPage />
      </Router>
    );

    const inputValue = getByTestId(container, 'inputValue');
    const btnSubmit = getByTestId(container, 'btnSubmit');
    const solutionResult = getByTestId(container, 'solutionResult');

    fireEvent.change(inputValue, {
      target: { value: testInputArr[2] }
    });

    fireEvent.click(btnSubmit);

    await waitFor(() => expect(screen.getByTestId('inputValue')).not.toBeDisabled(), {
      timeout: waitTime
    });

    const testResult = Array.from(solutionResult.childNodes).map((item) => item.textContent).join('');

    expect(testResult).toEqual(expectedResults[2]);
  });

  it('корректно разворачивает пустую строку', async () => {
    const { container } = render(
      <Router>
        <StringPage />
      </Router>
    );

    const inputValue = getByTestId(container, 'inputValue');
    const btnSubmit = getByTestId(container, 'btnSubmit');
    const solutionResult = getByTestId(container, 'solutionResult');

    fireEvent.change(inputValue, {
      target: { value: testInputArr[3] }
    });

    fireEvent.click(btnSubmit);

    await waitFor(() => expect(screen.getByTestId('inputValue')).not.toBeDisabled(), {
      timeout: waitTime
    });

    const testResult = Array.from(solutionResult.childNodes).map((item) => item.textContent).join('');

    expect(testResult).toEqual(expectedResults[3]);
  });
});
