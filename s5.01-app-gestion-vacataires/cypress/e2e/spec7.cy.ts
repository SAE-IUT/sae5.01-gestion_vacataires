describe('Test des REGEX vacataires', () => {
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
  it('Test regex du nom dans le formulaire (chiffre)', () => {
    // Cliquez sur le bouton "Ajouter un vacataire" pour ouvrir le modal
    cy.get('[data-bs-toggle="modal"]').click({ waitForAnimations: false });
  
    cy.wait(100);
    cy.get('[data-cy=name-input]').type('John06');
    cy.wait(100);
    cy.get('[data-cy=last-name-input]').type('Balmes');
    cy.wait(100);
    cy.get('[data-cy=phone-input]').type('0606060606');
    cy.wait(100);
    cy.get('[data-cy=email-input]').type('bastien@gmail.com');

    cy.contains('Le prénom ne doit avoir que des lettres !');
    // Vérifie que le bouton est désactiver
    cy.get('[data-cy=ajouter-input]').should('be.disabled');
  });
  it('Test regex du nom dans le formulaire (caractère spéciaux)', () => {
    // Cliquez sur le bouton "Ajouter un vacataire" pour ouvrir le modal
    cy.get('[data-bs-toggle="modal"]').click({ waitForAnimations: false });
  
    cy.wait(100);
    cy.get('[data-cy=name-input]').type('John*/°=$');
    cy.wait(100);
    cy.get('[data-cy=last-name-input]').type('Balmes');
    cy.wait(100);
    cy.get('[data-cy=phone-input]').type('0606060606');
    cy.wait(100);
    cy.get('[data-cy=email-input]').type('bastien@gmail.com');

    cy.contains('Le prénom ne doit avoir que des lettres !');
    // Vérifie que le bouton est désactiver
    cy.get('[data-cy=ajouter-input]').should('be.disabled');
  });
  it('Test regex du prénom dans le formulaire(chiffre)', () => {
    // Cliquez sur le bouton "Ajouter un vacataire" pour ouvrir le modal
    cy.get('[data-bs-toggle="modal"]').click({ waitForAnimations: false });
  
    cy.wait(100);
    cy.get('[data-cy=name-input]').type('John');
    cy.wait(100);
    cy.get('[data-cy=last-name-input]').type('Balmes06');
    cy.wait(100);
    cy.get('[data-cy=phone-input]').type('0606060606');
    cy.wait(100);
    cy.get('[data-cy=email-input]').type('bastien@gmail.com');

    cy.contains('Le nom de famille ne doit avoir que des lettres !');
    // Vérifie que le bouton est désactiver
    cy.get('[data-cy=ajouter-input]').should('be.disabled');
  });
  it('Test regex du prénom dans le formulaire(caractère spéciaux)', () => {
    // Cliquez sur le bouton "Ajouter un vacataire" pour ouvrir le modal
    cy.get('[data-bs-toggle="modal"]').click({ waitForAnimations: false });
  
    cy.wait(100);
    cy.get('[data-cy=name-input]').type('John');
    cy.wait(100);
    cy.get('[data-cy=last-name-input]').type('Balmes*/*/$*ù');
    cy.wait(100);
    cy.get('[data-cy=phone-input]').type('0606060606');
    cy.wait(100);
    cy.get('[data-cy=email-input]').type('bastien@gmail.com');

    cy.contains('Le nom de famille ne doit avoir que des lettres !');
    // Vérifie que le bouton est désactiver
    cy.get('[data-cy=ajouter-input]').should('be.disabled');
  });

  it('Test regex du téléphone dans le formulaire', () => {
    // Cliquez sur le bouton "Ajouter un vacataire" pour ouvrir le modal
    cy.get('[data-bs-toggle="modal"]').click({ waitForAnimations: false });
  
    cy.wait(100);
    cy.get('[data-cy=name-input]').type('John');
    cy.wait(100);
    cy.get('[data-cy=last-name-input]').type('Balmes');
    cy.wait(100);
    cy.get('[data-cy=phone-input]').type('fghfgh');
    cy.wait(100);
    cy.get('[data-cy=email-input]').type('bastien@gmail.com');

    cy.contains('Le numéro doit être au format FR (sans espace)!');
    // Vérifie que le bouton est désactiver
    cy.get('[data-cy=ajouter-input]').should('be.disabled');
  });
  it('Test regex du téléphone dans le formulaire', () => {
    // Cliquez sur le bouton "Ajouter un vacataire" pour ouvrir le modal
    cy.get('[data-bs-toggle="modal"]').click({ waitForAnimations: false });
  
    cy.wait(100);
    cy.get('[data-cy=name-input]').type('John');
    cy.wait(100);
    cy.get('[data-cy=last-name-input]').type('Balmes');
    cy.wait(100);
    cy.get('[data-cy=phone-input]').type('0606060606');
    cy.wait(100);
    cy.get('[data-cy=email-input]').type('bastiengmailcom');

    cy.contains('L\'adresse email n\'est pas valide !');
    // Vérifie que le bouton est désactiver
    cy.get('[data-cy=ajouter-input]').should('be.disabled');
  });
  it('Test regex tous fonctionnel', () => {
    // Cliquez sur le bouton "Ajouter un vacataire" pour ouvrir le modal
    cy.get('[data-bs-toggle="modal"]').click({ waitForAnimations: false });
  
    cy.wait(100);
    cy.get('[data-cy=name-input]').type('John');
    cy.wait(100);
    cy.get('[data-cy=last-name-input]').type('Balmes');
    cy.wait(100);
    cy.get('[data-cy=phone-input]').type('0606060606');
    cy.wait(100);
    cy.get('[data-cy=email-input]').type('bastien@gmail.com');

    // Vérifie que le bouton est désactiver
    cy.get('[data-cy=ajouter-input]').click();
    cy.reload();
    cy.contains('John');
  });
  
  
  
})