import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button'


describe('Тестирование компонента Button', function() {
  it('корректно отрисовывает кнопку с текстом', () => {
    const tree = renderer.create(<Button text='Я кнопка с текстом' />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('корректно отрисовывает кнопку без текста', () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('корректно отрисовывает заблокированную кнопку', () => {
    const tree = renderer.create(<Button disabled={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('корректно отрисовывает кнопку с индикацией загрузки', () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('корректно вызывает callback при клике на кнопку', () => {
    window.alert = jest.fn();

    render(
      <Button text='Я кнопка' onClick={() => alert('Ура! Я кнопка!')} />
    );

    const btn = screen.getByText('Я кнопка')

    fireEvent.click(btn);

    expect(window.alert).toHaveBeenCalledWith('Ура! Я кнопка!');
  });
});
