import { test, expect } from '@playwright/test'

test.describe('Home smoke & a11y gates', () => {
  test('loads hero and key sections', async ({ page }) => {
    await page.goto('http://127.0.0.1:4173/')

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByText('关键时间线与规则速览')).toBeVisible()
    await expect(page.getByText('考研资讯快报')).toBeVisible()
    await expect(page.getByText('高频考点')).toBeVisible()
    await expect(page.getByText('精选资料')).toBeVisible()
  })
})
