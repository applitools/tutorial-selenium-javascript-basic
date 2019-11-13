'use strict';

require('chromedriver');
const { Builder, By } = require('selenium-webdriver');
const { Eyes, ClassicRunner, Target, BatchInfo, RectangleSize } = require('@applitools/eyes-selenium');

describe('BasicDemo', function () {
  let runner, eyes, batch, driver;

  before(() => {
    batch = new BatchInfo('Demo batch');

    // Initialize the Runner for your test.
    runner = new ClassicRunner();
  });

  beforeEach(async () => {
    // Initialize the eyes SDK
    eyes = new Eyes(runner);

    // Add your personal Applitols API key (the API key can be set via APPLITOOLS_API_KEY env variable)
    // eyes.setApiKey('{APPLITOOLS_API_KEY}'); // or using this method

    // set batch name
    eyes.setBatch(batch);

    // Use Chrome browser
    driver = await new Builder().forBrowser('chrome').build();
  });

  it('basicTest', async () => {
    // Set AUT's name, test name and viewport size (width X height)
    // We have set it to 800 x 600 to accommodate various screens. Feel free to change it.
    await eyes.open(driver, 'Demo App', 'Smoke Test', new RectangleSize(800, 800));

    // Navigate the browser to the 'ACME' demo app.
    await driver.get('https://demo.applitools.com');

    // To see visual bugs after the first run, use the commented line below instead.
    // await driver.get('https://demo.applitools.com/index_v2.html');

    // Visual checkpoint #1 - Check the login page.
    await eyes.check('Login Window', Target.window());

    // This will create a test with two test steps.
    await driver.findElement(By.id('log-in')).click();

    // Visual checkpoint #2 - Check the app page.
    await eyes.check('App Window', Target.window().fully());

    // End the test.
    await eyes.close();
  });

  afterEach(async () => {
    // Close the browser.
    await driver.quit();

    // If the test was aborted before eyes.close was called, ends the test as aborted.
    await eyes.abortIfNotClosed();
  });
});
