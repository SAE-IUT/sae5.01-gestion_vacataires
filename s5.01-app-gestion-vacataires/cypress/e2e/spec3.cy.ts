describe('Test des CRUD', () => {
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

  it('Connexion', () => {
    cy.visit('/')
    cy.get('#pseudo').type('admin');
    cy.get('#password').type('testps');

    // Vérifiez que les champs contiennent les données saisies
    cy.get('#pseudo').should('have.value', 'admin');
    cy.get('#password').should('have.value', 'testps');

    cy.contains('Connexion').click();
  })
  it('Test filtre par matière', () => {
    cy.wait(1000);
    cy.contains('Cours').click();
    cy.contains('Filtres').click();
    cy.get('.dropdown-menu').should('be.visible');
    // Attendre que le sous-menu "Matière" soit visible
    cy.get('#matieres').trigger('mouseover');
    // Cliquez sur le sous-menu "math"
    cy.contains('math').click({ force: true });
    // Vérification des modules
    cy.contains('GRAPHES');
    cy.contains('MATRICE');
    cy.contains('COM').should('not.contain'); //à modif
    cy.contains('BD').should('not.contain'); //à modif
    });

    it('Test filtre par départements (INFO)', () => {
      cy.wait(1000);
      cy.contains('Cours').click();
      cy.contains('Filtres').click();
      cy.get('.dropdown-menu').should('be.visible');
      // Attendre que le sous-menu "Matière" soit visible
      cy.get('#matieres').trigger('mouseover');
      // Cliquez sur le sous-menu "math"
      cy.contains('INFO').click({ force: true });
      // Vérification des modules
      cy.contains('GRAPHES');
      cy.contains('MATRICE');
      cy.contains('BD');
      cy.contains('COM').should('not.contain'); //à modif

      });

      it('Test du filtre département RT', () => {
        cy.wait(1000);
        cy.contains('Cours').click();
        // Appuyez sur la balise <a> "Filtre"
        cy.contains('Filtres').click();
      
        // Attendre que le menu "Matière" soit visible
        cy.get('.dropdown-menu').should('be.visible');
      
        // Déclencher le menu "Matière"
        cy.get('#departements').trigger('mouseover');
      
        // Attendre que le sous-menu "Matière" soit visible
        cy.get('#departements').should('be.visible');
      
        // Cliquez sur le sous-menu "math"
        cy.contains('RT').click({ force: true });
      
        // Vérification des modules
        cy.contains('BD');
        cy.contains('COM');
        cy.contains('MATRICE').should('not.contain');
        cy.contains('GRAPHES').should('not.contain');
      });
      it('Test de la barre de recherche', () => {
        cy.wait(1000);
        cy.contains('Cours').click();

        cy.get('#search').type('MATRICE').type('{enter}');
      
        cy.contains('MATRICE');
        cy.contains('COM').should('not.contain');
        cy.contains('MATRICE').should('not.contain');
        cy.contains('GRAPHES').should('not.contain');
     
      });

  
})
