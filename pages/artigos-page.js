import { expect } from '@playwright/test';

export class ArtigosPage {
    
    constructor(page) {
        this.page = page;
        this.cardArtigo = this.page.locator('article[itemscope="itemscope"]');
        this.titulo = this.page.locator('h1');
        this.textoPagina = this.page.locator('#main');
    }

    async validaPaginaArtigos({ url, titulo, texto }) {
        await expect(this.page).toHaveURL(url);
        await expect(this.titulo).toContainText(titulo);
        await expect(this.textoPagina).toContainText(texto);
    }
}