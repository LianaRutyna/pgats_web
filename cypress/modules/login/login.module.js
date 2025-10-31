/**
 * Login Module
 * Contains all actions related to user login
 */

class LoginModule {
  // Selectors
  selectors = {
    loginEmail: '[data-qa="login-email"]',
    loginPassword: '[data-qa="login-password"]',
    loginButton: '[data-qa="login-button"]',
    loginFormTitle: '.login-form h2',
    errorMessage: '.login-form p',
  };

  /**
   * Fill login email field
   * @param {string} email - User's email
   */
  fillLoginEmail(email) {
    cy.get(this.selectors.loginEmail).clear().type(email);
  }

  /**
   * Fill login password field
   * @param {string} password - User's password
   */
  fillLoginPassword(password) {
    cy.get(this.selectors.loginPassword).clear().type(password);
  }

  /**
   * Click login button
   */
  clickLoginButton() {
    cy.get(this.selectors.loginButton).click();
  }

  /**
   * Complete login form
   * @param {string} email - User's email
   * @param {string} password - User's password
   */
  completeLoginForm(email, password) {
    this.fillLoginEmail(email);
    this.fillLoginPassword(password);
    this.clickLoginButton();
  }

  /**
   * Get login form title
   */
  getLoginFormTitle() {
    return cy.get(this.selectors.loginFormTitle);
  }

  /**
   * Get error message
   */
  getErrorMessage() {
    return cy.get(this.selectors.errorMessage);
  }
}

export default new LoginModule();

