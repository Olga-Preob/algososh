import renderer from 'react-test-renderer';
import { ElementStates } from '../../../types/element-states'
import { Circle } from './circle'


describe('Тестирование компонента Circle', function() {
  it('корректно отрисовывает элемент без буквы', () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('корректно отрисовывает элемент с буквами', () => {
    const tree = renderer.create(<Circle letter='абв' />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('корректно отрисовывает элемент с head', () => {
    const tree = renderer.create(<Circle head='head' />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('корректно отрисовывает элемент с react-элементом в head', () => {
    const tree = renderer.create(<Circle head={<Circle letter='абв' />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('корректно отрисовывает элемент с tail', () => {
    const tree = renderer.create(<Circle tail='tail' />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('корректно отрисовывает элемент с react-элементом в tail', () => {
    const tree = renderer.create(<Circle tail={<Circle letter='абв' />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('корректно отрисовывает элемент с index', () => {
    const tree = renderer.create(<Circle index={0} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('корректно отрисовывает элемент с пропом isSmall === true', () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('корректно отрисовывает элемент в состоянии default', () => {
    const tree = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('корректно отрисовывает элемент в состоянии changing', () => {
    const tree = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('корректно отрисовывает элемент в состоянии modified', () => {
    const tree = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
