import { inputValue, btnAdd, btnRemove, btnClear } from './constants/selectors';


describe('Тестирование страницы "Стек"', function() {
  const pageUrl = '#/stack';

  const testInputValue = ['8745', '12'];

  const waitTime = 500;

  it('если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.visit(pageUrl);

    cy.get(inputValue).should('be.empty');
    cy.get(btnAdd).should('be.disabled');

    cy.get(inputValue).type(testInputValue[0]);
    cy.get(btnAdd).should('be.enabled');

    cy.get(inputValue).clear();
    cy.get(btnAdd).should('be.disabled');
  });

  it('корректно добавляет элемент в стек, проверка стилей и анимации', () => {
    cy.visit(pageUrl);

    cy.get(inputValue).type(testInputValue[0]);
    cy.get(btnAdd).click();

    cy.get('[class*=circle_content]').eq(0).as('firstElement');
    cy.get('@firstElement').children('[class*=circle_changing]');
    cy.get('@firstElement').contains(testInputValue[0]);
    cy.get('@firstElement').contains('top');

    cy.wait(waitTime);
    cy.get('@firstElement').children('[class*=circle_default]');

    cy.get(inputValue).type(testInputValue[1]);
    cy.get(btnAdd).click();

    cy.get('[class*=circle_content]').eq(1).as('secondElement');
    cy.get('@secondElement').children('[class*=circle_changing]');
    cy.get('@secondElement').contains(testInputValue[1]);
    cy.get('@secondElement').contains('top');

    cy.get('@firstElement').children('[class*=circle_default]');
    cy.get('@firstElement').should('not.have.text', 'top');

    cy.wait(waitTime);
    cy.get('@secondElement').children('[class*=circle_default]');

    cy.get('[class*=circle_content]').should('have.length', 2);
  });

  it('корректно удаляет элемент из стека', () => {
    cy.visit(pageUrl);

    cy.get(inputValue).type(testInputValue[0]);
    cy.get(btnAdd).click();
    cy.wait(waitTime);

    cy.get(inputValue).type(testInputValue[1]);
    cy.get(btnAdd).click();
    cy.wait(waitTime);

    cy.get(btnRemove).click();

    cy.get('[class*=circle_content]').eq(1).as('secondElement');
    cy.get('@secondElement').children('[class*=circle_changing]');
    cy.get('@secondElement').contains(testInputValue[1]);
    cy.get('@secondElement').contains('top');

    cy.wait(waitTime);
    cy.get('[class*=circle_content]').should('have.length', 1);

    cy.get('[class*=circle_content]').eq(0).as('firstElement');
    cy.get('@firstElement').children('[class*=circle_default]');
    cy.get('@firstElement').contains(testInputValue[0]);
    cy.get('@firstElement').contains('top');

    cy.get(btnRemove).click();
    cy.get('@firstElement').children('[class*=circle_changing]');

    cy.wait(waitTime);

    cy.get('[class*=circle_content]').should('have.length', 0);
  });

  it('по нажатию на кнопку "очистить" длина стека должна быть равна 0', () => {
    cy.visit(pageUrl);

    cy.get(inputValue).type(testInputValue[0]);
    cy.get(btnAdd).click();
    cy.wait(waitTime);

    cy.get(inputValue).type(testInputValue[1]);
    cy.get(btnAdd).click();
    cy.wait(waitTime);

    cy.get('[class*=circle_content]').should('have.length', 2);

    cy.get(btnClear).click();
    cy.wait(waitTime);

    cy.get('[class*=circle_content]').should('have.length', 0);
  });
});
