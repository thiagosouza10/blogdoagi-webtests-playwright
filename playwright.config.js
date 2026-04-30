import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 5,

  reporter: [
    ['line'],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],

  use: {
    trace: 'on-first-retry',
    headless: true,
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ]
});