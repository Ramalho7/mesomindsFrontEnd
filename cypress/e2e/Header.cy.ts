/// <reference types="cypress" />

describe('Header Component', () => {
    it('Should render the dropdown menu', () => {
        cy.visit('/iframe.html?id=components-header--logged-in');

        cy.get('[aria-label="Abrir menu do usuário"]', { timeout: 10000 }).click();

        cy.get('[aria-label="Links do menu do usuário"]').should('be.visible');

        cy.contains('Perfil').should('be.visible');
        cy.contains('Configurações').should('be.visible');
        cy.contains('Flashcards').should('be.visible');
        cy.contains('Sair').should('be.visible');
    })

    it('Should navigate to the correct pages when clicking on navigation links', () => {
        cy.visit('/iframe.html?id=components-header--logged-in');

        cy.contains('Simulados').click();
        cy.url().should('include', '/simulados');

        cy.contains('Questões').click();
        cy.url().should('include', '/questoes');

        cy.contains('Conteúdos').click();
        cy.url().should('include', '/conteudos');

        cy.contains('Provas').click();
        cy.url().should('include', '/provas');
    });

    it('Should display the login button when the user is not authenticated', () => {
        cy.visit('/iframe.html?id=components-header--logged-out');

        cy.contains('Entrar').should('be.visible').click();
        cy.url().should('include', '/login');
    });

    it.skip('Should open the sidebar menu on small screens', () => {
        cy.viewport('iphone-6'); 
        cy.visit('/iframe.html?id=components-header--logged-in');

        cy.get('[data-testid="sidebar-trigger"]').click();
        
        cy.get('[data-testid="sidebar-content"]').should('be.visible');
    });

    it.skip('Should logout when clicking the logout button in sidebar', () => {
        cy.viewport('iphone-6'); 
        cy.visit('/iframe.html?id=components-header--logged-in');

        cy.get('[data-testid="sidebar-trigger"]').click();
        cy.get('[data-testid="sidebar-logout-button"]').click();
        cy.url().should('include', '/login');
    });
})