const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Hellas Testing',
        username: 'tHellas',
        password: '1235'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {

  await expect(page.getByRole('heading', { name: 'Log in to application' })).toBeVisible()
  await expect(page.getByLabel('Username')).toBeVisible()
  await expect(page.getByLabel('Password')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
  })
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('tHellas')
      await page.getByLabel('password').fill('1235')
      await page.getByRole('button', {name:'login'}).click()

      await expect(page.getByText('Hellas Testing is logged in')).toBeVisible()
      await expect(page.getByText('Login succeeded tHellas is in')).toBeVisible()

    })

    test.only('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('tHellas')
      await page.getByLabel('password').fill('wrong')
      await page.getByRole('button', {name:'login'}).click()

      await expect(page.getByText('Hellas Testing is logged in')).not.toBeVisible()
      await expect(page.getByText('Login succeeded tHellas is in')).not.toBeVisible()
      await expect(page.getByText('invalid username or password')).toBeVisible()

    })
})
})
