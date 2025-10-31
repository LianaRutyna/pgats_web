/**
 * Home Module
 * Contains all actions related to the home page
 */

class HomeModule {
  // Selectors
  selectors = {
    slider: '#slider',
    featuresItems: '.features_items',
    categoryProducts: '.category-products',
  };

  /**
   * Verify home page is loaded
   */
  verifyHomePageLoaded() {
    cy.get(this.selectors.slider).should('be.visible');
    cy.get(this.selectors.featuresItems).should('be.visible');
  }

  /**
   * Get page URL
   */
  getPageUrl() {
    return cy.url();
  }
}

export default new HomeModule();

