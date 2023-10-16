describe('Test modifier vacataires', () => {
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
    cy.wait(1000);
    cy.get('#openModal').click();
    cy.contains('Supprimer').click();
    
  });
  it('Ajouter vacataire', () => {
    // Cliquez sur le bouton "Ajouter un vacataire"
    cy.get('[data-bs-toggle="modal"]').click();
    // Saisissez les informations dans le formulaire
    cy.get('#name').type('Enzo');
    cy.wait(100);
    cy.get('#lastName').type('Mancini');
    cy.wait(100);
    cy.get('#phone').type('01010101010');
    cy.wait(100);
    cy.get('#email').type('enzo@gmail.com');
    cy.wait(100);
    cy.get('#github').type('enzozozo');
    // Sélectionnez une compétence dans la liste déroulante
    cy.get('#skills').select(6);
    // Cliquez sur le bouton "Ajouter Compétence"
    cy.get('.btn-danger').contains('Ajouter Compétence').click();
    // Vérifiez que la compétence a été ajoutée
    cy.get('.skills-container').contains('Communication').should('be.visible');
    // Cliquez sur le deuxième bouton correspondant à la classe .btn-primary qui contient le texte "Ajouter"
    cy.get('.btn-primary').contains('Ajouter').click();
    cy.reload();
    // Vérifiez que le formulaire a été soumis avec succès
  });
  it('Modifier vacataire', () => {
    cy.wait(1000);
    cy.get('#openModal').click();
    cy.wait(100);
    cy.get('.name').should('contain', 'Enzo');
    cy.contains('Modifier').click();
    cy.wait(1000);
    cy.get('#name').clear().type('Bastien');
    cy.wait(100);
    cy.get('#lastName').clear().type('Balmes');
    cy.get('#phone').clear().type('0202020202020');
    cy.get('#email').clear().type('bastien@gmail.com');
    cy.get('#github').clear().type('GitHubTest');
    // Cliquez ur le deuxième bouton correspondant à la classe .btn-primary qui contient le texte "Ajouter"
    cy.get('.btn-primary').contains('Modifier le vacataire').click();
    cy.reload();
    cy.get('.name').should('contain', 'Bastien Balmes');
    cy.contains('Enzo').should('not.exist');
  });

  
})
