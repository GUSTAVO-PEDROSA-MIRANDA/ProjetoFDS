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

Cypress.Commands.add('switchToRegister', () => {
    cy.get('p > a').click();
});

describe('Administrador Adicionando Novos Filmes', () => {
    it('O administrador vai visualizar os filmes adicionados e vai deletar o filme.', () => {
        cy.deleteAllUsers();
        cy.visit('cadastro');
        cy.switchToRegister();

        const adminUsername = 'admin_user';
        const adminEmail = 'admin_user@example.com';
        const adminPassword = 'adminPass123';

    
        cy.login(adminUsername, adminPassword);
        cy.get('[href="/visuFilmeAdmin/"]').click();
        cy.wait(2000);
        cy.get('.btn1').click();
        cy.wait(2000);
        cy.get('.btn').click();
    });
    it('O administrador vai visualizar os filmes adicionados e não vai ter nada', () => {
            cy.deleteAllUsers();
            cy.visit('cadastro');
            cy.switchToRegister();
    
            const adminUsername = 'admin_user';
            const adminEmail = 'admin_user@example.com';
            const adminPassword = 'adminPass123';
    
        
            cy.login(adminUsername, adminPassword);
            cy.get('[href="/visuFilmeAdmin/"]').click();

        });  
});
