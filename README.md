# Projeto Blog do Agibank - Testes UI (Playwright)

Projeto de testes automatizados de interface para o blog do Agibank.

## Pré-requisitos

- **Node.js**: https://nodejs.org/pt-br
- **Git**: https://git-scm.com/install/windows

## Arquitetura

```
├── .github/workflows/  # GitHub Actions (playwright.yml)
├── docs/               # Documentação e evidências
│   ├── casos-de-testes/
│   └── evidencias/
├── pages/              # Page Objects
│   ├── artigos-page.js
│   ├── home-page.js
│   └── pesquisa-artigos-page.js
├── tests/              # Specs de testes
│   └── pesquisa-artigos.spec.js
├── playwright.config.js
└── package.json
```

## Pasta docs

| Pasta | Descrição |
|-------|-----------|
| `casos-de-testes/` | Casos de teste documentados |
| `evidências/` | Screenshots e vídeos de execuções |

## Passo a Passo para Executar os testes

```bash
abra o terminal

# Clonar o projeto
git clone https://github.com/thiagosouza10/blogdoagi-webtests-playwright.git

# Entrar na pasta do projeto
cd blogdoagi-webtests-playwright

# Instalar dependências
npm install

# Intalação dos navegadores 
npx playwright install

# Executar testes
npm run tests

# Gerar relatório HTML
npm run report
```

## Rodando os testes no GitHub Actions
OBS: Para executar os testes via GitHub Actions, é necessário adicionar o seu usuário como colaborador no repositório.
Essa liberação é necessária para que os workflows funcionem corretamente no ambiente do projeto.

### Como executar manualmente

1. Acesse a aba **Actions** no repositório
2. Selecione o workflow **Playwright Tests**
3. Clique em **Run workflow**
4. Escolha a branch (ex: main)
5. Clique em **Run workflow**

### Visualizar relatório dos testes

Após a execução:
- O report é publicado automaticamente no GitHub Pages
- Acesse o link em: https://thiagosouza10.github.io/blogdoagi-webtests-playwright/
