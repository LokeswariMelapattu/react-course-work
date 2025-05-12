import { interceptIndefinitely, checkRequestStatus } from "../../support/utils";

const theGreatRandomString = Math.random().toString(36).substring(7);

describe('React Routing E2E Tests', () => {
    beforeEach(() => {
        cy.visit('/'); // Visit the homepage before each test
    });

    it('should navigate to the About page', () => {
        cy.contains('About').click();
        cy.url().should('include', '/about');
        cy.get('h1').should('contain', 'About Page');
    });

    it('should navigate to the Home page', () => {
        cy.contains('Home').click();
        cy.url().should('include', '/');
        cy.get('h1').should('contain', 'Home Page');
    });

    it('should display a 404 page for unknown routes', () => {
        cy.visit('/randompage');
        cy.get('h1').should('contain', '404');
    });

    it('should be able to navigate to the Posts', () => {
        cy.contains('Posts').click();
        cy.url().should('include', '/posts');
        cy.get('h1').should('contain', 'New Posts');
    });

});
