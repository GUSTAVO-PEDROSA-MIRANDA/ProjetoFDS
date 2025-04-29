Cypress.Commands.add('deleteAllUsers', () => {
    cy.exec('python delect.py', { failOnNonZeroExit: false });
});

Cypress.Commands.add('login', (username, password) => {
    cy.visit('');
    cy.get('.sign_in form').within(() => {
    cy.visit('');
    cy.get('[type="text"]').type(username);
    cy.get('[type="password"]').type(password);
    cy.wait(2000);
    cy.get('[type="submit"]').click();
    });
});

Cypress.Commands.add('createUser', (username, email, password) => {
    cy.visit('Cadastro');
    cy.switchToRegister();
    cy.get('.sign_up form').within(() => {
    cy.visit('Cadastro');
    cy.get('[type="text"]').type(username);
    cy.get('[type="email"]').type(email);
    cy.get('[name="senha"]').type(password);
    cy.get('[name="confirmarSenha"]').type(password);
    cy.wait(2000);
    cy.get('[type="submit"]').click();
    });
});

Cypress.Commands.add('switchToRegister', () => {
    cy.get('p > a').click();
});

describe('User flow', () => {
    it('should delete all users, create a new user, and login', () => {
        cy.deleteAllUsers();

        cy.visit('Cadastro')

        cy.switchToRegister();

        cy.createUser('testuser', 'testuser@example.com', 'password123');

        cy.login('testuser', 'password123');

    });
});
