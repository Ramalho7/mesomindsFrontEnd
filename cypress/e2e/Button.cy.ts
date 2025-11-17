/// <reference types="cypress" />

describe('Button Component', () => {
  it('Should render the default button', () => {
    cy.visit('/iframe.html?id=components-button--default');

    cy.get('button').should('be.visible');

    cy.get('button').should('contain', 'Texto do Botão');
  });

  it('Should handle the disabled state', () => {
    cy.visit('/iframe.html?id=components-button--disabled');

    cy.get('button').should('be.disabled');
  });
});