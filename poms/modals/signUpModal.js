import { expect } from '@playwright/test'

export class SignUpModal {
    constructor(page) {
        this.page = page
        this.signUpName = page.locator('#signupName')
        this.singUpLastName = page.locator('#signupLastName')
        this.singUpEmail = page.locator('#signupEmail')
        this.singUpPassword = page.locator('#signupPassword')
        this.singUpReEnterPassword = page.locator('#signupRepeatPassword')
        this.singUpRegisterButton = page.getByRole('button', { name: 'Register' })
    }

    async fillName(name) {
        await this.signUpName.fill(name);
    }

    async fillLastName(lastName) {
        await this.singUpLastName.fill(lastName);
    }

    async fillEmail(email) {
        await this.singUpEmail.fill(email);
    }

    async fillPassword(password) {
        await this.singUpPassword.fill(password);
    }

    async fillReEnterPassword(reEnterPassword) {
        await this.singUpReEnterPassword.fill(reEnterPassword);
    }

    async clickRegisterButton() {
        await this.singUpRegisterButton.click();
    }
}
