import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly fullnameInput: Locator;
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly fullNameText: Locator;
  readonly usernameText: Locator;
  readonly emailText: Locator;

  constructor(page: Page) {
    this.page = page;
    // Use getByLabel for robust field selection
    this.fullnameInput = page.getByLabel('Full name');
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.emailInput = page.getByRole('textbox', { name: 'Email address' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Continue' });
    this.errorMessage = page.getByText(/Invalid Password|Password is incorrect/i);
    // Add Locators for profile info display
    this.fullNameText = page.getByText('Full name');
    this.usernameText = page.getByText('Username');
    this.emailText = page.getByText('Email address');
  }

  async navigateTo(url: string = 'http://localhost:5173/sign-in') {
    await this.page.goto(url);
    await expect(this.loginButton).toBeVisible();
  }

  async loginWithEmail(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginWithUsername(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginWithInvalidPassword(usernameOrEmail: string, password: string = 'WrongPassword!'): Promise<void> {
    // Try both username and email fields for flexibility
    if (usernameOrEmail.includes('@')) {
      await this.emailInput.fill(usernameOrEmail);
    } else {
      await this.usernameInput.fill(usernameOrEmail);
    }
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
  async assertProfileInfo({ fullName, username, email }: { fullName: string; username: string; email: string }) {
    await expect(this.fullNameText).toContainText(fullName);
    await expect(this.usernameText).toContainText(username);
    await expect(this.emailText).toContainText(email);
  }
  async assertInvalidPasswordError(): Promise<void> {
    await expect(this.errorMessage).toBeVisible({ timeout: 5000 });
  }
  async forgotResetPassword(): Promise<void> {
    await expect(this.page.getByText('Forgot password?')).toBeVisible();
    await this.page.getByText('Forgot password?').click();
  }
  async codeRequestPageElements(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Forgot Password?' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Reset your password' }).click();
    await expect(this.page.getByRole('heading', { name: 'Reset password' })).toContainText('Reset password');
    await expect(this.page.getByText("First, enter the code sent to")).toBeVisible();
    await expect(this.page.getByText("code sent to")).toBeVisible();
    await expect(this.page.getByText("m***************@t***.com")).toBeVisible();
  }
  async enterVerificationCode(code: string): Promise<void> {
    await this.page.getByRole('textbox', { name: "Enter verification code" }).fill(code);
  }
  async resetPassword(newPassword: string): Promise<void> {
    await this.page.getByRole('textbox', { name: "New password" }).fill(newPassword);
    await this.page.getByRole('button', { name: 'Reset password' }).click();
  }
  async assertPasswordResetSuccess(): Promise<void> {
    await this.page.waitForURL('http://localhost:5173/dashboard');
    await expect(this.page.getByRole('heading', { name: 'Dashboard Home' })).toBeVisible();
  }
  async resendVerificationCode(): Promise<void> {
    await this.page.getByRole('link', { name: 'resend' }).click();
  }
  async waitForVerificationExpiry(): Promise<void> {
    await this.page.waitForTimeout(31000); // Wait for 31 seconds to ensure code expiry
  }
  async handleMultipleFailedCodeAttempts(attempts: number = 5): Promise<void> {
    for (let i = 1; i <= attempts; i++) {
      await this.page.getByLabel("Enter Verification Code").fill('000000'); // Assuming '000000' is an incorrect code
      await this.page.getByRole('button', { name: "continue" }).click();
      if (i < attempts) {
        await expect(this.page.getByText('Incorrect code')).toBeVisible();
      } else {
        await expect(this.page.locator('div').filter({ hasText: /^Too many requests\. Please try again in a bit\.$/ }).first()).toBeVisible();
      }
    }
  }
}
