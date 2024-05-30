import {
  charInput,
  indexInput,
  btnAddToHead,
  btnAddToTail,
  btnAddByIndex,
  btnDeleteByIndex,
  btnDeleteFromHead,
  btnDeleteFromTail,
  circleContent,
  circleDefaultState
} from './constants/selectors';


describe('Тестирование страницы "Связный список"', function() {
  const pageUrl = '#/list';

  const testInputValue = ['19', '66', '31', '47'];
  const testInputIndex = ['1', '2'];

  const waitTime = 1000;

  it('если в инпуте пусто, то кнопки "добавить в head", "добавить в tail", "добавить по индексу" и "удалить по индексу" недоступны', () => {
    cy.visit(pageUrl);

    cy.get(charInput).as('charInput').should('be.empty');
    cy.get(indexInput).as('indexInput').should('be.empty');

    cy.get(btnAddToHead).as('btnAddToHead').should('be.disabled');
    cy.get(btnAddToTail).as('btnAddToTail').should('be.disabled');
    cy.get(btnAddByIndex).as('btnAddByIndex').should('be.disabled');
    cy.get(btnDeleteByIndex).as('btnDeleteByIndex').should('be.disabled');

    cy.get('@charInput').type(testInputValue[2]);

    cy.get('@btnAddToHead').should('be.enabled');
    cy.get('@btnAddToTail').should('be.enabled');
    cy.get('@btnAddByIndex').should('be.disabled');
    cy.get('@btnDeleteByIndex').should('be.disabled');

    cy.get('@indexInput').type(testInputIndex[0]);

    cy.get('@btnAddToHead').should('be.enabled');
    cy.get('@btnAddToTail').should('be.enabled');
    cy.get('@btnAddByIndex').should('be.enabled');
    cy.get('@btnDeleteByIndex').should('be.enabled');

    cy.get('@charInput').clear();

    cy.get('@btnAddToHead').should('be.disabled');
    cy.get('@btnAddToTail').should('be.disabled');
    cy.get('@btnAddByIndex').should('be.disabled');
    cy.get('@btnDeleteByIndex').should('be.enabled');

    cy.get('@indexInput').clear();

    cy.get('@btnAddToHead').should('be.disabled');
    cy.get('@btnAddToTail').should('be.disabled');
    cy.get('@btnAddByIndex').should('be.disabled');
    cy.get('@btnDeleteByIndex').should('be.disabled');
  });

  it('корректно отрисовывает дефолтный список', () => {
    cy.visit(pageUrl);

    cy.get(circleContent).as('circleContent');
    cy.get('@circleContent').should('have.length', 6);

    cy.get('@circleContent').each(($el, index, list) => {
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

      cy.wrap($el).children(circleDefaultState);
      cy.wrap($el).invoke('text').should('have.length.gt', 0);
    });
  });

  it('корректно добавляет элемент в head', () => {
    cy.visit(pageUrl);

    cy.get(charInput).as('charInput');
    cy.get(btnAddToHead).as('btnAddToHead');

    cy.typeAndClick('@charInput', testInputValue[0], '@btnAddToHead', waitTime);

    cy.get(circleContent).as('circleContent');
    cy.get('@circleContent').should('have.length', 7);

    cy.get('@circleContent').first().as('firstElement');
    cy.get('@firstElement').contains(testInputValue[0]);
  });

  it('корректно добавляет элемент в tail', () => {
    cy.visit(pageUrl);

    cy.get(charInput).as('charInput');
    cy.get(btnAddToTail).as('btnAddToTail');

    cy.typeAndClick('@charInput', testInputValue[0], '@btnAddToTail', waitTime);

    cy.get(circleContent).as('circleContent');
    cy.get('@circleContent').should('have.length', 7);

    cy.get('@circleContent').last().as('lastElement');
    cy.get('@lastElement').contains(testInputValue[0]);
  });

  it('корректно добавляет элемент по индексу', () => {
    cy.visit(pageUrl);

    cy.get(charInput).as('charInput').type(testInputValue[0]);
    cy.get(indexInput).as('indexInput').type(testInputIndex[0]);
    cy.get(btnAddByIndex).as('btnAddByIndex').click();

    cy.wait(waitTime);

    cy.get(circleContent).as('circleContent');
    cy.get('@circleContent').should('have.length', 7);

    cy.get('@circleContent').eq(Number(testInputIndex[0])).as('element');
    cy.get('@element').contains(testInputValue[0]);
  });

  it('корректно удаляет элемент из head', () => {
    cy.visit(pageUrl);

    cy.get(charInput).as('charInput');
    cy.get(btnAddToHead).as('btnAddToHead');

    cy.typeAndClick('@charInput', testInputValue[0], '@btnAddToHead', waitTime);
    cy.typeAndClick('@charInput', testInputValue[1], '@btnAddToHead', waitTime);

    cy.get(circleContent).as('circleContent');
    cy.get('@circleContent').should('have.length', 8);

    cy.get(btnDeleteFromHead).as('btnDeleteFromHead').click();

    cy.wait(waitTime);
    cy.get('@circleContent').should('have.length', 7);

    cy.get('@circleContent').first().as('firstElement');
    cy.get('@firstElement').contains(testInputValue[0]);
  });

  it('корректно удаляет элемент из tail', () => {
    cy.visit(pageUrl);

    cy.get(charInput).as('charInput');
    cy.get(btnAddToTail).as('btnAddToTail');

    cy.typeAndClick('@charInput', testInputValue[0], '@btnAddToTail', waitTime);
    cy.typeAndClick('@charInput', testInputValue[1], '@btnAddToTail', waitTime);

    cy.get(circleContent).as('circleContent');
    cy.get('@circleContent').should('have.length', 8);

    cy.get(btnDeleteFromTail).as('btnDeleteFromTail').click();

    cy.wait(waitTime);
    cy.get('@circleContent').should('have.length', 7);

    cy.get('@circleContent').last().as('lastElement');
    cy.get('@lastElement').contains(testInputValue[0]);
  });

  it('корректно удаляет элемент по индексу', () => {
    cy.visit(pageUrl);

    cy.get(charInput).as('charInput').type(testInputValue[0]);
    cy.get(indexInput).as('indexInput').type(testInputIndex[0]);
    cy.get(btnAddByIndex).as('btnAddByIndex').click();

    cy.wait(waitTime);

    cy.get('@charInput').type(testInputValue[1]);
    cy.get('@indexInput').type(testInputIndex[1]);
    cy.get('@btnAddByIndex').click();

    cy.wait(waitTime);
    cy.get(circleContent).as('circleContent');
    cy.get('@circleContent').should('have.length', 8);

    cy.get('@indexInput').type(testInputIndex[0]);
    cy.get(btnDeleteByIndex).as('btnDeleteByIndex').click();

    cy.wait(waitTime);
    cy.get('@circleContent').should('have.length', 7);

    cy.get('@circleContent').eq(Number(testInputIndex[0])).as('element');
    cy.get('@element').contains(testInputValue[1]);
  });
});
