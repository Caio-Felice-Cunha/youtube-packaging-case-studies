import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './test',
  testMatch: '*.spec.mjs',
  fullyParallel: true,
  use: { baseURL: 'http://127.0.0.1:4191/youtube-packaging-case-studies/' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['iPhone 13'], browserName: 'chromium' } },
    { name: 'small-mobile', use: { ...devices['Desktop Chrome'], viewport: { width: 320, height: 800 } } }
  ],
  webServer: {
    command: 'npm run serve',
    url: 'http://127.0.0.1:4191/youtube-packaging-case-studies/',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000
  },
  reporter: [['list']]
});
