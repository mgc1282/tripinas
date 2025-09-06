import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../page/DashboardPage';

test.describe('Dashboard E2E Tests', () => {
  let dashboard: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);
    await dashboard.goto();
  });

  test('Profile info is visible', async () => {
    await dashboard.assertProfileInfo({
      fullName: process.env.TRIPINAS_FULLNAME || 'Marianne C',
      username: process.env.TRIPINAS_USERNAME || 'MCTest',
      email: process.env.TRIPINAS_EMAIL || 'mariannegcecilio@test.com'
    });
    await expect(dashboard.welcomeMessage).toBeVisible();
  });

  test('Navigate Dashboard menu panel', async () => {
    await dashboard.openUserManagement();
    // Annotate: User Management panel not ready, blank content
    await dashboard.openSettings();
    // Annotate: Settings panel not ready, blank content
  });

  test('Profile logo button works', async () => {
    await dashboard.uploadProfilePhoto('tests/assets/photo.jpg'); // < 10mb
    await expect(dashboard.page.locator('text=Photo uploaded successfully')).toBeVisible();
    await dashboard.uploadProfilePhoto('tests/assets/big_photo.jpg'); // > 10mb
    await expect(dashboard.page.locator('text=File size exceeds 10mb')).toBeVisible();
  });

  test('Change First/Last Name', async () => {
    await dashboard.updateProfileName('NewFirst', 'NewLast');
    await expect(dashboard.page.locator('text=Profile Updated')).toBeVisible();
    await expect(dashboard.saveButton).toBeVisible();
    await expect(dashboard.cancelButton).toBeVisible();
  });

  test('Change Username', async () => {
    await dashboard.updateUsername('newusername');
    await expect(dashboard.page.locator('text=Username Updated')).toBeVisible();
  });

  test('Email verification and removal', async () => {
    await dashboard.verifyEmail();
    await expect(dashboard.page.locator('text=Email verification sent')).toBeVisible();
    await dashboard.removeEmail();
    await expect(dashboard.page.locator('text=Email removed')).toBeVisible();
  });

  test('Security: update password and delete account', async () => {
    const oldPassword = process.env.TRIPINAS_OLD_PASSWORD || 'yourOldPassword';
    const newPassword = process.env.TRIPINAS_NEW_PASSWORD || 'yourNewPassword';
    await dashboard.updatePassword(oldPassword, newPassword);
    await expect(dashboard.page.locator('text=Password updated')).toBeVisible();
    await dashboard.deleteAccount();
    await expect(dashboard.page.locator('text=Account Deleted')).toBeVisible();
  });
});