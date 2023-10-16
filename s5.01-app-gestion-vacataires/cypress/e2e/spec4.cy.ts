describe('Test de modification du compte', () => {
  it('Connexion', () => {
    cy.visit('/')
    cy.get('#pseudo').type('admin');
    cy.get('#password').type('testps');

    // Vérifiez que les champs contiennent les données saisies
    cy.get('#pseudo').should('have.value', 'admin');
    cy.get('#password').should('have.value', 'testps');

    cy.contains('Connexion').click();
  })
  it('Erreur dans les informations', () => {
    cy.visit('/')
    cy.get('#pseudo').type('admin');
    cy.get('#password').type('testpp');


    cy.contains('Connexion').click();
    cy.wait(1000);
    cy.contains('Identifiants invalides').click();
  })
  it('Modifier information compte', () => {
    cy.visit('/')
    cy.get('#pseudo').type('admin');
    cy.get('#password').type('testps');


    cy.contains('Connexion').click();
    cy.wait(1000);
    cy.contains('Profil').click();
    cy.get('#password').type('testps');
    cy.get('#newPassword').type('testpp');
    cy.get('.btn-primary').click();
  });
  it('Vérification mot de passe changer', () => {
    cy.visit('/')
    cy.get('#pseudo').type('admin');
    cy.get('#password').type('testps');

    cy.contains('Connexion').click();
    cy.wait(1000);
    cy.contains('Identifiants invalides').click();
  });
  it('Connexion nouveau mot de passe', () => {
    cy.visit('/')
    cy.get('#pseudo').type('admin');
    cy.get('#password').type('testpp');

    cy.contains('Connexion').click();
    cy.wait(1000);
    cy.contains('Bastien');
  });


})
