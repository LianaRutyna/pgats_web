# Guia Mochawesome Reports

## 📊 Sobre o Mochawesome

Mochawesome é um gerador de relatórios HTML personalizados para testes do Cypress. Ele gera relatórios bonitos, interativos e informativos com:

- ✅ Visualização de testes passando/falhando
- ✅ Estatísticas detalhadas
- ✅ Screenshots de falhas
- ✅ Informações de timing
- ✅ Filtros e busca
- ✅ Gráficos visuais
- ✅ Código de stack traces

## 🚀 Instalação

As seguintes dependências já foram instaladas:

```json
{
  "mochawesome": "7.1.4",
  "mochawesome-merge": "5.0.0",
  "mochawesome-report-generator": "6.3.0"
}
```

## ⚙️ Configuração

### cypress.config.js

```javascript
reporter: 'mochawesome',
reporterOptions: {
  reportDir: 'cypress/reports/mochawesome',
  overwrite: false,
  html: false,
  json: true,
  timestamp: 'mmddyyyy_HHMMss',
}
```

**Opções explicadas:**
- `reportDir` - Diretório onde os relatórios serão salvos
- `overwrite: false` - Não sobrescrever relatórios existentes (gera múltiplos arquivos JSON)
- `html: false` - Não gerar HTML individual por teste (apenas JSON)
- `json: true` - Gerar arquivos JSON que serão mesclados depois
- `timestamp` - Adiciona timestamp aos nomes dos arquivos

## 📝 Scripts NPM Disponíveis

### 1. Executar Testes com Relatório Completo

```bash
npm run test:report
```

Este comando executa:
1. Limpa relatórios antigos
2. Executa todos os testes do Cypress
3. Mescla todos os arquivos JSON em um único arquivo
4. Gera o relatório HTML final

**Use quando:** Quiser executar todos os testes e gerar relatório completo.

---

### 2. Limpar Relatórios Antigos

```bash
npm run test:clean
```

Remove o diretório de relatórios e cria um novo vazio.

**Use quando:** Quiser começar do zero, sem relatórios anteriores.

---

### 3. Mesclar Relatórios JSON

```bash
npm run report:merge
```

Combina todos os arquivos JSON individuais em um único `report.json`.

**Use quando:** Já executou os testes e tem múltiplos arquivos JSON para mesclar.

---

### 4. Gerar Relatório HTML

```bash
npm run report:generate
```

Gera o relatório HTML a partir do arquivo JSON mesclado.

**Use quando:** Já tem o arquivo `report.json` e quer gerar/regenerar o HTML.

---

### 5. Abrir Relatório no Navegador

```bash
npm run report:open
```

Abre o relatório HTML no navegador padrão.

**Use quando:** Quer visualizar o relatório gerado.

---

## 🔄 Fluxo de Trabalho Completo

### Opção 1: Tudo de Uma Vez (Recomendado)

```bash
npm run test:report
```

Após a execução, abra o relatório:

```bash
npm run report:open
```

---

### Opção 2: Passo a Passo (Manual)

```bash
# 1. Limpar relatórios antigos
npm run test:clean

# 2. Executar testes
npm run test

# 3. Mesclar JSONs
npm run report:merge

# 4. Gerar HTML
npm run report:generate

# 5. Abrir relatório
npm run report:open
```

---

## 📁 Estrutura de Diretórios

Após executar os testes, a estrutura será:

```
cypress/
└── reports/
    └── mochawesome/
        ├── *.json              # Arquivos JSON individuais por spec
        ├── report.json         # JSON mesclado de todos os testes
        ├── report.html         # Relatório HTML final ⭐
        └── assets/             # CSS, JS e outros assets do relatório
```

---

## 🎨 Recursos do Relatório

### Visão Geral
- Total de testes executados
- Testes passando/falhando/pendentes
- Tempo total de execução
- Suítes de testes organizadas

### Detalhes por Teste
- ✅ Status (Pass/Fail/Pending)
- ⏱️ Tempo de execução individual
- 📸 Screenshots (se disponíveis)
- 📋 Stack trace de erros
- 🔍 Código do teste

### Filtros e Busca
- Filtrar por status (Pass/Fail/Pending)
- Buscar por nome de teste
- Expandir/colapsar suítes

### Gráficos
- Pizza chart com distribuição de status
- Barras com tempo de execução
- Percentual de sucesso

---

## 🎯 Boas Práticas

### 1. Sempre Limpe Antes de Execuções Importantes

```bash
npm run test:clean && npm run test:report
```

Garante relatórios limpos sem dados antigos.

---

### 2. Organize Testes em Suítes

Use `describe()` para agrupar testes relacionados:

```javascript
describe('Shopping Cart', () => {
  describe('Add Products', () => {
    it('should add product to cart', () => {});
  });
  
  describe('Checkout', () => {
    it('should complete checkout', () => {});
  });
});
```

Isso cria uma hierarquia clara no relatório.

---

### 3. Use Nomes Descritivos

```javascript
// ❌ Ruim
it('test 1', () => {});

// ✅ Bom
it('TC15 - Place Order: Register before Checkout', () => {});
```

---

### 4. Use cy.log() para Contexto

```javascript
cy.log('Step 1: Navigate to login page');
cy.log('Step 2: Fill credentials');
```

Logs aparecem no relatório e ajudam a entender o fluxo.

---

### 5. Configure Screenshots em Falhas

Já configurado em `cypress.config.js`:

```javascript
screenshotOnRunFailure: true
```

Screenshots são automaticamente anexados ao relatório quando um teste falha.

---

## 🔧 Comandos Úteis

### Executar Apenas Um Arquivo de Teste com Relatório

```bash
npm run test:clean && cypress run --spec "cypress/e2e/cart/cart.cy.js" && npm run report:merge && npm run report:generate
```

---

### Executar com Navegador Específico

```bash
npm run test:clean && cypress run --browser chrome && npm run report:merge && npm run report:generate
```

---

### Gerar Relatório de Execução Anterior

Se você já executou testes e tem os arquivos JSON:

```bash
npm run report:merge && npm run report:generate && npm run report:open
```

---

## 📊 Interpretando o Relatório

### Seção de Estatísticas (Topo)

```
Tests: 5          # Total de testes
Passing: 4        # Testes que passaram ✅
Failing: 1        # Testes que falharam ❌
Pending: 0        # Testes pendentes ⏸️
Duration: 45s     # Tempo total de execução
```

### Suítes e Testes

- **Verde** ✅ - Teste passou
- **Vermelho** ❌ - Teste falhou
- **Amarelo** ⏸️ - Teste pendente/pulado
- **Cinza** - Teste desabilitado

### Expandindo Falhas

Clique em um teste falhado para ver:
- Mensagem de erro completa
- Stack trace
- Screenshot (se disponível)
- Tempo de execução
- Hooks executados (before, after, etc)

---

## 🐛 Troubleshooting

### Problema: "No test files found"

**Solução:** Verifique se executou `npm run test` antes de gerar relatório.

---

### Problema: "report.json not found"

**Solução:** Execute `npm run report:merge` antes de `npm run report:generate`.

---

### Problema: Relatório não abre no navegador

**Solução:** Abra manualmente em `cypress/reports/mochawesome/report.html`.

```bash
# Linux
xdg-open cypress/reports/mochawesome/report.html

# macOS
open cypress/reports/mochawesome/report.html

# Windows
start cypress/reports/mochawesome/report.html
```

---

### Problema: JSON files não estão sendo gerados

**Solução:** Verifique a configuração do reporter em `cypress.config.js`:

```javascript
reporter: 'mochawesome',
reporterOptions: {
  json: true,  // Deve estar true
}
```

---

## 📸 Screenshots e Vídeos

### Screenshots

Screenshots são gerados automaticamente quando um teste falha.

**Localização:** `cypress/screenshots/[spec-name]/[test-name].png`

### Vídeos

Vídeos são gerados para todas as execuções.

**Localização:** `cypress/videos/[spec-name].mp4`

**Para desabilitar vídeos:**

```javascript
// cypress.config.js
video: false
```

---

## 🎨 Customização do Relatório

### Adicionar Logo ou Título Custom

Crie um arquivo de configuração personalizado:

```javascript
// cypress.config.js
reporterOptions: {
  reportDir: 'cypress/reports/mochawesome',
  overwrite: false,
  html: false,
  json: true,
  timestamp: 'mmddyyyy_HHMMss',
  reportTitle: 'Cypress E2E Test Report',
  reportPageTitle: 'Test Results',
  embeddedScreenshots: true,
  inlineAssets: true,
}
```

---

## 📦 Integração CI/CD

### GitHub Actions

```yaml
- name: Run Cypress Tests
  run: npm run test:report

- name: Upload Report
  uses: actions/upload-artifact@v3
  if: always()
  with:
    name: mochawesome-report
    path: cypress/reports/mochawesome/
```

### GitLab CI

```yaml
test:
  script:
    - npm run test:report
  artifacts:
    when: always
    paths:
      - cypress/reports/mochawesome/
    expire_in: 30 days
```

---

## 🔗 Links Úteis

- [Mochawesome Docs](https://github.com/adamgruber/mochawesome)
- [Mochawesome Report Generator](https://github.com/adamgruber/mochawesome-report-generator)
- [Cypress Reporter Docs](https://docs.cypress.io/guides/tooling/reporters)

---

## 📋 Checklist de Uso

- [ ] Dependências instaladas
- [ ] `cypress.config.js` configurado
- [ ] Scripts npm adicionados ao `package.json`
- [ ] Executar `npm run test:report`
- [ ] Verificar relatório em `cypress/reports/mochawesome/report.html`
- [ ] Adicionar `cypress/reports/` ao `.gitignore`

---

## 🎉 Exemplo de Uso Rápido

```bash
# Executar todos os testes com relatório
npm run test:report

# Abrir relatório
npm run report:open
```

**Pronto!** Você terá um relatório HTML bonito e interativo com todos os resultados dos testes! 🚀

---

**Criado em:** 2025-10-31  
**Versão Mochawesome:** 7.1.4  
**Status:** ✅ Configurado e pronto para uso

