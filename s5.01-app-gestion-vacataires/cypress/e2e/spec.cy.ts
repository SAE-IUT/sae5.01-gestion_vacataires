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
  it('Supprimer vacataire', () => {
    cy.get('#openModal').click();
    cy.contains('Supprimer').click();
    cy.contains('Bastien').should('not.exist');


  });
  it('Ajouter vacataire', () => {
  
    // Cliquez sur le bouton "Ajouter un vacataire"
    cy.get('[data-bs-toggle="modal"]').click();
  
    // Saisissez les informations dans le formulaire
    cy.get('#name').type('Bastien');
    cy.wait(100);
    cy.get('#lastName').type('Balmes');
    cy.wait(100);
    cy.get('#phone').type('060606060606');
    cy.wait(100);
    cy.get('#email').type('bastien@gmail.com');
    cy.wait(100);
    cy.get('#github').type('Noix2zekoko');
  
    // Sélectionnez une compétence dans la liste déroulante
    cy.get('#skills').select(6);
    
    // Cliquez sur le bouton "Ajouter Compétence"
    cy.get('.btn-danger').contains('Ajouter Compétence').click();
  
    // Vérifiez que la compétence a été ajoutée
    cy.get('.skills-container').contains('Communication').should('be.visible');
  
    // Cliquez sur le bouton correspondant à la classe .btn-primary qui contient le texte "Ajouter"
    cy.get('.btn-primary').contains('Ajouter').click();

    cy.reload();
  
    // Vérifiez que le formulaire a été soumis avec succès
    cy.contains('Bastien');
  });
  it('Lire vacataire', () => {
    cy.contains('bastien@gmail.com');
    
  });
  it('Supprimer module', () => {
    cy.wait(1000);
    cy.contains('Cours').click();
    cy.get('#openModal').click();
    cy.contains('Supprimer').click();
    cy.contains('Base de données relationnelle').should('not.exist');
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
    cy.contains('Base de données relationnelle');
  });
  it('Lire vacataire', () => {
    cy.wait(1000);
    cy.contains('Cours').click();
    cy.contains('BD');
    
  });
  it('Affecter vacataire', () => {
    cy.wait(1000);
    cy.get('#openModal').click();
    cy.wait(100);
    cy.contains('Affecter').click();
    cy.get('#nomCours').select(1);
    cy.get('.btn-primary').contains('Valider').click();
  });
it('Désaffecter vacataire', () => {
  cy.wait(1000);
  cy.get('#openModal').click();

  // Vérifier que le premier modal est fermé
  cy.get('#exampleModalToggle2').should('not.exist');

  cy.wait(100);
  cy.contains('Désaffecter').click();

  // Attendre un court instant pour que le modal de désaffectation s'ouvre
  cy.wait(500);

  cy.get('select#nomCourse').select(1);
  cy.get('#validModal').click();
});

  // it('Ouvrir le modal du vacataire', () => {
  //   cy.get('#openModal').click();
  // });
})
