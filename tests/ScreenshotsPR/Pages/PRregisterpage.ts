import{type Page} from"@playwright/test"
import { PRbase } from "./PRbasepage"

export class Registerpage extends PRbase {
    
    firstName = this.page.getByPlaceholder("First Name");
    lastName = this.page.getByPlaceholder("Last Name");
    email = this.page.getByPlaceholder("email@example.com");
    phone = this.page.getByPlaceholder("enter your number");
    occupation = this.page.locator('select[formcontrolname="occupation"]');
    female = this.page.getByLabel("Female");
    password = this.page.getByRole("textbox", { name: "Passsword" });
    confirmPassword = this.page.getByRole("textbox", { name: "Confirm Password" });
    checkbox = this.page.locator('input[type="checkbox"]');
    registerButton = this.page.locator('input[type="submit"]');
    loginButton = this.page.getByRole("button", { name: "Login" });
    

    async regfilling (email:string, pass:string){
        await this.firstName.fill("timo");
        await this.lastName.fill("amr");
        await this.email.fill(email);
        await this.phone.fill("1234567891");
        await this.occupation.selectOption({ value: "3: Engineer" });
        await this.female.click();
        await this.password.fill(pass);
        await this.confirmPassword.fill(pass);
        await this.checkbox.click();
        await this.registerButton.click();
        await this.loginButton.click();

    }
}