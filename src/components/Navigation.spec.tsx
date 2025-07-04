// tests/navigation.spec.ts
import { expect, test as it } from '@playwright/test';

it('navigates to localized routes', async ({ page }) => {
  await page.goto('/en');
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page).toHaveURL('/en/about');

  await page.goto('/hy');
  await page.getByRole('link', { name: 'Մեր Հով' }).click();
  await expect(page).toHaveURL('/hy/about');

  await page.goto('/ru');
  await page.getByRole('link', { name: 'О нас' }).click();
  await expect(page).toHaveURL('/ru/about');
});