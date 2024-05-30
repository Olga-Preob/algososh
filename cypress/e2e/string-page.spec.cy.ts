import {
  charInput,
  btnSubmit,
  circleContent,
  circleDefaultState,
  circleChangingState,
  circleModifiedState
} from './constants/selectors';


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

    cy.get(btnSubmit).as('btnSubmit');
    cy.get(charInput).as('charInput');

    cy.checkButtonState('@charInput', '@btnSubmit');
  });

  it('разворот строки выполняется корректно, проверка стилей и анимации', () => {
    cy.visit(pageUrl);

    cy.get(btnSubmit).as('btnSubmit');
    cy.get(charInput).as('charInput');

    cy.typeAndClick('@charInput', testInputValue, '@btnSubmit');

    cy.get(circleContent).as('circleContent');

    cy.get('@circleContent').should('have.length', testInputValue.length).each(($el, index) => {
      cy.wrap($el).children(circleDefaultState);

      cy.wrap($el).children(circleDefaultState);
    });

    cy.wait(waitTime);

    cy.get('@circleContent').each(($el, index) => {
      if (index === 0 || index === testInputValue.length - 1) {
        cy.wrap($el).children(circleChangingState);
      } else {
        cy.wrap($el).children(circleDefaultState);
      }

      cy.wrap($el).contains(testStepsArr[0][index]);
    });

    cy.wait(waitTime);

    cy.get('@circleContent').each(($el, index) => {
      if (index === 0 || index === testInputValue.length - 1) {
        cy.wrap($el).children(circleModifiedState);
      } else {
        cy.wrap($el).children(circleChangingState);
      }

      cy.wrap($el).contains(testStepsArr[1][index]);
    });

    cy.wait(waitTime);

    cy.get('@circleContent').should('have.length', testInputValue.length).each(($el, index) => {
      cy.wrap($el).contains(testStepsArr[2][index]);

      cy.wrap($el).children(circleModifiedState);
    });
  });
});
