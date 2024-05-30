import { inputValue, btnSubmit } from './constants/selectors';


describe('Тестирование страницы "Строка"', function() {
  const pageUrl = '#/string';

  const testInputValue = 'апер';
  const testStepsArr = [
    ['а', 'п', 'е', 'р'],
    ['р', 'п', 'е', 'а'],
    ['р', 'е', 'п', 'а'],
  ];

  const waitTime = 500;

  it('если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.visit(pageUrl);

    cy.get(inputValue).should('be.empty');
    cy.get(btnSubmit).should('be.disabled');

    cy.get(inputValue).type(testInputValue);
    cy.get(btnSubmit).should('be.enabled');

    cy.get(inputValue).clear();
    cy.get(btnSubmit).should('be.disabled');
  });

  it('разворот строки выполняется корректно, проверка стилей и анимации', () => {
    cy.visit(pageUrl);

    cy.get(inputValue).type(testInputValue);
    cy.get(btnSubmit).click();

    cy.get('[class*=circle_content]').should('have.length', testInputValue.length).each(($el, index) => {
      cy.wrap($el).contains(testStepsArr[0][index]);

      cy.wrap($el).children('[class*=circle_default]');
    });

    cy.wait(waitTime);

    cy.get('[class*=circle_content]').should('have.length', testInputValue.length).each(($el, index) => {
      if (index === 0 || index === testInputValue.length - 1) {
        cy.wrap($el).children('[class*=circle_changing]');
      } else {
        cy.wrap($el).children('[class*=circle_default]');
      }

      cy.wrap($el).contains(testStepsArr[0][index]);
    });

    cy.wait(waitTime);

    cy.get('[class*=circle_content]').should('have.length', testInputValue.length).each(($el, index) => {
      if (index === 0 || index === testInputValue.length - 1) {
        cy.wrap($el).children('[class*=circle_modified]');
      } else {
        cy.wrap($el).children('[class*=circle_changing]');
      }

      cy.wrap($el).contains(testStepsArr[1][index]);
    });

    cy.wait(waitTime);

    cy.get('[class*=circle_content]').should('have.length', testInputValue.length).each(($el, index) => {
      cy.wrap($el).children('[class*=circle_modified]');

      cy.wrap($el).contains(testStepsArr[2][index]);
    });
  });
});
