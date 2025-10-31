# Cypress Automation Framework - POC

Este projeto é um framework de automação de testes E2E usando Cypress com as melhores práticas.

## Estrutura do Projeto

```
cypress/
├── e2e/               # Testes E2E com asserções
├── fixtures/          # Dados de teste estáticos
├── modules/           # Page Objects e ações reutilizáveis
└── support/           # Comandos customizados e configurações
```

## Instalação

```bash
npm install
```

## Executar Testes

```bash
# Abrir Cypress Test Runner
npm run cy:open

# Executar todos os testes em modo headless
npm run cy:run

# Executar em navegador específico
npm run cy:run:chrome
npm run cy:run:firefox
```

## Características

- ✅ Dados dinâmicos com Faker.js
- ✅ Suporte para XPath com cypress-xpath
- ✅ Organização por funcionalidade (login, register, products, cart)
- ✅ Page Object Pattern
- ✅ Comandos customizados reutilizáveis
- ✅ Fixtures para dados de teste

## Boas Práticas Implementadas

1. **Separação de responsabilidades**: Módulos para ações, e2e para asserções
2. **Dados dinâmicos**: Uso de Faker.js para gerar dados únicos
3. **Seletores robustos**: Uso de data-qa attributes e XPath como fallback
4. **Reutilização**: Comandos customizados e funções modulares
5. **Manutenibilidade**: Código organizado e bem estruturado

