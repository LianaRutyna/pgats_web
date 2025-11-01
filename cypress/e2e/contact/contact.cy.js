import HeaderModule from '../../modules/common/header.module';
import HomeModule from '../../modules/home/home.module';
import ContactModule from '../../modules/contact/contact.module';

describe('Contact Us Form', () => {
  let contactData;

  before(() => {
    // Load test data once before all tests
    cy.fixture('contact').then((data) => {
      contactData = data;
    });
  });

  beforeEach(() => {
    HeaderModule.navigateToHome();
  });

  it('TC6 - Contact Us Form', () => {
    cy.log('Step 1-2: Launch browser and navigate to home page');
    // Already done in beforeEach - HeaderModule.navigateToHome()

    cy.log('Step 3: Verify that home page is visible successfully');
    HomeModule.verifyHomePageLoaded();

    cy.log('Step 4: Click on Contact Us button');
    HeaderModule.clickContactUs();

    cy.log('Step 5: Verify GET IN TOUCH is visible');
    ContactModule.verifyTitleVisible();

    cy.log('Step 6: Enter name, email, subject and message');
    ContactModule.fillContactForm(contactData.testCase6.formData);

    cy.log('Step 7: Upload file');
    ContactModule.uploadFile('cypress/fixtures/files/test_contact_us.txt');

    cy.log('Step 8: Click Submit button');
    ContactModule.clickSubmit();

    cy.log('Step 9: Click OK button');
    // Handle alert if present
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Press OK to proceed!');
    });
    cy.on('window:confirm', () => true);

    cy.log('Step 10: Verify success message');
    ContactModule.verifySuccessMessage();

    cy.log('Step 11: Click Home button and verify landed to home page');
    ContactModule.clickHomeButton();
    HomeModule.verifyHomePageLoaded();

    cy.log('✓ TC6 - Contact Us Form completed successfully');
  });
});