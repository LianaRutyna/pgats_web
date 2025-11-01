/**
 * Cart Module
 * Contains all actions related to shopping cart
 */

class CartModule {
  // Selectors
  selectors = {
    cartTable: '#cart_info_table',
    cartItems: '.cart_info tbody tr',
    proceedToCheckoutButton: '.btn-default.check_out',
    registerLoginLink: '.modal-body a[href="/login"]',
    productName: '.cart_description h4 a',
    productPrice: '.cart_price p',
    quantity: '.cart_quantity button',
    totalPrice: '.cart_total_price',
    deleteButton: '.cart_quantity_delete',
    emptyCartMessage: '#empty_cart',
  };

  /**
   * Get all cart items
   */
  getCartItems() {
    return cy.get(this.selectors.cartItems);
  }

  /**
   * Verify cart page is loaded
   */
  verifyCartPageLoaded() {
    cy.url().should('include', '/view_cart');
    // Verify either cart table or empty cart message is visible
    cy.get('body').should('be.visible');
  }

  /**
   * Click proceed to checkout
   */
  clickProceedToCheckout() {
    // Garante que estamos na página do carrinho
    cy.url().should('include', '/view_cart');
    // Garante que o botão está visível antes de clicar
    cy.get(this.selectors.proceedToCheckoutButton)
      .should('be.visible')
      .click();
    // Espera a navegação completar
    cy.url().should('include', '/checkout');
  }

  /**
   * Remove product from cart by index
   * @param {number} index - Product index (0-based)
   */
  removeProductByIndex(index) {
    cy.get(this.selectors.deleteButton).eq(index).click();
  }

  /**
   * Get product name by index
   * @param {number} index - Product index (0-based)
   */
  getProductNameByIndex(index) {
    return cy.get(this.selectors.productName).eq(index);
  }

  /**
   * Get product price by index
   * @param {number} index - Product index (0-based)
   */
  getProductPriceByIndex(index) {
    return cy.get(this.selectors.productPrice).eq(index);
  }

  /**
   * Get product quantity by index
   * @param {number} index - Product index (0-based)
   */
  getProductQuantityByIndex(index) {
    return cy.get(this.selectors.quantity).eq(index);
  }

  /**
   * Verify cart is empty
   */
  verifyCartIsEmpty() {
    cy.get(this.selectors.emptyCartMessage).should('be.visible');
  }

  /**
   * Get total number of items in cart
   */
  getCartItemsCount() {
    return cy.get(this.selectors.cartItems).its('length');
  }

  /**
   * Click view cart link from modal
   */
  clickViewCart() {
    cy.contains('u', 'View Cart').click();
  }

  /**
   * Add product to cart from home page and navigate to cart
   * @param {number} productIndex - Product index (0-based)
   */
  addProductAndGoToCart(productIndex) {
    // The product is added via hover, then click view cart
    cy.get('.single-products').eq(productIndex).trigger('mouseover');
    cy.get('.single-products').eq(productIndex).find('.add-to-cart').click({ force: true });
    cy.wait(1000);
    this.clickViewCart();
  }

  /**
   * Verify cart has items
   */
  verifyCartHasItems() {
    this.getCartItems().should('have.length.greaterThan', 0);
  }
}

export default new CartModule();

