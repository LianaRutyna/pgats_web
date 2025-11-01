import { faker } from '@faker-js/faker';
import HeaderModule from '../../modules/common/header.module';
import HomeModule from '../../modules/home/home.module';
import LoginModule from '../../modules/login/login.module';
import AccountDeletedModule from '../../modules/register/account-deleted.module';
import SignupModule from '../../modules/register/signup.module';
import AccountInfoModule from '../../modules/register/account-info.module';
import AccountCreatedModule from '../../modules/register/account-created.module';

describe('Login User', () => {
  let testData;
  let registerData;

  before(() => {
    cy.fixture('users').then((data) => {
      testData = data;
    });
    cy.fixture('register').then((data) => {
      registerData = data;
    });
  });

  beforeEach(() => {
    // Step 1: Launch browser
    // Step 2: Navigate to url 'http://automationexercise.com'
    HeaderModule.navigateToHome();
    
    // Step 3: Verify that home page is visible successfully
    HomeModule.verifyHomePageLoaded();
  });

  /**
   * Test Case 2: Login User with correct email and password
   */
  it('should successfully login with correct email and password and delete account', () => {
    // First, create the user account with unique email
    const uniqueEmail = `login.test.${Date.now()}@test.com`;
    HeaderModule.clickSignupLogin();
    
    // Register new user
    SignupModule.completeSignupForm(testData.validUser.name, uniqueEmail);
    
    // Complete account info with minimal data
    const userData = {
      title: 'Mr',
      password: testData.validUser.password,
      day: '1',
      month: '1',
      year: '2000',
      newsletter: false,
      specialOffers: false,
      firstName: testData.validUser.name.split(' ')[0],
      lastName: testData.validUser.name.split(' ')[1] || 'Test',
      company: 'Test Company',
      address1: 'Test Address',
      address2: '',
      country: 'United States',
      state: 'Test State',
      city: 'Test City',
      zipcode: '12345',
      mobileNumber: '1234567890',
    };
    
    AccountInfoModule.completeAccountInfoForm(userData);
    AccountCreatedModule.clickContinue();
    
    // Logout to test login
    HeaderModule.clickLogout();

    // Step 4: Click on 'Signup / Login' button
    cy.url().should('include', '/login');

    // Step 5: Verify 'Login to your account' is visible
    LoginModule.getLoginFormTitle()
      .should('be.visible')
      .and('contain.text', 'Login to your account');

    // Step 6: Enter correct email address and password
    // Step 7: Click 'login' button
    LoginModule.completeLoginForm(uniqueEmail, testData.validUser.password);

    // Step 8: Verify that 'Logged in as username' is visible
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    HeaderModule.getLoggedInUser()
      .should('be.visible')
      .and('contain.text', testData.validUser.name);
    cy.log('✓ User logged in successfully');

    // Step 9: Click 'Delete Account' button
    HeaderModule.clickDeleteAccount();

    // Step 10: Verify that 'ACCOUNT DELETED!' is visible
    cy.url().should('include', '/delete_account');
    AccountDeletedModule.getPageTitle()
      .should('be.visible')
      .and('contain.text', 'Account Deleted!');
    cy.log('✓ Account deleted successfully');
  });


  it('should show error message with incorrect email and password', () => {
    // Step 4: Click on 'Signup / Login' button
    HeaderModule.clickSignupLogin();

    // Step 5: Verify 'Login to your account' is visible
    cy.url().should('include', '/login');
    LoginModule.getLoginFormTitle()
      .should('be.visible')
      .and('contain.text', 'Login to your account');

    // Step 6: Enter incorrect email address and password
    const incorrectEmail = faker.internet.email();
    const incorrectPassword = faker.internet.password();

    // Step 7: Click 'login' button
    LoginModule.completeLoginForm(incorrectEmail, incorrectPassword);

    // Step 8: Verify error 'Your email or password is incorrect!' is visible
    LoginModule.getErrorMessage()
      .should('be.visible')
      .and('contain.text', 'Your email or password is incorrect!');
    cy.log('✓ Error message displayed for incorrect credentials');
  });


  it('should successfully logout user', () => {
    // First, create the user account with unique email
    const uniqueEmail = `logout.test.${Date.now()}@test.com`;
    HeaderModule.clickSignupLogin();
    
    // Register new user
    SignupModule.completeSignupForm(testData.validUser.name, uniqueEmail);
    
    // Complete account info with minimal data
    const userData = {
      title: 'Mr',
      password: testData.validUser.password,
      day: '1',
      month: '1',
      year: '2000',
      newsletter: false,
      specialOffers: false,
      firstName: testData.validUser.name.split(' ')[0],
      lastName: testData.validUser.name.split(' ')[1] || 'Test',
      company: 'Test Company',
      address1: 'Test Address',
      address2: '',
      country: 'United States',
      state: 'Test State',
      city: 'Test City',
      zipcode: '12345',
      mobileNumber: '1234567890',
    };
    
    AccountInfoModule.completeAccountInfoForm(userData);
    AccountCreatedModule.clickContinue();
    
    // Now user is logged in automatically after registration

    // Step 8: Verify that 'Logged in as username' is visible
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    HeaderModule.getLoggedInUser()
      .should('be.visible')
      .and('contain.text', testData.validUser.name);
    cy.log('✓ User logged in successfully');

    // Step 9: Click 'Logout' button
    HeaderModule.clickLogout();

    // Step 10: Verify that user is navigated to login page
    cy.url().should('include', '/login');
    LoginModule.getLoginFormTitle()
      .should('be.visible')
      .and('contain.text', 'Login to your account');
    cy.log('✓ User logged out successfully');
    
    // Cleanup - Login and delete account
    LoginModule.completeLoginForm(uniqueEmail, testData.validUser.password);
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    HeaderModule.clickDeleteAccount();
    AccountDeletedModule.clickContinue();
  });
});

