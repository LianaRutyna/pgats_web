# Guia de Instalação - Cypress Automation Framework

## Pré-requisitos

- Node.js (versão 16 ou superior)
- npm (versão 7 ou superior)
- Git

## Passos de Instalação

### 1. Verificar instalação do Node.js e npm

```bash
node --version
npm --version
```

Se não estiver instalado, baixe em: https://nodejs.org/

### 2. Clonar ou navegar para o diretório do projeto

```bash
cd /home/lianamr/Projects/POC
```

### 3. Instalar dependências

```bash
npm install
```

Isso instalará:
- Cypress (v13.6.0)
- cypress-xpath (v2.0.1)
- @faker-js/faker (v8.3.1)

### 4. Verificar instalação do Cypress

```bash
npx cypress verify
```

### 5. Abrir Cypress pela primeira vez

```bash
npm run cy:open
```

Isso abrirá o Cypress Test Runner onde você pode:
- Escolher o navegador
- Visualizar todos os testes disponíveis
- Executar testes individuais
- Ver os resultados em tempo real

## Estrutura do Projeto Criada

```
POC/
├── cypress/
│   ├── e2e/                      # Testes E2E com asserções
│   │   ├── register/
│   │   │   └── register.cy.js    # Testes de registro
│   │   ├── login/
│   │   │   └── login.cy.js       # Testes de login
│   │   ├── products/
│   │   │   └── products.cy.js    # Testes de produtos
│   │   └── cart/
│   │       └── cart.cy.js        # Testes de carrinho
│   ├── fixtures/                 # Dados de teste estáticos
│   │   ├── register.json
│   │   ├── users.json
│   │   ├── products.json
│   │   └── cart.json
│   ├── modules/                  # Page Objects organizados por funcionalidade
│   │   ├── common/
│   │   │   └── header.module.js
│   │   ├── home/
│   │   │   └── home.module.js
│   │   ├── register/
│   │   │   ├── signup.module.js
│   │   │   ├── account-info.module.js
│   │   │   ├── account-created.module.js
│   │   │   └── account-deleted.module.js
│   │   ├── login/
│   │   │   └── login.module.js
│   │   ├── products/
│   │   │   └── products.module.js
│   │   └── cart/
│   │       └── cart.module.js
│   ├── support/
│   │   ├── commands.js           # Comandos customizados
│   │   └── e2e.js                # Configurações e imports
│   └── utils/
│       └── data-generator.js     # Utilitário para gerar dados com Faker
├── cypress.config.js             # Configuração do Cypress
├── package.json                  # Dependências do projeto
├── .gitignore                    # Arquivos ignorados pelo Git
└── README.md                     # Documentação principal

```

## Configuração

### cypress.config.js

O arquivo de configuração já está configurado com:
- `baseUrl`: https://automationexercise.com
- `viewportWidth`: 1191
- `viewportHeight`: 961
- Timeouts configurados
- Gravação de vídeo habilitada
- Screenshots em caso de falha

### Personalização

Você pode modificar as configurações em `cypress.config.js`:

```javascript
module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com', // Altere a URL base se necessário
    viewportWidth: 1191,                         // Largura da viewport
    viewportHeight: 961,                         // Altura da viewport
    defaultCommandTimeout: 10000,                // Timeout padrão
    video: true,                                  // Gravar vídeos
    screenshotOnRunFailure: true,                // Screenshots em falhas
  },
});
```

## Próximos Passos

1. Execute os testes para verificar a instalação:
   ```bash
   npm run cy:open
   ```

2. Selecione um teste para executar (ex: register.cy.js)

3. Veja a documentação completa no README.md

## Solução de Problemas

### Erro: Cypress não pode ser aberto

```bash
# Limpar cache do Cypress
npx cypress cache clear
npx cypress install
```

### Erro: Módulos não encontrados

```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Erro: Permissão negada (Linux)

```bash
# Dar permissões de execução
chmod +x node_modules/.bin/cypress
```

## Suporte

Para mais informações:
- Documentação Cypress: https://docs.cypress.io
- Faker.js: https://fakerjs.dev
- cypress-xpath: https://github.com/cypress-io/cypress-xpath

