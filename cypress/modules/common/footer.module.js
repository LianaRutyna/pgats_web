/**
 * Footer Module
 * Contains all actions related to the website footer
 */

class FooterModule {
  // Selectors
  selectors = {
    footer: 'footer',
    subscriptionTitle: '.single-widget h2',
    subscriptionEmail: '#susbscribe_email',
    subscriptionButton: '#subscribe',
    subscriptionSuccessMessage: '#success-subscribe .alert-success',
  };

  /**
   * Scroll to footer
   */
  scrollToFooter() {
    cy.get(this.selectors.footer).scrollIntoView();
  }

  /**
   * Verify subscription title is visible
   */
  verifySubscriptionTitle() {
    cy.get(this.selectors.subscriptionTitle)
      .should('be.visible')
      .invoke('text')
      .should('match', /subscription/i);
  }

  /**
   * Enter email in subscription input
   * @param {string} email - Email address to subscribe
   */
  enterSubscriptionEmail(email) {
    cy.get(this.selectors.subscriptionEmail).clear().type(email);
  }

  /**
   * Click subscription button
   */
  clickSubscriptionButton() {
    cy.get(this.selectors.subscriptionButton).click();
  }

  /**
   * Subscribe with email
   * @param {string} email - Email address to subscribe
   */
  subscribeWithEmail(email) {
    this.enterSubscriptionEmail(email);
    this.clickSubscriptionButton();
  }

  /**
   * Verify subscription success message
   */
  verifySubscriptionSuccess() {
    cy.get(this.selectors.subscriptionSuccessMessage)
      .should('be.visible')
      .and('contain.text', 'You have been successfully subscribed!');
  }

  /**
   * Get subscription success message element
   */
  getSubscriptionSuccessMessage() {
    return cy.get(this.selectors.subscriptionSuccessMessage);
  }
}

export default new FooterModule();

