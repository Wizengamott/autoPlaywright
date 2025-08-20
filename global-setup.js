
import { chromium, expect } from '@playwright/test'
import config from './config'

const storageStatePath = 'storageState.json'

async function globalSetup() {

    const browser = await chromium.launch()

    const context = await browser.newContext({
        httpCredentials: {
            username: config.httpCredentials.username,
            password: config.httpCredentials.password
        }
    })

    const homePage = await context.newPage() 

    await homePage.goto(config.baseURL)

    await homePage.getByRole('button', { name: 'Sign In' }).click()
    await expect(homePage.locator('.modal-content')).toBeVisible()

    await homePage.locator('#signinEmail').fill(config.existingUser.email)
    await homePage.locator('#signinPassword').fill(config.existingUser.password)

    await homePage.locator('//button[normalize-space()="Login"]').click()

    await homePage.waitForURL(config.baseURL + 'panel/garage')
    await expect(homePage.locator('h1', { hasText: 'Garage' })).toBeVisible()

    await homePage.context().storageState({ path: storageStatePath })

    await browser.close()
}

export default globalSetup
