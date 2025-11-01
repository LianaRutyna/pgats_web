/**
 * Contact Module
 * Contains all actions related to contact us form
 */

class ContactModule {
  // Selectors
  selectors = {
    title: '.contact-form h2.title',
    nameInput: '[data-qa="name"]',
    emailInput: '[data-qa="email"]',
    subjectInput: '[data-qa="subject"]',
    messageInput: '[data-qa="message"]',
    fileInput: '#contact-us-form div:nth-of-type(5) > input',
    submitButton: '[data-qa="submit-button"]',
    successMessage: '.status.alert.alert-success',
    homeButton: '.contact-form .btn-success',
  };

  /**
   * Verify GET IN TOUCH title is visible
   */
  verifyTitleVisible() {
    cy.get(this.selectors.title)
      .should('be.visible')
      .and('contain.text', 'Get In Touch');
  }

  /**
   * Fill contact form
   * @param {Object} contactData - Contact form data
   */
  fillContactForm(contactData) {
    if (contactData.name) {
      cy.get(this.selectors.nameInput).type(contactData.name);
    }
    if (contactData.email) {
      cy.get(this.selectors.emailInput).type(contactData.email);
    }
    if (contactData.subject) {
      cy.get(this.selectors.subjectInput).type(contactData.subject);
    }
    if (contactData.message) {
      cy.get(this.selectors.messageInput).type(contactData.message);
    }
  }

  /**
   * Upload file
   * @param {string} fileName - Name of the file to upload
   */
  uploadFile(fileName) {
    cy.get(this.selectors.fileInput).selectFile(fileName);
  }

  /**
   * Click submit button
   */
  clickSubmit() {
    cy.get(this.selectors.submitButton).click();
  }

  /**
   * Verify success message
   */
  verifySuccessMessage() {
    cy.get(this.selectors.successMessage)
      .should('be.visible')
      .and('contain.text', 'Success! Your details have been submitted successfully.');
  }

  /**
   * Click home button
   */
  clickHomeButton() {
    cy.get(this.selectors.homeButton).click();
  }
}

export default new ContactModule();