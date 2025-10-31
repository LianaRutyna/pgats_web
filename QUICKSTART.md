# Quick Start Guide - Cypress POC

## Instalação Rápida (5 minutos)

### 1. Instalar dependências
```bash
cd /home/lianamr/Projects/POC
npm install
```

### 2. Executar primeiro teste
```bash
npm run cy:open
```

### 3. Selecionar o teste
1. Clique em "E2E Testing"
2. Escolha um navegador (Chrome recomendado)
3. Selecione `register/register.cy.js`
4. Assista o teste executar! 🚀

## Estrutura Rápida

```
POC/
├── cypress/
│   ├── e2e/              ← Seus testes estão aqui (com asserções)
│   ├── fixtures/         ← Dados estáticos JSON
│   ├── modules/          ← Page Objects (ações reutilizáveis)
│   ├── support/          ← Comandos customizados
│   └── utils/            ← Helpers (Faker.js)
├── cypress.config.js     ← Configuração
└── package.json          ← Dependências
```

## Executar Testes Específicos

### Via GUI (Recomendado para desenvolvimento)
```bash
npm run cy:open
```

### Via CLI (Para CI/CD)
```bash
# Todos os testes
npm run cy:run

# Teste específico
npx cypress run --spec "cypress/e2e/register/register.cy.js"

# Navegador específico
npm run cy:run:chrome
npm run cy:run:firefox
```

## Criar Seu Primeiro Teste

### 1. Criar novo módulo (Page Object)

**cypress/modules/minha-funcionalidade/minha-pagina.module.js**
```javascript
class MinhaPaginaModule {
  selectors = {
    botaoEnviar: '[data-qa="submit-button"]',
    campoNome: '[data-qa="name-input"]',
  };

  preencherFormulario(nome) {
    cy.get(this.selectors.campoNome).type(nome);
    cy.get(this.selectors.botaoEnviar).click();
  }
}

export default new MinhaPaginaModule();
```

### 2. Criar teste E2E

**cypress/e2e/minha-funcionalidade/meu-teste.cy.js**
```javascript
import { faker } from '@faker-js/faker';
import MinhaPaginaModule from '../../modules/minha-funcionalidade/minha-pagina.module';

describe('Minha Funcionalidade', () => {
  it('deve preencher formulário', () => {
    // Gerar dados dinâmicos
    const nome = faker.person.fullName();
    
    // Executar ações
    cy.visit('/');
    MinhaPaginaModule.preencherFormulario(nome);
    
    // Asserções
    cy.url().should('include', '/sucesso');
    cy.get('.mensagem-sucesso').should('contain', 'Enviado!');
  });
});
```

## Usar Faker.js (Dados Dinâmicos)

```javascript
import { faker } from '@faker-js/faker';

// Pessoa
const nome = faker.person.fullName();              // 'John Doe'
const email = faker.internet.email();              // 'john@example.com'

// Endereço
const endereco = faker.location.streetAddress();   // '123 Main St'
const cidade = faker.location.city();              // 'New York'

// Empresa
const empresa = faker.company.name();              // 'Tech Corp'

// Telefone
const telefone = faker.phone.number('## ########'); // '12 34567890'
```

## Usar XPath

```javascript
// CSS Selector (preferido)
cy.get('[data-qa="signup-button"]').click();

// XPath (quando CSS não é suficiente)
cy.xpath('//*[@data-qa="signup-button"]').click();
cy.xpath('//button[text()="Sign Up"]').click();
```

## Comandos Customizados

```javascript
// Navegar
cy.navigateTo('/products');

// Verificar título
cy.verifyPageTitle('Minha Página');

// Verificar elemento visível
cy.verifyElementVisible('[data-qa="form"]');

// Preencher input
cy.fillInput('[data-qa="email"]', 'test@test.com');

// Clicar com espera
cy.clickElement('[data-qa="submit"]');
```

## Fixtures (Dados Estáticos)

**cypress/fixtures/meus-dados.json**
```json
{
  "usuario": {
    "nome": "João Silva",
    "email": "joao@test.com"
  }
}
```

**Usar no teste:**
```javascript
describe('Teste', () => {
  let dados;

  before(() => {
    cy.fixture('meus-dados').then((data) => {
      dados = data;
    });
  });

  it('teste', () => {
    console.log(dados.usuario.nome); // 'João Silva'
  });
});
```

## Debugging

```javascript
// Log no console
cy.log('Testando com email:', email);

// Pausar execução
cy.pause();

// Debug elemento
cy.get('[data-qa="form"]').debug();

// Esperar (use com moderação)
cy.wait(1000);
```

## Checklist de Boas Práticas

- ✅ **Módulos**: Ações e seletores em `modules/`
- ✅ **E2E**: Testes e asserções em `e2e/`
- ✅ **Faker**: Dados dinâmicos (evitar hardcoded)
- ✅ **data-qa**: Usar seletores robustos
- ✅ **Fixtures**: Dados estáticos reutilizáveis
- ✅ **Comandos**: Usar comandos customizados
- ✅ **Organização**: Por funcionalidade (login, register, etc.)

## Testes Disponíveis

### 1. Register (Registro de Usuário) ✅
- Registro completo com todos os campos
- Registro sem checkboxes opcionais
- Registro com título "Mrs"

**Executar:**
```bash
npx cypress run --spec "cypress/e2e/register/register.cy.js"
```

### 2. Login ✅
- Login com credenciais válidas
- Login com credenciais inválidas
- Login com campos vazios

**Executar:**
```bash
npx cypress run --spec "cypress/e2e/login/login.cy.js"
```

### 3. Products (Produtos) ✅
- Listar todos os produtos
- Buscar produto
- Adicionar produto ao carrinho
- Adicionar múltiplos produtos

**Executar:**
```bash
npx cypress run --spec "cypress/e2e/products/products.cy.js"
```

### 4. Cart (Carrinho) ✅
- Visualizar carrinho
- Remover produto do carrinho
- Verificar detalhes do produto
- Produtos duplicados

**Executar:**
```bash
npx cypress run --spec "cypress/e2e/cart/cart.cy.js"
```

## Solução de Problemas

### Cypress não abre
```bash
npx cypress verify
npx cypress cache clear
npx cypress install
```

### Módulos não encontrados
```bash
rm -rf node_modules package-lock.json
npm install
```

### Testes falhando
1. Verificar se o site está acessível
2. Verificar seletores (podem ter mudado)
3. Verificar timeouts em cypress.config.js
4. Rodar em modo debug: `npm run cy:open`

## Próximos Passos

1. ✅ Executar todos os testes
2. 📝 Criar seus próprios testes
3. 🔧 Personalizar configurações
4. 🚀 Integrar com CI/CD
5. 📊 Adicionar relatórios

## Recursos

- 📖 [README.md](README.md) - Documentação completa
- 🔧 [INSTALLATION.md](INSTALLATION.md) - Guia de instalação detalhado
- 📚 [USAGE_GUIDE.md](USAGE_GUIDE.md) - Guia de uso avançado
- 🌐 [Cypress Docs](https://docs.cypress.io)
- 🎲 [Faker.js Docs](https://fakerjs.dev)

---

**Pronto para começar!** Execute `npm run cy:open` e divirta-se testando! 🎉

