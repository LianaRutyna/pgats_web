/**
 * Signup Module
 * Contains all actions related to the signup form (initial step)
 */

class SignupModule {
  // Selectors
  selectors = {
    signupName: '[data-qa="signup-name"]',
    signupEmail: '[data-qa="signup-email"]',
    signupButton: '[data-qa="signup-button"]',
    signupFormTitle: '.signup-form h2',
  };

  /**
   * Fill signup name field
   * @param {string} name - User's name
   */
  fillSignupName(name) {
    cy.get(this.selectors.signupName).clear().type(name);
  }

  /**
   * Fill signup email field
   * @param {string} email - User's email
   */
  fillSignupEmail(email) {
    cy.get(this.selectors.signupEmail).clear().type(email);
  }

  /**
   * Click signup button
   */
  clickSignupButton() {
    cy.get(this.selectors.signupButton).click();
  }

  /**
   * Complete signup form
   * @param {string} name - User's name
   * @param {string} email - User's email
   */
  completeSignupForm(name, email) {
    this.fillSignupName(name);
    this.fillSignupEmail(email);
    this.clickSignupButton();
  }

  /**
   * Get signup form title element
   */
  getSignupFormTitle() {
    return cy.get(this.selectors.signupFormTitle);
  }
}

export default new SignupModule();

