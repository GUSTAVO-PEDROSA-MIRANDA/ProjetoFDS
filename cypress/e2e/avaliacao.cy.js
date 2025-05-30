// Comando customizado para login (mantendo o que você já tem)
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/');
  cy.get('.container').within(() => {
    cy.get('[type="text"]').type(username);
    cy.get('[type="password"]').type(password);
    cy.wait(2000);
    cy.get('[type="submit"]').click();
  });
});

describe('História 03 - Avaliação e Comentários de Filmes', () => {
  const user = {
    nome: 'Teste',
    senha: 'SenhaSegura123',
  };

  beforeEach(() => {
    cy.login(user.nome, user.senha);
    cy.url().should('include', '/homeUser');
    cy.visit('/homeUser'); // Ajuste conforme a sua rota principal
    cy.get('[href="/visuFilmeUser/"]').click();
    cy.url().should('include', '/visuFilmeUser'); // Ajuste conforme necessário
  });

  it('Avaliação bem-sucedida', () => {
    cy.get(':nth-child(2) > :nth-child(8) > .btn-favoritar').click();
    cy.get('textarea').type('so um teste');
    cy.get('select').select('5 estrelas');
   
    cy.get('input.btn').click(); // Ajuste conforme o botão de confirmação

    cy.contains('Filme foi avaliado com sucesso!').should('be.visible');
  });

  it('Comentário em branco', () => {
    cy.get(':nth-child(2) > :nth-child(8) > .btn-favoritar').click();
    cy.get('select').select('5 estrelas');
    cy.get('input.btn').click(); // Ajuste conforme o botão de confirmação
  });
});
