const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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
    test.only('succeeds with correct credentials', async ({ page }) => {
      loginWith(page, 'tHellas', '1235')
      await expect(page.getByText('Hellas Testing is logged in')).toBeVisible()
      await expect(page.getByText('Login succeeded tHellas is in')).toBeVisible()

    })

    test('fails with wrong credentials', async ({ page }) => {
      loginWith(page, 'tHellas', 'wrong')

      await expect(page.getByText('Hellas Testing is logged in')).not.toBeVisible()
      await expect(page.getByText('Login succeeded tHellas is in')).not.toBeVisible()
      await expect(page.getByText('invalid username or password')).toBeVisible()
    })
  })
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      loginWith(page, 'tHellas', '1235')
    })

    test('a new blog can be created', async ({ page }) => {
      createBlog(page, 'testing new blog', 'tHellas', 'playwright.dev')
      await expect (page.getByText('testing new blog tHellas')).toBeVisible()
    })
  })
})
