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
  it('Supprimer module', () => {
    cy.wait(1000);
    cy.contains('Cours').click();
    cy.get('#openModal').click();
    cy.contains('Supprimer').click();
    
  });
  it('Ajouter module', () => {
    cy.wait(1000);
    cy.contains('Cours').click();
    cy.contains('Ajouter un module').click();
    cy.wait(1000);
    cy.get('#name').type('Base de données relationnelle');
    cy.wait(100);
    cy.get('#name_reduit').type('BD');
    cy.get('#departement').select(['INFO', 'RT']); // Sélectionnez les départements de votre choix
    cy.get('#matiere').type('Base de données');
    // Vous pouvez également tester la sélection de la couleur
    cy.get('#color_hexa').invoke('val', '#00FF00').trigger('input');

    // Cliquez sur le bouton "Ajouter" pour soumettre le formulaire
    cy.get('.btn-primary').contains('Ajouter').click();
    cy.wait(1000);
  });

  it('Modifier module', () => {
    cy.wait(1000);
    cy.contains('Cours').click();
    cy.contains('Base de données relationnelle');
    cy.get('#openModal').click();
    cy.contains('Modifier').click();
    cy.wait(1000);
    cy.get('#name').clear().type('Dev java');
    cy.wait(100);
    cy.get('#name_reduit').clear().type('DEV');
    cy.wait(100);
    cy.get('#matiere').clear().type('DEV');

    // Vous pouvez également tester la sélection de la couleur
    cy.get('#color_hexa').invoke('val', '#FF0000').trigger('input');

    // Cliquez sur le bouton "Ajouter" pour soumettre le formulaire
    cy.get('.btn-primary').contains('Valider').click();
    cy.wait(1000);
    cy.contains('Dev java');
    cy.contains('Base de données relationnelle').should('not.exist');
    
  });
})
