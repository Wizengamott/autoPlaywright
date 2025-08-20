import { test as base, expect } from '@playwright/test'
import { storageStatePath } from '../playwright.config.js'
import config from '../config.js'

export const test = base.extend({
  garagePage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: storageStatePath })
    const page = await context.newPage()

    await page.goto(config.baseURL + 'panel/garage')
    await expect(page.locator('h1', { hasText: 'Garage' })).toBeVisible()

    await use(page)

    await context.close()
  }
})

export { expect }
