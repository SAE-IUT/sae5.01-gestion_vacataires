import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('Je me connecte en tant qu\'admin', () => {
  cy.visit('http://localhost:4200/vacataires');
  cy.get('#pseudo').type('admin');
  cy.get('#password').type('testps');
  cy.get('#pseudo').should('have.value', 'admin');
  cy.get('#password').should('have.value', 'testps');
  cy.contains('Connexion').click();
});

When('Click du bouton "Filtres"', () => {
  cy.wait(1000);
  cy.contains('Filtres').click();
  cy.get('.dropdown-menu').should('be.visible');
});

When('Je choisis l\'affectation "Affecté"', () => {
    cy.get('#affectation').trigger('mouseover');
    cy.wait(1000);
    cy.contains('Affecté').click({ force: true });
});
Then('La liste des vacataires devrait être filtrée pour afficher uniquement les affecté à un module', () => {
    cy.get('.name').should('not.contain', 'Bastien Balmes');
    cy.get('.name').should('contain', 'Enzo Mancini');
    cy.get('.name').should('not.contain', 'Victor Thompson');
});