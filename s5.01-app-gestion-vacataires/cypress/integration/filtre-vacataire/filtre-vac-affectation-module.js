import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('Je me connect en tant qu\'admin', () => {
  cy.visit('http://localhost:4200/vacataires');
  cy.get('#pseudo').type('admin');
  cy.get('#password').type('testps');
  cy.get('#pseudo').should('have.value', 'admin');
  cy.get('#password').should('have.value', 'testps');
  cy.contains('Connexion').click();

});
When('Click du Bouton "Filtres"', () => {
  cy.wait(1000);
  cy.contains('Filtres').click();
  cy.get('.dropdown-menu').should('be.visible');

});
When('Je choisis le module "DEV"', () => {
    cy.get('#affectation').trigger('mouseover');
    cy.wait(1000);
    cy.contains('DEV').click({ force: true });
});
Then('La liste des vacataires devrait être filtrée pour afficher uniquement les vacataires affécter au module "DEV"', () => {
  cy.contains('Bastien Balmes').should('not.exist');
  cy.contains('Enzo Mancini');
  cy.contains('Victor Thompson').should('not.exist');

});