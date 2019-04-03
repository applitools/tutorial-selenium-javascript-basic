'use strict';

//Import chromedriver
require('chromedriver'); // eslint-disable-line node/no-unpublished-require

//Import Selenium Webdriver
const {
  Builder,
  Capabilities,
  By
} = require('selenium-webdriver');

//Import Applitools SDK and relevant methods
const {
  Eyes,
  Target
} = require('@applitools/eyes-selenium');


async function runTest() {

  // Open a Chrome browser.
  const driver = new Builder()
    .withCapabilities(Capabilities.chrome())
    .build();

  // Initialize the eyes SDK and set your private API key.
  const eyes = new Eyes();

  //Add your API key
  eyes.setApiKey('APPLITOOLS_API_KEY'); //👈🏼 REPLACE ME!

  //scroll the entire page
  eyes.setForceFullPageScreenshot(true);

  try {

    // Start the test and set the, App name, Test name and the browser's viewport size to 800x600.
    await eyes.open(driver, 'Demo App', 'My first Javascript test!', {
      width: 800,
      height: 600
    });

    // Navigate the browser to the "hello world!" web-site.
    await driver.get('https://demo.applitools.com');

    //⭐️To see visual bugs, change the above URL to:
    //  https://demo.applitools.com/index_v2.html and run the test again

    // Visual checkpoint #1.
    await eyes.check('Login Page', Target.window());

    // Click the "Click me!" button.
    await driver.findElement(By.id('log-in')).click();

    // Visual checkpoint #2.
    await eyes.check('Click!', Target.window());

    // End the test.
    const results = await eyes.close(); // will return only first TestResults, but as we have two browsers, we need more results

    console.log( `Please wait...`)
    console.log(results); // eslint-disable-line
  } catch (e) {
    console.log(e);

    // Close the browser.
    await driver.quit();
  } finally {
    // Close the browser.
    await driver.quit();

    // If the test was aborted before eyes.close was called ends the test as aborted.
    await eyes.abortIfNotClosed();
  }
}

//Run
runTest();