/// <reference types="cypress" />

describe('RegisterForm Component', () => {
    const storyUrl = '/iframe.html?id=components-loginform--default';

    it('renders the form and expected fields', () => {
        cy.visit(storyUrl);

        cy.get('form', { timeout: 10000 }).should('exist');
        cy.get('input#email, input[name="email"]').should('exist').and('be.visible');
        cy.get('input#password, input[name="password"]').should('exist').and('be.visible');
    });

    it('fills and submits the form', () => {
        cy.visit(storyUrl);

        const email = 'test@example.com';
        const password = 'StrongPass123!';

        cy.get('input#email, input[name="email"]').clear().type(email);
        cy.get('input#password, input[name="password"]').clear().type(password);

        cy.get('button[type="submit"]').click();

        cy.get('form').should('exist');
        cy.get('button[type="submit"]').should('be.visible');
    });

    it('displays validation UI when email is empty', () => {
        cy.visit(storyUrl);

        cy.get('input#email, input[name="email"]').clear();
        cy.get('input#password, input[name="password"]').clear()

        cy.get('button[type="submit"]').click();

        cy.contains('Email inválido, informe um email com formato correto').should('exist').and('be.visible');
    });

    it('displays validation UI when email is invalid', () => {
        cy.visit(storyUrl);

        cy.get('input#email, input[name="email"]').clear().type('invalid-email');
        cy.get('input#password, input[name="password"]').clear()

        cy.get('button[type="submit"]').click();

        cy.contains('Email inválido, informe um email com formato correto').should('exist').and('be.visible');
    });

    it('displays validation UI when password is not fill', () => {
        cy.visit(storyUrl);

        cy.get('input#email, input[name="email"]').clear().type('valid@email.com');
        cy.get('input#password, input[name="password"]').clear()

        cy.get('button[type="submit"]').click();

        cy.contains('Senha é obrigatória').should('exist').and('be.visible');
    });

    it('toggles password visibility when the button is clicked', () => {
        cy.visit(storyUrl);

        const passwordInputSelector = 'input#password, input[name="password"]';
        const toggleButtonSelector = 'button[aria-label="Botão Ocultar ou mostrar senha"]';

        cy.get(passwordInputSelector).should('have.attr', 'type', 'password');

        cy.get(toggleButtonSelector).click();
        cy.get(passwordInputSelector).should('have.attr', 'type', 'text');

        cy.get(toggleButtonSelector).click();
        cy.get(passwordInputSelector).should('have.attr', 'type', 'password');
    });

    Cypress.on('uncaught:exception', (err) => {
        if (err.message.includes('The user aborted a request')) {
            return false;
        }
        return true;
    });
})