import {test,expect,Page} from '@playwright/test';
import {LoginPage} from '../e2e/pages/loginPage';
import {DashboardPage} from '../e2e/pages/dashboardPage';
import { AccountPage } from '../e2e/pages/accounPage';



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

test("Validate user is able to navigate to accounts page and able to see the account details", async({page})=>{

    const loginPageObj = new LoginPage(page);
    const accountPageObj=new AccountPage(page);
    await loginPageObj.navigateToLoginPage();
    await loginPageObj.login('admin', 'admin123');
    await accountPageObj.navigateToAccountPage();
    await accountPageObj.displayAccountsDetails();
    await accountPageObj.selectFilters('Credit','Balance');
    await expect(page.locator('//td[text()="No accounts found"]')).toBeVisible();
});

test("Validate Reset Fileter button",async({page})=>{
    const loginPageObj = new LoginPage(page);
    const accountPageObj=new AccountPage(page);
    await loginPageObj.navigateToLoginPage();
    await loginPageObj.login('admin', 'admin123');
    await accountPageObj.navigateToAccountPage();
    //await accountPageObj.selectFilters('Credit','Balance');
    await accountPageObj.clickOnResetFilterButton();
    await expect(accountPageObj.accountTypeDropdownLocator).toBeVisible();
});