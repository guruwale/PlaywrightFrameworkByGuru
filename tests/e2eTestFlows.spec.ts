import {test,expect,Page} from '@playwright/test';
import {LoginPage} from '../e2e/pages/loginPage';
import {DashboardPage} from '../e2e/pages/dashboardPage';



test("Validate user is able to login with valid credential",async({page})=>{
    const loginPageObj=new LoginPage(page);
    await loginPageObj.navigateToLoginPage();
    await loginPageObj.validatePageTitle();
    await loginPageObj.login('admin','admin123');
});

test("Validate user is able to add a new account", async ({ page }) => {
    const loginPageObj = new LoginPage(page);
    await loginPageObj.navigateToLoginPage();
    await loginPageObj.validatePageTitle();
    await loginPageObj.login('admin', 'admin123');
    const dashboardPageObj = new DashboardPage(page);
    await dashboardPageObj.addAccountButtonLocator.click();
    await dashboardPageObj.enterAccountName('Guruprasad W');
    await dashboardPageObj.selectAccountType('Credit Card');
    await dashboardPageObj.enterInitialBalance('2000');
    await dashboardPageObj.selectRadioOptions('inactive');
    await dashboardPageObj.selectEnableOverdraftCheckboxOption();
    await dashboardPageObj.saveAccountButtonLocator.click();
    await page.waitForTimeout(2000);
    await expect(page.locator('//a[text()="Guruprasad W"]')).toBeVisible();
});