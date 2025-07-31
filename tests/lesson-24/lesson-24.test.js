import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { HomePage } from '../../poms/pages/homePage'
import { SignUpModal } from '../../poms/modals/signUpModal'

test.describe('Successful sign up', () => {
    let homePage
    let signUpModal
    let page

    test.beforeEach(async ({ browser }) => {
        const context = await browser.newContext({
            httpCredentials: {
                username: 'guest',
                password: 'welcome2qauto'
            }
        })

        page = await context.newPage()
        homePage = new HomePage(page)
        signUpModal = new SignUpModal(page)

        await homePage.navigate()
        await homePage.openSignUpModal()
    })

    test('Sign up new user', async () => {
        await signUpModal.fillName('aqaI' + faker.person.firstName())
        await signUpModal.fillLastName(faker.person.lastName())
        await signUpModal.fillEmail('aqa-email+' + faker.number.int() + '@gmail.com')
        await signUpModal.fillPassword('Test!123')
        await signUpModal.fillReEnterPassword('Test!123')
        await signUpModal.clickRegisterButton()

        await page.waitForURL('https://qauto.forstudy.space/panel/garage')
        await expect(page.locator('h1', { hasText: 'Garage' })).toBeVisible()
    })
})
