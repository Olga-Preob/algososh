import { inputValue, btnSubmit } from './constants/selectors';


describe('Тестирование страницы "Последовательность Фибоначчи"', function() {
  const pageUrl = '#/fibonacci';

  const testInputValue = '5';
  const testStepsArr = ['1', '1', '2', '3', '5', '8'];

  const waitTime = (testStepsArr.length - 1) * 500;

  it('если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.visit(pageUrl);

    cy.get(inputValue).should('be.empty');
    cy.get(btnSubmit).should('be.disabled');

    cy.get(inputValue).type(testInputValue);
    cy.get(btnSubmit).should('be.enabled');

    cy.get(inputValue).clear();
    cy.get(btnSubmit).should('be.disabled');
  });

  it('корректно генерирует последовательность чисел Фибоначчи, проверка стилей и анимации', () => {
    cy.visit(pageUrl);

    cy.get(inputValue).type(testInputValue);
    cy.get(btnSubmit).click();

    cy.wait(waitTime);

    cy.get('[class*=circle_content]').should('have.length', testStepsArr.length).each(($el, index) => {
      cy.wrap($el).children('[class*=circle_default]');

      cy.wrap($el).contains(testStepsArr[index]);
    });
  });
});
