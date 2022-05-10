/// <reference types="cypress" />

describe('Applaudo technical challenge - Giancarlo', () => {
/*
This design patter is not the one I prefer.
On a real project (or if I had more time :) ), I would use the cypress-cucumber-preprocessor
and I'd write the scenarios in Gherkin (on a .feature)
and describe these scenarios in .steps (steps definition)
and have the actions and page elements on a Page Objects pattern (.page)
*/
  it('logs in and asserts user has logged in', () => {
    const user = 'Harry Potter';
    cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject');
    cy.get('button[ng-click="customer()"]').click();
    cy.get('select[name="userSelect"]').select(user);
    cy.get('button[type="submit"]').click();
    cy.get('[class="ng-scope"]').contains(`Welcome ${user}`);
  })

  it('deposits and asserts the balance', () => {
    cy.get('button[ng-click="deposit()"]').click();
    cy.get('input[type="number"]').type(50);
    cy.get('button[type="submit"]').click();
    cy.get('[class="ng-scope"]').contains('Deposit Successful');
    cy.get('[class="ng-binding"]').eq(1).contains(50); //not ideal to use '.eq(1)'. In this case, we could navigate through the elements to find the value, but this is only for a quick test purpose and quick solution
  })

  it('assures user cannot withdraw value bigger than balance', () => {
    cy.get('button[ng-click="withdrawl()"]').click();
    cy.wait(500); //we could avoid this wait by waiting for some specific request. Just adding it here for this quick test example
    cy.get('input[ng-model="amount"]').should('be.visible').type(51);
    cy.get('button[type="submit"]').click();
    cy.get('[class="ng-scope"]').contains('Transaction Failed. You can not withdraw amount more than the balance.');
    cy.get('[class="ng-binding"]').eq(1).contains(50); //not ideal to use '.eq(1)'. In this case, we could navigate through the elements to find the value, but this is only for a quick test purpose and quick solution
  })

  it('assures user can withdraw value and asserts balance', () => {
    cy.get('button[ng-click="withdrawl()"]').click();
    cy.wait(500); //we could avoid this wait by waiting for some specific request. Just adding it here for this quick test example
    cy.get('input[ng-model="amount"]').should('be.visible').type(49);
    cy.get('button[type="submit"]').click();
    cy.get('[class="ng-scope"]').contains('Transaction successful');
    cy.get('[class="ng-binding"]').eq(1).contains(1); //not ideal to use '.eq(1)'. In this case, we could navigate through the elements to find the value, but this is only for a quick test purpose and quick solution
  })

  it('asserts Transactions are listed correctly', () => {
    cy.wait(1000);//this wait could be avoided by waiting for a specific API request...
    cy.get('button[ng-click="transactions()"]').click();
    cy.get('table[class="table table-bordered table-striped"]').should('be.visible').within(() => {
      cy.get('tr[id="anchor0"]').contains(50).siblings().should('contain','Credit');
      cy.get('tr[id="anchor1"]').contains(49).siblings().should('contain','Debit');
    });
  })

})
