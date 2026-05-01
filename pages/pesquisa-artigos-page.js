import { expect } from '@playwright/test';

export class PesquisaArtigosPage {

    constructor(page) {
        this.page = page;
        this.inputBusca = this.page.getByRole('textbox', { name: 'Digite sua busca' });
        this.btnPesquisarArtigos = this.page.getByRole('button', { name: 'Pesquisar' });
        this.listaArtigos = this.page.locator('.ast-search-item span');
        this.btnFecharPesquisa = this.page.locator('.ast-icon.icon-close');
    }

    async filtrarArtigos(nomeArtigo) {
        await this.inputBusca.fill(nomeArtigo);
    }

    async pesquisarArtigos(nomeArtigo) {
        await this.inputBusca.fill(nomeArtigo);
        await this.btnPesquisarArtigos.click();
    }

    async validarListaArtigos(nomeArtigo) {
        await expect(this.listaArtigos.first()).toBeVisible();
        await expect(this.listaArtigos).not.toHaveCount(0);
        const textoArtigos = await this.listaArtigos.allTextContents();
        for (const textoArtigo of textoArtigos) {
            expect(textoArtigo.toLowerCase()).toContain(nomeArtigo.toLowerCase());
        }
    }

    async acessarPrimeiroArtigo() {
        const nomeArtigo = await this.listaArtigos.first().textContent();
        await this.page.getByRole('option', { name: nomeArtigo }).click();
    }
}