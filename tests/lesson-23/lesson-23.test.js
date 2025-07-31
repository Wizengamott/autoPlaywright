import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker'

test.describe('Sign up modal + successful sign up', () => {
    let page

    test.beforeEach(async ({ browser }) => {
        const context = await browser.newContext({
            httpCredentials: {
                username: 'guest',
                password: 'welcome2qauto'
            }
        })
        page = await context.newPage();
        await page.goto('https://qauto.forstudy.space/');
        await page.locator('.hero-descriptor_btn.btn.btn-primary').click()
    })

    test('Check Sign up "Name" field', async () => {
        const signUpName = page.locator('#signupName')
        await signUpName.click()
        await page.getByText('Last name').click()
        
        await page.waitForTimeout(200)
        const borderColor = await signUpName.evaluate((el) =>
            window.getComputedStyle(el).borderColor
          );
        expect(borderColor).toBe('rgb(220, 53, 69)')
        await expect (page.getByText('Name required')).toContainText('Name required')

        await signUpName.fill('T')
        await expect (page.getByText('Name has to be from 2 to 20')).toContainText('Name has to be from 2 to 20 characters long')

        await signUpName.fill('tttttjjjjjooooolllllm')
        await expect (page.getByText('Name has to be from 2 to 20')).toContainText('Name has to be from 2 to 20 characters long')

        await signUpName.fill('2e')
        await expect (page.getByText('Name is invalid')).toContainText('Name is invalid')

        await expect (page.getByRole('button', {name: 'Register'})).toBeDisabled()
    })

    test ('Check Sign up "Last name" field', async () => {
        const signUpLastName = page.locator('#signupLastName')
        await signUpLastName.click()
        await page.getByText('Last name').click()
        
        await page.waitForTimeout(200)
        const borderColor = await signUpLastName.evaluate((el) =>
            window.getComputedStyle(el).borderColor
          );
        expect(borderColor).toBe('rgb(220, 53, 69)')
        await expect (page.getByText('Last name required')).toContainText('Last name required')

        await signUpLastName.fill('T')
        await expect (page.getByText('Last name has to be from 2 to 20')).toContainText('Last name has to be from 2 to 20 characters long')

        await signUpLastName.fill('tttttjjjjjooooolllllm')
        await expect (page.getByText('Last name has to be from 2 to 20')).toContainText('Last name has to be from 2 to 20 characters long')

        await signUpLastName.fill('2e')
        await expect (page.getByText('Last name is invalid')).toContainText('Last name is invalid')

        await expect (page.getByRole('button', {name: 'Register'})).toBeDisabled()
    })

    test ('Check Sign up "Email" field', async () => {
        const signUpEmail = page.getByRole('textbox', { name: 'Name Last name Email' })
        await signUpEmail.click()
        await page.getByText('Last name').click()
        
        await page.waitForTimeout(200)
        const borderColor = await signUpEmail.evaluate((el) =>
            window.getComputedStyle(el).borderColor
          );
        expect(borderColor).toBe('rgb(220, 53, 69)')
        await expect (page.getByText('Email required')).toContainText('Email required')

        await signUpEmail.fill('T')
        await expect (page.getByText('Email is incorrect')).toContainText('Email is incorrect')

        await signUpEmail.fill('bu@@gmail.com')
        await expect (page.getByText('Email is incorrect')).toContainText('Email is incorrect')

        await signUpEmail.fill('bu@gmail,com')
        await expect (page.getByText('Email is incorrect')).toContainText('Email is incorrect')

        await expect (page.getByRole('button', {name: 'Register'})).toBeDisabled()
    })

    test ('Check Sign up "Password" field', async () => {
        const passwordErrorText = "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
        const signUpPassword = page.getByRole('textbox', { name: 'Password', exact: true })
        await signUpPassword.click()
        await page.getByText('Last name').click()
        
        await page.waitForTimeout(200)
        const borderColor = await signUpPassword.evaluate((el) =>
            window.getComputedStyle(el).borderColor
          );
        expect(borderColor).toBe('rgb(220, 53, 69)')
        await expect (page.getByText('Password required')).toContainText('Password required')

        await signUpPassword.fill('Test!test')
        await expect (page.getByText('Password has to be')).toContainText(passwordErrorText)

        await signUpPassword.fill('Test!12')
        await expect (page.getByText('Password has to be')).toContainText(passwordErrorText)

        await signUpPassword.fill('test!123')
        await expect (page.getByText('Password has to be')).toContainText(passwordErrorText)
        
        await signUpPassword.fill('TEST!123')
        await expect (page.getByText('Password has to be')).toContainText(passwordErrorText)
        
        await signUpPassword.fill('Test!12310Test!1')
        await expect (page.getByText('Password has to be')).toContainText(passwordErrorText)

        await expect (page.getByRole('button', {name: 'Register'})).toBeDisabled()
    })

    test ('Check Sign up "Re-enter password" field', async () => {
        const signUpPassword = page.getByRole('textbox', { name: 'Password', exact: true })
        const signUpReEnterPassword = page.locator('#signupRepeatPassword')
        await signUpReEnterPassword.click()
        await page.getByText('Last name').click()
        
        await page.waitForTimeout(200)
        const borderColor = await signUpReEnterPassword.evaluate((el) =>
            window.getComputedStyle(el).borderColor
          );
        expect(borderColor).toBe('rgb(220, 53, 69)')
        await expect (page.getByText('Re-enter password required')).toContainText('Re-enter password required')

        await signUpPassword.fill('Test!123')
        await signUpReEnterPassword.fill('Test!124')
        await expect (page.getByText('Passwords do not')).toContainText('Passwords do not match')

        await signUpReEnterPassword.fill('Test!1234')
        await expect (page.getByText('Passwords do not')).toContainText('Passwords do not match')

        await expect (page.getByRole('button', {name: 'Register'})).toBeDisabled()
    })

    test ('Create new user', async () => {
        const signUpName = page.locator('#signupName')
        const signUpLastName = page.locator('#signupLastName')
        const signUpEmail = page.locator('#signupEmail')
        const signUpPassword = page.locator('#signupPassword')
        const signUpReEnterPassword = page.locator('#signupRepeatPassword')
        const signUpRegisterButton = page.getByRole('button', {name: 'Register'})
        
        await signUpName.fill('aqaI' + faker.person.firstName())
        await signUpLastName.fill(faker.person.lastName())
        await signUpEmail.fill('aqa-email+' + faker.number.int() + '@gmail.com')
        await signUpPassword.fill('Test!123')
        await signUpReEnterPassword.fill('Test!123')
        await signUpRegisterButton.click()

        await page.waitForTimeout(2000)
        await page.waitForURL('https://qauto.forstudy.space/panel/garage')
    })
})