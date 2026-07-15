import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => window.localStorage.clear())
})

test('inventory uses one responsive data surface without page overflow', async ({ page }, testInfo) => {
  await page.goto('/inventory?age=aging')
  await expect(page.getByRole('heading', { name: 'Review current stock' })).toBeVisible()

  if (testInfo.project.name === 'mobile-chromium') {
    await expect(page.getByRole('region', { name: 'Inventory cards' })).toBeVisible()
    await expect(page.getByRole('region', { name: 'Inventory table' })).toHaveCount(0)
  } else {
    await expect(page.getByRole('region', { name: 'Inventory table' })).toBeVisible()
    await expect(page.getByRole('region', { name: 'Inventory cards' })).toHaveCount(0)
    await expect(page.getByText('Selected unit', { exact: true })).toBeVisible()
    await expect(page.getByRole('checkbox').first()).toBeVisible()

    const openAction = page.getByRole('link', { name: /Open STK-/ }).first()
    await expect(openAction).toBeVisible()
    expect(await openAction.evaluate((element) => getComputedStyle(element).borderTopWidth)).toBe('0px')
  }

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )
  expect(hasHorizontalOverflow).toBe(false)
})

test('wide shell stays left-aligned and dark navigation hover remains readable', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop shell and hover proof')
  await page.setViewportSize({ width: 1920, height: 1000 })
  await page.goto('/inventory')
  await expect(page.getByRole('heading', { name: 'Review current stock' })).toBeVisible()

  const sidebarBox = await page.locator('.app-shell__sidebar').boundingBox()
  expect(sidebarBox).not.toBeNull()
  expect(sidebarBox!.x).toBeLessThanOrEqual(16)

  const activityLink = page.getByRole('link', { name: 'Activity', exact: true })
  await activityLink.hover()
  await page.waitForTimeout(250)
  const hoverColors = await activityLink.evaluate((element) => {
    const style = getComputedStyle(element)
    return { background: style.backgroundColor, color: style.color }
  })
  expect(hoverColors).toEqual({ background: 'rgb(37, 57, 67)', color: 'rgb(255, 255, 255)' })
})

test('desktop navigation remains viewport-bound on a long activity page', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop sticky-sidebar geometry proof')
  await page.goto('/activity')
  await expect(page.getByRole('heading', { name: 'Recent operational events' })).toBeVisible()

  const sidebar = page.locator('.app-shell__sidebar')
  const initialBox = await sidebar.boundingBox()
  expect(initialBox).not.toBeNull()
  expect(initialBox!.height).toBeLessThanOrEqual(976)

  const main = page.locator('.app-shell__main')
  const scrollMetrics = await main.evaluate((element) => ({
    clientHeight: element.clientHeight,
    scrollHeight: element.scrollHeight,
  }))
  expect(scrollMetrics.scrollHeight).toBeGreaterThan(scrollMetrics.clientHeight)
  await main.evaluate((element) => { element.scrollTop = element.scrollHeight })
  expect(await main.evaluate((element) => element.scrollTop)).toBeGreaterThan(0)
  const scrolledBox = await sidebar.boundingBox()
  expect(scrolledBox).not.toBeNull()
  expect(scrolledBox!.y).toBeGreaterThanOrEqual(11)
  expect(scrolledBox!.y).toBeLessThanOrEqual(13)
})

test('mobile Activity controls meet the 44px touch target', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile-only touch geometry proof')
  await page.goto('/activity?unit=STK-2048')
  await expect(page.getByRole('status').filter({ hasText: /events?/ })).toBeVisible()

  const controls = [
    page.getByRole('button', { name: '1 inventory units' }),
    page.getByRole('button', { name: 'All activity' }),
    page.getByRole('button', { name: 'Filters' }),
  ]

  for (const control of controls) {
    const box = await control.boundingBox()
    expect(box, `Expected a visible touch target for ${await control.getAttribute('aria-label')}`).not.toBeNull()
    expect(box!.height).toBeGreaterThanOrEqual(44)
    expect(box!.width).toBeGreaterThanOrEqual(44)
  }
})

test('tablet compact rail shows the supplied Keyloop asset', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'tablet-chromium', 'Tablet compact-rail proof')
  await page.goto('/activity')
  const compactLogo = page.locator('.app-shell__compact-brand img')
  await expect(compactLogo).toBeVisible()
  await expect(compactLogo).toHaveAttribute('src', '/keyloop-mobile-logo.jpeg')
})

test('mobile header shows the transparent slate Keyloop wordmark', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile-header brand proof')
  await page.goto('/inventory')

  const brand = page.locator('.application-header__mobile-brand')
  const logo = brand.locator('img')
  await expect(logo).toBeVisible()
  await expect(logo).toHaveAttribute('src', '/keyloop-logo-slate-transparent.png')
  expect(await brand.evaluate((element) => getComputedStyle(element).backgroundColor)).toBe('rgba(0, 0, 0, 0)')

  const brandBox = await brand.boundingBox()
  const logoBox = await logo.boundingBox()
  expect(brandBox).not.toBeNull()
  expect(logoBox).not.toBeNull()
  expect(logoBox!.width).toBeGreaterThanOrEqual(150)
  expect(logoBox!.width).toBeLessThanOrEqual(brandBox!.width)
  expect(logoBox!.height).toBeLessThanOrEqual(brandBox!.height)

  const alphaRange = await logo.evaluate((element) => {
    const image = element as HTMLImageElement
    const canvas = document.createElement('canvas')
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight
    const context = canvas.getContext('2d', { willReadFrequently: true })
    if (!context) return null
    context.drawImage(image, 0, 0)
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data
    let min = 255
    let max = 0
    for (let index = 3; index < pixels.length; index += 4) {
      min = Math.min(min, pixels[index] ?? 255)
      max = Math.max(max, pixels[index] ?? 0)
    }
    return { min, max }
  })
  expect(alphaRange).toEqual({ min: 0, max: 255 })
})

test('Activity uses the approved responsive filter and feed composition', async ({ page }, testInfo) => {
  await page.goto('/activity')
  await expect(page.getByRole('heading', { name: 'Operational activity' })).toBeVisible()
  await expect(page.getByRole('article')).toBeVisible()

  if (testInfo.project.name === 'mobile-chromium') {
    await expect(page.locator('.activity-filter-panel__desktop')).toBeHidden()
    await expect(page.getByRole('button', { name: 'All inventory' })).toBeVisible()
    const feedBox = await page.getByRole('article').boundingBox()
    expect(feedBox).not.toBeNull()
    expect(feedBox!.y).toBeLessThanOrEqual(300)
  } else {
    await expect(page.locator('.activity-filter-panel__desktop')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Filters' })).toBeVisible()
    await expect(page.locator('.activity-feed__count')).toHaveText(/\d+ events?/)
  }
})

for (const route of ['/', '/inventory', '/inventory/IU-2048', '/activity']) {
  test(`has no automated accessibility violations on ${route}`, async ({ page }) => {
    await page.goto(route)
    await expect(page.locator('[aria-busy="true"]')).toHaveCount(0)

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    expect(results.violations).toEqual([])
  })
}
