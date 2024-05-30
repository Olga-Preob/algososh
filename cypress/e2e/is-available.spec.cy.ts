describe('Тестирование работоспособности приложения', function() {
  const pageUrl = '/';

  it('приложение должно быть доступно по адресу: http://localhost:3000', () => {
    cy.visit(pageUrl);
    cy.contains('МБОУ АЛГОСОШ');
  });
});
