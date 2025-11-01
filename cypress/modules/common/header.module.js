/**
 * Header Module
 * Contains all actions related to the website header/navigation
 */

class HeaderModule {
  // Selectors
  selectors = {
    signupLoginLink: '#header li:nth-of-type(4) > a',
    signupLoginLinkXPath: '//*[@id="header"]/div/div/div/div[2]/div/ul/li[4]/a',
    deleteAccountLink: 'a[href="/delete_account"]',
    logoutLink: 'a[href="/logout"]',
    loggedInUser: '#header li:nth-of-type(10) > a',
    homeLink: 'a[href="/"]',
    productsLink: 'a[href="/products"]',
    cartLink: 'a[href="/view_cart"]',
    contactUsLink: '#header li:nth-of-type(8) > a',
  };

  /**
   * Navigate to home page
   */
  navigateToHome() {
    cy.visit('/');
  }

  /**
   * Click on Signup/Login button
   */
  clickSignupLogin() {
    cy.get(this.selectors.signupLoginLink).click();
  }

  /**
   * Click on Delete Account button
   */
  clickDeleteAccount() {
    cy.get(this.selectors.deleteAccountLink).click();
  }

  /**
   * Verify user is logged in
   * @param {string} username - Expected username
   */
  verifyLoggedInUser(username) {
    cy.get(this.selectors.loggedInUser).should('contain.text', username);
  }

  /**
   * Click on Products link
   */
  clickProducts() {
    cy.get(this.selectors.productsLink).click();
  }

  /**
   * Click on Cart link
   */
  clickCart() {
    cy.get(this.selectors.cartLink).first().click();
  }

  /**
   * Click on Logout button
   */
  clickLogout() {
    cy.get(this.selectors.logoutLink).click();
  }

  /**
   * Get logged in user element
   */
  getLoggedInUser() {
    return cy.get(this.selectors.loggedInUser);
  }

  /**
   * Click on Contact Us link
   */
  clickContactUs() {
    cy.get(this.selectors.contactUsLink).click();
  }
}

export default new HeaderModule();

