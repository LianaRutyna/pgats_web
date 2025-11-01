import { faker } from '@faker-js/faker';
import HeaderModule from '../../modules/common/header.module';
import ProductsModule from '../../modules/products/products.module';
import CartModule from '../../modules/cart/cart.module';
import SignupModule from '../../modules/register/signup.module';
import AccountInfoModule from '../../modules/register/account-info.module';
import AccountCreatedModule from '../../modules/register/account-created.module';
import AccountDeletedModule from '../../modules/register/account-deleted.module';
import CheckoutModule from '../../modules/checkout/checkout.module';
import PaymentModule from '../../modules/payment/payment.module';

describe('Shopping Cart', () => {
  let cartData;

  before(() => {
    // Load test data once before all tests
    cy.fixture('cart').then((data) => {
      cartData = data;
    });
  });

  beforeEach(() => {
    HeaderModule.navigateToHome();
  });

  it('TC15 - Place Order: Register before Checkout', () => {
    const testData = cartData.testCase15;
    const userData = testData.userData;
    const paymentData = testData.paymentData;
    
    // Generate unique email to avoid conflicts
    const uniqueEmail = `johntest${Date.now()}@test.com`;

    cy.log('Step 1-2: Launch browser and navigate to home page');
    // Already done in beforeEach - HeaderModule.navigateToHome()

    cy.log('Step 3: Verify that home page is visible successfully');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    cy.get('.features_items').should('be.visible');

    cy.log('Step 4: Click Signup / Login button');
    HeaderModule.clickSignupLogin();

    cy.log('Step 5: Fill all details in Signup and create account');
    // Fill signup form
    SignupModule.completeSignupForm(userData.name, uniqueEmail);
    
    // Fill account information form
    const accountData = {
      title: userData.title,
      password: userData.password,
      day: userData.day,
      month: userData.month,
      year: userData.year,
      firstName: userData.firstName,
      lastName: userData.lastName,
      address1: userData.address1,
      city: userData.city,
      state: userData.state,
      zipcode: userData.zipcode,
      country: userData.country,
      mobileNumber: userData.mobileNumber
    };
    AccountInfoModule.completeAccountInfoForm(accountData);

    cy.log('Step 6: Verify ACCOUNT CREATED! and click Continue button');
    AccountCreatedModule.getPageTitle()
      .should('be.visible')
      .invoke('text')
      .should('match', /account created/i);
    AccountCreatedModule.clickContinue();

    cy.log('Step 7: Verify Logged in as username at top');
    HeaderModule.verifyLoggedInUser(userData.name);

    cy.log('Step 8: Add products to cart');
    // Hover and add product to cart (following the JSON flow)
    cy.get('.single-products').eq(5).scrollIntoView().wait(500);
    cy.get('.single-products').eq(5).trigger('mouseover');
    cy.get('.single-products').eq(5).find('.add-to-cart').first().click({ force: true });

    cy.log('Step 9: Click Cart button (View Cart from modal)');
    cy.wait(1000);
    CartModule.clickViewCart();

    cy.log('Step 10: Verify that cart page is displayed');
    CartModule.verifyCartPageLoaded();
    CartModule.verifyCartHasItems();

    cy.log('Step 11: Click Proceed To Checkout');
    CartModule.clickProceedToCheckout();

    cy.log('Step 12: Verify Address Details and Review Your Order');
    CheckoutModule.verifyCheckoutPageLoaded();
    CheckoutModule.verifyAddressDetailsHeader();
    CheckoutModule.verifyReviewOrderHeader();
    CheckoutModule.verifyAddressDetailsVisible();
    CheckoutModule.verifyReviewOrderVisible();
    
    // Verify some address details
    CheckoutModule.verifyDeliveryAddress({
      name: userData.title + '. ' + userData.firstName + ' ' + userData.lastName,
      address1: userData.address1,
      city: userData.city + ' ' + userData.state + ' ' + userData.zipcode,
      country: userData.country
    });

    cy.log('Step 13: Enter description in comment text area and click Place Order');
    CheckoutModule.completeCheckout(testData.checkoutComment);

    cy.log('Step 14: Enter payment details: Name on Card, Card Number, CVC, Expiration date');
    PaymentModule.verifyPaymentPageLoaded();
    
    cy.log('Step 15: Click Pay and Confirm Order button');
    PaymentModule.completePaymentForm(paymentData);

    cy.log('Step 16: Verify success message');
    PaymentModule.verifyOrderPlacedSuccessfully();
    PaymentModule.verifySuccessMessage(testData.expectedMessages.orderSuccess);
    
    // Continue after order placed
    PaymentModule.clickContinue();

    cy.log('Step 17: Click Delete Account button');
    HeaderModule.clickDeleteAccount();

    cy.log('Step 18: Verify ACCOUNT DELETED! and click Continue button');
    AccountDeletedModule.getPageTitle()
      .should('be.visible')
      .invoke('text')
      .should('match', /account deleted/i);
    AccountDeletedModule.clickContinue();

    cy.log('✓ TC15 - Place Order: Register before Checkout completed successfully');
  });
});