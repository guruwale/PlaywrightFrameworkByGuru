import {Locator,Page} from '@playwright/test';

export class DashboardPage
{
    readonly page:Page;
    readonly addAccountButtonLocator:Locator;
    readonly accountNameInputLocator:Locator;
    readonly accountTypeDropwdownLocator:Locator;
    readonly initialBalanceInputLocator:Locator;
    readonly overdraftCheckboxLocator:Locator;
    readonly saveAccountButtonLocator:Locator;


    constructor(page:Page)
    {
        this.page=page;
        this.addAccountButtonLocator=page.locator('//a[@data-testid="quick-add-account"]');
        this.accountNameInputLocator=page.getByTestId('account-name-input');
        this.accountTypeDropwdownLocator=page.locator("//label[text()='Account Type *']//following::select");
        this.initialBalanceInputLocator=page.getByPlaceholder('0.00');
        this.overdraftCheckboxLocator=page.getByTestId('overdraft-checkbox');
        this.saveAccountButtonLocator=page.getByTestId('save-account-button');

    }

    async enterAccountName(accountName:string)
    {
        await this.accountNameInputLocator.fill(accountName);

        console.log("Account name is entered as "+accountName); 
    }

    async selectAccountType(accountType:string)
    {
        await this.accountTypeDropwdownLocator.selectOption(accountType);
        console.log("Account type is selected as "+accountType);    
    }

    async enterInitialBalance(initialBalance:string)
    {
        await this.initialBalanceInputLocator.fill(initialBalance);
        console.log("Initial balance is entered as "+initialBalance); 
    }

    async selectRadioOptions(option:string)
    {
        
        const isChecked = await this.page.locator('//button[@value="'+option+'"]').getAttribute('aria-checked');    
            if(isChecked==='true')
            {                console.log(option+" is already selected");
            }else{
             await this.page.locator('//button[@value="'+option+'"]').click();
                console.log(option+" is selected");
        }
    
    }

    /*async selectEnableOverdraftCheckboxOption()
    {
        const checkboxLocator = this.page.locator('//button[@id="enable-overdraft"]');
       // const isChecked = this.page.locator('//input[@name="enableOverdraft"]').getAttribute('aria-checked');
       const isChecked= await checkboxLocator.getAttribute('aria-checked');
       if(await isChecked==='true')
        {
            console.log("enable-overdraft is already selected");
        }else{
            await checkboxLocator.click();
            console.log(" is selected");
        }   
    }*/
   async selectEnableOverdraftCheckboxOption()
    {
        const checkboxLocator = this.page.locator('//button[@id="enable-overdraft"]');
       
       if(await checkboxLocator.isChecked())
        {
            console.log("enable-overdraft is already selected");
        }else{
            await checkboxLocator.click();
            console.log(" is selected");
        }   
    }

    async clickOnSaveAccountButton()
    {
        await this.saveAccountButtonLocator.click();
        console.log("Save account button is clicked");  
    }
    
    
}
