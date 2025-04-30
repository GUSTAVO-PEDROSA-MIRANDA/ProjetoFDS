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

describe('Visualizar', () =>{
    it('O usuário deve visualizar os filmes que estão no catalogo', () =>{  
        cy.visit('cadastro')
        cy.login('testuser', 'password123');
        cy.get('[href="/visuFilmeUser/"]').click();
        cy.wait(2000);
    })
    it('O usuário deve visualizar os filmes que estão no catalogo e o sistema da um erro sem justificativa.', () =>{  
        cy.visit('cadastro')
        cy.login('testuser', 'password123');
        cy.wait(2000);
        

    })
})




