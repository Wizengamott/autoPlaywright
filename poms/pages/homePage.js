import { expect } from '@playwright/test'

export class HomePage {
    constructor(page) {
        this.page = page;
        this.signUpButton = page.locator('.hero-descriptor_btn.btn.btn-primary')
    }

    async navigate() {
        await this.page.goto('https://qauto.forstudy.space/')
    }

    async openSignUpModal() {
        await this.signUpButton.click()
        await expect(this.page.locator('div').filter({ hasText: /^Register$/ })).toBeVisible() // на всяк перевіряю, що модалка з'явилась
    }
}
