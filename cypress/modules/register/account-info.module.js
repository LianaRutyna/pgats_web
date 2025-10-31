/**
 * Account Information Module
 * Contains all actions related to the account information form
 */

class AccountInfoModule {
  // Selectors
  selectors = {
    // Title
    titleMr: '#id_gender1',
    titleMrs: '#id_gender2',
    
    // Account fields
    password: '[data-qa="password"]',
    days: '[data-qa="days"]',
    months: '[data-qa="months"]',
    years: '[data-qa="years"]',
    
    // Checkboxes
    newsletter: '#newsletter',
    specialOffers: '#optin',
    
    // Address fields
    firstName: '[data-qa="first_name"]',
    lastName: '[data-qa="last_name"]',
    company: '[data-qa="company"]',
    address1: '[data-qa="address"]',
    address2: '[data-qa="address2"]',
    country: '[data-qa="country"]',
    state: '[data-qa="state"]',
    city: '[data-qa="city"]',
    zipcode: '[data-qa="zipcode"]',
    mobileNumber: '[data-qa="mobile_number"]',
    
    // Buttons
    createAccountButton: '[data-qa="create-account"]',
    
    // Form title
    formTitle: '.login-form h2:first b',
  };

  /**
   * Select title (Mr or Mrs)
   * @param {string} title - 'Mr' or 'Mrs'
   */
  selectTitle(title) {
    if (title.toLowerCase() === 'mr') {
      cy.get(this.selectors.titleMr).check();
    } else {
      cy.get(this.selectors.titleMrs).check();
    }
  }

  /**
   * Fill password field
   * @param {string} password - Password
   */
  fillPassword(password) {
    cy.get(this.selectors.password).clear().type(password);
  }

  /**
   * Select date of birth
   * @param {string} day - Day
   * @param {string} month - Month
   * @param {string} year - Year
   */
  selectDateOfBirth(day, month, year) {
    cy.get(this.selectors.days).select(day);
    cy.get(this.selectors.months).select(month);
    cy.get(this.selectors.years).select(year);
  }

  /**
   * Check newsletter checkbox
   */
  checkNewsletter() {
    cy.get(this.selectors.newsletter).check();
  }

  /**
   * Check special offers checkbox
   */
  checkSpecialOffers() {
    cy.get(this.selectors.specialOffers).check();
  }

  /**
   * Fill first name
   * @param {string} firstName - First name
   */
  fillFirstName(firstName) {
    cy.get(this.selectors.firstName).clear().type(firstName);
  }

  /**
   * Fill last name
   * @param {string} lastName - Last name
   */
  fillLastName(lastName) {
    cy.get(this.selectors.lastName).clear().type(lastName);
  }

  /**
   * Fill company
   * @param {string} company - Company name
   */
  fillCompany(company) {
    cy.get(this.selectors.company).clear().type(company);
  }

  /**
   * Fill address 1
   * @param {string} address - Address line 1
   */
  fillAddress1(address) {
    cy.get(this.selectors.address1).clear().type(address);
  }

  /**
   * Fill address 2
   * @param {string} address - Address line 2
   */
  fillAddress2(address) {
    cy.get(this.selectors.address2).clear().type(address);
  }

  /**
   * Select country
   * @param {string} country - Country name
   */
  selectCountry(country) {
    cy.get(this.selectors.country).select(country);
  }

  /**
   * Fill state
   * @param {string} state - State
   */
  fillState(state) {
    cy.get(this.selectors.state).clear().type(state);
  }

  /**
   * Fill city
   * @param {string} city - City
   */
  fillCity(city) {
    cy.get(this.selectors.city).clear().type(city);
  }

  /**
   * Fill zipcode
   * @param {string} zipcode - Zipcode
   */
  fillZipcode(zipcode) {
    cy.get(this.selectors.zipcode).clear().type(zipcode);
  }

  /**
   * Fill mobile number
   * @param {string} mobileNumber - Mobile number
   */
  fillMobileNumber(mobileNumber) {
    cy.get(this.selectors.mobileNumber).clear().type(mobileNumber);
  }

  /**
   * Click create account button
   */
  clickCreateAccount() {
    cy.get(this.selectors.createAccountButton).click();
  }

  /**
   * Get form title element
   */
  getFormTitle() {
    return cy.get(this.selectors.formTitle);
  }

  /**
   * Complete account information form
   * @param {Object} accountData - Account information data
   */
  completeAccountInfoForm(accountData) {
    // Fill account details
    this.selectTitle(accountData.title || 'Mr');
    this.fillPassword(accountData.password);
    this.selectDateOfBirth(accountData.day, accountData.month, accountData.year);
    
    // Check options
    if (accountData.newsletter) {
      this.checkNewsletter();
    }
    if (accountData.specialOffers) {
      this.checkSpecialOffers();
    }
    
    // Fill address details
    this.fillFirstName(accountData.firstName);
    this.fillLastName(accountData.lastName);
    
    if (accountData.company) {
      this.fillCompany(accountData.company);
    }
    
    this.fillAddress1(accountData.address1);
    
    if (accountData.address2) {
      this.fillAddress2(accountData.address2);
    }
    
    this.selectCountry(accountData.country);
    this.fillState(accountData.state);
    this.fillCity(accountData.city);
    this.fillZipcode(accountData.zipcode);
    this.fillMobileNumber(accountData.mobileNumber);
    
    // Submit form
    this.clickCreateAccount();
  }
}

export default new AccountInfoModule();

