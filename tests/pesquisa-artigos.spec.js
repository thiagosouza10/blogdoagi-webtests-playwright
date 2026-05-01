import { test, expect } from '@playwright/test';


test.describe('Pesquisa de artigos no Blog do Agibank', () => {

  test('Deve pesquisar artigos com o termo Pix', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Search icon link' }).click();
    await page.getByRole('textbox', { name: 'Digite sua busca' }).fill('Pix');
    await page.getByRole('button', { name: 'Pesquisar' }).click();

    await expect(page.locator('article[itemscope="itemscope"]').first()).toBeVisible();
    await expect(page).toHaveURL(/s=Pix/i);
    await expect(page.locator('h1')).toContainText('Resultados encontrados para: Pix');
  });

  test('Deve acessar um artigo especifico a partir da busca pelo termo Pix', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Search icon link' }).click();
    await page.getByRole('textbox', { name: 'Digite sua busca' }).fill('Pix');

    await expect(page.locator('div[role="listbox"]')).toBeVisible();
    const listaArtigos = page.locator('.ast-search-item span');
    await expect(listaArtigos).not.toHaveCount(0);
    const textoArtigos = await listaArtigos.allTextContents();
    for (const textoArtigo of textoArtigos) {
      expect(textoArtigo.toLowerCase()).toContain('pix');
    }
    let nomeArtigo = await listaArtigos.first().textContent();
    await page.getByRole('option', { name: nomeArtigo }).click();

    await expect(page).toHaveURL(/pix/i);
    await expect(page.locator('h1')).toContainText('Pix');
  });

  test('Deve fechar a página de pesquisa retornando para a página inicial', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Search icon link' }).click();
    await expect(page.getByRole('textbox', { name: 'Digite sua busca' })).toBeVisible();
    await page.locator('.ast-icon.icon-close').click();

    await expect(page).toHaveURL('/');
    await expect(page.getByLabel('Primary Site Navigation').getByRole('link', { name: 'O Agibank' })).toBeVisible();
  });

  test('Não deve exibir resultados para termo de busca inválido', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Search icon link' }).click();
    await page.getByRole('textbox', { name: 'Digite sua busca' }).fill('Quality Assurance');
    await expect(page.locator('div[role="listbox"]').getByText('No results found')).toBeVisible();
    await page.getByRole('button', { name: 'Pesquisar' }).click();

    await expect(page).toHaveURL(/\?s=Quality\+Assurance/i);
    await expect(page.locator('h1')).toContainText('Resultados encontrados para: Quality Assurance');
    await expect(page.locator('#main')).toContainText('Lamentamos, mas nada foi encontrado para sua pesquisa, tente novamente com outras palavras.');
  });
});  