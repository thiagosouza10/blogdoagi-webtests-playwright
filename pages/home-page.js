import { expect } from '@playwright/test';

export class HomePage {

    constructor(page) {
        this.page = page;
        this.btnPesquisar = this.page.getByRole('button', { name: 'Search icon link' });
        this.menuAgibank = this.page.getByLabel('Primary Site Navigation').getByRole('link', { name: 'O Agibank' });
    }

    async acessarBlogAgibanck() {
        await this.page.goto('/');
        await expect(this.menuAgibank).toBeVisible();
    }

    async acessarPesquisaArtigos() {
        await this.btnPesquisar.click();
    }
}