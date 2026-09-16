import { type Page, type Locator } from "@playwright/test";
import { SLbasepage } from "./SLbasepage";

export class SLregister extends SLbasepage {
    constructor (page:Page) {
        super(page);
    }

    override async openSL () {
         await super.openSL();
         this.page.locator('input[name="name"][required]');
         this.page.locator('input[name="email"]');
         this.page.getByPlaceholder("Password");
         this.page.getByLabel("Check me out if you Love IceCreams!");
        this.page.getByLabel("Gender");
        this.page.getByLabel("Employed");
        this.page.locator('input[name="bday"]');
        this.page.getByRole("button", {name:"Submit"});
       
    }

    async submit () {
        await this.page.locator('input[name="name"][required]').fill("fatma");
        await this.page.locator('input[name="email"]').fill("fa@gmail.com");
       await  this.page.getByPlaceholder("Password").fill("1234");
        await this.page.getByLabel("Check me out if you Love IceCreams!").click();
        await this.page.getByLabel("Gender").selectOption("Female");
        await this.page.getByLabel("Employed").click();
        await this.page.locator('input[name="bday"]').fill("1992-05-15");
        await this.page.getByRole("button", {name:"Submit"}).click();
    }
}
