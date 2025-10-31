# 🚀 Getting Started - Primeiros Passos

## ⚡ Início Rápido (2 minutos)

### Passo 1: Instalar Dependências
```bash
cd /home/lianamr/Projects/POC
npm install
```

**Aguarde a instalação de:**
- ✅ Cypress v13.6.0
- ✅ @faker-js/faker v8.3.1
- ✅ cypress-xpath v2.0.1

### Passo 2: Abrir Cypress
```bash
npm run cy:open
```

### Passo 3: Executar Seu Primeiro Teste
1. Clique em **"E2E Testing"**
2. Escolha **Chrome** como navegador
3. Clique em **register/register.cy.js**
4. 🎉 Veja o teste executar!

---

## 📝 O que acontece no primeiro teste?

O teste `register.cy.js` vai:

1. ✅ Abrir https://automationexercise.com
2. ✅ Gerar dados aleatórios com Faker.js (nome, email, endereço, etc.)
3. ✅ Preencher o formulário completo de registro
4. ✅ Criar uma conta
5. ✅ Verificar que a conta foi criada
6. ✅ Fazer login
7. ✅ Deletar a conta
8. ✅ Verificar que foi deletada

**Duração:** ~30-40 segundos

---

## 🎯 Próximos Passos

### 1. Explorar Outros Testes
```bash
# Login
npx cypress run --spec "cypress/e2e/login/login.cy.js"

# Produtos
npx cypress run --spec "cypress/e2e/products/products.cy.js"

# Carrinho
npx cypress run --spec "cypress/e2e/cart/cart.cy.js"
```

### 2. Executar Todos os Testes
```bash
npm run cy:run
```

### 3. Criar Seu Próprio Teste

**Copie este template:**

```javascript
// cypress/e2e/meu-teste/meu-teste.cy.js
import { faker } from '@faker-js/faker';

describe('Meu Teste', () => {
  it('deve fazer algo', () => {
    // 1. Gerar dados dinâmicos
    const nome = faker.person.fullName();
    
    // 2. Navegar
    cy.visit('/');
    
    // 3. Interagir
    cy.get('[data-qa="meu-seletor"]').type(nome);
    
    // 4. Asserções
    cy.url().should('include', '/sucesso');
    cy.get('.mensagem').should('contain', 'Sucesso!');
  });
});
```

---

## 🔍 Estrutura para Referência

```
cypress/
├── e2e/         ← Seus testes vão aqui
├── modules/     ← Page Objects (ações)
├── fixtures/    ← Dados estáticos
├── support/     ← Comandos customizados
└── utils/       ← Helpers (Faker.js)
```

---

## 💡 Dicas Importantes

### ✅ Use Dados Dinâmicos
```javascript
// BOM ✅
const email = faker.internet.email();

// RUIM ❌
const email = 'test@test.com'; // Pode dar conflito!
```

### ✅ Use Seletores Robustos
```javascript
// BOM ✅
cy.get('[data-qa="signup-button"]')

// RUIM ❌
cy.get('.btn.btn-primary') // Pode mudar!
```

### ✅ Separe Ações de Asserções
```javascript
// Ações → Módulos
SignupModule.preencherFormulario(dados);

// Asserções → E2E
cy.url().should('include', '/signup');
```

---

## 📚 Documentação Completa

| Documento | Descrição |
|-----------|-----------|
| **README.md** | Visão geral completa |
| **QUICKSTART.md** | Guia de 5 minutos |
| **INSTALLATION.md** | Instalação detalhada |
| **USAGE_GUIDE.md** | Guia de uso avançado |
| **ARCHITECTURE.md** | Arquitetura do framework |
| **PROJECT_SUMMARY.md** | Resumo do projeto |
| **STRUCTURE.txt** | Visualização da estrutura |

---

## 🆘 Problemas Comuns

### "Cypress não abre"
```bash
npx cypress verify
npx cypress cache clear
npx cypress install
```

### "Módulo não encontrado"
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Teste falhando"
1. Verifique se o site está acessível
2. Execute em modo GUI: `npm run cy:open`
3. Use o debugger do Cypress

---

## ✨ Comandos Úteis

| Comando | O que faz |
|---------|-----------|
| `npm run cy:open` | Abre interface gráfica |
| `npm run cy:run` | Executa todos os testes |
| `npm run cy:run:chrome` | Executa no Chrome |
| `npx cypress run --spec "arquivo.cy.js"` | Executa teste específico |

---

## 🎓 Aprender Mais

### Cypress
- [Documentação Oficial](https://docs.cypress.io)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Assertions](https://docs.cypress.io/guides/references/assertions)

### Faker.js
- [Documentação](https://fakerjs.dev)
- [Guide](https://fakerjs.dev/guide/)
- [API Reference](https://fakerjs.dev/api/)

### cypress-xpath
- [GitHub](https://github.com/cypress-io/cypress-xpath)
- [XPath Tutorial](https://www.w3schools.com/xml/xpath_intro.asp)

---

## 🎉 Pronto!

Você agora tem um framework completo de automação de testes!

**Comandos Essenciais:**
```bash
npm install          # Instalar
npm run cy:open      # Desenvolver
npm run cy:run       # Executar
```

**Happy Testing! 🚀**

---

*Este framework foi criado seguindo as melhores práticas de automação de testes com Cypress.*

*Versão: 1.0.0 | Data: 31 de Outubro de 2025*

