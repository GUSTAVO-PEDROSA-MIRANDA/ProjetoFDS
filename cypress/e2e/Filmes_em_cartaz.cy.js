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
describe('História 04 – Destaque de Filmes em Cartaz', () => {
  const user = {
    nome: 'Teste',
    senha: 'SenhaSegura123',
  };

  beforeEach(() => {
    cy.login(user.nome, user.senha);
    cy.url().should('include', '/homeUser');
  });

  it('Deve exibir os filmes em Cartaz ', () => {
    cy.visit('/homeUser');


  });

  it('Deve permitir acesso aos detalhes de um certo Filme', () => {
    cy.visit('/homeUser');

    cy.get('a[href="/filmes/verMaisMissaoImpossivelUser"]', { timeout: 10000 })
      .should('exist')
      .should('be.visible')
      .click();

    cy.url().should('include', '/filmes/verMaisMissaoImpossivelUser');
  });
});
