// ***********************************************
// Custom commands for Cypress
// ***********************************************

/**
 * Custom command to navigate to a specific page
 * @param {string} path - Path to navigate to (relative to baseUrl)
 */
Cypress.Commands.add('navigateTo', (path = '/') => {
  cy.visit(path);
});

/**
 * Custom command to verify page title
 * @param {string} expectedTitle - Expected page title
 */
Cypress.Commands.add('verifyPageTitle', (expectedTitle) => {
  cy.title().should('include', expectedTitle);
});

/**
 * Custom command to verify element visibility
 * @param {string} selector - Element selector
 */
Cypress.Commands.add('verifyElementVisible', (selector) => {
  cy.get(selector).should('be.visible');
});

/**
 * Custom command to verify text content
 * @param {string} selector - Element selector
 * @param {string} expectedText - Expected text content
 */
Cypress.Commands.add('verifyText', (selector, expectedText) => {
  cy.get(selector).should('contain.text', expectedText);
});

/**
 * Custom command to fill input field
 * @param {string} selector - Input field selector
 * @param {string} value - Value to fill
 */
Cypress.Commands.add('fillInput', (selector, value) => {
  cy.get(selector).clear().type(value);
});

/**
 * Custom command to select dropdown option
 * @param {string} selector - Dropdown selector
 * @param {string} value - Option value to select
 */
Cypress.Commands.add('selectOption', (selector, value) => {
  cy.get(selector).select(value);
});

/**
 * Custom command to click element with wait
 * @param {string} selector - Element selector
 */
Cypress.Commands.add('clickElement', (selector) => {
  cy.get(selector).should('be.visible').click();
});

/**
 * Custom command to generate unique email using timestamp
 * @param {string} baseEmail - Base email (e.g., 'john@test.com')
 * @returns {string} Unique email
 */
Cypress.Commands.add('generateUniqueEmail', (baseEmail) => {
  const timestamp = Date.now();
  const emailParts = baseEmail.split('@');
  return `${emailParts[0]}_${timestamp}@${emailParts[1]}`;
});

/**
 * Custom command to verify URL contains specific text
 * @param {string} urlFragment - URL fragment to check
 */
Cypress.Commands.add('verifyUrlContains', (urlFragment) => {
  cy.url().should('include', urlFragment);
});

/**
 * Custom command to wait for navigation
 */
Cypress.Commands.add('waitForNavigation', () => {
  cy.wait(1000); // Wait for navigation to complete
});

