'use strict';

const { Builder, By } = require('selenium-webdriver');
const { Eyes, ClassicRunner, Target, RectangleSize, Configuration, BatchInfo} = require('@applitools/eyes-selenium');

describe('DemoApp - ClassicRunner', function () {
  let runner, eyes, driver;

  before(async () => {

    // Use Chrome browser
    driver = await new Builder()
        .forBrowser('chrome')
        .build();

    // Initialize the Runner for your test.
    runner = new ClassicRunner();

    // Initialize the eyes SDK
    eyes = new Eyes(runner);

    // Initialize the eyes configuration.
    let conf = new Configuration()

    // Add this configuration if your tested page includes fixed elements.
    //config.setStitchMode(StitchMode.CSS);

    // You can get your api key from the Applitools dashboard
    conf.setApiKey('APPLITOOLS_API_KEY')

    // set new batch
    conf.setBatch(new BatchInfo("Demo batch"));

    // set the configuration to eyes
    eyes.setConfiguration(conf)

  });

  it('Smoke Test', async () => {
    // Set AUT's name, test name and viewport size (width X height)
    // We have set it to 800 x 600 to accommodate various screens. Feel free to
    // change it.
    await eyes.open(driver, 'Demo App', 'Smoke Test', new RectangleSize(800, 600));

    // Navigate the browser to the "ACME" demo app.
    await driver.get("https://demo.applitools.com");

    // To see visual bugs after the first run, use the commented line below instead.
    // await driver.get("https://demo.applitools.com/index_v2.html");

    // Visual checkpoint #1 - Check the login page. using the fluent API
    // https://applitools.com/docs/topics/sdk/the-eyes-sdk-check-fluent-api.html?Highlight=fluent%20api
    await eyes.check("Login Window", Target.window().fully());

    // This will create a test with two test steps.
    await driver.findElement(By.id("log-in")).click();

    // Visual checkpoint #2 - Check the app page.
    await eyes.check("App Window", Target.window().fully());

    // End the test.
    await eyes.closeAsync();
  });

  after(async () => {
    // Close the browser.
    await driver.quit();

    // If the test was aborted before eyes.close was called, ends the test as aborted.
    await eyes.abortIfNotClosed();

    // Wait and collect all test results
    const allTestResults = await runner.getAllTestResults();
    console.log(allTestResults);
  });
});
