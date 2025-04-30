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

describe('Visualizar Novos Filmes', () => {
    it('O administrador verifica se os novos filmes foram adicionados.', () => {
        cy.deleteAllUsers();
        cy.visit('cadastro');
        cy.switchToRegister();

        const adminUsername = 'admin_user';
        const adminEmail = 'admin_user@example.com';
        const adminPassword = 'adminPass123';

    
        cy.login(adminUsername, adminPassword);
        cy.get('[href="/filmes/"]').click();

        cy.get('[name="titulo"]').type('Um Filme Minecraft');
        cy.get('[name="diretor"]').type('Jared Hess');
        cy.get('[type="number"]').type('2025');
        cy.get('[name="genero"]').select('Aventura');
        cy.get('[name="tipo"]').select('Animação');
        cy.get('[name="sinopse"]').type('Um épico no universo de blocos onde tudo é possível.');
        cy.wait(4000);
        cy.get('[type="submit"]').click();
        cy.visit('/visuFilmeAdmin/');
        cy.wait(2000);
    });
    it('O administrador não consegue verificar se os novos filmes foram adicionados.', () => {
        cy.deleteAllUsers();
        cy.visit('cadastro');
        cy.switchToRegister();

        const adminUsername = 'admin_user';
        const adminEmail = 'admin_user@example.com';
        const adminPassword = 'adminPass123';

    
        cy.login(adminUsername, adminPassword);
        cy.get('[href="/filmes/"]').click();

        cy.get('[name="titulo"]').type('Um Filme Minecraft');
        cy.get('[name="diretor"]').type('Jared Hess');
        cy.get('[type="number"]').type('2025');
        cy.get('[name="genero"]').select('Aventura');
        cy.get('[name="tipo"]').select('Animação');
        cy.get('[name="sinopse"]').type('Um épico no universo de blocos onde tudo é possível.');
        cy.wait(4000);
        cy.get('[type="submit"]').click();
        cy.wait(2000);
    });
});
