describe('Visualizar', () => {
    it('Usuário deve se cadastrar, fazer login e visualizar os filmes em cartaz', () => {
        cy.visit('/cadastro');

        // Clica no link "Cadastre-se" (alterna formulário via JS)
        cy.get('p > a').first().click();

        // Aguarda transição e exibição do campo de confirmação de senha
        cy.get('[name="confirmarSenha"]', { timeout: 7000 }).should('exist').and('be.visible');

        // Preenche e envia o formulário de cadastro
        cy.get('.container').within(() => {
            cy.get('[type="text"]').type('testuser');
            cy.get('[type="email"]').type('testuser@email.com');
            cy.get('[name="senha"]').type('password123');
            cy.get('[name="confirmarSenha"]').type('password123');
            cy.wait(500);
            cy.get('[type="submit"]').click();
        });

        // Retorna à tela de login
        cy.visit('/cadastro');

        // Login com o usuário recém-cadastrado
        cy.get('.container').within(() => {
            cy.get('[type="text"]').type('testuser');
            cy.get('[type="password"]').type('password123');
            cy.wait(500);
            cy.get('[type="submit"]').click();
        });

        // Verifica que chegou na tela homeUser
        cy.url().should('include', '/homeUser');

        // Clica para visualizar filmes
        cy.get('[href="/visuFilmeUser/"]').should('be.visible').click();
        cy.wait(1000);

        // Confirma que está vendo os filmes (ajuste o texto conforme seu conteúdo)
        cy.get('body').should('contain.text', 'Filme');
    });
});
