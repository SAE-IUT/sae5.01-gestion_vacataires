describe('Test des Filtres Vacataires', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.visit('/')
    cy.get('#pseudo').type('admin');
    cy.get('#password').type('testps');

    // Vérifiez que les champs contiennent les données saisies
    cy.get('#pseudo').should('have.value', 'admin');
    cy.get('#password').should('have.value', 'testps');

    cy.contains('Connexion').click();
  });
  
  it('Test de précense', () => {
    cy.get('.name').should('contain', 'Bastien Balmes');
    cy.get('.name').should('contain', 'Enzo Mancini');
    cy.get('.name').should('contain', 'Victor Thompson');
  })

  it('Test du filtre Affecté', () => {
    // Ouvrir le menu "Filtres"
    cy.contains('Filtres').click();
    // Attendre que le menu "Filtres" soit visible
    cy.get('.dropdown-menu').should('be.visible');
    // Survoler l'élément "Affectation" pour déclencher le dropdown
    cy.get('#affectation').trigger('mouseover');
    // Attendre un certain temps pour que le dropdown apparaisse complètement
    cy.wait(1000);
    // Cliquez sur l'élément "Affecté" dans le dropdown en utilisant {force: true}
    cy.contains('Affecté').click({ force: true });
    cy.get('.name').should('not.contain', 'Bastien Balmes');
    cy.get('.name').should('contain', 'Enzo Mancini');
    cy.get('.name').should('not.contain', 'Victor Thompson');
  });
  
  it('Test du filtre non affecté', () => {
    // Ouvrir le menu "Filtres"
    cy.contains('Filtres').click();
    // Attendre que le menu "Filtres" soit visible
    cy.get('.dropdown-menu').should('be.visible');
    // Survoler l'élément "Affectation" pour déclencher le dropdown
    cy.get('#affectation').trigger('mouseover');
    // Attendre un certain temps pour que le dropdown apparaisse complètement
    cy.wait(1000);
    // Cliquez sur l'élément "Affecté" dans le dropdown en utilisant {force: true}
    cy.contains('Non Affecté').click({ force: true });
    cy.get('.name').should('contain', 'Bastien Balmes');
    cy.get('.name').should('not.contain', 'Enzo Mancini');
    cy.get('.name').should('contain', 'Victor Thompson');
  });

  it('Test du filtre en Attente', () => {
    // Ouvrir le menu "Filtres"
    cy.contains('Filtres').click();
    // Attendre que le menu "Filtres" soit visible
    cy.get('.dropdown-menu').should('be.visible');
    // Survoler l'élément "Affectation" pour déclencher le dropdown
    cy.get('#affectation').trigger('mouseover');
    // Attendre un certain temps pour que le dropdown apparaisse complètement
    cy.wait(1000);
    // Cliquez sur l'élément "Affecté" dans le dropdown en utilisant {force: true}
    cy.contains('En Attente').click({ force: true });
    cy.contains('Bastien Balmes').should('not.exist');
    cy.contains('Enzo Mancini').should('not.exist');
    cy.contains('Victor Thompson').should('not.exist');
  });

  it('Test du filtre des matières', () => {
    // Ouvrir le menu "Filtres"
    cy.contains('Filtres').click();
    // Attendre que le menu "Filtres" soit visible
    cy.get('.dropdown-menu').should('be.visible');
    // Survoler l'élément "Affectation" pour déclencher le dropdown
    cy.get('#affectation').trigger('mouseover');
    // Attendre un certain temps pour que le dropdown apparaisse complètement
    cy.wait(1000);
    // Cliquez sur l'élément "Affecté" dans le dropdown en utilisant {force: true}
    cy.contains('Dev java').click({ force: true });
    cy.contains('Bastien Balmes').should('not.exist');
    cy.contains('Enzo Mancini');
    cy.contains('Victor Thompson').should('not.exist');
 
  });
  it('Test de la barre de recherche', () => {
    // Ouvrir le menu "Filtres"
    cy.get('#search').type('Bastien').type('{enter}');
  
    cy.get('.name').should('contain', 'Bastien Balmes');
    cy.get('.name').should('not.contain', 'Enzo Mancini');
    cy.get('.name').should('not.contain', 'Victor Thompson');
 
  });

})
