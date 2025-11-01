/**
 * Checkout Module
 * Contains all actions related to the checkout process
 */

class CheckoutModule {
  // Selectors
  selectors = {
    // Address sections
    addressDelivery: '#address_delivery',
    addressInvoice: '#address_invoice',
    
    // Address details
    deliveryName: '#address_delivery .address_firstname',
    deliveryCompany: '#address_delivery .address_address1.address_address2:first',
    deliveryAddress1: '#address_delivery li.address_address1:nth-of-type(4)',
    deliveryAddress2: '#address_delivery li.address_address1:nth-of-type(5)',
    deliveryCity: '#address_delivery li.address_city',
    deliveryCountry: '#address_delivery li.address_country_name',
    deliveryPhone: '#address_delivery li.address_phone',
    
    invoiceName: '#address_invoice .address_firstname',
    invoiceCompany: '#address_invoice .address_address1.address_address2:first',
    invoiceAddress1: '#address_invoice li.address_address1:nth-of-type(4)',
    invoiceAddress2: '#address_invoice li.address_address1:nth-of-type(5)',
    invoiceCity: '#address_invoice li.address_city',
    invoiceCountry: '#address_invoice li.address_country_name',
    invoicePhone: '#address_invoice li.address_phone',
    
    // Review order
    orderTable: '.cart_info_table, #cart_info_table, table.table',
    orderItems: '.cart_info tbody tr, #cart_info tbody tr, table.table tbody tr',
    productName: '.cart_description h4 a',
    productPrice: '.cart_price p',
    productQuantity: '.cart_quantity button',
    totalPrice: '.cart_total_price',
    
    // Comment area
    commentTextArea: 'textarea[name="message"]',
    
    // Buttons
    placeOrderButton: '.btn-default.check_out',
    
    // Headers
    addressDetailsHeader: 'h2.heading:contains("Address Details")',
    reviewOrderHeader: 'h2.heading:contains("Review Your Order")',
    stepOneDiv: '.step-one',
  };

  /**
   * Verify checkout page is loaded
   */
  verifyCheckoutPageLoaded() {
    cy.url().should('include', '/checkout');
    cy.get('body').should('be.visible');
    // Verify checkout page content is present
    cy.get(this.selectors.addressDelivery).should('exist');
  }

  /**
   * Verify address details section is visible
   */
  verifyAddressDetailsVisible() {
    cy.get(this.selectors.addressDelivery).should('be.visible');
    cy.get(this.selectors.addressInvoice).should('be.visible');
  }

  /**
   * Verify review order section is visible
   */
  verifyReviewOrderVisible() {
    // Primeiro verifica se a seção e o header estão visíveis
    cy.get('.step-one')
      .contains('h2.heading', 'Review Your Order')
      .should('be.visible');
    
    // Espera um pouco para a tabela carregar
    cy.wait(2000);
    
    // Verifica a tabela de pedidos com seletores mais flexíveis
    cy.get('.cart_info table, #cart_info_table, table.table', { timeout: 15000 })
      .should('exist')
      .should('be.visible');
  }

  /**
   * Verify delivery address details
   * @param {Object} expectedAddress - Expected address data
   */
  verifyDeliveryAddress(expectedAddress) {
    if (expectedAddress.name) {
      cy.get(this.selectors.deliveryName)
        .invoke('text')
        .then(text => text.replace(/\s+/g, ' ').trim())
        .should('eq', expectedAddress.name);
    }
    if (expectedAddress.address1) {
      cy.get(this.selectors.deliveryAddress1)
        .invoke('text')
        .then(text => text.replace(/\s+/g, ' ').trim())
        .should('eq', expectedAddress.address1);
    }
    if (expectedAddress.city) {
      cy.get(this.selectors.deliveryCity)
        .invoke('text')
        .then(text => text.replace(/\s+/g, ' ').trim())
        .should('eq', expectedAddress.city);
    }
    if (expectedAddress.country) {
      cy.get(this.selectors.deliveryCountry)
        .invoke('text')
        .then(text => text.replace(/\s+/g, ' ').trim())
        .should('eq', expectedAddress.country);
    }
  }

  /**
   * Verify invoice address details
   * @param {Object} expectedAddress - Expected address data
   */
  verifyInvoiceAddress(expectedAddress) {
    if (expectedAddress.name) {
      cy.get(this.selectors.invoiceName).should('contain.text', expectedAddress.name);
    }
    if (expectedAddress.address1) {
      cy.get(this.selectors.invoiceAddress1).should('contain.text', expectedAddress.address1);
    }
    if (expectedAddress.city) {
      cy.get(this.selectors.invoiceCity).should('contain.text', expectedAddress.city);
    }
    if (expectedAddress.country) {
      cy.get(this.selectors.invoiceCountry).should('contain.text', expectedAddress.country);
    }
  }

  /**
   * Get all order items
   */
  getOrderItems() {
    return cy.get(this.selectors.orderItems);
  }

  /**
   * Verify order items are visible
   */
  verifyOrderItemsVisible() {
    this.getOrderItems().should('have.length.greaterThan', 0);
  }

  /**
   * Get product name by index
   * @param {number} index - Product index (0-based)
   */
  getProductNameByIndex(index) {
    return cy.get(this.selectors.productName).eq(index);
  }

  /**
   * Fill comment in text area
   * @param {string} comment - Comment text
   */
  fillComment(comment) {
    cy.get(this.selectors.commentTextArea).clear().type(comment);
  }

  /**
   * Click place order button
   */
  clickPlaceOrder() {
    cy.get(this.selectors.placeOrderButton).click();
  }

  /**
   * Complete checkout with comment
   * @param {string} comment - Comment text
   */
  completeCheckout(comment) {
    this.fillComment(comment);
    this.clickPlaceOrder();
  }

  /**
   * Verify Address Details header
   */
  verifyAddressDetailsHeader() {
    cy.get('.step-one')
      .contains('h2.heading', 'Address Details')
      .should('be.visible');
  }

  /**
   * Verify Review Your Order header
   */
  verifyReviewOrderHeader() {
    cy.get('.step-one')
      .contains('h2.heading', 'Review Your Order')
      .should('be.visible');
  }
}

export default new CheckoutModule();

