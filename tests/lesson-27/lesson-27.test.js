import { test, expect } from '../../fixtures/garagePage'
import config from '../../config'

test.describe('Garage page', () => {
  test('Go to Garage and add a new car', async ({ garagePage }) => {
    await expect(garagePage.locator('h1', { hasText: 'Garage' })).toBeVisible()

    await garagePage.getByRole('button', { name: 'Add car' }).click()
    await expect(garagePage.locator('#addCarBrand')).toBeVisible()

    await garagePage.locator('#addCarBrand').selectOption('Audi')
    await garagePage.locator('#addCarModel').selectOption('TT')
    await garagePage.locator('#addCarMileage').fill('12345')

    await garagePage.getByRole('button', { name: 'Add' }).click()

    await expect(garagePage.getByText('Audi TT')).toBeVisible()
  })

  test('Navigation to profile page from garage page', async ({ garagePage }) => {
    await expect(garagePage.locator('h1', { hasText: 'Garage' })).toBeVisible()

    await garagePage.getByRole('link', { name: 'Profile' }).click()
    await garagePage.waitForURL(config.baseURL + 'panel/profile')

    await expect(garagePage.locator('h1', { hasText: 'Profile' })).toBeVisible()
  })
})
