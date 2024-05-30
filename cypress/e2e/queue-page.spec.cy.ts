import {
  charInput,
  btnAdd,
  btnRemove,
  btnClear,
  circleContent,
  circleDefaultState,
  circleChangingState
} from './constants/selectors';

describe('Тестирование страницы "Очередь"', function() {
  const pageUrl = '#/queue';

  const testInputValue = ['8745', '12'];
  const notHave = true;

  const waitTime = 500;

  it('если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.visit(pageUrl);

    cy.get(btnAdd).as('btnAdd');
    cy.get(charInput).as('charInput');

    cy.checkButtonState('@charInput', '@btnAdd');
  });

  it('корректно добавляет элемент в очередь и отрисовывает курсоры head и tail, проверка стилей и анимации', () => {
    cy.visit(pageUrl);

    cy.get(charInput).as('charInput');
    cy.get(btnAdd).as('btnAdd');

    cy.typeAndClick('@charInput', testInputValue[0], '@btnAdd');

    cy.get(circleContent).as('circleContent').eq(0).as('firstElement');
    cy.checkCircleElementInQueue('@firstElement', testInputValue[0], circleChangingState);

    cy.wait(waitTime);
    cy.get('@firstElement').children(circleDefaultState);

    cy.typeAndClick('@charInput', testInputValue[1], '@btnAdd', waitTime);

    cy.get('@circleContent').should('have.length', 7).each(($el, index) => {
      cy.wrap($el).children().eq(2).contains(`${index}`);

      if (index === 0) {
        cy.wrap($el).contains('head');
        cy.wrap($el).contains(testInputValue[0]);
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

    cy.get(charInput).as('charInput');
    cy.get(btnAdd).as('btnAdd');

    cy.typeAndClick('@charInput', testInputValue[0], '@btnAdd', waitTime);
    cy.typeAndClick('@charInput', testInputValue[1], '@btnAdd', waitTime);

    cy.get(btnRemove).as('btnRemove').click();

    cy.get(circleContent).as('circleContent').eq(0).as('firstElement');
    cy.get('@firstElement').contains('head');
    cy.get('@firstElement').contains(testInputValue[0]);
    cy.get('@firstElement').children(circleChangingState);

    cy.wait(waitTime);

    cy.checkCircleElementInQueue('@firstElement', testInputValue[0], circleDefaultState, notHave);

    cy.get('@circleContent').eq(1).as('secondElement');
    cy.checkCircleElementInQueue('@secondElement', testInputValue[1], circleDefaultState);

    cy.get('@btnRemove').click();
    cy.get('@secondElement').children(circleChangingState);

    cy.wait(waitTime);

    cy.checkCircleElementInQueue('@secondElement', testInputValue[1], circleDefaultState, notHave);

    cy.get('@circleContent').should('have.length', 7);

    cy.get('@circleContent').each(($el, index) => {
      if (index === 2) {
        cy.wrap($el).contains('head');
      }

      cy.wrap($el).children().eq(1).invoke('text').should('be.empty');
      cy.wrap($el).children().eq(2).contains(`${index}`);
      cy.wrap($el).should('not.have.text', 'tail');
      cy.wrap($el).children(circleDefaultState);
    });
  });

  it('добавить в очередь несколько элементов, по нажатию на кнопку "очистить" длина очереди должна быть равна 0', () => {
    cy.visit(pageUrl);

    cy.get(charInput).as('charInput');
    cy.get(btnAdd).as('btnAdd');

    cy.typeAndClick('@charInput', testInputValue[0], '@btnAdd', waitTime);
    cy.typeAndClick('@charInput', testInputValue[1], '@btnAdd', waitTime);

    cy.get(btnClear).as('btnClear').click();
    cy.wait(waitTime);

    cy.get(circleContent).as('circleContent');
    cy.get('@circleContent').should('have.length', 7);

    cy.get('@circleContent').each(($el, index) => {
      cy.wrap($el).should('not.have.text', 'head');
      cy.wrap($el).children().eq(1).invoke('text').should('be.empty');
      cy.wrap($el).children().eq(2).contains(`${index}`);
      cy.wrap($el).should('not.have.text', 'tail');
      cy.wrap($el).children(circleDefaultState);
    });
  });
});
