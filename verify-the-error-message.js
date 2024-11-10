const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

(async function testErrorMessage() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Open the Sauce Demo site
        await driver.get('https://www.saucedemo.com/');

        // Attempt to login with invalid credentials
        await driver.findElement(By.id('user-name')).sendKeys('invalid_user');
        await driver.findElement(By.id('password')).sendKeys('invalid_password');
        await driver.findElement(By.id('login-button')).click();

        // Verify the error message
        let errorMessage = await driver.findElement(By.css('.error-message-container')).getText();
        assert(errorMessage.includes('Epic sadface: Username and password do not match any user in this service'), 'Error message not as expected');

        console.log('Error message verification passed!');
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await driver.quit();
    }
})();
