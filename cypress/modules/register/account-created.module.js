/**
 * Account Created Module
 * Contains all actions related to the account created confirmation page
 */

class AccountCreatedModule {
  // Selectors
  selectors = {
    pageTitle: '[data-qa="account-created"]',
    continueButton: '[data-qa="continue-button"]',
    successMessage: '.pull-right .btn-primary',
  };

  /**
   * Get page title element
   */
  getPageTitle() {
    return cy.get(this.selectors.pageTitle);
  }

  /**
   * Click continue button
   */
  clickContinue() {
    cy.get(this.selectors.continueButton).click();
  }
}

export default new AccountCreatedModule();

