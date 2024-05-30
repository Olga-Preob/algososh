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
    cy.testRoute(pageUrl, stringPageLink, 'Строка', returnLink);
  });

  it('должен быть выполнен переход на страницу "последовательность Фибоначчи"', () => {
    cy.testRoute(pageUrl, fibonacciPageLink, 'Последовательность Фибоначчи', returnLink);
  });

  it('должен быть выполнен переход на страницу "сортировка массива"', () => {
    cy.testRoute(pageUrl, sortingPageLink, 'Сортировка массива', returnLink);
  });

  it('должен быть выполнен переход на страницу "стек"', () => {
    cy.testRoute(pageUrl, stackPageLink, 'Стек', returnLink);
  });

  it('должен быть выполнен переход на страницу "очередь"', () => {
    cy.testRoute(pageUrl, queuePageLink, 'Очередь', returnLink);
  });

  it('должен быть выполнен переход на страницу "связный список"', () => {
    cy.testRoute(pageUrl, listPageLink, 'Связный список', returnLink);
  });
});
