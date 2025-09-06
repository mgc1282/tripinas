import type { TestInfo } from '@playwright/test';
import { LoginPage } from '../page/LoginPage';

/**
 * Attach a screenshot to the Playwright test report.
 * @param loginPage - The LoginPage instance or page object.
 * @param fileName - The path to save the screenshot.
 * @param testInfo - The Playwright TestInfo object.
 */
import type { Page } from '@playwright/test';

export async function attachedScreenshot(loginPage: LoginPage, fileName: string, testInfo: TestInfo) {
  // Ensure 'page' is of type Page
  const page: Page = (loginPage as LoginPage).page;
  const screenshot = await page.screenshot({ path: fileName, fullPage: true });
  await testInfo.attach(fileName, { body: screenshot, contentType: 'image/png' });
}

/**
 * Generate a random 6-digit code as a string.
 */
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}