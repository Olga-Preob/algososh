import {
  charInput,
  btnSubmit,
  circleContent,
  circleDefaultState
} from './constants/selectors';


describe('Тестирование страницы "Последовательность Фибоначчи"', function() {
  const pageUrl = '#/fibonacci';

  const testInputValue = '5';
  const testStepsArr = ['1', '1', '2', '3', '5', '8'];

  const waitTime = (testStepsArr.length - 1) * 500;

  it('если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.visit(pageUrl);

    cy.get(btnSubmit).as('btnSubmit');
    cy.get(charInput).as('charInput');

    cy.checkButtonState('@charInput', '@btnSubmit');
  });

  it('корректно генерирует последовательность чисел Фибоначчи, проверка стилей и анимации', () => {
    cy.visit(pageUrl);

    cy.get(btnSubmit).as('btnSubmit');
    cy.get(charInput).as('charInput');

    cy.typeAndClick('@charInput', testInputValue, '@btnSubmit', waitTime);

    cy.get(circleContent).as('circleContent');

    cy.get('@circleContent').should('have.length', testStepsArr.length).each(($el, index) => {
      cy.wrap($el).children(circleDefaultState);

      cy.wrap($el).contains(testStepsArr[index]);
    });
  });
});
