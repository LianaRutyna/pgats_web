/**
 * Payment Module
 * Contains all actions related to the payment process
 */

class PaymentModule {
  // Selectors
  selectors = {
    // Payment form fields
    nameOnCard: '[data-qa="name-on-card"]',
    cardNumber: '[data-qa="card-number"]',
    cvc: '[data-qa="cvc"]',
    expiryMonth: '[data-qa="expiry-month"]',
    expiryYear: '[data-qa="expiry-year"]',
    
    // Buttons
    payButton: '[data-qa="pay-button"]',
    
    // Success message
    successMessage: '.col-sm-9.col-sm-offset-1 p',
    orderPlacedTitle: '[data-qa="order-placed"]',
    
    // Page elements
    paymentForm: '#payment-form',
  };

  /**
   * Verify payment page is loaded
   */
  verifyPaymentPageLoaded() {
    cy.url().should('include', '/payment');
    cy.get(this.selectors.paymentForm).should('be.visible');
  }

  /**
   * Fill name on card
   * @param {string} name - Name on card
   */
  fillNameOnCard(name) {
    cy.get(this.selectors.nameOnCard).clear().type(name);
  }

  /**
   * Fill card number
   * @param {string} cardNumber - Card number
   */
  fillCardNumber(cardNumber) {
    cy.get(this.selectors.cardNumber).clear().type(cardNumber);
  }

  /**
   * Fill CVC
   * @param {string} cvc - CVC code
   */
  fillCVC(cvc) {
    cy.get(this.selectors.cvc).clear().type(cvc);
  }

  /**
   * Fill expiry month
   * @param {string} month - Expiry month
   */
  fillExpiryMonth(month) {
    cy.get(this.selectors.expiryMonth).clear().type(month);
  }

  /**
   * Fill expiry year
   * @param {string} year - Expiry year
   */
  fillExpiryYear(year) {
    cy.get(this.selectors.expiryYear).clear().type(year);
  }

  /**
   * Click pay and confirm order button
   */
  clickPayButton() {
    cy.get(this.selectors.payButton).click();
  }

  /**
   * Complete payment form
   * @param {Object} paymentData - Payment information
   */
  completePaymentForm(paymentData) {
    this.fillNameOnCard(paymentData.nameOnCard);
    this.fillCardNumber(paymentData.cardNumber);
    this.fillCVC(paymentData.cvc);
    this.fillExpiryMonth(paymentData.expiryMonth);
    this.fillExpiryYear(paymentData.expiryYear);
    this.clickPayButton();
  }

  /**
   * Verify order placed successfully
   */
  verifyOrderPlacedSuccessfully() {
    cy.url().should('include', '/payment_done');
    cy.get(this.selectors.successMessage).should('be.visible');
  }

  /**
   * Verify success message
   * @param {string} expectedMessage - Expected success message (optional)
   */
  verifySuccessMessage(expectedMessage = 'Your order has been placed successfully!') {
    cy.get(this.selectors.successMessage).should('contain.text', expectedMessage);
  }

  /**
   * Get order placed title element
   */
  getOrderPlacedTitle() {
    return cy.get(this.selectors.orderPlacedTitle);
  }

  /**
   * Click continue button after order placed
   */
  clickContinue() {
    cy.get('[data-qa="continue-button"]').click();
  }
}

export default new PaymentModule();

