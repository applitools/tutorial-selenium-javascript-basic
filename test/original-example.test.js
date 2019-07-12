'use strict';

require('chromedriver');
const { Builder, Capabilities, By } = require('selenium-webdriver');
const { Eyes, Target, RectangleSize } = require('@applitools/eyes-selenium');

describe('DemoApp - Original', function () {
  let eyes, driver;

  beforeEach(async () => {
    // Initialize the eyes SDK and set your private API key
    eyes = new Eyes();

    // Add your API key (the API key can be set via APPLITOOLS_API_KEY env variable)
    // eyes.setApiKey('{APPLITOOLS_API_KEY}'); // 👈🏼 REPLACE ME!

    // Use Chrome browser
    driver = await new Builder()
      .withCapabilities(Capabilities.chrome())
      .build();
  });

  it('Smoke Test', async () => {
    // Start the test and set the App name, the Test name and the browser's viewport size to 800x600.
    await eyes.open(driver, 'DemoApp - Original', 'Smoke Test', { width: 800, height: 600});

    // Navigate the browser to the "ACME" demo app.
    await driver.get("https://demo.applitools.com");
    // await driver.get("https://demo.applitools.com/index_v2.html");
    // To see visual bugs after the first run, use the commented line above instead.

    // Visual checkpoint #1 - Check the login page.
    await eyes.check("Login Window", Target.window());

    // This will create a test with two test steps.
    await driver.findElement(By.id("log-in")).click();

    // Visual checkpoint #2 - Check the app page.
    await eyes.check("App Window", Target.window().fully());

    // End the test.
    const results = await eyes.close();
    console.log(results);
  });

  afterEach(async () => {
    // Close the browser.
    await driver.quit();

    // If the test was aborted before eyes.close was called, ends the test as aborted.
    await eyes.abortIfNotClosed();
  });
});
