# Guia de Uso - Cypress Automation Framework

## Como Executar os Testes

### Modo Interativo (Test Runner)

Abra o Cypress Test Runner para executar testes de forma interativa:

```bash
npm run cy:open
```

Vantagens:
- Visualização em tempo real
- Time-travel debugging
- Inspeção de DOM
- Recarga automática

### Modo Headless (CI/CD)

Execute todos os testes em modo headless:

```bash
npm run cy:run
```

### Executar em navegador específico

```bash
# Chrome
npm run cy:run:chrome

# Firefox
npm run cy:run:firefox
```

### Executar teste específico

```bash
npx cypress run --spec "cypress/e2e/register/register.cy.js"
```

### Executar testes por tag/describe

```bash
npx cypress run --spec "cypress/e2e/register/*.cy.js"
```

## Estrutura dos Testes

### 1. Módulos (Page Objects)

Os módulos contêm as **ações** e **seletores** organizados por funcionalidade:

**Exemplo: `cypress/modules/register/signup.module.js`**

```javascript
class SignupModule {
  selectors = {
    signupName: '[data-qa="signup-name"]',
    signupEmail: '[data-qa="signup-email"]',
    signupButton: '[data-qa="signup-button"]',
  };

  completeSignupForm(name, email) {
    cy.get(this.selectors.signupName).type(name);
    cy.get(this.selectors.signupEmail).type(email);
    cy.get(this.selectors.signupButton).click();
  }
}

export default new SignupModule();
```

### 2. E2E Tests (Asserções)

Os arquivos E2E contêm os **testes** e **asserções**:

**Exemplo: `cypress/e2e/register/register.cy.js`**

```javascript
import { faker } from '@faker-js/faker';
import SignupModule from '../../modules/register/signup.module';

describe('Register User', () => {
  it('should register a new user', () => {
    // Gerar dados dinâmicos
    const userName = faker.person.fullName();
    const userEmail = faker.internet.email();
    
    // Executar ações (do módulo)
    SignupModule.completeSignupForm(userName, userEmail);
    
    // Asserções (no E2E)
    cy.url().should('include', '/signup');
    cy.get('[data-qa="account-created"]').should('be.visible');
  });
});
```

## Usando Faker.js para Dados Dinâmicos

### Dados de Pessoa

```javascript
import { faker } from '@faker-js/faker';

const firstName = faker.person.firstName();           // 'John'
const lastName = faker.person.lastName();             // 'Doe'
const fullName = faker.person.fullName();             // 'John Doe'
const email = faker.internet.email();                 // 'john.doe@example.com'
const password = faker.internet.password();           // 'xY8$mK9#pL2'
```

### Dados de Endereço

```javascript
const address = faker.location.streetAddress();       // '123 Main St'
const city = faker.location.city();                   // 'New York'
const state = faker.location.state();                 // 'California'
const zipcode = faker.location.zipCode();             // '12345'
const country = faker.location.country();             // 'United States'
```

### Dados de Empresa

```javascript
const company = faker.company.name();                 // 'Tech Corp'
const jobTitle = faker.person.jobTitle();             // 'Software Engineer'
```

### Dados de Telefone

```javascript
const phone = faker.phone.number();                   // '+1-234-567-8900'
const mobile = faker.phone.number('## ########');     // '12 34567890'
```

### Uso no Helper

```javascript
import { generateUserData } from '../utils/data-generator';

const userData = generateUserData('male');
console.log(userData);
// {
//   firstName: 'John',
//   lastName: 'Doe',
//   fullName: 'John Doe',
//   email: 'john.doe@example.com',
//   password: 'SecurePass123',
//   phone: '12 34567890'
// }
```

## Usando XPath

O projeto já está configurado com cypress-xpath:

```javascript
// Seletor CSS (preferido)
cy.get('[data-qa="signup-button"]').click();

// XPath (alternativa)
cy.xpath('//*[@data-qa="signup-button"]').click();

// XPath com texto
cy.xpath('//button[contains(text(), "Sign Up")]').click();

// XPath complexo
cy.xpath('//div[@class="form-group"]//input[@type="email"]').type('test@example.com');
```

**Quando usar XPath:**
- Seletores CSS não são suficientes
- Navegação por hierarquia complexa
- Seleção baseada em texto
- Compatibilidade com gravações

## Comandos Customizados

Localizados em `cypress/support/commands.js`:

```javascript
// Navegar para uma página
cy.navigateTo('/products');

// Verificar título da página
cy.verifyPageTitle('Automation Exercise');

// Verificar visibilidade de elemento
cy.verifyElementVisible('[data-qa="signup-form"]');

// Verificar texto
cy.verifyText('.success-message', 'Account created!');

// Preencher input
cy.fillInput('[data-qa="name"]', 'John Doe');

// Selecionar opção
cy.selectOption('[data-qa="country"]', 'United States');

// Clicar com espera
cy.clickElement('[data-qa="submit-button"]');

// Gerar email único
cy.generateUniqueEmail('john@test.com'); // john_1234567890@test.com

// Verificar URL contém
cy.verifyUrlContains('/signup');
```

## Fixtures (Dados Estáticos)

Use fixtures para dados que não mudam entre testes:

**cypress/fixtures/register.json**
```json
{
  "testData": {
    "password": "Test@12345",
    "dateOfBirth": {
      "day": "1",
      "month": "1",
      "year": "2000"
    }
  }
}
```

**Carregando fixture no teste:**
```javascript
describe('Register', () => {
  let testData;

  before(() => {
    cy.fixture('register').then((data) => {
      testData = data;
    });
  });

  it('test', () => {
    // Usar testData.testData.password
  });
});
```

## Boas Práticas

### 1. Organização por Funcionalidade

```
cypress/
├── e2e/
│   ├── register/
│   ├── login/
│   ├── products/
│   └── cart/
└── modules/
    ├── register/
    ├── login/
    ├── products/
    └── cart/
```

### 2. Separação de Responsabilidades

- **Módulos**: Ações e seletores
- **E2E**: Testes e asserções
- **Fixtures**: Dados estáticos
- **Utils**: Funções auxiliares

### 3. Seletores Robustos

```javascript
// ✅ BOM - Usar data-qa attributes
cy.get('[data-qa="signup-button"]')

// ✅ BOM - Usar IDs únicos
cy.get('#signup-form')

// ⚠️ EVITAR - Seletores frágeis
cy.get('.btn.btn-primary.signup')
```

### 4. Dados Dinâmicos

```javascript
// ✅ BOM - Usar Faker para dados únicos
const email = faker.internet.email();

// ❌ RUIM - Dados hardcoded (pode causar conflitos)
const email = 'test@test.com';
```

### 5. Asserções Claras

```javascript
// ✅ BOM - Asserções explícitas
cy.get('[data-qa="success-message"]')
  .should('be.visible')
  .and('contain.text', 'Success!');

// ❌ RUIM - Sem verificação
cy.get('[data-qa="success-message"]');
```

## Relatórios

### Vídeos

Após executar `npm run cy:run`, os vídeos são salvos em:
```
cypress/videos/
```

### Screenshots

Screenshots de falhas são salvos em:
```
cypress/screenshots/
```

### Console Output

Durante a execução, você verá:
- ✓ Testes que passaram
- ✗ Testes que falharam
- Tempo de execução
- Resumo final

## Debugging

### 1. Usar cy.log()

```javascript
cy.log('Testando registro com email:', userEmail);
```

### 2. Usar cy.pause()

```javascript
cy.pause(); // Pausa execução para inspeção
```

### 3. Usar .debug()

```javascript
cy.get('[data-qa="name"]').debug();
```

### 4. Usar cy.wait()

```javascript
cy.wait(1000); // Esperar 1 segundo
```

## Exemplos de Cenários de Teste

### Teste Completo de Registro

```javascript
it('should register user with all information', () => {
  const userData = generateUserData();
  
  HeaderModule.navigateToHome();
  HeaderModule.clickSignupLogin();
  SignupModule.completeSignupForm(userData.fullName, userData.email);
  AccountInfoModule.completeAccountInfoForm({
    ...userData,
    day: '1',
    month: '1',
    year: '2000',
    newsletter: true,
    specialOffers: true,
  });
  
  AccountCreatedModule.getPageTitle().should('contain', 'ACCOUNT CREATED!');
  AccountCreatedModule.clickContinue();
  HeaderModule.verifyLoggedInUser(userData.fullName);
});
```

### Teste de Login com Dados Inválidos

```javascript
it('should show error for invalid credentials', () => {
  const invalidEmail = faker.internet.email();
  const invalidPassword = faker.internet.password();
  
  HeaderModule.clickSignupLogin();
  LoginModule.completeLoginForm(invalidEmail, invalidPassword);
  LoginModule.getErrorMessage()
    .should('be.visible')
    .and('contain', 'incorrect');
});
```

## Integração CI/CD

Para executar em pipeline:

```yaml
# .gitlab-ci.yml / .github/workflows/cypress.yml
test:
  script:
    - npm ci
    - npm run cy:run
  artifacts:
    when: always
    paths:
      - cypress/videos
      - cypress/screenshots
```

## Próximos Passos

1. Explorar os testes existentes
2. Criar novos módulos para outras funcionalidades
3. Adicionar mais cenários de teste
4. Integrar com CI/CD
5. Gerar relatórios customizados

## Recursos Adicionais

- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Faker.js Documentation](https://fakerjs.dev/guide/)
- [XPath Cheatsheet](https://devhints.io/xpath)

