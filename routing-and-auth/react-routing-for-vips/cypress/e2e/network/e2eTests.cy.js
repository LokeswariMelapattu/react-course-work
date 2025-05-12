import posts from "../../fixtures/posts.json";
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

    it('should handle form submission correctly', () => {
        cy.contains('Register').click();
        cy.get('input[name="username"]').type('Charize Doe');
        cy.get('input[name="password"]').type('justsomepassword');
        cy.get('button[type="submit"]').click();
        cy.get('h1').should('contain', 'VIP Area');
    });

    it('should restrict access to protected routes', () => {
        cy.visit('/vip/posts');
        cy.url().should('include', '/login');
        cy.get('h1').should('contain', 'Login Page');
    });

    it('should be able to navigate to the VIP Posts page after login', () => {
        const username = `user${theGreatRandomString}`;
        const password = `password${theGreatRandomString}`;
        cy.visit('/register');
        cy.get('input[name="username"]').type(username);
        cy.get('input[name="password"]').type(password);
        cy.get('button[type="submit"]').click();
        cy.visit('/login');
        cy.get('input[name="username"]').type(username);
        cy.get('input[name="password"]').type(password);
        cy.get('button[type="submit"]').click();
        cy.contains('VIP Posts').click();
        cy.url().should('include', '/vip/posts');
        cy.get('h1').should('contain', 'VIP Posts');
    });
});
