import {type Page} from "@playwright/test"

export class LoginPage {
    constructor (private page:Page) {}
    
    private get useremail () {
        return this.page.getByPlaceholder("email@example.com");
    }
    async filluseremail (useremail:string) {
        await this.useremail.fill(useremail);
    }


    private get userpassword () {
        return this.page.getByPlaceholder("enter your passsword");
    }
    async filluserpassword (userpassword:string) {
        await this.userpassword.fill(userpassword);
    }


    private get userloginbutton () {
        return this.page.locator('input[class="btn btn-block login-btn"]');
    }
    async userclicklogin () {
        await this.userloginbutton.click();
    }
}