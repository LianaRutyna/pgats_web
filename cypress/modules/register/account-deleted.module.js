/**
 * Account Deleted Module
 * Contains all actions related to the account deleted confirmation page
 */

class AccountDeletedModule {
  // Selectors
  selectors = {
    pageTitle: '[data-qa="account-deleted"]',
    continueButton: '[data-qa="continue-button"]',
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

export default new AccountDeletedModule();

