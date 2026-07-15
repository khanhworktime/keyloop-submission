import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => window.localStorage.clear())
})

test('manager filters aging stock and records a durable action', async ({ page }, testInfo) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Inventory requiring attention' })).toBeVisible()
  await page.getByRole('link', { name: 'View aging inventory' }).click()

  await expect(page).toHaveURL(/\/inventory\?.*age=aging/)
  await expect(page.getByRole('heading', { name: 'Review current stock' })).toBeVisible()

  await page.getByRole('combobox', { name: 'Make' }).click()
  await page.getByRole('option', { name: 'Aster' }).click()
  await expect(page).toHaveURL(/make=Aster/)
  if (testInfo.project.name === 'tablet-chromium') {
    await expect(page.getByRole('row', { name: /STK-2048/ })).toBeVisible()
    await page.goto('/inventory/IU-2048')
  } else {
    const unitLinkName = testInfo.project.name === 'mobile-chromium'
      ? 'Review STK-2048'
      : 'Open STK-2048'
    await page.getByRole('link', { name: unitLinkName }).click()
  }

  await expect(page.getByRole('heading', { name: 'Aster A7 Touring' })).toBeVisible()
  await expect(page.getByRole('main').getByText('Status', { exact: true })).toBeVisible()
  await expect(page.getByRole('main').getByText('Available', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Record proposed action for STK-2048' }).click()

  await page.getByRole('combobox', { name: 'Proposed action' }).click()
  await page.getByRole('option', { name: 'Price reduction planned' }).click()
  await page.getByLabel('Manager note').fill('Review market pricing before Friday.')
  await page.getByRole('button', { name: 'Save proposed action' }).click()

  await expect(page.getByRole('main').getByRole('status')).toContainText(
    'Price reduction planned was added to STK-2048 activity.',
  )

  const toastBox = await page.locator('.action-save-toast').boundingBox()
  expect(toastBox).not.toBeNull()
  expect(toastBox!.width).toBeLessThanOrEqual(380)
  const protectedSurface = testInfo.project.name === 'mobile-chromium'
    ? page.locator('.primary-navigation')
    : page.locator('.application-header__actions')
  const protectedBox = await protectedSurface.boundingBox()
  expect(protectedBox).not.toBeNull()
  const overlapsProtectedSurface = !(
    toastBox!.x + toastBox!.width <= protectedBox!.x
    || protectedBox!.x + protectedBox!.width <= toastBox!.x
    || toastBox!.y + toastBox!.height <= protectedBox!.y
    || protectedBox!.y + protectedBox!.height <= toastBox!.y
  )
  expect(overlapsProtectedSurface).toBe(false)

  await page.reload()
  await expect(page.getByText('Price reduction planned', { exact: true }).first()).toBeVisible()

  await page.getByRole('link', { name: 'Activity', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Operational activity' })).toBeVisible()
  await expect(page.getByText('Price reduction planned', { exact: true }).first()).toBeVisible()
  await expect(page.getByText('Review market pricing before Friday.')).toBeVisible()
})

test('activity keeps its global identity and canonical URL when filtered', async ({ page }) => {
  await page.goto('/inventory')
  await page.goto('/activity?unit=stk-2048&page=99')

  await expect(page.getByRole('heading', { name: 'Operational activity' })).toBeVisible()
  await expect(page).toHaveURL(/units=%5B%22STK-2048%22%5D/)
  await expect(page).not.toHaveURL(/[?&]unit=/)
  await expect(page).not.toHaveURL(/page=/)
  await expect(page.getByText('Activity for STK-2048')).toHaveCount(0)
  await expect(page.getByRole('status').filter({ hasText: /events?/ })).toBeVisible()

  await page.goBack()
  await expect(page).toHaveURL(/\/inventory$/)
})

test('desktop and tablet grid selection updates the selected-unit detail rail', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'mobile-chromium', 'Mobile uses purpose-built cards')
  await page.goto('/inventory')

  await expect(page.getByRole('columnheader', { name: /Inventory age/ })).toBeVisible()
  if (testInfo.project.name === 'desktop-chromium') {
    await expect(page.getByRole('columnheader', { name: /Inventory status/ })).toBeVisible()
  }

  const selectedUnit = page.getByRole('complementary', { name: 'Aster A7 Touring' })
  await expect(selectedUnit.getByText('STK-2048', { exact: true })).toBeVisible()

  const reservedRow = page.getByRole('row', { name: /STK-1886/ })
  await reservedRow.getByRole('checkbox').click()
  const reservedUnit = page.getByRole('complementary', { name: 'Aster A5 Sport' })
  await expect(reservedUnit).toBeVisible()
  await expect(reservedUnit.getByText('Inventory age')).toBeVisible()
  await expect(reservedUnit.getByText('96 days', { exact: true })).toBeVisible()
  await expect(reservedUnit.getByText(/Aging/)).toHaveCount(0)
  await expect(reservedUnit.getByText('Inventory status')).toBeVisible()
  await expect(reservedUnit.getByText('Reserved', { exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Review STK-1886' })).toBeVisible()

  await page.getByRole('row', { name: /STK-1918/ }).click()
  await expect(page.getByRole('complementary', { name: 'Vela C4 Urban' })).toBeVisible()
})
