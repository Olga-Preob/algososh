import {
  inputValue,
  inputIndex,
  btnAddToHead,
  btnAddToTail,
  btnAddByIndex,
  btnDeleteByIndex,
  btnDeleteFromHead,
  btnDeleteFromTail
} from './constants/selectors';


describe('Тестирование страницы "Связный список"', function() {
  const pageUrl = '#/list';

  const testInputValue = ['19', '66', '31', '47'];
  const testInputIndex = ['1', '2'];

  const waitTime = 1000;

  it('если в инпуте пусто, то кнопки "добавить в head", "добавить в tail", "добавить по индексу" и "удалить по индексу" недоступны', () => {
    cy.visit(pageUrl);

    cy.get(inputValue).should('be.empty');
    cy.get(inputIndex).should('be.empty');

    cy.get(btnAddToHead).should('be.disabled');
    cy.get(btnAddToTail).should('be.disabled');
    cy.get(btnAddByIndex).should('be.disabled');
    cy.get(btnDeleteByIndex).should('be.disabled');

    cy.get(inputValue).type(testInputValue[2]);

    cy.get(btnAddToHead).should('be.enabled');
    cy.get(btnAddToTail).should('be.enabled');
    cy.get(btnAddByIndex).should('be.disabled');
    cy.get(btnDeleteByIndex).should('be.disabled');

    cy.get(inputIndex).type(testInputIndex[0]);

    cy.get(btnAddToHead).should('be.enabled');
    cy.get(btnAddToTail).should('be.enabled');
    cy.get(btnAddByIndex).should('be.enabled');
    cy.get(btnDeleteByIndex).should('be.enabled');

    cy.get(inputValue).clear();

    cy.get(btnAddToHead).should('be.disabled');
    cy.get(btnAddToTail).should('be.disabled');
    cy.get(btnAddByIndex).should('be.disabled');
    cy.get(btnDeleteByIndex).should('be.enabled');

    cy.get(inputIndex).clear();

    cy.get(btnAddToHead).should('be.disabled');
    cy.get(btnAddToTail).should('be.disabled');
    cy.get(btnAddByIndex).should('be.disabled');
    cy.get(btnDeleteByIndex).should('be.disabled');
  });

  it('корректно отрисовывает дефолтный список', () => {
    cy.visit(pageUrl);

    cy.get('[class*=circle_content]').should('have.length', 6);

    cy.get('[class*=circle_content]').each(($el, index, list) => {
      if (index === 0) {
        cy.wrap($el).contains('head');
        cy.wrap($el).should('not.have.text', 'tail');
      } else if ((index === list.length - 1)) {
        cy.wrap($el).contains('tail');
        cy.wrap($el).should('not.have.text', 'head');
      } else {
        cy.wrap($el).should('not.have.text', 'head');
        cy.wrap($el).should('not.have.text', 'tail');
      }

      cy.wrap($el).children('[class*=circle_default]');
      cy.wrap($el).invoke('text').should('have.length.gt', 0);
    });
  });

  it('корректно добавляет элемент в head', () => {
    cy.visit(pageUrl);

    cy.get(inputValue).type(testInputValue[0]);
    cy.get(btnAddToHead).click();

    cy.wait(waitTime);
    cy.get('[class*=circle_content]').should('have.length', 7);

    cy.get('[class*=circle_content]').first().as('firstElement');
    cy.get('@firstElement').contains(testInputValue[0]);
  });

  it('корректно добавляет элемент в tail', () => {
    cy.visit(pageUrl);

    cy.get(inputValue).type(testInputValue[0]);
    cy.get(btnAddToTail).click();

    cy.wait(waitTime);
    cy.get('[class*=circle_content]').should('have.length', 7);

    cy.get('[class*=circle_content]').last().as('lastElement');
    cy.get('@lastElement').contains(testInputValue[0]);
  });

  it('корректно добавляет элемент по индексу', () => {
    cy.visit(pageUrl);

    cy.get(inputValue).type(testInputValue[0]);
    cy.get(inputIndex).type(testInputIndex[0]);
    cy.get(btnAddByIndex).click();

    cy.wait(waitTime);
    cy.get('[class*=circle_content]').should('have.length', 7);

    cy.get('[class*=circle_content]').eq(Number(testInputIndex[0])).as('element');
    cy.get('@element').contains(testInputValue[0]);
  });

  it('корректно удаляет элемент из head', () => {
    cy.visit(pageUrl);

    cy.get(inputValue).type(testInputValue[0]);
    cy.get(btnAddToHead).click();

    cy.wait(waitTime);

    cy.get(inputValue).type(testInputValue[1]);
    cy.get(btnAddToHead).click();

    cy.wait(waitTime);
    cy.get('[class*=circle_content]').should('have.length', 8);

    cy.get(btnDeleteFromHead).click();

    cy.wait(waitTime);
    cy.get('[class*=circle_content]').should('have.length', 7);

    cy.get('[class*=circle_content]').first().as('firstElement');
    cy.get('@firstElement').contains(testInputValue[0]);
  });

  it('корректно удаляет элемент из tail', () => {
    cy.visit(pageUrl);

    cy.get(inputValue).type(testInputValue[0]);
    cy.get(btnAddToTail).click();

    cy.wait(waitTime);

    cy.get(inputValue).type(testInputValue[1]);
    cy.get(btnAddToTail).click();

    cy.wait(waitTime);
    cy.get('[class*=circle_content]').should('have.length', 8);

    cy.get(btnDeleteFromTail).click();

    cy.wait(waitTime);
    cy.get('[class*=circle_content]').should('have.length', 7);

    cy.get('[class*=circle_content]').last().as('lastElement');
    cy.get('@lastElement').contains(testInputValue[0]);
  });

  it('корректно удаляет элемент по индексу', () => {
    cy.visit(pageUrl);

    cy.get(inputValue).type(testInputValue[0]);
    cy.get(inputIndex).type(testInputIndex[0]);
    cy.get(btnAddByIndex).click();

    cy.wait(waitTime);

    cy.get(inputValue).type(testInputValue[1]);
    cy.get(inputIndex).type(testInputIndex[1]);
    cy.get(btnAddByIndex).click();

    cy.wait(waitTime);
    cy.get('[class*=circle_content]').should('have.length', 8);

    cy.get(inputIndex).type(testInputIndex[0]);
    cy.get(btnDeleteByIndex).click();

    cy.wait(waitTime);
    cy.get('[class*=circle_content]').should('have.length', 7);

    cy.get('[class*=circle_content]').eq(Number(testInputIndex[0])).as('element');
    cy.get('@element').contains(testInputValue[1]);
  });
});
