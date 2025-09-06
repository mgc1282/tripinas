import { test as base, request } from '@playwright/test';
// Imports Playwright's 'test' function (renamed to 'base') and 'request' for API testing.

import { LoginPage } from '../page/LoginPage';
// Imports the LoginPage class from your Page Object Model.

type MyFixtures = {
    loginPage: LoginPage;
}
export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
});