import { test, expect } from '@playwright/test';
import { PesquisaArtigosPage } from '../pages/pesquisa-artigos-page';
import { ArtigosPage } from '../pages/artigos-page';
import { HomePage } from '../pages/home-page';


test.describe('Pesquisa de artigos no Blog do Agibank', () => {
  let homePage;
  let pesquisaArtigosPage;
  let artigosPage;
  
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    pesquisaArtigosPage = new PesquisaArtigosPage(page);
    artigosPage = new ArtigosPage(page);
    await homePage.acessarBlogAgibanck();
  });

  test('Deve pesquisar artigos com o termo Pix', async ({ page }) => {
    await homePage.acessarPesquisaArtigos();
    await pesquisaArtigosPage.pesquisarArtigos('Pix');

    await artigosPage.validaPaginaArtigos({
      url: /pix/i,
      titulo: 'Resultados encontrados para: Pix',
      texto: 'Pix automático: o que é e como utilizar'
    });
  });

  test('Deve acessar um artigo especifico a partir da busca pelo termo Pix', async ({ page }) => {
    const textoArtigo = 'Pix';
    await homePage.acessarPesquisaArtigos();
    await pesquisaArtigosPage.filtrarArtigos(textoArtigo);
    await pesquisaArtigosPage.validarListaArtigos(textoArtigo);
    await pesquisaArtigosPage.acessarPrimeiroArtigo();

    await artigosPage.validaPaginaArtigos({
      url: /pix/i,
      titulo: textoArtigo,
      texto: textoArtigo
    });
  });

  test('Deve fechar a página de pesquisa retornando para a página inicial', async ({ page }) => {
    await homePage.acessarPesquisaArtigos();
    await pesquisaArtigosPage.filtrarArtigos('Pix');
    await pesquisaArtigosPage.btnFecharPesquisa.click();

    await expect(page).toHaveURL('/');
    await expect(homePage.menuAgibank).toBeVisible();
  });

  test('Não deve exibir resultados para termo de busca inválido', async ({ page }) => {
    await homePage.acessarPesquisaArtigos();
    await pesquisaArtigosPage.pesquisarArtigos('Quality Assurance');

    await artigosPage.validaPaginaArtigos({
      url: /Quality\+Assurance/i,
      titulo: 'Resultados encontrados para: Quality Assurance',
      texto: 'Lamentamos, mas nada foi encontrado para sua pesquisa, tente novamente com outras palavras.'
    });
  });
});  