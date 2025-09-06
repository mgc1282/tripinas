import { Page, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  // Locators
  readonly fullName;
  readonly username;
  readonly email;
  readonly welcomeMessage;
  readonly userManagementMenu;
  readonly settingsMenu;
  readonly profileLogoButton;
  readonly photoInput;
  readonly saveButton;
  readonly cancelButton;
  readonly updateUsernameButton;
  readonly verifyEmailButton;
  readonly removeEmailButton;
  readonly securityButton;
  readonly updatePasswordButton;
  readonly deleteAccountButton;

  constructor(page: Page) {
    this.page = page;
    this.fullName = this.page.locator('data-test=profile-fullname');
    this.username = this.page.locator('data-test=profile-username');
    this.email = this.page.locator('data-test=profile-email');
    this.welcomeMessage = this.page.locator('text=Welcome');
    this.userManagementMenu = this.page.locator('data-test=menu-user-management');
    this.settingsMenu = this.page.locator('data-test=menu-settings');
    this.profileLogoButton = this.page.locator('data-test=profile-photo-upload');
    this.photoInput = this.page.locator('input[type="file"][name="profile-photo"]');
    this.saveButton = this.page.locator('data-test=save-button');
    this.cancelButton = this.page.locator('data-test=cancel-button');
    this.updateUsernameButton = this.page.locator('data-test=update-username-button');
    this.verifyEmailButton = this.page.locator('data-test=verify-email');
    this.removeEmailButton = this.page.locator('data-test=remove-email');
    this.securityButton = this.page.locator('data-test=security-button');
    this.updatePasswordButton = this.page.locator('data-test=update-password-button');
    this.deleteAccountButton = this.page.locator('data-test=delete-account-button');
  }
  // Navigation
  async goto() {
    await this.page.goto('/dashboard');
  }

  // Profile Info
  async assertProfileInfo({ fullName, username, email }: { fullName: string; username: string; email: string }) {
    await expect(this.fullName).toHaveText(fullName);
    await expect(this.username).toHaveText(username);
    await expect(this.email).toHaveText(email);
    await expect(this.welcomeMessage).toBeVisible();
  }

  // Menu Navigation
  async openUserManagement() {
    await expect(this.userManagementMenu).toBeVisible();
    await this.userManagementMenu.click();
  }
  async openSettings() {
    await expect(this.settingsMenu).toBeVisible();
    await this.settingsMenu.click();
  }

  // Profile Photo Upload
  async uploadProfilePhoto(photoPath: string) {
    await this.profileLogoButton.click();
    await this.photoInput.setInputFiles(photoPath);
  }

  // Update Name
  async updateProfileName(firstName: string, lastName: string) {
    await this.page.fill('input[name="firstName"]', firstName);
    await this.page.fill('input[name="lastName"]', lastName);
    await this.saveButton.click();
  }

  // Update Username
  async updateUsername(newUsername: string) {
    await this.updateUsernameButton.click();
    await this.page.fill('input[name="username"]', newUsername);
    await this.saveButton.click();
  }

  // Email Actions
  async verifyEmail() {
    await this.verifyEmailButton.click();
  }
  async removeEmail() {
    await this.removeEmailButton.click();
  }

  // Security: Update Password
  async updatePassword(oldPassword: string, newPassword: string) {
    await this.securityButton.click();
    await this.page.fill('input[name="oldPassword"]', oldPassword);
    await this.page.fill('input[name="newPassword"]', newPassword);
    await this.updatePasswordButton.click();
  }

  // Delete Account
  async deleteAccount() {
    await this.deleteAccountButton.click();
    // Confirm dialog if needed
    // await this.page.click('data-test=confirm-delete-account');
  }
}