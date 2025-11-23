/// <reference types="cypress" />

describe('RegisterForm Component', () => {
    const storyUrl = '/iframe.html?id=components-registerform--default';

    const selectTipoDropdown = (optionText = 'Aluno') => {
        cy.get('#tipo').should('exist').click(); 
        cy.contains('[role="option"]', optionText).should('exist').click(); 
    };

    it('renders the form and expected fields', () => {
        cy.visit(storyUrl);

        cy.get('form', { timeout: 10000 }).should('exist');
        cy.get('input#nome, input[name="nome"]').should('exist').and('be.visible');
        cy.get('input#email, input[name="email"]').should('exist').and('be.visible');
        cy.get('input#password, input[name="password"]').should('exist').and('be.visible');
        cy.get('input#password_confirmation, input[name="password_confirmation"]').should('exist').and('be.visible');
        cy.get('#tipo').should('exist').and('be.visible');
        cy.get('button[type="submit"]').should('exist').and('be.visible');
    });

    it('fills and submits the form', () => {
        cy.visit(storyUrl);

        const name = 'Test User';
        const email = 'test@example.com';
        const password = 'StrongPass123!';

        cy.get('input#nome, input[name="nome"]').clear().type(name);
        cy.get('input#email, input[name="email"]').clear().type(email);
        cy.get('input#password, input[name="password"]').clear().type(password);
        cy.get('input#password_confirmation, input[name="password_confirmation"]').clear().type(password);

        selectTipoDropdown('Aluno');

        cy.get('button[type="submit"]').click();

        cy.get('form').should('exist');
        cy.get('button[type="submit"]').should('be.visible');
    });

    it('displays validation UI for invalid email', () => {
        cy.visit(storyUrl);

        cy.get('input#nome, input[name="nome"]').clear().type('Test User');
        cy.get('input#email, input[name="email"]').clear().type('invalid-email');
        cy.get('input#password, input[name="password"]').clear().type('StrongPass123!');
        cy.get('input#password_confirmation, input[name="password_confirmation"]').clear().type('StrongPass123!');

        selectTipoDropdown('Aluno');

        cy.get('button[type="submit"]').click();

        cy.contains('O e-mail está fora do padrão').should('exist').and('be.visible');
    });

    it('displays "O nome é obrigatório" when nome is not filled', () => {
        cy.visit(storyUrl);

        cy.get('input#nome, input[name="nome"]').clear();
        cy.get('input#email, input[name="email"]').clear().type('valid@example.com');
        cy.get('input#password, input[name="password"]').clear().type('StrongPass123!');
        cy.get('input#password_confirmation, input[name="password_confirmation"]').clear().type('StrongPass123!');

        selectTipoDropdown('Aluno');

        cy.get('button[type="submit"]').click();

        cy.contains('O nome é obrigatório').should('exist').and('be.visible');
    });

    it('displays "A senha deve ter no mínimo 8 caracteres" when password is too short', () => {
        cy.visit(storyUrl);

        cy.get('input#nome, input[name="nome"]').clear().type('Test User');
        cy.get('input#email, input[name="email"]').clear().type('valid@example.com');
        cy.get('input#password, input[name="password"]').clear().type('12345');
        cy.get('input#password_confirmation, input[name="password_confirmation"]').clear().type('12345');

        selectTipoDropdown('Aluno');

        cy.get('button[type="submit"]').click();

        cy.contains('A senha deve ter no mínimo 8 caracteres').should('exist').and('be.visible');
    });

    it('displays "As senhas não conferem" when password_confirmation is not same', () => {
        cy.visit(storyUrl);

        cy.get('input#nome, input[name="nome"]').clear().type('Test User');
        cy.get('input#email, input[name="email"]').clear().type('valid@example.com');
        cy.get('input#password, input[name="password"]').clear().type('123456789'); 
        cy.get('input#password_confirmation, input[name="password_confirmation"]').clear().type('12345678');

        selectTipoDropdown('Aluno');

        cy.get('button[type="submit"]').click();

        cy.contains('As senhas não conferem').should('exist').and('be.visible');
    });

    Cypress.on('uncaught:exception', (err) => {
        if (err.message.includes('The user aborted a request')) {
            return false;
        }
        return true;
    });
});