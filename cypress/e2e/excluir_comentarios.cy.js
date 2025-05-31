// Comando customizado para login
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/');  // Página de login conforme suas urls.py
  cy.get('.container').within(() => {
    cy.get('[type="text"]').type(username);
    cy.get('[type="password"]').type(password);
    cy.wait(2000);
    cy.get('[type="submit"]').click();
  });
});

describe('História 07 - Excluir comentários', () => {
  const user = {
    nome: 'Teste',
    senha: 'SenhaSegura123',
  };
    const admin = {
    nome: 'admin_user',
    senha: '123',
  };
beforeEach(() => {
    cy.login(admin.nome, admin.senha);
    cy.url().should('include', '/homeAdmin');
    cy.visit('/homeAdmin');  // Garantia de estar na página principal do usuário
  });
  it('Avaliação bem-sucedida', () => {
    cy.get('[href="/visuFilmeAdmin/"]').click();
    cy.visit('http://localhost:8000/visuFilmeAdmin/');
    cy.get(':nth-child(5) > .btn-comentarios').click();
    cy.visit('http://localhost:8000/filmes/12/visuComentarios/');
    cy.get(':nth-child(4) > form > .btn').click();
  });
});
