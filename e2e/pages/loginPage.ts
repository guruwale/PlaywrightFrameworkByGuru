import {Locator, Page, expect} from '@playwright/test';

import { env } from 'node:process';


export class LoginPage{

    readonly page:Page;
    readonly usernameInput = process.env.USERNAME;
    readonly passwordInput = process.env.PASSWORD;
    readonly titleLocator:Locator;
    readonly usernameLocator:Locator;
    readonly passwordLocator:Locator;
    readonly loginButtonLocator:Locator;
    readonly loginSuccessMessageLocator:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.titleLocator=page.locator('//header//span[text()="QA PlayGround"]');
        this.usernameLocator=page.locator('#username');
        this.passwordLocator=page.getByTestId('password-input');
        this.loginButtonLocator=page.locator('//button[text()="Login"]');
        this.loginSuccessMessageLocator=page.locator('//span[text()="SecureBank"]');

    }

    async navigateToLoginPage()
    {
         await this.page.goto(env.BASE_URL!);
      //  await this.page.goto('http://qaplayground.com/bank');
    }


    async validatePageTitle()
    {
        await this.page.waitForTimeout(2000);
         console.log("Page title is visible", await this.titleLocator.textContent());
        await expect(this.titleLocator).toBeVisible();  
         
    }

    async login(userName:string,password:string)
{
        await this.usernameLocator.fill(env.USERNAME!);
        await this.passwordLocator.fill(env.PASSWORD!);
        await this.loginButtonLocator.click();
        await expect(this.loginSuccessMessageLocator).toBeVisible();
        console.log("Login successful, user is navigated to home page and secure bank message is visible", await this.loginSuccessMessageLocator.textContent()); 

}
      


    
}