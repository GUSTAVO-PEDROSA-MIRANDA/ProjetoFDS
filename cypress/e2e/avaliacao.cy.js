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

describe('História 03 – Avaliação e Comentários de Filmes', () => {
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

  it('Nota fora do intervalo permitido', () => {
    cy.get('input[name="nota"]').clear().type('6'); // Nota inválida
    cy.get('button#confirmarAvaliacao').click();

    cy.contains('A nota deve estar entre 1 e 5').should('be.visible');
  });

  it('Comentário salvo com sucesso', () => {
    cy.get('textarea[name="comentario"]').type('Filme muito bom, recomendo!');
    cy.get('button#confirmarComentario').click();

    cy.contains('Comentário salvo com sucesso').should('be.visible');
    cy.contains('Filme muito bom, recomendo!').should('be.visible');
  });

  it('Comentário em branco', () => {
    cy.get('textarea[name="comentario"]').clear();
    cy.get('button#confirmarComentario').click();

    cy.contains('O campo de comentário é obrigatório').should('be.visible');
  });
});
