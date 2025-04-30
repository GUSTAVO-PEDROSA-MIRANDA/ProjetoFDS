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

describe('Desfavoritar Filme', () =>{
    it('O usuário deve visualizar seus Filmes Favoritados e Desfavoritar', () =>{
        cy.visit('verFavoritos')
        cy.login('testuser', 'password123');
        cy.visit('visuFilmeUser')
        cy.get(':nth-child(1) > :nth-child(5) > form > .btn-favoritar').click();
        cy.wait(4000);
        cy.get('.btn').click();
        cy.wait(2000);
        cy.get('[href="/verFavoritos/"]').click();
        cy.wait(4000);
        cy.get('.btn').click();
        cy.get('[href="/visuFilmeUser/"]').click();
        cy.wait(4000);
        cy.get(':nth-child(1) > :nth-child(5) > form > .btn-favoritar').click();
        cy.get('.btn').click();
        cy.wait(3000);
        cy.get('[href="/verFavoritos/"]').click()
        });
        it('O usuário deve visualizar seus Filmes Favoritados e não consegue Desfavoritar', () =>{
            cy.visit('verFavoritos')
            cy.login('testuser', 'password123');
            cy.visit('visuFilmeUser')
            cy.get(':nth-child(1) > :nth-child(5) > form > .btn-favoritar').click();
            cy.wait(4000);
            cy.get('.btn').click();
            cy.wait(2000);
            cy.get('[href="/verFavoritos/"]').click();
            cy.wait(4000);
            cy.get('.btn').click();
            cy.get('[href="/visuFilmeUser/"]').click();
           
            });
    

});    