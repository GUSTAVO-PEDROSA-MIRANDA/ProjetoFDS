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

describe('História 05 – Busca e Filtros', () => {
  const user = {
    nome: 'Teste',
    senha: 'SenhaSegura123',
  };
    const admin = {
    nome: 'admin_user',
    senha: '123',
  };

  beforeEach(() => {
    cy.login(user.nome, user.senha);
    cy.url().should('include', '/homeUser');
    cy.visit('/homeUser');  // Garantia de estar na página principal do usuário
  });

  it('Deve realizar uma busca sem resultados', () => {
    cy.get('[href="/visuFilmeUser/"]').click();
    cy.visit('http://localhost:8000/visuFilmeUser/')
  });


  it('Busca com Resultados', () => {
  // Logout do usuário
  cy.get('[href="/sair/"]').click();  // Usando o href correto

  // Login como admin
  cy.login(admin.nome, admin.senha);
  cy.url().should('include', '/homeAdmin');
  cy.visit('/homeAdmin'); // Ajuste conforme a home de admin

  cy.get('[href="/filmes/"]').click();

  cy.get('input[name="titulo"]').type('FilmeTeste');
  cy.get('input[name="sinopse"]').type('Uma sinopse de teste para o filme.');
  cy.get('[name="genero"]').select('Ação');
  cy.get('[name="diretor"]').type('Diretor Teste');
  cy.get('[type="number"]').type('2025');
  cy.get('#labelCartaz').attachFile('poster.jpg');
  cy.get('[name="tipo"]').select('Animação')


  cy.get('input.btn1').click();

  });
})