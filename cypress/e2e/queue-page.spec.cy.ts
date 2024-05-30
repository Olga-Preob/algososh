import { inputValue, btnAdd, btnRemove, btnClear } from './constants/selectors';


describe('Тестирование страницы "Очередь"', function() {
  const pageUrl = '#/queue';

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

  it('корректно добавляет элемент в очередь и отрисовывает курсоры head и tail, проверка стилей и анимации', () => {
    cy.visit(pageUrl);

    cy.get(inputValue).type(testInputValue[0]);
    cy.get(btnAdd).click();

    cy.get('[class*=circle_content]').eq(0).as('firstElement');
    cy.get('@firstElement').children('[class*=circle_changing]');
    cy.get('@firstElement').contains(testInputValue[0]);
    cy.get('@firstElement').contains('head');
    cy.get('@firstElement').contains('tail');
    cy.wait(waitTime);
    cy.get('@firstElement').children('[class*=circle_default]');

    cy.get(inputValue).type(testInputValue[1]);
    cy.get(btnAdd).click();
    cy.wait(waitTime);

    cy.get('[class*=circle_content]').should('have.length', 7).each(($el, index) => {
      cy.wrap($el).children().eq(2).contains(`${index}`);

      if (index === 0) {
        cy.wrap($el).contains(testInputValue[0]);
        cy.wrap($el).contains('head');
      } else if (index === 1) {
        cy.wrap($el).contains(testInputValue[1]);
        cy.wrap($el).contains('tail');
      } else {
        cy.wrap($el).children().eq(1).invoke('text').should('be.empty');
      }
    });
  });

  it('корректно удаляет элемент из очереди', () => {
    cy.visit(pageUrl);

    cy.get(inputValue).type(testInputValue[0]);
    cy.get(btnAdd).click();
    cy.wait(waitTime);

    cy.get(inputValue).type(testInputValue[1]);
    cy.get(btnAdd).click();
    cy.wait(waitTime);

    cy.get(btnRemove).click();

    cy.get('[class*=circle_content]').eq(0).as('firstElement');
    cy.get('@firstElement').children('[class*=circle_changing]');
    cy.get('@firstElement').contains(testInputValue[0]);
    cy.get('@firstElement').contains('head');
    cy.wait(waitTime);
    cy.get('@firstElement').should('not.have.text', 'head');
    cy.get('@firstElement').should('not.have.text', testInputValue[0]);
    cy.get('@firstElement').should('not.have.text', 'tail');
    cy.get('@firstElement').children('[class*=circle_default]');

    cy.get('[class*=circle_content]').eq(1).as('secondElement');
    cy.get('@secondElement').children('[class*=circle_default]');
    cy.get('@secondElement').contains('head');
    cy.get('@secondElement').contains(testInputValue[1]);
    cy.get('@secondElement').contains('tail');

    cy.get(btnRemove).click();

    cy.get('@secondElement').children('[class*=circle_changing]');
    cy.wait(waitTime);
    cy.get('@secondElement').should('not.have.text', 'head');
    cy.get('@secondElement').should('not.have.text', testInputValue[1]);
    cy.get('@secondElement').should('not.have.text', 'tail');
    cy.get('@secondElement').children('[class*=circle_default]');

    cy.get('[class*=circle_content]').should('have.length', 7).each(($el, index) => {
      if (index === 2) {
        cy.wrap($el).contains('head');
      }

      cy.wrap($el).children().eq(1).invoke('text').should('be.empty');
      cy.wrap($el).children().eq(2).contains(`${index}`);
      cy.wrap($el).should('not.have.text', 'tail');

      cy.wrap($el).children('[class*=circle_default]');
    });
  });

  it('добавить в очередь несколько элементов, по нажатию на кнопку "очистить" длина очереди должна быть равна 0', () => {
    cy.visit(pageUrl);

    cy.get(inputValue).type(testInputValue[0]);
    cy.get(btnAdd).click();
    cy.wait(waitTime);

    cy.get(inputValue).type(testInputValue[1]);
    cy.get(btnAdd).click();
    cy.wait(waitTime);

    cy.get(btnClear).click();
    cy.wait(waitTime);

    cy.get('[class*=circle_content]').should('have.length', 7).each(($el, index) => {
      cy.wrap($el).should('not.have.text', 'head');
      cy.wrap($el).children().eq(1).invoke('text').should('be.empty');
      cy.wrap($el).children().eq(2).contains(`${index}`);
      cy.wrap($el).should('not.have.text', 'tail');

      cy.wrap($el).children('[class*=circle_default]');
    });
  });
});
