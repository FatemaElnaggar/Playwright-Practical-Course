import{type Page} from"@playwright/test"
import { PRbase } from "./PRbasepage"

export class Loginpage extends PRbase {
    email = this.page.getByPlaceholder("email@example.com");
    password = this.page.getByPlaceholder("enter your passsword");
    loginButton = this.page.locator('input[class="btn btn-block login-btn"]');

    

    async userlogin (email:string, pass:string) {
        await this.email.fill(email);
        await this.password.fill(pass);
        await this.loginButton.click();

    }
}