import {Locator,Page} from '@playwright/test';

export class AccountPage{

    readonly page:Page;
    readonly accountPageLinkLocator:Locator;
    readonly totalBalanceLocator:Locator;
    readonly totalAccountsLocator:Locator;
    readonly activeAccountsLocator:Locator;
    readonly accountTypeDropdownLocator:Locator;
    readonly sortByDropdownLocator:Locator;
    readonly resetFilterButtonLocator:Locator;



    constructor(page:Page)
    {
        this.page=page;
        this.accountPageLinkLocator=page.locator('//a[@id="nav-accounts"]');
        this.totalBalanceLocator=page.locator('//span[text()="Total Balance"]/following-sibling::span');
        this.totalAccountsLocator=page.locator('//span[text()="Total Accounts"]/following-sibling::span');
        this.activeAccountsLocator=page.getByTestId('summary-active-accounts');
        this.accountTypeDropdownLocator=page.locator('//label[text()="Account Type:"]/following-sibling::button');
        this.sortByDropdownLocator=page.locator('//label[text()="Sort By:"]/following-sibling::button');
        this.resetFilterButtonLocator=page.getByText('Reset Filters');


    }

    async navigateToAccountPage()
    {
        await this.accountPageLinkLocator.click();
        console.log("Navigated to account page");
    }
    
    async displayAccountsDetails()
    {
        console.log("Total balance is "+await this.totalBalanceLocator.innerText());
        console.log("Total accounts is "+await this.totalAccountsLocator.innerText());
        console.log("Active accounts is "+await this.activeAccountsLocator.innerText());
    }

    async selectFilters(acctType:string,sortByOption:string)
    {
        await this.accountTypeDropdownLocator.click();
        this.page.locator('//span[text()="'+acctType+'"]');
        console.log("Account type filter is selected as "+acctType);

        await this.sortByDropdownLocator.click();
        await this.page.locator('//span[text()="'+sortByOption+'"]');
        console.log("Sort by filter is selected as "+sortByOption);
    }

    async clickOnResetFilterButton()
    {
        await this.resetFilterButtonLocator.click();
        console.log("Reset filter button is clicked");
    }

}