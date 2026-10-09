import {type Page} from "@playwright/test"

export class RegisterPage {

    constructor (private page:Page){}
    
async OpenWebsite (){
    await this.page.goto ("https://rahulshettyacademy.com/client/#/auth/register");
}


private get firstname () {
    return this.page.getByPlaceholder("First Name");
}
async fillfirstname () {
    await this.firstname.fill("fatma");
}


private get lastname () {
    return this.page.getByPlaceholder("Last Name");
}
async filllastname () {
    await this.lastname.fill("naggar");
}

private get email () {
    return this.page.getByPlaceholder("email@example.com");
}
async fillemail (email:string) {
    await this.email.fill(email);
}


private get phone () {
    return this.page.getByPlaceholder("enter your number");
}
async fillphone () {
    await this.phone.fill("1234567891");
}


 get SelectOccupation () {
    return this.page.locator('select[formcontrolname="occupation"]');
}



 get SelectGender () {
    return this.page.getByLabel("Female");
}



 get SetPassword () {
    return this.page.getByRole("textbox", { name: "Passsword" });
}



 get confirmpassword () {
    return this.page.getByRole("textbox", { name: "Confirm Password" });
}



private get checkage () {
    return this.page.locator('input[type="checkbox"]');
}
async checkagebox () {
    await this.checkage.click();
}


private get registerbutton () {
    return this.page.locator('input[type="submit"]');
}
async clickregister () {
    await this.registerbutton.click();
}


private get loginbutton () {
    return this.page.getByRole("button", { name: "Login" });
}
async clicklogin () {
    await this.loginbutton.click();
}

}