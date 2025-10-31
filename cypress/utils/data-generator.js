/**
 * Data Generator Utility
 * Helper functions to generate test data using Faker.js
 */

import { faker } from '@faker-js/faker';

/**
 * Generate random user data
 * @param {string} gender - 'male' or 'female' (optional)
 * @returns {Object} User data object
 */
export const generateUserData = (gender) => {
  const firstName = gender ? faker.person.firstName(gender) : faker.person.firstName();
  const lastName = gender ? faker.person.lastName(gender) : faker.person.lastName();
  
  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    email: faker.internet.email({
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
    }),
    password: faker.internet.password({ length: 10, memorable: true, pattern: /[A-Za-z0-9]/ }),
    phone: faker.phone.number('## ########'),
  };
};

/**
 * Generate random address data
 * @returns {Object} Address data object
 */
export const generateAddressData = () => {
  return {
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipcode: faker.location.zipCode('#####'),
    country: 'United States',
  };
};

/**
 * Generate company data
 * @returns {Object} Company data object
 */
export const generateCompanyData = () => {
  return {
    name: faker.company.name(),
    industry: faker.company.buzzNoun(),
  };
};

/**
 * Generate random date of birth
 * @param {number} minAge - Minimum age (default: 18)
 * @param {number} maxAge - Maximum age (default: 80)
 * @returns {Object} Date of birth object with day, month, year
 */
export const generateDateOfBirth = (minAge = 18, maxAge = 80) => {
  const birthDate = faker.date.birthdate({ min: minAge, max: maxAge, mode: 'age' });
  
  return {
    day: birthDate.getDate().toString(),
    month: (birthDate.getMonth() + 1).toString(),
    year: birthDate.getFullYear().toString(),
  };
};

/**
 * Generate unique email with timestamp
 * @param {string} baseName - Base name for email
 * @param {string} domain - Email domain (default: 'test.com')
 * @returns {string} Unique email address
 */
export const generateUniqueEmail = (baseName = 'user', domain = 'test.com') => {
  const timestamp = Date.now();
  return `${baseName}_${timestamp}@${domain}`;
};

/**
 * Generate random product data
 * @returns {Object} Product data object
 */
export const generateProductData = () => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    category: faker.commerce.department(),
  };
};

/**
 * Generate random payment data
 * @returns {Object} Payment data object
 */
export const generatePaymentData = () => {
  return {
    nameOnCard: faker.person.fullName(),
    cardNumber: faker.finance.creditCardNumber(),
    cvc: faker.finance.creditCardCVV(),
    expirationMonth: faker.number.int({ min: 1, max: 12 }).toString().padStart(2, '0'),
    expirationYear: faker.number.int({ min: 2024, max: 2030 }).toString(),
  };
};

/**
 * Generate random text
 * @param {number} sentences - Number of sentences (default: 3)
 * @returns {string} Random text
 */
export const generateRandomText = (sentences = 3) => {
  return faker.lorem.sentences(sentences);
};

/**
 * Generate random number
 * @param {number} min - Minimum value (default: 1)
 * @param {number} max - Maximum value (default: 100)
 * @returns {number} Random number
 */
export const generateRandomNumber = (min = 1, max = 100) => {
  return faker.number.int({ min, max });
};

