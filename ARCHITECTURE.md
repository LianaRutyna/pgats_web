# Arquitetura do Framework Cypress

## Visão Geral

Este framework segue o padrão **Page Object Model (POM)** com separação clara de responsabilidades:

```
┌─────────────────────────────────────────────────────────────┐
│                     CYPRESS FRAMEWORK                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   E2E Tests │  │   Modules   │  │  Fixtures   │        │
│  │  (Asserções)│──│  (Ações)    │  │   (Dados)   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│         │                │                  │               │
│         └────────────────┴──────────────────┘               │
│                          │                                   │
│                          ▼                                   │
│                  ┌──────────────┐                           │
│                  │   Support    │                           │
│                  │  (Commands)  │                           │
│                  └──────────────┘                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Camadas da Arquitetura

### 1. E2E Layer (Camada de Testes)

**Localização:** `cypress/e2e/`

**Responsabilidade:** Testes e Asserções

```javascript
// cypress/e2e/register/register.cy.js
describe('Register User', () => {
  it('should register successfully', () => {
    // Gerar dados
    const userData = generateUserData();
    
    // Executar ações (via módulos)
    SignupModule.completeSignupForm(userData.name, userData.email);
    
    // ASSERÇÕES (responsabilidade do E2E)
    cy.url().should('include', '/signup');
    AccountCreatedModule.getPageTitle()
      .should('contain', 'ACCOUNT CREATED!');
  });
});
```

**Princípios:**
- ✅ Contém apenas lógica de teste
- ✅ Usa dados dinâmicos (Faker.js)
- ✅ Chama ações dos módulos
- ✅ Contém todas as asserções
- ❌ Não contém seletores
- ❌ Não implementa ações diretamente

### 2. Modules Layer (Camada de Módulos/Page Objects)

**Localização:** `cypress/modules/`

**Responsabilidade:** Ações e Seletores

```javascript
// cypress/modules/register/signup.module.js
class SignupModule {
  // SELETORES (centralizados aqui)
  selectors = {
    signupName: '[data-qa="signup-name"]',
    signupEmail: '[data-qa="signup-email"]',
    signupButton: '[data-qa="signup-button"]',
  };

  // AÇÕES (métodos reutilizáveis)
  fillSignupName(name) {
    cy.get(this.selectors.signupName).type(name);
  }

  completeSignupForm(name, email) {
    this.fillSignupName(name);
    this.fillSignupEmail(email);
    this.clickSignupButton();
  }
}

export default new SignupModule();
```

**Princípios:**
- ✅ Encapsula seletores
- ✅ Implementa ações reutilizáveis
- ✅ Um módulo por página/componente
- ✅ Retorna elementos para asserções no E2E
- ❌ Não contém asserções
- ❌ Não conhece lógica de teste

### 3. Fixtures Layer (Camada de Dados)

**Localização:** `cypress/fixtures/`

**Responsabilidade:** Dados Estáticos

```json
// cypress/fixtures/register.json
{
  "testData": {
    "password": "Test@12345",
    "dateOfBirth": {
      "day": "1",
      "month": "1",
      "year": "2000"
    },
    "expectedMessages": {
      "accountCreated": "ACCOUNT CREATED!"
    }
  }
}
```

**Princípios:**
- ✅ Dados que não mudam
- ✅ Mensagens esperadas
- ✅ Configurações padrão
- ❌ Não usar para dados únicos (use Faker)

### 4. Support Layer (Camada de Suporte)

**Localização:** `cypress/support/`

**Responsabilidade:** Comandos Customizados e Configurações

```javascript
// cypress/support/commands.js
Cypress.Commands.add('fillInput', (selector, value) => {
  cy.get(selector).clear().type(value);
});

Cypress.Commands.add('verifyText', (selector, expectedText) => {
  cy.get(selector).should('contain.text', expectedText);
});
```

**Princípios:**
- ✅ Comandos reutilizáveis globais
- ✅ Configurações do Cypress
- ✅ Imports globais (xpath, faker)
- ✅ Tratamento de exceções

### 5. Utils Layer (Camada de Utilitários)

**Localização:** `cypress/utils/`

**Responsabilidade:** Funções Auxiliares

```javascript
// cypress/utils/data-generator.js
export const generateUserData = (gender) => {
  const firstName = faker.person.firstName(gender);
  const lastName = faker.person.lastName(gender);
  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }),
  };
};
```

**Princípios:**
- ✅ Funções puras
- ✅ Geração de dados dinâmicos
- ✅ Helpers reutilizáveis
- ❌ Não acessa Cypress diretamente

## Fluxo de Dados

```
┌──────────────┐
│  E2E Test    │  1. Inicia teste
│  (register)  │  2. Gera dados (Faker/Utils)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Fixture    │  3. Carrega dados estáticos
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Module     │  4. Executa ações
│  (signup)    │  5. Interage com elementos
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Support    │  6. Usa comandos customizados
│  (commands)  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Cypress API │  7. Executa comandos no navegador
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  E2E Test    │  8. Verifica asserções
│  (assertions)│  9. Reporta resultados
└──────────────┘
```

## Organização por Funcionalidade

```
cypress/
├── e2e/
│   ├── register/              ← Funcionalidade: Registro
│   │   └── register.cy.js
│   ├── login/                 ← Funcionalidade: Login
│   │   └── login.cy.js
│   ├── products/              ← Funcionalidade: Produtos
│   │   └── products.cy.js
│   └── cart/                  ← Funcionalidade: Carrinho
│       └── cart.cy.js
│
├── modules/
│   ├── register/              ← Módulos de Registro
│   │   ├── signup.module.js
│   │   ├── account-info.module.js
│   │   ├── account-created.module.js
│   │   └── account-deleted.module.js
│   ├── login/                 ← Módulos de Login
│   │   └── login.module.js
│   ├── products/              ← Módulos de Produtos
│   │   └── products.module.js
│   ├── cart/                  ← Módulos de Carrinho
│   │   └── cart.module.js
│   └── common/                ← Módulos Comuns
│       ├── header.module.js
│       └── home.module.js
│
└── fixtures/
    ├── register.json          ← Dados de Registro
    ├── users.json             ← Dados de Usuários
    ├── products.json          ← Dados de Produtos
    └── cart.json              ← Dados de Carrinho
```

## Padrões de Nomenclatura

### Arquivos

```
✅ BOM:
- register.cy.js           (teste E2E)
- signup.module.js         (módulo/page object)
- register.json            (fixture)
- data-generator.js        (utilitário)

❌ RUIM:
- RegisterTest.js
- signupPage.js
- test_register.js
```

### Classes e Funções

```javascript
✅ BOM:
class SignupModule { }
export const generateUserData = () => { }

❌ RUIM:
class signup_module { }
export const GenerateUserData = () => { }
```

### Variáveis

```javascript
✅ BOM:
const userData = { };
const testData = { };

❌ RUIM:
const user_data = { };
const TestData = { };
```

## Vantagens da Arquitetura

### 1. Manutenibilidade
- Seletores centralizados em módulos
- Mudanças em uma página afetam apenas um módulo
- Fácil atualização de seletores

### 2. Reutilização
- Módulos podem ser usados em múltiplos testes
- Comandos customizados disponíveis globalmente
- Utils compartilhados entre testes

### 3. Legibilidade
- Testes E2E focados na lógica de negócio
- Separação clara de responsabilidades
- Código autoexplicativo

### 4. Escalabilidade
- Fácil adicionar novas funcionalidades
- Estrutura organizada por domínio
- Não há duplicação de código

### 5. Testabilidade
- Módulos podem ser testados isoladamente
- Dados dinâmicos evitam conflitos
- Fixtures para cenários específicos

## Exemplo Completo de Fluxo

### 1. Definir Módulo

```javascript
// cypress/modules/login/login.module.js
class LoginModule {
  selectors = {
    email: '[data-qa="login-email"]',
    password: '[data-qa="login-password"]',
    button: '[data-qa="login-button"]',
  };

  login(email, password) {
    cy.get(this.selectors.email).type(email);
    cy.get(this.selectors.password).type(password);
    cy.get(this.selectors.button).click();
  }
}

export default new LoginModule();
```

### 2. Criar Fixture

```json
// cypress/fixtures/login.json
{
  "validUser": {
    "email": "test@test.com",
    "password": "Test@123"
  }
}
```

### 3. Escrever Teste

```javascript
// cypress/e2e/login/login.cy.js
import LoginModule from '../../modules/login/login.module';

describe('Login', () => {
  let testData;

  before(() => {
    cy.fixture('login').then((data) => {
      testData = data;
    });
  });

  it('should login successfully', () => {
    cy.visit('/login');
    
    // Ação (via módulo)
    LoginModule.login(testData.validUser.email, testData.validUser.password);
    
    // Asserção (no E2E)
    cy.url().should('eq', 'https://example.com/');
    cy.get('.user-name').should('contain', 'Test User');
  });
});
```

## Boas Práticas

### ✅ FAZER

1. Separar ações (módulos) de asserções (E2E)
2. Usar dados dinâmicos com Faker.js
3. Centralizar seletores em módulos
4. Organizar por funcionalidade
5. Usar comandos customizados para ações repetitivas
6. Documentar funções complexas
7. Usar `data-qa` attributes para seletores

### ❌ NÃO FAZER

1. Colocar seletores diretamente nos testes
2. Hardcoded dados que devem ser únicos
3. Misturar lógica de teste com ações
4. Duplicar código entre testes
5. Usar seletores frágeis (classes CSS dinâmicas)
6. Criar dependências entre testes
7. Ignorar falhas de testes

## Extensibilidade

### Adicionar Nova Funcionalidade

1. Criar módulo: `cypress/modules/nova-funcionalidade/`
2. Criar teste: `cypress/e2e/nova-funcionalidade/`
3. Criar fixture (se necessário): `cypress/fixtures/nova-funcionalidade.json`
4. Seguir os padrões existentes

### Adicionar Comando Customizado

```javascript
// cypress/support/commands.js
Cypress.Commands.add('meuComando', (param) => {
  // Implementação
});
```

### Adicionar Utilitário

```javascript
// cypress/utils/meu-helper.js
export const minhaFuncao = () => {
  // Implementação
};
```

---

**Esta arquitetura garante:** Manutenibilidade, Escalabilidade, Reutilização e Testabilidade! 🚀

