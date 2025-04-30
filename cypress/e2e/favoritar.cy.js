Cypress.Commands.add('deleteAllUsers', () => {
    cy.exec('python delect.py', { failOnNonZeroExit: false });
});

Cypress.Commands.add('login', (username, password) => {
    cy.visit('');
    cy.get('.container').within(() => {
    cy.visit('');
    cy.get('[type="text"]').type(username);
    cy.get('[type="password"]').type(password);
    cy.wait(2000);
    cy.get('[type="submit"]').click();
    });
});

Cypress.Commands.add('createUser', (username, email, password) => {
    cy.visit('cadastro');
    cy.switchToRegister();
    cy.get('.container').within(() => {
    cy.visit('cadastro');
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

describe('Favoritar', () =>{
    it('O usuário deve favoritar os filmes que estão disponiveis', () =>{
        cy.visit('cadastro')
        cy.login('testuser', 'password123');
        cy.visit('visuFilmeUser')
        cy.get(':nth-child(1) > :nth-child(5) > form > .btn-favoritar').click();
    });
    it('O usuário tenta favoritar o filme e não consegue', () =>{
        cy.visit('cadastro')
        cy.login('testuser', 'password123');
        cy.visit('visuFilmeUser')
    });
});    

