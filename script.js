import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import path from 'path';

(async function example() {
    // Initialize the WebDriver for Chrome
    let service = new chrome.ServiceBuilder(path.resolve('C:/WebDriver/bin/chromedriver.exe')).build();
    let options = new chrome.Options();
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).setChromeService(service).build();
    try {
        // Login
        await driver.get('https://www.saucedemo.com/');
        await driver.findElement(By.id('user-name')).sendKeys('performance_glitch_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.findElement(By.id('login-button')).click();

        // Reset App State
        await driver.findElement(By.id('nureact-burger-me-btn')).click();
        await driver.findElement(By.id('reset_sidebar_link')).click();
        await driver.findElement(By.id('react-burger-cross-btn')).click();

        // Filter by name (Z to A)
        await driver.findElement(By.className('product_sort_container')).sendKeys('za');

        // Add the first product to the cart
        await driver.findElements(By.className('btn_inventory')).then(elements => elements[0].click());

        // Navigate to cart and checkout
        await driver.findElement(By.className('shopping_cart_link')).click();
        await driver.findElement(By.id('checkout')).click();

        // Verify product names and total price
        let products = await driver.findElements(By.className('inventory_item_name'));
        for (let product of products) {
            console.log('Product: ' + await product.getText());
        }

        let totalPrice = await driver.findElement(By.className('summary_total_label'));
        console.log('Total price: ' + await totalPrice.getText());

        // Finish purchase
        await driver.findElement(By.id('finish')).click();

        // Verify successful order message
        let successMessage = await driver.findElement(By.className('complete-header'));
        console.log('Success message: ' + await successMessage.getText());

        // Reset App State and logout
        await driver.findElement(By.id('react-burger-menu-btn')).click();
        await driver.findElement(By.id('reset_sidebar_link')).click();
        await driver.findElement(By.id('logout_sidebar_link')).click();
    } finally {
        await driver.quit();
    }
})();
