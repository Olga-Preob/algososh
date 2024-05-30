import {
  returnLink,
  stringPageLink,
  fibonacciPageLink,
  sortingPageLink,
  stackPageLink,
  queuePageLink,
  listPageLink
} from './constants/selectors';


describe('Тестирование переходов по страницам', function() {
  const pageUrl = '/';

  it('должен быть выполнен переход на главную страницу', () => {
    cy.visit(pageUrl);
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('должен быть выполнен переход на страницу "строка"', () => {
    cy.visit(pageUrl);
    cy.get(stringPageLink).click();
    cy.contains('Строка');
    cy.get(returnLink).click()
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('должен быть выполнен переход на страницу "последовательность Фибоначчи"', () => {
    cy.visit(pageUrl);
    cy.get(fibonacciPageLink).click();
    cy.contains('Последовательность Фибоначчи');
    cy.get(returnLink).click()
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('должен быть выполнен переход на страницу "сортировка массива"', () => {
    cy.visit(pageUrl);
    cy.get(sortingPageLink).click();
    cy.contains('Сортировка массива');
    cy.get(returnLink).click()
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('должен быть выполнен переход на страницу "стек"', () => {
    cy.visit(pageUrl);
    cy.get(stackPageLink).click();
    cy.contains('Стек');
    cy.get(returnLink).click()
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('должен быть выполнен переход на страницу "очередь"', () => {
    cy.visit(pageUrl);
    cy.get(queuePageLink).click();
    cy.contains('Очередь');
    cy.get(returnLink).click()
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('должен быть выполнен переход на страницу "связный список"', () => {
    cy.visit(pageUrl);
    cy.get(listPageLink).click();
    cy.contains('Связный список');
    cy.get(returnLink).click()
    cy.contains('МБОУ АЛГОСОШ');
  });
});
