import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const keySections = [
  { name: 'timeline', locator: () => '#timeline-board' },
  { name: 'news', locator: () => '#news' },
  { name: 'hot-exam', locator: () => '#hot-exam' },
  { name: 'resources', locator: () => '#resources' },
]

for (const sec of keySections) {
  test(`a11y: ${sec.name}`, async ({ page }) => {
    await page.goto('http://127.0.0.1:4173/')
    const section = page.locator(sec.locator())
    await expect(section).toBeVisible()
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include(sec.locator())
      .analyze()
    expect(accessibilityScanResults.violations, 'No critical a11y violations').toEqual([])
  })
}
