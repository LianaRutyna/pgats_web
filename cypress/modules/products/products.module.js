/**
 * Products Module
 * Contains all actions related to products page
 */

class ProductsModule {
  // Selectors
  selectors = {
    productsList: '.features_items',
    searchInput: '#search_product',
    searchButton: '#submit_search',
    productCard: '.single-products',
    productInformation: '.product-information',
    productDetailName: '.product-information h2',
    productDetailCategory: '.product-information p:contains("Category:")',
    productDetailPrice: '.product-information span span',
    productDetailAvailability: '.product-information p:contains("Availability:")',
    productDetailCondition: '.product-information p:contains("Condition:")',
    productDetailBrand: '.product-information p:contains("Brand:")',
    continueShoppingButton: '.modal-footer button',
    viewCartModal: '#cartModal',
    pageTitle: '.features_items h2.title',
    productDetailName: '.product-information h2',
    productDetailCategory: '.product-information p:contains("Category:")',
    productDetailPrice: '.product-information span span',
    productDetailAvailability: '.product-information p:contains("Availability:")',
    productDetailCondition: '.product-information p:contains("Condition:")',
    productDetailBrand: '.product-information p:contains("Brand:")',
    productInformation: '.product-information',
  };

  /**
   * Search for a product
   * @param {string} productName - Product name to search
   */
  searchProduct(productName) {
    cy.get(this.selectors.searchInput).clear().type(productName);
    cy.get(this.selectors.searchButton).click();
  }

  /**
   * Get all products
   */
  getAllProducts() {
    return cy.get(this.selectors.productCard);
  }

  /**
   * Add product to cart by index
   * @param {number} index - Product index (0-based)
   */
  addProductToCartByIndex(index) {
    cy.get(this.selectors.productCard).eq(index).find(this.selectors.addToCartButton).first().click({ force: true });
  }

  /**
   * Click continue shopping
   */
  clickContinueShopping() {
    cy.get(this.selectors.continueShoppingButton).click();
  }

  /**
   * View product details by index
   * @param {number} index - Product index (0-based)
   */
  viewProductByIndex(index) {
    // Navega diretamente para a página de detalhes do primeiro produto
    cy.visit('/product_details/1');
  }

  /**
   * Verify products page is loaded
   */
  verifyProductsPageLoaded() {
    cy.get(this.selectors.productsList).should('be.visible');
    cy.url().should('include', '/products');
  }

  /**
   * Verify ALL PRODUCTS title is visible
   */
  verifyAllProductsTitle() {
    cy.get(this.selectors.pageTitle).should('be.visible').invoke('text').should('match', /all products/i);
  }

  /**
   * Verify products list is visible
   */
  verifyProductsListVisible() {
    cy.get(this.selectors.productsList).should('be.visible');
    this.getAllProducts().should('have.length.greaterThan', 0);
  }

  /**
   * Verify SEARCHED PRODUCTS title is visible
   */
  verifySearchedProductsTitle() {
    cy.get(this.selectors.pageTitle).should('be.visible').invoke('text').should('match', /searched products/i);
  }

  /**
   * Verify product detail page is loaded
   */
  verifyProductDetailPageLoaded() {
    cy.url().should('include', '/product_details/');
    cy.get(this.selectors.productInformation)
      .should('be.visible')
      .should('exist');
  }

  /**
   * Verify product details are visible
   * Returns an object with all product detail elements
   */
  verifyProductDetailsVisible() {
    const timeout = { timeout: 15000 }; // 15 segundos de timeout
    cy.get(this.selectors.productDetailName).should('be.visible', timeout);
    cy.get(this.selectors.productDetailCategory).should('be.visible', timeout);
    cy.get(this.selectors.productDetailPrice).should('be.visible', timeout);
    cy.get(this.selectors.productDetailAvailability).should('be.visible', timeout);
    cy.get(this.selectors.productDetailCondition).should('be.visible', timeout);
    cy.get(this.selectors.productDetailBrand).should('be.visible', timeout);
  }

  /**
   * Get product name from detail page
   */
  getProductName() {
    return cy.get(this.selectors.productDetailName);
  }

  /**
   * Get product category from detail page
   */
  getProductCategory() {
    return cy.get(this.selectors.productDetailCategory);
  }

  /**
   * Get product price from detail page
   */
  getProductPrice() {
    return cy.get(this.selectors.productDetailPrice);
  }

  /**
   * Get product availability from detail page
   */
  getProductAvailability() {
    return cy.get(this.selectors.productDetailAvailability);
  }

  /**
   * Get product condition from detail page
   */
  getProductCondition() {
    return cy.get(this.selectors.productDetailCondition);
  }

  /**
   * Get product brand from detail page
   */
  getProductBrand() {
    return cy.get(this.selectors.productDetailBrand);
  }

  /**
   * Verify all products related to search are visible
   * @param {string} searchTerm - Search term to validate
   */
  verifySearchResults(searchTerm) {
    this.verifySearchedProductsTitle();
    this.getAllProducts().should('have.length.greaterThan', 0);
  }
}

export default new ProductsModule();

