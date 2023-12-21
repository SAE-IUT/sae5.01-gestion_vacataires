import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('Je me connecte en tant qu\'Admin', () => {
  cy.visit('http://localhost:4200/vacataires');
  cy.get('#pseudo').type('admin');
  cy.get('#password').type('testps');
  cy.get('#pseudo').should('have.value', 'admin');
  cy.get('#password').should('have.value', 'testps');
  cy.contains('Connexion').click();

});
When('Clique Du bouton "Filtres"', () => {
  cy.wait(1000);
  cy.contains('Filtres').click();
  cy.get('.dropdown-menu').should('be.visible');
});
When('Je choisis l\'affectation " En Attente"', () => {
    cy.get('#affectation').trigger('mouseover');
    cy.wait(1000);
    cy.contains('En Attente').click({ force: true });
});
Then('La liste des vacataires devrait être filtrée pour afficher uniquement ceux qui ne son en attente', () => {
    cy.contains('Bastien Balmes').should('not.exist');
    cy.contains('Enzo Mancini').should('not.exist');
    cy.contains('Victor Thompson').should('not.exist');
});