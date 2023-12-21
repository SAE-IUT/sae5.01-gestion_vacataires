import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('Je suis connecté en tant qu\'administrateur', () => {
  cy.visit('http://localhost:4200/vacataires');
  cy.get('#pseudo').type('admin');
  cy.get('#password').type('testps');
  cy.get('#pseudo').should('have.value', 'admin');
  cy.get('#password').should('have.value', 'testps');
  cy.contains('Connexion').click();
});
When('Je clique sur le bouton "Filtre"', () => {
  cy.wait(1000);
  cy.contains('Cours').click();
  cy.contains('Filtres').click();
  cy.get('.dropdown-menu').should('be.visible');
});
When('Je choisis le département "INFO"', () => {
    cy.get('#matieres').trigger('mouseover');
    cy.contains('INFO').click({ force: true });
});
Then('La liste des modules devrait être filtrée pour afficher uniquement les modules d\'INFO', () => {
    cy.contains('GRAPHES');
    cy.contains('MATRICE');
    cy.contains('BD');
    cy.contains('COM').should('not.contain'); //à modif
});