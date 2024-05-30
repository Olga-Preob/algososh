declare namespace Cypress {
  interface Chainable<Subject = any> {
    testRoute(page: string, link: string, textOnLinkPage: string, returnLink: string): Chainable<any>;
    checkButtonState(input: string, btn: string): Chainable<any>;
    typeAndClick(input: string, value: string, btn: string, waitTime?: number): Chainable<any>;
    checkCircleElementInStack(circleContent: string, index: number, elName: string, circleElementState: string, value: string, position: string, waitTime?: number): Chainable<any>;
    checkCircleElementInQueue(elName: string, value: string, circleElementState: string, notHave?: boolean): Chainable<any>;
  }
}
