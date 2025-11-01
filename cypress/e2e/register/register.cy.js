import { faker } from '@faker-js/faker';
import HeaderModule from '../../modules/common/header.module';
import HomeModule from '../../modules/home/home.module';
import SignupModule from '../../modules/register/signup.module';
import AccountInfoModule from '../../modules/register/account-info.module';
import AccountCreatedModule from '../../modules/register/account-created.module';
import AccountDeletedModule from '../../modules/register/account-deleted.module';

describe('Register User', () => {
  let testData;
  let userData;

  before(() => {
    // Load fixture data
    cy.fixture('register').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    // Generate dynamic user data using Faker.js
    userData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      fullName: '',
      email: '',
      password: testData.testData.password,
      title: 'Mr',
      day: testData.testData.dateOfBirth.day,
      month: testData.testData.dateOfBirth.month,
      year: testData.testData.dateOfBirth.year,
      newsletter: true,
      specialOffers: true,
      company: faker.company.name(),
      address1: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      country: testData.testData.address.country,
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode('#####'),
      mobileNumber: faker.phone.number('## ########'),
    };

    // Generate full name and unique email
    userData.fullName = `${userData.firstName} ${userData.lastName}`;
    userData.email = faker.internet.email({
      firstName: userData.firstName.toLowerCase(),
      lastName: userData.lastName.toLowerCase(),
      provider: 'test.com',
    });
  });

  it('should successfully register a new user with all required information', () => {
    // Step 1 & 2: Launch browser and Navigate to home page
    HeaderModule.navigateToHome();

    // Step 3: Verify that home page is visible successfully
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    HomeModule.verifyHomePageLoaded();
    cy.log('✓ Home page is visible successfully');

    // Step 4: Click on 'Signup / Login' button
    HeaderModule.clickSignupLogin();

    // Step 5: Verify 'New User Signup!' is visible
    cy.url().should('include', '/login');
    SignupModule.getSignupFormTitle().should('be.visible').and('contain.text', testData.expectedMessages.newUserSignup);
    cy.log('✓ "New User Signup!" is visible');

    // Step 6 & 7: Enter name and email address, then click 'Signup' button
    SignupModule.completeSignupForm(userData.fullName, userData.email);
    cy.log(`✓ Entered name: ${userData.fullName} and email: ${userData.email}`);

    // Step 8: Verify that 'ENTER ACCOUNT INFORMATION' is visible
    cy.url().should('include', '/signup');
    AccountInfoModule.getFormTitle().should('be.visible').and('contain.text', testData.expectedMessages.enterAccountInfo);
    cy.log('✓ "Enter Account InformationAddress Information" is visible');

    // Step 9-12: Fill all account details
    AccountInfoModule.completeAccountInfoForm(userData);
    cy.log('✓ All account information filled successfully');

    // Step 13: Click 'Create Account' button
    // (Already done in completeAccountInfoForm)

    // Step 14: Verify that 'ACCOUNT CREATED!' is visible
    cy.url().should('include', '/account_created');
    AccountCreatedModule.getPageTitle().should('be.visible').and('contain.text', testData.expectedMessages.accountCreated);
    cy.log('✓ "Account Created!!" is visible');

    // Step 15: Click 'Continue' button
    AccountCreatedModule.clickContinue();

    // Step 16: Verify that 'Logged in as username' is visible
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    HeaderModule.verifyLoggedInUser(userData.fullName);
    cy.log(`✓ "Logged in as ${userData.fullName}" is visible`);

    // Step 17: Click 'Delete Account' button
    HeaderModule.clickDeleteAccount();

    // Step 18: Verify that ' Account Deleted!!' is visible and click 'Continue' button
    cy.url().should('include', '/delete_account');
    AccountDeletedModule.getPageTitle().should('be.visible').and('contain.text', testData.expectedMessages.accountDeleted);
    cy.log('✓ "Account Deleted!" is visible');

    // Click 'Continue' button
    AccountDeletedModule.clickContinue();
    cy.log('✓ Test completed successfully - User registered and deleted');
    });
  

  it('should register a user with Mrs title', () => {
    // Generate female user data
    const femaleUserData = {
      firstName: faker.person.firstName('female'),
      lastName: faker.person.lastName('female'),
      password: testData.testData.password,
      title: 'Mrs',
      day: testData.testData.dateOfBirth.day,
      month: testData.testData.dateOfBirth.month,
      year: testData.testData.dateOfBirth.year,
      newsletter: true,
      specialOffers: true,
      company: faker.company.name(),
      address1: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      country: testData.testData.address.country,
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode('#####'),
      mobileNumber: faker.phone.number('## ########'),
    };

    femaleUserData.fullName = `${femaleUserData.firstName} ${femaleUserData.lastName}`;
    femaleUserData.email = faker.internet.email({
      firstName: femaleUserData.firstName.toLowerCase(),
      lastName: femaleUserData.lastName.toLowerCase(),
      provider: 'test.com',
    });

    // Navigate and complete registration
    HeaderModule.navigateToHome();
    HomeModule.verifyHomePageLoaded();
    HeaderModule.clickSignupLogin();
    SignupModule.completeSignupForm(femaleUserData.fullName, femaleUserData.email);
    AccountInfoModule.completeAccountInfoForm(femaleUserData);

    // Verify and continue
    AccountCreatedModule.getPageTitle().should('contain.text', testData.expectedMessages.accountCreated);
    AccountCreatedModule.clickContinue();
    HeaderModule.verifyLoggedInUser(femaleUserData.fullName);

    // Cleanup
    HeaderModule.clickDeleteAccount();
    AccountDeletedModule.getPageTitle().should('contain.text', testData.expectedMessages.accountDeleted);
    AccountDeletedModule.clickContinue();
  });
});

