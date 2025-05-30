// cypress/support/commands.js

Cypress.Commands.add('deleteAllUsers', () => {
  cy.exec('python delect.py', { failOnNonZeroExit: false });
});

Cypress.Commands.add('switchToRegister', () => {
  cy.contains('a', 'Cadastre-se aqui').click();
});

Cypress.Commands.add('createUser', (username, email, password) => {
  cy.switchToRegister();

  cy.get('input[name="confirmarSenha"]', { timeout: 7000 }).should('be.visible');

  cy.get('form').within(() => {
    cy.get('input[name="nome"]').type(username);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="senha"]').type(password);
    cy.get('input[name="confirmarSenha"]').type(password);
    cy.get('input[type="submit"]').click();
  });
});

Cypress.Commands.add('login', (username, password) => {
  cy.get('input[name="nome"]').type(username);
  cy.get('input[name="senha"]').type(password);
  cy.get('input[type="submit"]').click();
});
