import { type Page } from "@playwright/test";
import { SDbasepage } from "./SDbasepage";

export class SDloginpage extends SDbasepage {
    constructor (page: Page) {
    super(page);
    }

    override async open () {
         super.open();
        await this.page.getByPlaceholder("Username").waitFor();
        await this.page.getByPlaceholder("Password").waitFor();
        await this.page.locator("#login-button").waitFor();
    }

    async userlogin () {
        await this.page.getByPlaceholder("Username").fill("problem_user");
        await this.page.getByPlaceholder("Password").fill("secret_sauce");
        await this.page.locator("#login-button").press("Enter");
    }

}