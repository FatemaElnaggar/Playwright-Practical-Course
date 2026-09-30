import {type Page} from "@playwright/test"

export class LoginPage {
    constructor (private page:Page) {}
    
    private get useremail () {
        return this.page.getByPlaceholder("email@example.com");
    }
    async filluseremail (email:string) {
        await this.useremail.fill(email);
    }


    private get userpassword () {
        return this.page.getByPlaceholder("enter your passsword");
    }
    async filluserpassword (password:string) {
        await this.userpassword.fill(password);
    }


    private get userloginbutton () {
        return this.page.locator('input[class="btn btn-block login-btn"]');
    }
    async userclicklogin () {
        await this.userloginbutton.click();
    }
}