import {
  charInput,
  btnAdd,
  btnRemove,
  btnClear,
  circleContent,
  circleDefaultState,
  circleChangingState
} from './constants/selectors';


describe('Тестирование страницы "Стек"', function() {
  const pageUrl = '#/stack';

  const testInputValue = ['8745', '12'];

  const waitTime = 500;

  it('если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.visit(pageUrl);

    cy.get(btnAdd).as('btnAdd');
    cy.get(charInput).as('charInput');

    cy.checkButtonState('@charInput', '@btnAdd');
  });

  it('корректно добавляет элемент в стек, проверка стилей и анимации', () => {
    cy.visit(pageUrl);

    cy.get(btnAdd).as('btnAdd');
    cy.get(charInput).as('charInput');

    cy.typeAndClick('@charInput', testInputValue[0], '@btnAdd');

    cy.get(circleContent).as('circleContent');

    cy.checkCircleElementInStack('@circleContent', 0, 'firstElement', circleChangingState, testInputValue[0], 'top', waitTime);

    cy.get('@firstElement').children(circleDefaultState);

    cy.typeAndClick('@charInput', testInputValue[1], '@btnAdd');

    cy.checkCircleElementInStack('@circleContent', 1, 'secondElement', circleChangingState, testInputValue[1], 'top');

    cy.get('@firstElement').children(circleDefaultState);
    cy.get('@firstElement').should('not.have.text', 'top');

    cy.wait(waitTime);

    cy.get('@secondElement').children(circleDefaultState);

    cy.get(circleContent).should('have.length', 2);
  });

  it('корректно удаляет элемент из стека', () => {
    cy.visit(pageUrl);

    cy.get(btnAdd).as('btnAdd');
    cy.get(btnRemove).as('btnRemove');
    cy.get(charInput).as('charInput');

    cy.typeAndClick('@charInput', testInputValue[0], '@btnAdd', waitTime);
    cy.typeAndClick('@charInput', testInputValue[1], '@btnAdd', waitTime);

    cy.get('@btnRemove').click();

    cy.get(circleContent).as('circleContent');

    cy.checkCircleElementInStack('@circleContent', 1, 'secondElement', circleChangingState, testInputValue[1], 'top', waitTime);

    cy.get('@circleContent').should('have.length', 1);

    cy.checkCircleElementInStack('@circleContent', 0, 'firstElement', circleDefaultState, testInputValue[0], 'top');

    cy.get('@btnRemove').click();

    cy.get('@firstElement').children(circleChangingState);

    cy.wait(waitTime);

    cy.get('@circleContent').should('have.length', 0);
  });

  it('по нажатию на кнопку "очистить" длина стека должна быть равна 0', () => {
    cy.visit(pageUrl);

    cy.get(btnAdd).as('btnAdd');
    cy.get(btnClear).as('btnClear');
    cy.get(charInput).as('charInput');

    cy.typeAndClick('@charInput', testInputValue[0], '@btnAdd', waitTime);
    cy.typeAndClick('@charInput', testInputValue[1], '@btnAdd', waitTime);

    cy.get(circleContent).as('circleContent');

    cy.get('@circleContent').should('have.length', 2);

    cy.get('@btnClear').click();

    cy.wait(waitTime);

    cy.get('@circleContent').should('have.length', 0);
  });
});
