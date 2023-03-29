import { Given, When } from "@badeball/cypress-cucumber-preprocessor";

Given('user is on sepulsa page', () => {
    cy.visit("https://sepulsa.com");
});

When('user click beli pulsa button', () => {
    cy.get("#Pulsa").click();
});

When('user input nomor handphone', () => {
    cy.get("#phone_number").type("085732607215");
});

When('user choose and click nominal pulsa 5rb', () => {
    cy.get("#Indosat Rp5.000").click();
});