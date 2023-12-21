import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('Je me connecte en tant qu\'administrateur', () => {
  cy.visit('http://localhost:4200/vacataires');
  cy.get('#pseudo').type('admin');
  cy.get('#password').type('testps');
  cy.get('#pseudo').should('have.value', 'admin');
  cy.get('#password').should('have.value', 'testps');
  cy.contains('Connexion').click();
});
When('Click sur le bouton "Filtre"', () => {
  cy.wait(1000);
  cy.contains('Cours').click();
  cy.contains('Filtres').click();
  cy.get('.dropdown-menu').should('be.visible');

});
When('Je choisis la matière "math"', () => {
    cy.get('#matieres').trigger('mouseover');
    cy.contains('math').click({ force: true });
});
Then('La liste des modules devrait être filtrée pour afficher uniquement les modules de la catégorie "math"', () => {
  cy.contains('GRAPHES');
  cy.contains('MATRICE');
  cy.contains('COM').should('not.contain');
  cy.contains('BD').should('not.contain'); 
});