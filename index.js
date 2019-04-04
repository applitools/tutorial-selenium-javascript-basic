'use strict';

// Import chromedriver
require('chromedriver');

// Import Selenium Webdriver
const { Builder, Capabilities, By } = require('selenium-webdriver');

// Import Applitools SDK and relevant methods
const { Eyes, Target } = require('@applitools/eyes-selenium');

(async () => {
  // Open a Chrome browser.
  const driver = new Builder()
    .withCapabilities(Capabilities.chrome())
    .build();

  // Initialize the eyes SDK and set your private API key.
  const eyes = new Eyes();

  // Add your API key
  eyes.setApiKey('{APPLITOOLS_API_KEY}'); // 👈🏼 REPLACE ME!

  try {
    // Start the test and set the App name, the Test name and the browser's viewport size to 800x600.
    await eyes.open(driver, 'Demo App', 'My first Javascript test!', {
      width: 800,
      height: 600
    });

    // Navigate the browser to the "hello world!" web-site.
    await driver.get('https://demo.applitools.com');

    // ⭐️To see visual bugs, change the above URL to:
    // https://demo.applitools.com/index_v2.html and run the test again

    // Visual checkpoint #1.
    await eyes.check('Login Page', Target.window().fully());

    // Click the "Click me!" button.
    await driver.findElement(By.id('log-in')).click();

    // Visual checkpoint #2.
    await eyes.check('Click!', Target.window().fully());

    // End the test.
    const results = await eyes.close();

    console.log(results);
  } catch (e) {
    // In case of visual mismatch, you will go here
    console.error(e);

    // If you need test results here, you can use `eyes.close(false)` and then we will not throw an error

    // Or, you get them from an error object
    // if (e instanceof TestFailedError) {
    //   const results = e.getTestResults();
    // }
  } finally {
    // Close the browser.
    await driver.quit();

    // If the test was aborted before eyes.close was called ends the test as aborted.
    await eyes.abortIfNotClosed();
  }
})();