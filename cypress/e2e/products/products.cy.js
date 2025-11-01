import { faker } from '@faker-js/faker';
import HeaderModule from '../../modules/common/header.module';
import HomeModule from '../../modules/home/home.module';
import FooterModule from '../../modules/common/footer.module';
import ProductsModule from '../../modules/products/products.module';
import CartModule from '../../modules/cart/cart.module';

describe('Products', () => {
  beforeEach(() => {
    HeaderModule.navigateToHome();
  });

  // Test Case 8: Verify All Products and product detail page
  it('TC8 - Verify All Products and product detail page', () => {
    // 1. Launch browser - done in beforeEach
    // 2. Navigate to url - done in beforeEach
    // 3. Verify that home page is visible successfully
    HomeModule.verifyHomePageLoaded();
    cy.log('✓ Home page is visible successfully');

    // 4. Click on 'Products' button
    HeaderModule.clickProducts();

    // 5. Verify user is navigated to ALL PRODUCTS page successfully
    ProductsModule.verifyProductsPageLoaded();
    ProductsModule.verifyAllProductsTitle();
    cy.log('✓ User is navigated to ALL PRODUCTS page successfully');

    // 6. The products list is visible
    ProductsModule.verifyProductsListVisible();
    cy.log('✓ Products list is visible');

    // 7. Click on 'View Product' of first product
    ProductsModule.viewProductByIndex(0);

    // 8. User is landed to product detail page
    ProductsModule.verifyProductDetailPageLoaded();
    cy.log('✓ User is landed to product detail page');

    // 9. Verify that detail is visible: product name, category, price, availability, condition, brand
    ProductsModule.verifyProductDetailsVisible();
    ProductsModule.getProductName().should('not.be.empty');
    ProductsModule.getProductCategory().should('contain.text', 'Category:');
    ProductsModule.getProductPrice().should('be.visible');
    ProductsModule.getProductAvailability().should('contain.text', 'Availability:');
    ProductsModule.getProductCondition().should('contain.text', 'Condition:');
    ProductsModule.getProductBrand().should('contain.text', 'Brand:');
    cy.log('✓ All product details are visible: name, category, price, availability, condition, brand');
  });

  // Test Case 9: Search Product
  it('TC9 - Search Product', () => {
    // 1. Launch browser - done in beforeEach
    // 2. Navigate to url - done in beforeEach
    // 3. Verify that home page is visible successfully
    HomeModule.verifyHomePageLoaded();
    cy.log('✓ Home page is visible successfully');

    // 4. Click on 'Products' button
    HeaderModule.clickProducts();

    // 5. Verify user is navigated to ALL PRODUCTS page successfully
    ProductsModule.verifyProductsPageLoaded();
    ProductsModule.verifyAllProductsTitle();
    cy.log('✓ User is navigated to ALL PRODUCTS page successfully');

    // 6. Enter product name in search input and click search button
    cy.fixture('products').then((data) => {
      const searchTerm = data.searchTerms[0]; // Use first search term from fixture
      ProductsModule.searchProduct(searchTerm);
      cy.log(`✓ Searched for product: ${searchTerm}`);

      // 7. Verify 'SEARCHED PRODUCTS' is visible
      ProductsModule.verifySearchedProductsTitle();
      cy.log('✓ SEARCHED PRODUCTS title is visible');

      // 8. Verify all the products related to search are visible
      ProductsModule.verifySearchResults(searchTerm);
      cy.log('✓ All products related to search are visible');
    });
  });

  // Test Case 10: Verify Subscription in home page
  it('TC10 - Verify Subscription in home page', () => {
    // 1. Launch browser - done in beforeEach
    // 2. Navigate to url - done in beforeEach
    // 3. Verify that home page is visible successfully
    HomeModule.verifyHomePageLoaded();
    cy.log('✓ Home page is visible successfully');

    // 4. Scroll down to footer
    FooterModule.scrollToFooter();
    cy.log('✓ Scrolled down to footer');

    // 5. Verify text 'SUBSCRIPTION'
    FooterModule.verifySubscriptionTitle();
    cy.log('✓ SUBSCRIPTION text is visible');

    // 6. Enter email address in input and click arrow button
    const email = faker.internet.email();
    FooterModule.subscribeWithEmail(email);
    cy.log(`✓ Entered email: ${email} and clicked subscribe button`);

    // 7. Verify success message 'You have been successfully subscribed!' is visible
    FooterModule.verifySubscriptionSuccess();
    cy.log('✓ Success message "You have been successfully subscribed!" is visible');
  });
});

