/// <reference types="cypress" />

Cypress.Commands.add('testRoute', (page, link, textOnLinkPage, returnLink) => {
  cy.visit(page);

  cy.get(link).as('link').click();
  cy.get(returnLink).as('returnLink').click();

  cy.get('@link').click();
  cy.contains(textOnLinkPage);

  cy.get('@returnLink').click()
  cy.contains('МБОУ АЛГОСОШ');
});

Cypress.Commands.add('checkButtonState', (input, btn) => {
  cy.get(input).should('be.empty');
  cy.get(btn).should('be.disabled');

  cy.get(input).type('1');
  cy.get(btn).should('be.enabled');

  cy.get(input).clear();
  cy.get(btn).should('be.disabled');
});

Cypress.Commands.add('typeAndClick', (input, value, btn, waitTime) => {
  cy.get(input).type(value);
  cy.get(btn).click();

  if (waitTime) cy.wait(waitTime);
});

Cypress.Commands.add('checkCircleElementInStack', (circleContent, index, elName, circleElementState, value, position, waitTime) => {
  cy.get(circleContent).eq(index).as(elName);
  cy.get(`@${elName}`).children(circleElementState);
  cy.get(`@${elName}`).contains(value);
  cy.get(`@${elName}`).contains(position);

  if (waitTime) cy.wait(waitTime);
});

Cypress.Commands.add('checkCircleElementInQueue', (element, value, circleElementState, notHave) => {
  cy.get(element).children(circleElementState);

  if (notHave) {
    cy.get(element).should('not.have.text', 'head');
    cy.get(element).should('not.have.text', value);
    cy.get(element).should('not.have.text', 'tail');
  } else {
    cy.get(element).contains('head');
    cy.get(element).contains(value);
    cy.get(element).contains('tail');
  }
});
